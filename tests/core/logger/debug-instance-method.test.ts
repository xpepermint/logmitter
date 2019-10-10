import { Spec } from '@hayspec/spec';
import { Logger, LogEvent } from '../../../src';

const spec = new Spec<{
  logger: Logger;
}>();

spec.beforeEach((ctx) => {
  ctx.set('logger', new Logger('default'));
});

spec.test('triggers debug event', async (ctx) => {
  const logger = ctx.get('logger');

  const result = [];
  logger.on(LogEvent.DEBUG, (d) => result.push(d));
  logger.debug('msg');
  logger.debug('msg');

  ctx.true(result.length === 2);
});

export default spec;
