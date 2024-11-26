export type LoogieOptions = {
  driver: LoogieDriver;
  format?: LogFormat;
  path?: string;
};

export enum LoogieDriver {
  CONSOLE = 'console',
  FILE = 'file',
  GOOGLE = 'google',
}

export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  LOG = 'log',
}

export enum LogFormat {
  JSON = 'json',
  TEXT = 'text',
}