/**
 * List of available logging events.
 */
export enum LogEvent {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

/**
 * Log event data interface.
 */
export interface LogData {
  code: number;
  data: any;
  event: LogEvent;
  namespace: string;
}
