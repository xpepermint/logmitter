[![Build Status](https://travis-ci.org/xpepermint/logmitter.svg?branch=master)](https://travis-ci.org/xpepermint/logmitter)&nbsp;[![codecov](https://codecov.io/gh/xpepermint/logmitter/branch/master/graph/badge.svg)](https://codecov.io/gh/xpepermint/logmitter)&nbsp;[![NPM Version](https://badge.fury.io/js/logmitter.svg)](https://badge.fury.io/js/logmitter)

Logmitter is a universal logging utility which acts as event emitter. It's a lightweight open-source package for the **server** and **browser** (using module bundler), written with [TypeScript](https://www.typescriptlang.org). It's actively maintained, well tested and already used in production environments. The source code is available on [GitHub](https://github.com/xpepermint/logmitter) where you can also find our [issue tracker](https://github.com/xpepermint/logmitter/issues).

## Installation

Run the command below to install the package.

```
$ npm install --save logmitter
```

## Usage

`Logger` class is an event emitter which provides standard methods for triggering and listening to different logging events. This class should be used as a central logger instance of your application.

### Listening and triggering events

We create a simple logger by creating a new instance of a `Logger` class. We can then emit and listen to different logging events. 

```ts
import { Logger, LogEvent } from 'logmitter';

const logger = new Logger(namespace);

logger.on(LogEvent.INFO, function(message, namespace) {
  console.info(namespace, message);
});

logger.info('Hello world!');
```

### Custom message format

We can easily change the message format by setting a custom message interface.

```ts
interface Message {
  code: number;
  message: any;
};

const logger = new Logger<Message>(namespace);

logger.warn({ code: 200, message: 'Hello world!' });
```

### Namespaced logger

To distinguish between application parts, you can namespace the logger instance by creating a child instance which passes all events to the master instance.

```ts
const userLogger = logger.child('user');
```

## API

**Logger<Message>(namespace)**

> Main logger class.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| namespace | String | No | - | Logger namespace.

**Logger.prototype.child(namespace)**: LoggerChild

> Returns logger child instance.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| namespace | String | No | - | Logger namespace.

**Logger.prototype.debug(message)**: Boolean

> Triggers `debug` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

**Logger.prototype.emit(event, message, namespace)**: Boolean

> Triggers log event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| event | String | Yes | - | Event name.
| message | Message | Yes | - | Event message.
| event | String | Yes | - | Logger namespace.

**Logger.prototype.error(message)**: Boolean

> Triggers `error` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

**Logger.prototype.info(message)**: Boolean

> Triggers `info` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

**Logger.prototype.namespace**: string

> Returns logger namespace.

**Logger.prototype.off(event, resolver)**: Logger

> Removes attached event listener.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| event | String | Yes | - | Event name.
| resolver | Function, Promise | No | - | Event resolver function. All event with the provided name are removed when the resolver is not provided.

**Logger.prototype.on(event, resolver)**: Logger

> Attaches a listener function to log event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| event | String | Yes | - | Event name.
| resolver | Function, Promise | Yes | - | Event resolver function.

**Logger.prototype.once(event, resolver)**: Logger

> Attaches a listener function to log the event and automatically removes it after the event is triggered.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| event | String | Yes | - | Event name.
| resolver | Function, Promise | Yes | - | Event resolver function.

**Logger.prototype.warn(message)**: Boolean

> Triggers `warn` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

**LoggerChild<Message>(parent, namespace)**

> Logger child class.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| parent | Logger | Yes | - | Parent logger class instance.
| namespace | String | Yes | - | Logger namespace.

**LoggerChild.prototype.child(namespace)**: LoggerChild

> Returns logger child instance.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| namespace | String | No | - | Logger namespace.

**LoggerChild.prototype.debug(message)**: Boolean

> Triggers `debug` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

**LoggerChild.prototype.error(message)**: Boolean

> Triggers `error` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

**LoggerChild.prototype.info(message)**: Boolean

> Triggers `info` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

**LoggerChild.prototype.namespace**: string

> Returns logger namespace.

**LoggerChild.prototype.warn(message)**: Boolean

> Triggers `warn` event.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| message | Message | Yes | - | Event message.

### Available events

| Event | Value | Description
|--------|------|----------
| LogEvent.ERROR | error | Error event.
| LogEvent.WARN | warn | Warning event.
| LogEvent.INFO | info | Info event.
| LogEvent.DEBUG | debug | Debug event.

## Contributing

See [CONTRIBUTING.md](https://github.com/rawmodel/framework/blob/master/CONTRIBUTING.md) for how to help out.

## Licence

See [LICENSE](https://github.com/rawmodel/framework/blob/master/LICENCE) for details.
