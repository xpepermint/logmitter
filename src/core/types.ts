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
 * Emitted event data interface.
 */
export interface LogData<Message> {
  date: Date;
  event: LogEvent;
  message: Message;
  namespace: string;
}

/**
 * Event handler type.
 */
export type LogResolver<Message> = (data: LogData<Message>) => any;
