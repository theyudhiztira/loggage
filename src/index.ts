import ConsoleLogger from './driver/console';
import FileLogger from './driver/file';
import GoogleCloudLogger from './driver/googleCloud';

/**
 * Options for configuring the Loogie logger.
 * 
 * This type is a union of three possible configurations:
 * 
 * 1. Console driver:
 *    - `driver`: Must be `'console'`.
 *    - `format` (optional): Specifies the log format, either `'json'` or `'text'`.
 * 
 * 2. File driver:
 *    - `driver`: Must be `'file'`.
 *    - `path`: Specifies the file path where logs will be written.
 *    - `format` (optional): Specifies the log format, either `'json'` or `'text'`.
 * 
 * 3. Google Cloud Logging driver:
 *    - `driver`: Must be `'google'`.
 *    - `format` (optional): Specifies the log format, either `'json'` or `'text'`.
 *    - `googleProjectId`: The Google Cloud project ID.
 *    - `googleLogName`: The name of the log in Google Cloud Logging.
 */
export type LoogieOptions = {
  driver: 'console';
  format?: 'json' | 'text';
} | {
  driver: 'file';
  path: string;
  format?: 'json' | 'text';
} | {
  driver: 'google';
  format?: 'json' | 'text'; 
  googleProjectId: string;
  googleLogName: string;
};


/**
 * The `Loogie` class provides logging functionality with multiple logging levels and drivers.
 * It supports logging to the console, a file, or Google Cloud Logging.
 *
 * @example
 * ```typescript
 * const logger = new Loogie({ driver: 'console' });
 * logger.log('This is a log message');
 * logger.info('This is an info message');
 * logger.warn('This is a warning message');
 * logger.error('This is an error message');
 * 
 * Loogie.log('Static log message');
 * Loogie.info('Static info message');
 * Loogie.warn('Static warning message');
 * Loogie.error('Static error message');
 * Loogie.dynamic('Dynamic log message', 'debug');
 * ```
 *
 * @remarks
 * The `Loogie` class can be instantiated with different options to specify the logging driver and other configurations.
 * Static methods are also available for logging without creating an instance of the class.
 *
 * @param options - Configuration options for the logger.
 * @param options.driver - The logging driver to use ('console', 'file', 'google').
 * @param options.path - The file path to use when the 'file' driver is selected (default is 'loogie.log').
 * @param options.format - The format of the log message ('text' or 'json').
 * @param options.googleProjectId - The Google Cloud project ID when the 'google' driver is selected.
 * @param options.googleLogName - The Google Cloud log name when the 'google' driver is selected.
 */
export class Loogie {
  private options: LoogieOptions;

  constructor(options: LoogieOptions = { driver: 'console' }) {
    this.options = options;
  }

  /**
   * Generates a log message with the default log level native javascript log.
   * 
   * @param message Your log message
   */
  public log(message: string): void {
    this.executeLog('log', message);
  }

  /**
   * Generates a log message with the default info level native javascript log.
   * 
   * @param message Your log message
   */
  public info(message: string): void {
    this.executeLog('info', message);
  }

  /**
   * Generates a log message with the default warn level native javascript log.
   * 
   * @param message Your log message
   */
  public warn(message: string): void {
    this.executeLog('warn', message);
  }

  /**
   * Generates a log message with the default error native javascript log.
   * 
   * @param message Your log message
   */
  public error(message: string): void {
    this.executeLog('error', message);
  }

  /**
   * Generates a log message with the default log native javascript log.
   * 
   * @param message Your log message
   * @param options - Configuration options for the logger.
   * @param options.driver - The logging driver to use ('console', 'file', 'google').
   * @param options.path - The file path to use when the 'file' driver is selected (default is 'loogie.log').
   * @param options.format - The format of the log message ('text' or 'json').
   * @param options.googleProjectId - The Google Cloud project ID when the 'google' driver is selected.
   * @param options.googleLogName - The Google Cloud log name when the 'google' driver is selected.
   */
  public static log(message: string, options: LoogieOptions = { driver: 'console' }): void {
    this.executeLog('log', message, options);
  }

