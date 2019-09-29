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

  const messages = [];
  parent.on(LogEvent.DEBUG, (message) => messages.push(message));
  child.error({ code: 100 });
  child.warn({ code: 100 });
  child.info({ code: 100 });
  child.debug({ code: 100 });

  ctx.is(messages.length, 1);
  ctx.deepEqual(messages[0], { code: 100 });
});

export default spec;
