import datetime
import logging
import time

from projex.lazymodule import lazy_import
from ..column import Column

# optional imports
try:
    from dateutil import parser as dateutil_parser
except ImportError:
    dateutil_parser = None


log = logging.getLogger(__name__)
orb = lazy_import('orb')
pytz = lazy_import('pytz')


class AbstractDatetimeColumn(Column):
    def dbRestore(self, typ, db_value):
        """
        Converts a stored database value to Python.

        :param py_value: <variant>
        :param context: <orb.Context>

        :return: <variant>
        """
        return self.valueFromString(db_value, context=context)

    def dbStore(self, typ, py_value):
        """
        Prepares to store this column for the a particular backend database.

        :param backend: <orb.Database>
        :param py_value: <variant>
        :param context: <orb.Context>

        :return: <variant>
        """
        return self.valueToString(py_value, context=context)


class DateColumn(AbstractDatetimeColumn):
    TypeMap = {
        'Default': 'DATE'
    }

    def dbRestore(self, typ, db_value):
        """
        Converts a stored database value to Python.

        :param backend: <orb.Database>
        :param py_value: <variant>
        :param context: <orb.Context>

        :return: <variant>
        """
        return db_value

    def valueFromString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :param      value | <str>
        """
        if value in ('today', 'now'):
            return datetime.date.today()
        elif dateutil_parser:
            return dateutil_parser.parse(value).date()
        else:
            time_struct = time.strptime(value, '%Y-%m-%d')
            return datetime.date(time_struct.tm_year,
                                 time_struct.tm_month,
                                 time_struct.tm_day)

    def valueToString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :sa         engine

        :param      value | <str>
        """
        return value.strftime('%Y-%m-%d')


class DatetimeColumn(AbstractDatetimeColumn):
    TypeMap = {
        'Postgres': 'TIMESTAMP WITHOUT TIME ZONE',
        'Default': 'DATETIME'
    }

    def valueFromString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :param      value | <str>
        """
        if out in ('today', 'now'):
            return datetime.date.now()
        elif dateutil_parser:
            return dateutil_parser.parse(value)
        else:
            time_struct = time.strptime(value, '%Y-%m-%d %h:%m:%s')
            return datetime.datetime(time_struct.tm_year,
                                     time_struct.tm_month,
                                     time_struct.tm_day,
                                     time_struct.tm_hour,
                                     time_struct.tm_minute,
                                     time_struct.tm_sec)

    def valueToString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :sa         engine

        :param      value | <str>
        """
        return value.strftime('%Y-%m-%d %h:%m:%s')


class DatetimeWithTimezoneColumn(AbstractDatetimeColumn):
    TypeMap = {
        'Postgres': 'TIMESTAMP WITHOUT TIME ZONE',
        'Default': 'DATETIME'
    }

    def __init__(self, timezone=None, **kwds):
        super(DatetimeWithTimezoneColumn, self).__init__(**kwds)

        # define custom properties
        self.__timezone = timezone

    def restore(self, value, context=None):
        """
        Restores the value from a table cache for usage.

        :param      value   | <variant>
                    context | <orb.Context> || None
        """
        if value in ('today', 'now'):
            return datetime.date.now()
        elif isinstance(value, datetime.datetime):
            tz = self.timezone(context)

            if tz is not None:
                if value.tzinfo is None:
                    base_tz = orb.system.baseTimezone()

                    # the machine timezone and preferred timezone match, so create off utc time
                    if base_tz == tz:
                        value = tz.fromutc(value)

                    # convert the server timezone to a preferred timezone
                    else:
                        value = base_tz.fromutc(value).astimezone(tz)
                else:
                    value = value.astimezone(tz)
            else:
                log.warning('No local timezone defined')

            return value
        else:
            return super(DatetimeWithTimezoneColumn, self).restore(value, context)

    def setTimezone(self, timezone):
        """
        Sets the timezone associated directly to this column.

        :sa     <orb.Manager.setTimezone>

        :param     timezone | <pytz.tzfile> || None
        """
        self.__timezone = timezone

    def store(self, value):
        """
        Converts the value to one that is safe to store on a record within
        the record values dictionary

        :param      value | <variant>

        :return     <variant>
        """
        if isinstance(value, datetime.datetime):
            # match the server information
            tz = orb.system.baseTimezone() or self.timezone()
            if tz is not None:
                # ensure we have some timezone information before converting to UTC time
                if value.tzinfo is None:
                    value = tz.localize(value, is_dst=None)

                value = value.astimezone(pytz.utc).replace(tzinfo=None)
            else:
                log.warning('No local timezone defined.')

            return value
        else:
            return super(DatetimeWithTimezoneColumn, self).store(value)

    def timezone(self, context=None):
        """
        Returns the timezone associated specifically with this column.  If
        no timezone is directly associated, then it will return the timezone
        that is associated with the system in general.

        :sa     <orb.Manager>

        :param      context | <orb.Context> || None

        :return     <pytz.tzfile> || None
        """
        return self.__timezone or self.schema().timezone(context)

    def valueFromString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :param      value | <str>
        """
        if dateutil_parser:
            return dateutil_parser.parse(value)
        else:
            time_struct = time.strptime(value, '%Y-%m-%d %h:%m:s')
            return datetime.datetime(time_struct.tm_year,
                                     time_struct.tm_month,
                                     time_struct.tm_day,
                                     time_struct.tm_hour,
                                     time_struct.tm_minute,
                                     time_struct.tm_sec)

    def valueToString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :sa         engine

        :param      value | <str>
        """
        return value.strftime('%Y-%m-%d %h:%m:%s')

