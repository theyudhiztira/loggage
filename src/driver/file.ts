import { LogLevel } from '../types';
import { appendFile } from 'node:fs/promises';

class FileLogger {
  public static async log(level: LogLevel, message: string, path: string, format: 'json' | 'text' = 'text'): Promise<void> {
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
