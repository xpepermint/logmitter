import { Spec } from '@hayspec/spec';
import { Logger, LogEvent } from '../../../src';

const spec = new Spec<{
  logger: Logger;
}>();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('handles error event', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  logger.on(LogEvent.ERROR, (message) => messages.push(message));
  logger.emit(LogEvent.ERROR, 'msg');
  logger.emit(LogEvent.ERROR, 'msg');

  ctx.true(messages.length === 2);
});

spec.test('handles warning event', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  logger.on(LogEvent.WARN, (message) => messages.push(message));
  logger.emit(LogEvent.WARN, 'msg');
  logger.emit(LogEvent.WARN, 'msg');

  ctx.true(messages.length === 2);
});

spec.test('handles info event', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  logger.on(LogEvent.INFO, (message) => messages.push(message));
  logger.emit(LogEvent.INFO, 'msg');
  logger.emit(LogEvent.INFO, 'msg');

  ctx.true(messages.length === 2);
});

spec.test('handles debug event', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  logger.on(LogEvent.DEBUG, (message) => messages.push(message));
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.true(messages.length === 2);
});

export default spec;
