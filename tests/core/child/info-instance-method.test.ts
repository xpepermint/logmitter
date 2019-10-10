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

  const result = [];
  parent.on(LogEvent.INFO, (d) => result.push(d));
  child.info('msg');
  child.info('msg');

  ctx.true(result.length === 2);
  ctx.deepEqual(result[0].message, 'msg');
});

export default spec;
