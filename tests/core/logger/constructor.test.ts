import { Spec } from '@hayspec/spec';
import { Logger } from '../../../src';
import { LogEvent } from '../../../src/core/types';

const spec = new Spec();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('supports namespace', async (ctx) => {
  const logger = new Logger('default');

  ctx.deepEqual(logger.namespace, 'default');
});

spec.test('supports custom message interface', async (ctx) => {
  const logger = new Logger<{ code: number }>();

  const result = [];
  logger.on(LogEvent.DEBUG, (d) => result.push(d));
  logger.error({ code: 100 });
  logger.warn({ code: 100 });
  logger.info({ code: 100 });
  logger.debug({ code: 100 });
  logger.emit(LogEvent.DEBUG, { code: 100 });

  ctx.is(result.length, 2);
  ctx.deepEqual(result[0].message, { code: 100 });
});

export default spec;
