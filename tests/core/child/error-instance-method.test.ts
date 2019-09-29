import { Spec } from '@hayspec/spec';
import { Logger, LogEvent } from '../../../src';

const spec = new Spec<{
  logger: Logger;
}>();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('triggers error event', async (ctx) => {
  const parent = ctx.get('logger');
  const child = parent.child('child');

  const messages = [];
  parent.on(LogEvent.ERROR, (message) => messages.push(message));
  child.error('msg');
  child.error('msg');

  ctx.true(messages.length === 2);
  ctx.deepEqual(messages[0], 'msg');
});

export default spec;
