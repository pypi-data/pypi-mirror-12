import json
import gzip
import time
from logging import StreamHandler
from logging.handlers import RotatingFileHandler
from .log_object import LogObject, ErrorLogObject


class AppFileHandler(RotatingFileHandler):
    def emit(self, record):
        if not isinstance(record.msg, LogObject) and not isinstance(record.msg, ErrorLogObject):
            return
        return super().emit(record)

    def format(self, record):
        created = int(record.created)
        message = {record.levelname: {created: record.msg.to_dict}}

        return json.dumps(message)

    def rotation_filename(self, default_name):
        return '{}-{}.gz'.format(default_name, time.strftime('%Y%m%d'))

    def rotate(self, source, dest):
        with open(source, 'rb+') as fh_in:
            with gzip.open(dest, 'wb') as fh_out:
                fh_out.writelines(fh_in)
            fh_in.seek(0)
            fh_in.truncate()


class DebugFileHandler(RotatingFileHandler):
    def emit(self, record):
        if not isinstance(record.msg, LogObject) and not isinstance(record.msg, ErrorLogObject):
            return super().emit(record)

    def rotation_filename(self, default_name):
        return '{}-{}.gz'.format(default_name, time.strftime('%Y%m%d'))

    def rotate(self, source, dest):
        with open(source, 'rb+') as fh_in:
            with gzip.open(dest, 'wb') as fh_out:
                fh_out.writelines(fh_in)
            fh_in.seek(0)
            fh_in.truncate()


class ConsoleHandler(StreamHandler):
    def emit(self, record):
        return super().emit(record)

    def format(self, record):
        if isinstance(record.msg, LogObject):
            created = int(record.created)
            message = {record.levelname: {created: record.msg.to_dict}}

            return json.dumps(message)
        elif isinstance(record.msg, ErrorLogObject):
            return str(record.msg)
        else:
            return super().format(record)

