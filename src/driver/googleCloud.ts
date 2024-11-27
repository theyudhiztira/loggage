import { Logging } from '@google-cloud/logging';
import { Loggage } from '../index';

interface GoogleCloudProperties {
  googleProjectId: string;
  googleLogName: string;
}

/**
 * A logger class for Google Cloud Logging.
 */
class GoogleCloudLogger {
  /**
   * The Logging instance for Google Cloud.
   */
  private static logging: Logging;
  /**
   * The name of the log.
   */
  private static logName: string;
  /**
   * Flag to mute error logging.
   */
  private static isErrorMuted = false;

  /**
   * Ensures that the logger is initialized with the provided Google Cloud properties.
   * Throws an error if the Google Cloud Project ID or Log Name is missing.
   * 
   * @param googleProjectId - The Google Cloud Project ID.
   * @param googleLogName - The Google Cloud Log Name.
   */
  private static ensureInitialized({ googleProjectId, googleLogName }: GoogleCloudProperties): void {
    if (!this.logging || !this.logName) {
      if (!googleProjectId || !googleLogName) {
        throw new Error('Missing Google Cloud Project ID or Log Name (GOOGLE_CLOUD_PROJECT_ID, GOOGLE_CLOUD_LOG_NAME)');
      }

      this.logName = googleLogName;

      try {
        this.logging = new Logging({ projectId: googleProjectId });
      } catch (error: unknown) {
        throw new Error(`Failed to initialize Google Cloud Logging: ${(error as Error).message}`);
      }
    }
  }
  
  /**
   * Maps the log level to the corresponding Google Cloud Logging severity.
   * 
   * @param level - The log level (info, warn, error, debug).
   * @returns The corresponding severity string.
   */
  private static getSeverity(level: string): string {
    const severityMap: { [key: string]: string } = {
      info: 'INFO',
      warn: 'WARNING',
      error: 'ERROR',
      debug: 'DEBUG',
    };
    return severityMap[level] || 'DEFAULT';
  }

  /**
   * Logs a message to Google Cloud Logging.
   * If logging to Google Cloud fails, it falls back to console logging.
   * 
   * @param level - The log level (info, warn, error, debug).
   * @param message - The log message.
   * @param format - The format of the log message ('json' or 'text').
   * @param googleCloudProperties - The properties required for Google Cloud Logging.
   */
  public static async log(
    level: string,
    message: string,
    format: 'json' | 'text',
    googleCloudProperties: GoogleCloudProperties
  ): Promise<void> {
    this.ensureInitialized(googleCloudProperties);

    const timestamp = new Date().toISOString();
    const logData = format === 'json'
      ? JSON.stringify({ timestamp, level, message }) + '\n'
      : `${timestamp} [${level.toUpperCase()}] - ${message}\n`;

    const log = this.logging.log(this.logName);
    const metadata = {
      resource: { type: 'global' },
      severity: this.getSeverity(level),
    };
    const entry = log.entry(metadata, logData);

    try {
      await log.write(entry);
    } catch (error: unknown) {
      if (this.isErrorMuted) {
        Loggage.dynamic(message, level, { driver: 'console' });
      } else {
        this.isErrorMuted = true;
        Loggage.warn(`Failed to write log to Google Cloud: ${(error as Error).message}. Switching to console instead.`);
        Loggage.dynamic(message, level, { driver: 'console' });
      }
    }
  }
}

export default GoogleCloudLogger;
