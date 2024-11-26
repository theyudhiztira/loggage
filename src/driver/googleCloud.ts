import { Logging } from '@google-cloud/logging';
import type { LogLevel } from '../types';
import { LogLevel as Level } from '../types';

class GoogleCloudLogger {
  private static logging: Logging;
  private static logName: string | undefined;

  private static ensureInitialized() {
    if (!this.logging || !this.logName) {
      const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID || Bun.env.GOOGLE_CLOUD_PROJECT_ID;
      this.logName = process.env.GOOGLE_CLOUD_LOG_NAME || Bun.env.GOOGLE_CLOUD_PROJECT_ID;

      if (!projectId || !this.logName) {
        throw new Error('Missing Google Cloud Project ID or Log Name (GOOGLE_CLOUD_PROJECT_ID, GOOGLE_CLOUD_LOG_NAME)');
      }

      this.logging = new Logging({ projectId });
    }
  }

  private static getSeverity(level: LogLevel): string {
    switch (level) {
      case Level.INFO:
        return 'INFO';
      case Level.WARN:
        return 'WARNING';
      case Level.ERROR:
        return 'ERROR';
      case Level.LOG:
        return 'DEBUG';
      default:
        return 'DEFAULT';
    }
  }

  public static async log(level: LogLevel, message: string, format: 'json' | 'text'): Promise<void> {
    this.ensureInitialized();

    const timestamp = new Date().toISOString();
    const logData = format === 'json'
      ? JSON.stringify({ timestamp, level, message }) + '\n'
      : `${timestamp} [${level.toUpperCase()}] - ${message}\n`;

    const log = this.logging.log(this.logName as string);
    const metadata = {
      resource: { type: 'global' },
      severity: this.getSeverity(level),
    };
    const entry = log.entry(metadata, logData);
    await log.write(entry);
  }
}

export default GoogleCloudLogger;
