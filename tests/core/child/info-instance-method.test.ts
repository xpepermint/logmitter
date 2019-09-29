import { Spec } from '@hayspec/spec';
import { Logger, LogEvent } from '../../../src';

const spec = new Spec<{
  logger: Logger;
}>();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('triggers info event', async (ctx) => {
  const parent = ctx.get('logger');
  const child = parent.child('child');

  const messages = [];
  parent.on(LogEvent.INFO, (message) => messages.push(message));
  child.info('msg');
  child.info('msg');

  ctx.true(messages.length === 2);
  ctx.deepEqual(messages[0], 'msg');
});

export default spec;
