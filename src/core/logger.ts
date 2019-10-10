import { EventEmitter } from 'events';
import { LogEvent, LogResolver } from './types';
import { LoggerChild } from './child';

/**
 * Logger class.
 */
export class Logger<Message = string> {

  /**
   * Event emitter class instance.
   */
  protected _emitter: EventEmitter = new EventEmitter();

  /**
   * Logger namespace.
   */
  public readonly namespace: string;

  /**
   * Class constructor.
   * @param namespace Logger namespace.
   */
  public constructor(namespace?: string) {
    this.namespace = namespace || null;
  }

  /**
   * Triggers log event.
   * @param event Event name.
   * @param message Event message.
   * @param namespace Logger namespace.
   */
  public emit(event: LogEvent, message: Message, namespace?: string): boolean {
    try {
      return this._emitter.emit(event, {
        date: new Date(),
        event,
        message,
        namespace: namespace || this.namespace,
      });
    } catch (e) {
      return false;
    }
  }

  /**
   * Attaches a listener function to log event.
   * @param event Event name.
   * @param resolver Event resolver function.
   */
  public on(event: LogEvent, resolver: LogResolver<Message>): this {
    this._emitter.on(event, resolver);
    return this;
  }

  /**
   * Attaches a listener function to log event and automatically removes it
   * after the event is triggerend.
   * @param event Event name.
   * @param resolver Event resolver function.
   */
  public once(event: LogEvent, resolver: LogResolver<Message>): this {
    this._emitter.once(event, resolver);
    return this;
  }

  /**
   * Removes attached event listener.
   * @param event Event name.
   * @param resolver Event resolver function.
   */
  public off(event: LogEvent, resolver?: LogResolver<Message>): this {
    if (resolver) {
      this._emitter.off(event, resolver);
    } else {
      this._emitter.removeAllListeners(event);
    }
    return this;
  }

  /**
   * Triggers `error` event.
   * @param message Event message.
   */
  public error(message: Message): boolean {
    return this.emit(LogEvent.ERROR, message);
  }

  /**
   * Triggers 'warn' event.
   * @param message Event message.
   */
  public warn(message: Message): boolean {
    return this.emit(LogEvent.WARN, message);
  }

  /**
   * Triggers `info` event.
   * @param message Event message.
   */
  public info(message: Message): boolean {
    return this.emit(LogEvent.INFO, message);
  }

  /**
   * Triggers `debug` event.
   * @param message Event message.
   */
  public debug(message: Message): boolean {
    return this.emit(LogEvent.DEBUG, message);
  }

  /**
   * Returns logger child instance.
   * @param namespace Logger namespace.
   */
  public child(namespace: string): LoggerChild<Message> {
    return new LoggerChild<Message>(this, namespace);
  }

}
