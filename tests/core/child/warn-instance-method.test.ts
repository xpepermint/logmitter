import { Spec } from '@hayspec/spec';
import { Logger, LogEvent } from '../../../src';

const spec = new Spec<{
  logger: Logger;
}>();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('triggers warning event', async (ctx) => {
  const parent = ctx.get('logger');
  const child = parent.child('child');

  const messages = [];
  parent.on(LogEvent.WARN, (message) => messages.push(message));
  child.warn('msg');
  child.warn('msg');

  ctx.true(messages.length === 2);
  ctx.deepEqual(messages[0], 'msg');
});

export default spec;
