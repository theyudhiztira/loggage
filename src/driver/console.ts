import { LogLevel } from '../types';

class ConsoleLogger {
  private static getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.INFO:
        return '\x1b[90m';
      case LogLevel.WARN:
        return '\x1b[33m';
      case LogLevel.ERROR:
        return '\x1b[91m';
      default:
        return '\x1b[34m';
    }
  }

  public static log(level: LogLevel, message: string): void {
    const timestamp = `\x1b[34m${new Date().toISOString()}\x1b[0m`;
    const color = this.getColor(level);
    console.log(`${timestamp} ${color}[${level.toUpperCase()}]\x1b[0m - ${message}`);
  }
}

export default ConsoleLogger;
