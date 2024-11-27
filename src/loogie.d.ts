// loogie.d.ts
declare module 'loogie' {
  export type LoogieOptions ={
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
    constructor(options?: LoogieOptions);

    /**
     * Generates a log message with the default log level native javascript log.
     * 
     * @param message Your log message
     */
    log(message: string): void;
    /**
     * Generates a log message with the default info level native javascript log.
     * 
     * @param message Your log message
     */
    info(message: string): void;
    /**
     * Generates a log message with the default warn level native javascript log.
     * 
     * @param message Your log message
     */
    warn(message: string): void;
    /**
     * Generates a log message with the default error native javascript log.
     * 
     * @param message Your log message
     */
    error(message: string): void;

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
    static log(message: string, options?: LoogieOptions): void;
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
    static info(message: string, options?: LoogieOptions): void;
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
    static warn(message: string, options?: LoogieOptions): void;
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
    static error(message: string, options?: LoogieOptions): void;
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
    static dynamic(message: string, level: string, options?: LoogieOptions): void;
  }
}