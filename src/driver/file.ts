import { appendFile } from 'node:fs/promises';

/**
 * A logger class to handle file-based logging.
 */
class FileLogger {
  /**
   * Logs a message to a specified file.
   * @param level - The log level (e.g., 'info', 'error').
   * @param message - The message to log.
   * @param path - The file path where the log should be written.
   * @param format - The format of the log ('json' or 'text'). Defaults to 'text'.
   */
  public static async log(level: string, message: string, path: string, format: 'json' | 'text' = 'text'): Promise<void> {
    const timestamp = new Date().toISOString();
    const logData = format === 'json'
      ? JSON.stringify({ timestamp, level, message }) + '\n'
      : `${timestamp} [${level.toUpperCase()}] - ${message}\n`;

    try {
      await appendFile(path, logData);
    } catch (err) {
      console.error('Failed to write log:', err);
    }
  }
}

export default FileLogger;
