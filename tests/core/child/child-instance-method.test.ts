import { Spec } from '@hayspec/spec';
import { Logger, LoggerChild } from '../../../src';

const spec = new Spec<{
  logger: Logger;
}>();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('triggers debug event', async (ctx) => {
  const parent = ctx.get('logger');
  const child = parent.child('child0').child('child1');

  ctx.true(child instanceof LoggerChild);
  ctx.is(child.parent, parent);
  ctx.is(child.namespace, 'child1');
});

export default spec;