  /**
   * Generates a log message with the default info level native javascript log.
   * 
   * @param message Your log message
   * @param options - Configuration options for the logger.
   * @param options.driver - The logging driver to use ('console', 'file', 'google').
   * @param options.path - The file path to use when the 'file' driver is selected (default is 'loogie.log').
   * @param options.format - The format of the log message ('text' or 'json').
   * @param options.googleProjectId - The Google Cloud project ID when the 'google' driver is selected.
   * @param options.googleLogName - The Google Cloud log name when the 'google' driver is selected.
   */
  public static info(message: string, options: LoogieOptions = { driver: 'console' }): void {
    this.executeLog('info', message, options);
  }

  /**
   * Generates a log message with the default warn level native javascript log.
   * 
   * @param message Your log message
   * @param options - Configuration options for the logger.
   * @param options.driver - The logging driver to use ('console', 'file', 'google').
   * @param options.path - The file path to use when the 'file' driver is selected (default is 'loogie.log').
   * @param options.format - The format of the log message ('text' or 'json').
   * @param options.googleProjectId - The Google Cloud project ID when the 'google' driver is selected.
   * @param options.googleLogName - The Google Cloud log name when the 'google' driver is selected.
   */
  public static warn(message: string, options: LoogieOptions = { driver: 'console' }): void {
    this.executeLog('warn', message, options);
  }

  /**
   * Generates a log message with the default error level native javascript log.
   * 
   * @param message Your log message
   * @param options - Configuration options for the logger.
   * @param options.driver - The logging driver to use ('console', 'file', 'google').
   * @param options.path - The file path to use when the 'file' driver is selected (default is 'loogie.log').
   * @param options.format - The format of the log message ('text' or 'json').
   * @param options.googleProjectId - The Google Cloud project ID when the 'google' driver is selected.
   * @param options.googleLogName - The Google Cloud log name when the 'google' driver is selected.
   */
  public static error(message: string, options: LoogieOptions = { driver: 'console' }): void {
    this.executeLog('error', message, options);
  }

  /**
   * Generates a log with dynamic log level using : log, info, warn, error.
   * 
   * @param message Your log message
   * @param level Your log level ( log, info, warn, error )
   * @param options - Configuration options for the logger.
   * @param options.driver - The logging driver to use ('console', 'file', 'google').
   * @param options.path - The file path to use when the 'file' driver is selected (default is 'loogie.log').
   * @param options.format - The format of the log message ('text' or 'json').
   * @param options.googleProjectId - The Google Cloud project ID when the 'google' driver is selected.
   * @param options.googleLogName - The Google Cloud log name when the 'google' driver is selected.
   */
  public static dynamic(message: string, level: string, options: LoogieOptions = { driver: 'console' }): void {
    this.executeLog(level, message, options);
  }

  /**
   * Generates a log message with the default info level native javascript log.
   * 
   * @param message Your log message
   * @param options - Configuration options for the logger.
   * @param options.driver - The logging driver to use ('console', 'file', 'google').
   * @param options.path - The file path to use when the 'file' driver is selected (default is 'loogie.log').
   * @param options.format - The format of the log message ('text' or 'json').
   * @param options.googleProjectId - The Google Cloud project ID when the 'google' driver is selected.
   * @param options.googleLogName - The Google Cloud log name when the 'google' driver is selected.
   */
  private static executeLog(logLevel: string, message: string, options: LoogieOptions): void {
    switch (options.driver) {
      case 'console':
        ConsoleLogger.log(logLevel, message, options);
        break;
      case 'file':
        FileLogger.log(logLevel, message, options.path ?? 'loogie.log', options.format ?? 'text');
        break;
      case 'google':
        GoogleCloudLogger.log(logLevel, message, options.format ?? 'text', {
          googleProjectId: options.googleProjectId,
          googleLogName: options.googleLogName,
        });
        break;
    }
  }

  private executeLog(logLevel: string, message: string): void {
    Loogie.executeLog(logLevel, message, this.options);
  }
}
