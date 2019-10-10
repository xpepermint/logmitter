import { Spec } from '@hayspec/spec';
import { Logger, LogEvent } from '../../../src';

const spec = new Spec<{
  logger: Logger;
}>();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('triggers error event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.ERROR, (d) => result.push(d));
  logger.error('msg');
  logger.error('msg');

  ctx.true(result.length === 2);
});

export default spec;
