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
  logger.emit(LogEvent.ERROR, 'msg');

  ctx.true(result.length === 2);
  ctx.deepEqual(result[0].event, LogEvent.ERROR);
  ctx.deepEqual(result[0].message, 'msg');
  ctx.deepEqual(result[0].namespace, 'default');
});

spec.test('handles warning event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.WARN, (d) => result.push(d));
  logger.emit(LogEvent.WARN, 'msg');
  logger.emit(LogEvent.WARN, 'msg');

  ctx.true(result.length === 2);
  ctx.deepEqual(result[0].event, LogEvent.WARN);
  ctx.deepEqual(result[0].message, 'msg');
  ctx.deepEqual(result[0].namespace, 'default');
});

spec.test('handles info event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.INFO, (d) => result.push(d));
  logger.emit(LogEvent.INFO, 'msg');
  logger.emit(LogEvent.INFO, 'msg');

  ctx.true(result.length === 2);
  ctx.deepEqual(result[0].event, LogEvent.INFO);
  ctx.deepEqual(result[0].message, 'msg');
  ctx.deepEqual(result[0].namespace, 'default');
});

spec.test('handles debug event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.DEBUG, (d) => result.push(d));
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.true(result.length === 2);
  ctx.deepEqual(result[0].event, LogEvent.DEBUG);
  ctx.deepEqual(result[0].message, 'msg');
  ctx.deepEqual(result[0].namespace, 'default');
});

export default spec;
