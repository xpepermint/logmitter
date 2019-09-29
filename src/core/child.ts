import { LogEvent } from './types';
import { Logger } from './logger';

/**
 * Logger child class which passes all events to parent.
 */
export class LoggerChild<Message = string> {

  /**
   * Logger namespace.
   */
  public readonly namespace: string;

  /**
   * Reference to the main logger.
   */
  public readonly parent: Logger<Message>;

  /**
   * Class constructor.
   * @param parent Reference to the main logger.
   * @param namespace Logger namespace.
   */
  public constructor(parent: Logger<Message>, namespace: string) {
    this.parent = parent;
    this.namespace = namespace || null;
  }

  /**
   * Triggers `error` event.
   * @param message Event message.
   */
  public error(message: Message): boolean {
    return this.parent.emit(LogEvent.ERROR, message, this.namespace);
  }

  /**
   * Triggers `warn` event.
   * @param message Event message.
   */
  public warn(message: Message): boolean {
    return this.parent.emit(LogEvent.WARN, message, this.namespace);
  }

  /**
   * Triggers `info` event.
   * @param message Event message.
   */
  public info(message: Message): boolean {
    return this.parent.emit(LogEvent.INFO, message, this.namespace);
  }

  /**
   * Triggers `debug` event.
   * @param message Event message.
   */
  public debug(message: Message): boolean {
    return this.parent.emit(LogEvent.DEBUG, message, this.namespace);
  }

  /**
   * Returns logger child instance.
   * @param namespace Logger namespace.
   */
  public child(namespace: string): LoggerChild<Message> {
    return new LoggerChild<Message>(this.parent, namespace);
  }

}
