import ConsoleLogger from './driver/console';
import FileLogger from './driver/file';
import GoogleCloudLogger from './driver/googleCloud';
import { LogFormat, LogLevel, LoogieDriver, type LoogieOptions } from './types';

class loogie {
  private options: LoogieOptions | undefined = {
    driver: LoogieDriver.CONSOLE,
  };

  constructor(options?: LoogieOptions) {
    this.options = options;
  }

  public log(message: string): void {
    this.executeLog(LogLevel.LOG, message);
  }

  public info(message: string): void {
    this.executeLog(LogLevel.INFO, message);
  }

  public warn(message: string): void {
    this.executeLog(LogLevel.WARN, message);
  }

  public error(message: string): void {
    this.executeLog(LogLevel.ERROR, message);
  }

  public static log(message: string, options: LoogieOptions = { driver: LoogieDriver.CONSOLE }): void {
    this.executeLog(LogLevel.LOG, message, options);
  }

  public static info(message: string, options: LoogieOptions = { driver: LoogieDriver.CONSOLE }): void {
    this.executeLog(LogLevel.INFO, message, options);
  }

  public static warn(message: string, options: LoogieOptions = { driver: LoogieDriver.CONSOLE }): void {
    this.executeLog(LogLevel.WARN, message, options);
  }

  public static error(message: string, options: LoogieOptions = { driver: LoogieDriver.CONSOLE }): void {
    this.executeLog(LogLevel.ERROR, message, options);
  }

  private static executeLog(logLevel: LogLevel, message: string, options: LoogieOptions): void {
    if (options.driver === LoogieDriver.CONSOLE) {
      ConsoleLogger.log(logLevel, message);
    } else if (options.driver === 'file') {
      FileLogger.log(logLevel, message, options.path ?? 'loogie.log', options.format ?? 'text');
    } else if (options.driver === 'google') {
      GoogleCloudLogger.log(logLevel, message, options.format ?? 'text');
    }
  }

  private executeLog(logLevel: LogLevel, message: string): void {
    if (this.options?.driver === LoogieDriver.CONSOLE) {
      ConsoleLogger.log(logLevel, message);
    } else if (this.options?.driver === 'file') {
      FileLogger.log(logLevel, message, this.options.path ?? 'loogie.log', this.options.format ?? 'text');
    } else if (this.options?.driver === 'google') {
      GoogleCloudLogger.log(logLevel, message, this.options.format ?? 'text');
    }
  }
}

const logUsingOptions = new loogie({
  driver: LoogieDriver.GOOGLE,
  format: LogFormat.TEXT,
});

const now = new Date().toISOString();

setTimeout(() => {
  logUsingOptions.info('Info message - instance');
  logUsingOptions.warn('Warn message - instance');
  logUsingOptions.error('Error message - instance');
  logUsingOptions.log('Log message - instance');

  loogie.info(`Info message - static - ${now}`);
  loogie.warn(`Warn message - static - ${now}`);
  loogie.error(`Error message - static - ${now}`);
  loogie.log(`Log message - static - ${now}`);
}, 3000);

export default loogie;