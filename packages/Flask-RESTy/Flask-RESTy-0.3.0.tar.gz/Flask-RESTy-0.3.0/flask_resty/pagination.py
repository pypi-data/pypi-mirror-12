import base64
import flask
import json
from marshmallow import ValidationError
import sqlalchemy as sa
from sqlalchemy import Column, sql

from .exceptions import ApiError
from . import meta
from . import utils

# -----------------------------------------------------------------------------


class IdCursorPagination(object):
    cursor_arg = 'cursor'
    limit_arg = 'limit'

    def __init__(self, default_limit=None, max_limit=None):
        self._default_limit = utils.if_none(default_limit, max_limit)
        self._max_limit = max_limit

        if self._max_limit is not None:
            assert \
                self._default_limit <= self._max_limit, \
                "default limit exceeds max limit"

    def __call__(self, query, view):
        column_specs = self.get_column_specs(query, view)

        cursor_in = self.get_request_cursor(view, column_specs)
        if cursor_in is not None:
            query = query.filter(self.get_filter(column_specs, cursor_in))

        limit = self.get_request_limit()
        if limit is not None:
            query = query.limit(limit + 1)

        collection = query.all()

        if limit is not None and len(collection) > limit:
            has_next_page = True
            collection = collection[:limit]
        else:
            has_next_page = False

        # Relay expects a cursor for each item in the collection.
        cursors_out = self.render_cursors(view, column_specs, collection)

        meta.set_response_meta(
            has_next_page=has_next_page,
            cursors=cursors_out,
        )
        return collection

    def get_column_specs(self, query, view):
        column_specs = tuple(
            self.get_column_spec(expression) for expression in query._order_by
        )

        id_column = view.model.__table__.c.id
        assert \
            id_column in (column for column, _ in column_specs), \
            "ordering does not include id"

        return column_specs

    def get_column_spec(self, expression):
        if isinstance(expression, Column):
            return expression, True

        column = expression.element
        assert isinstance(column, Column), "expression is not on a column"

        modifier = expression.modifier
        if modifier == sql.operators.asc_op:
            asc = True
        elif modifier == sql.operators.desc_op:
            asc = False
        else:
            assert False, "unrecognized expression modifier"

        return column, asc

    def get_request_cursor(self, view, column_specs):
        cursor = flask.request.args.get(self.cursor_arg)
        try:
            return self.parse_cursor(view, column_specs, cursor)
        except ApiError as e:
            raise e.update({'source': {'parameter': self.cursor_arg}})

    def parse_cursor(self, view, column_specs, cursor):
        if not cursor:
            return None

        cursor = self.decode_cursor(cursor)

        if len(cursor) != len(column_specs):
            raise ApiError(400, {'code': 'invalid_cursor.field_count'})

        deserializer = view.deserializer
        column_fields = (
            deserializer.fields[column.name] for column, _ in column_specs
        )

        try:
            cursor = tuple(
                field.deserialize(value)
                for field, value in zip(column_fields, cursor)
            )
        except ValidationError as e:
            errors = (
                self.format_validation_error(message)
                for message, path in utils.iter_validation_errors(e.messages)
            )
            raise ApiError(400, *errors)

        return cursor

    def format_validation_error(self, message):
        return {
            'code': 'invalid_cursor',
            'detail': message,
        }

    def decode_cursor(self, cursor):
        try:
            cursor = cursor.encode('ascii')
            cursor = base64.urlsafe_b64decode(cursor)
            cursor = cursor.decode('utf-8')
            cursor = json.loads(cursor)
        except (TypeError, ValueError):
            raise ApiError(400, {'code': 'invalid_cursor.encoding'})

        return cursor

    def get_filter(self, column_specs, cursor):
        filter_specs = zip(column_specs, cursor)
        return sa.or_(
            self.get_filter_clause(filter_specs[:i + 1])
            for i in range(len(filter_specs))
        )

    def get_filter_clause(self, filter_specs):
        previous_clauses = sa.and_(
            column == value for (column, _), value in filter_specs[:-1]
        )

        (column, asc), value = filter_specs[-1]
        if asc:
            current_clause = column > value
        else:
            current_clause = column < value

        return sa.and_(previous_clauses, current_clause)

    def get_request_limit(self):
        limit = flask.request.args.get(self.limit_arg)
        try:
            return self.parse_limit(limit)
        except ApiError as e:
            raise e.update({'source': {'parameter': self.limit_arg}})

    def parse_limit(self, limit):
        if not limit:
            return self._default_limit

        try:
            limit = int(limit)
        except ValueError:
            raise ApiError(400, {'code': 'invalid_limit'})

        if limit < 0:
            raise ApiError(400, {'code': 'invalid_limit'})

        if self._max_limit is not None:
            limit = min(limit, self._max_limit)

        return limit

    def render_cursors(self, view, column_specs, collection):
        serializer = view.serializer
        column_fields = tuple(
            serializer.fields[column.name] for column, _ in column_specs
        )

        return tuple(
            self.render_cursor(item, column_fields) for item in collection
        )

    def render_cursor(self, item, column_fields):
        cursor = tuple(
            field._serialize(getattr(item, field.name), field.name, item)
            for field in column_fields
        )

        return self.encode_cursor(cursor)

    def encode_cursor(self, cursor):
        cursor = json.dumps(cursor)
        cursor = cursor.encode('utf-8')
        cursor = base64.urlsafe_b64encode(cursor)
        return cursor.decode('ascii')
