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

  const result = [];
  parent.on(LogEvent.ERROR, (d) => result.push(d));
  child.error('msg');
  child.error('msg');

  ctx.true(result.length === 2);
  ctx.deepEqual(result[0].message, 'msg');
});

export default spec;
