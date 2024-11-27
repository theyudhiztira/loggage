import type { LoogieOptions } from '..';

class ConsoleLogger {
  private static getColor(level: string): string {
    switch (level) {
      case 'info':
        return '\x1b[90m';
      case 'warn':
        return '\x1b[33m';
      case 'error':
        return '\x1b[91m';
      default:
        return '\x1b[34m';
    }
  }

  public static log(level: string, message: string, options?: LoogieOptions): void {
    const timestamp = options?.format === 'json' ? new Date().toISOString() : `\x1b[34m${new Date().toISOString()}\x1b[0m`;
    const color = options?.format === 'json' ? level : this.getColor(level);
    let logData: string;

    if (options?.format === 'json') {
      logData = JSON.stringify({ timestamp, level, message });
    } else {
      logData = `${timestamp} ${color}[${level.toUpperCase()}]\x1b[0m - ${message}`;
    }

    switch (level) {
      case 'log':
        console.log(logData);
        break;

      case 'info':
        console.info(logData);
        break;

      case 'warn':
        console.warn(logData);
        break;
      
      case 'error':
        console.error(logData);
        break;

      default:
        console.log(logData);
        break;
    }
  }
}

export default ConsoleLogger;
