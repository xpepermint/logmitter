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
});

spec.test('handles warning event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.WARN, (d) => result.push(d));
  logger.emit(LogEvent.WARN, 'msg');
  logger.emit(LogEvent.WARN, 'msg');

  ctx.true(result.length === 2);
});

spec.test('handles info event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.INFO, (d) => result.push(d));
  logger.emit(LogEvent.INFO, 'msg');
  logger.emit(LogEvent.INFO, 'msg');

  ctx.true(result.length === 2);
});

spec.test('handles debug event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.DEBUG, (d) => result.push(d));
  logger.emit(LogEvent.DEBUG, 'msg');
  logger.emit(LogEvent.DEBUG, 'msg');

  ctx.true(result.length === 2);
});

export default spec;
