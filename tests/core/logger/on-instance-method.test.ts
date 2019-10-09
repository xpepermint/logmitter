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

  const data = [];
  logger.on(LogEvent.ERROR, (message, namespace) => data.push({ message, namespace }));
  logger.emit(LogEvent.ERROR, 'msg');
  logger.emit(LogEvent.ERROR, 'msg');

  ctx.true(data.length === 2);
  ctx.deepEqual(data[0].message, 'msg');
  ctx.deepEqual(data[0].namespace, 'default');
});

spec.test('handles warning event', async (ctx) => {
  const logger = ctx.get('logger');

  const data = [];
  logger.on(LogEvent.WARN, (message, namespace) => data.push({ message, namespace }));
  logger.emit(LogEvent.WARN, 'msg');
  logger.emit(LogEvent.WARN, 'msg');

  ctx.true(data.length === 2);
  ctx.deepEqual(data[0].message, 'msg');
  ctx.deepEqual(data[0].namespace, 'default');
});

spec.test('handles info event', async (ctx) => {
  const logger = ctx.get('logger');

  const data = [];
  logger.on(LogEvent.INFO, (message, namespace) => data.push({ message, namespace }));
  logger.emit(LogEvent.INFO, 'msg');
  logger.emit(LogEvent.INFO, 'msg');

  ctx.true(data.length === 2);
  ctx.deepEqual(data[0].message, 'msg');
  ctx.deepEqual(data[0].namespace, 'default');
});

spec.test('handles debug event', async (ctx) => {
  const logger = ctx.get('logger');

  const data = [];
  logger.on(LogEvent.DEBUG, (message, namespace) => data.push({ message, namespace }));
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.true(data.length === 2);
  ctx.deepEqual(data[0].message, 'msg');
  ctx.deepEqual(data[0].namespace, 'default');
});

export default spec;
