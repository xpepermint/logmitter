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

  const result = [];
  logger.on(LogEvent.ERROR, (d) => result.push(d));
  logger.emit(LogEvent.ERROR, 'msg');
  logger.off(LogEvent.ERROR);
  logger.emit(LogEvent.ERROR, 'msg');

  ctx.true(result.length === 1);
  ctx.deepEqual(result[0].message, 'msg');
});

spec.test('handles warning event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.WARN, (d) => result.push(d));
  logger.emit(LogEvent.WARN, 'msg');
  logger.off(LogEvent.WARN);
  logger.emit(LogEvent.WARN, 'msg');

  ctx.true(result.length === 1);
  ctx.deepEqual(result[0].message, 'msg');
});

spec.test('handles info event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.INFO, (d) => result.push(d));
  logger.emit(LogEvent.INFO, 'msg');
  logger.off(LogEvent.INFO);
  logger.emit(LogEvent.INFO, 'msg');

  ctx.true(result.length === 1);
  ctx.deepEqual(result[0].message, 'msg');
});

spec.test('handles debug event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.DEBUG, (d) => result.push(d));
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.off(LogEvent.DEBUG);
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.true(result.length === 1);
  ctx.deepEqual(result[0].message, 'msg');
});

spec.test('supports handling by resolver', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  const resolver0 = () => result.push(0);
  const resolver1 = () => result.push(1);
  logger.on(LogEvent.DEBUG, resolver0);
  logger.on(LogEvent.DEBUG, resolver1);
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.off(LogEvent.DEBUG, resolver0);
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.deepEqual(result, [0, 1, 1]);
});

export default spec;
