import { Spec } from '@hayspec/spec';
import { Logger } from '../../../src';
import { LogEvent } from '../../../src/core/types';

const spec = new Spec<{
  logger: Logger;
}>();

spec.test('provides namespace', async (ctx) => {
  const logger = new Logger().child('foo');

  ctx.deepEqual(logger.namespace, 'foo');
});

spec.test('supports custom message interface', async (ctx) => {
  const parent = new Logger<{ code: number }>();
  const child = parent.child('foo');

  const result = [];
  parent.on(LogEvent.DEBUG, (d) => result.push(d));
  child.error({ code: 100 });
  child.warn({ code: 100 });
  child.info({ code: 100 });
  child.debug({ code: 100 });

  ctx.is(result.length, 1);
  ctx.deepEqual(result[0].message, { code: 100 });
});

export default spec;
