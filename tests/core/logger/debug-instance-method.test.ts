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

  const messages = [];
  logger.on(LogEvent.DEBUG, (message) => messages.push(message));
  logger.debug('msg');
  logger.debug('msg');

  ctx.true(messages.length === 2);
});

export default spec;
