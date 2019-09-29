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
  logger.on(LogEvent.ERROR, (data) => messages.push(data));
  logger.emit(LogEvent.ERROR, 'msg');
  logger.off(LogEvent.ERROR);
  logger.emit(LogEvent.ERROR, 'msg');

  ctx.true(messages.length === 1);
  ctx.deepEqual(messages[0], 'msg');
});

spec.test('handles warning event', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  logger.on(LogEvent.WARN, (data) => messages.push(data));
  logger.emit(LogEvent.WARN, 'msg');
  logger.off(LogEvent.WARN);
  logger.emit(LogEvent.WARN, 'msg');

  ctx.true(messages.length === 1);
  ctx.deepEqual(messages[0], 'msg');
});

spec.test('handles info event', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  logger.on(LogEvent.INFO, (data) => messages.push(data));
  logger.emit(LogEvent.INFO, 'msg');
  logger.off(LogEvent.INFO);
  logger.emit(LogEvent.INFO, 'msg');

  ctx.true(messages.length === 1);
  ctx.deepEqual(messages[0], 'msg');
});

spec.test('handles debug event', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  logger.on(LogEvent.DEBUG, (message) => messages.push(message));
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.off(LogEvent.DEBUG);
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.true(messages.length === 1);
  ctx.deepEqual(messages[0], 'msg');
});

spec.test('supports handling by resolver', async (ctx) => {
  const logger = ctx.get('logger');

  const messages = [];
  const resolver0 = () => messages.push(0);
  const resolver1 = () => messages.push(1);
  logger.on(LogEvent.DEBUG, resolver0);
  logger.on(LogEvent.DEBUG, resolver1);
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.off(LogEvent.DEBUG, resolver0);
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.deepEqual(messages, [0, 1, 1]);
});

export default spec;