class IntervalColumn(Column):
    TypeMap = {
        'Postgres': 'TIMEDELTA'
    }


class TimeColumn(AbstractDatetimeColumn):
    TypeMap = {
        'Default': 'TIME'
    }

    def valueFromString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :param      value | <str>
        """
        if value == 'now':
            return datetime.datetime.now().time()
        elif dateutil_parser:
            return dateutil_parser.parse(value).time()
        else:
            time_struct = time.strptime(value, '%h:%m:%s')
            return datetime.time(time_struct.tm_hour,
                                 time_struct.tm_min,
                                 time_struct.tm_sec)

    def valueToString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :sa         engine

        :param      value | <str>
        """
        return value.strftime('%h:%m:%s')


class TimestampColumn(AbstractDatetimeColumn):
    TypeMap = {
        'Postgres': 'TIMESTAMP WITHOUT TIMEZONE',
        'Default': 'DATETIME'
    }

    def restore(self, value, context=None):
        """
        Restores the value from a table cache for usage.

        :param      value   | <variant>
                    context | <orb.Context> || None
        """
        if isinstance(value, (int, long, float)):
            return datetime.datetime.fromtimestamp(value)
        else:
            return super(TimestampColumn, self).restore(value, context)

    def store(self, value):
        """
        Converts the value to one that is safe to store on a record within
        the record values dictionary

        :param      value | <variant>

        :return     <variant>
        """
        if isinstance(value, datetime.datetime):
            return time.mktime(value.timetuple())
        else:
            return super(TimestampColumn, self).store(value)

    def valueFromString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :param      value | <str>
        """
        try:
            return datetime.datetime.fromtimestamp(float(value))
        except StandardError:
            if dateutil_parser:
                return dateutil_parser.parse(value)
            else:
                return datetime.datetime.min()


class UTC_DatetimeColumn(AbstractDatetimeColumn):
    TypeMap = {
        'Default': 'TIMESTAMP'
    }

    def valueFromString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :param      value | <str>
                    extra | <variant>
        """
        if value in ('today', 'now'):
            return datetime.date.utcnow()
        elif dateutil_parser:
            return dateutil_parser.parse(value)
        else:
            time_struct = time.strptime(value, '%Y-%m-%d %h:%m:s')
            return datetime.datetime(time_struct.tm_year,
                                     time_struct.tm_month,
                                     time_struct.tm_day,
                                     time_struct.tm_hour,
                                     time_struct.tm_minute,
                                     time_struct.tm_sec)

    def valueToString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :sa         engine

        :param      value | <str>
        """
        return value.strftime('%Y-%m-%d %h:%m:%s')


class UTC_TimestampColumn(AbstractDatetimeColumn):
    TypeMap = {
        'Default': 'TIMESTAMP'
    }

    def restore(self, value, context=None):
        """
        Restores the value from a table cache for usage.

        :param      value   | <variant>
                    context | <orb.Context> || None
        """
        if isinstance(value, (int, long, float)):
            return datetime.datetime.fromtimestamp(value)
        else:
            return super(UTC_TimestampColumn, self).restore(value, context)

    def store(self, value):
        """
        Converts the value to one that is safe to store on a record within
        the record values dictionary

        :param      value | <variant>

        :return     <variant>
        """
        if isinstance(value, datetime.datetime):
            return time.mktime(value.timetuple())
        else:
            return super(UTC_TimestampColumn, self).store(value)

    def valueFromString(self, value, context=None):
        """
        Converts the inputted string text to a value that matches the type from
        this column type.

        :param      value | <str>
        """
        if value in ('today', 'now'):
            return datetime.date.utcnow()

        try:
            return datetime.datetime.fromtimestamp(float(value))
        except StandardError:
            if dateutil_parser:
                return dateutil_parser.parse(value)
            else:
                return datetime.datetime.min()

# register class types
Column.registerAddon('Date', DateColumn)
Column.registerAddon('Datetime', DatetimeColumn)
Column.registerAddon('DatetimeWithTimezone', DatetimeWithTimezoneColumn)
Column.registerAddon('Interval', IntervalColumn)
Column.registerAddon('Time', TimeColumn)
Column.registerAddon('Timestamp', TimestampColumn)
Column.registerAddon('UTC Datetime', UTC_DatetimeColumn)
Column.registerAddon('UTC Timestamp', UTC_TimestampColumn)