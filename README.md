# RabbitMQ | Consumer/ Producer Routing

## Environment
Runs on MacOS and uses [brew]() as package manager for [RabbitMQ].
> the script 'rmq', 'rmq:q' & 'rmq:b' only supports MacOS [see](https://www.rabbitmq.com/cli.html).
## Prerequisite
* [Node](https://nodejs.org/en/)
* [RabbitMQ](https://www.rabbitmq.com/install-homebrew.html)

## Usage

> **sudo** is used on RabbitMQ commands, see [package.json](package.json) to evaluate scripts.

### 1. Install Packages

```bash
# bash
yarn
```

### 2. Start RabbitMQ

```bash
# bash
yarn rmq
```
> remember to close the service after using it.
### 3. Start a Consumer

`<routing key>` defines which route the exchange should direct to.

```bash
# bash
yarn con <routing key>
```

> multiple consumers can be started with different routing keys.

### 4. Start a Producer

`<routing key>` defines which route the exchange should direct to.
`<payload>` is the content to publish *(can contain spaces)*.

```bash
# bash
yarn con <routing key> <payload>
```

### Analyse Queues and Bindings

**Logs the active queues.**
```bash
# bash
yarn rmq:q
```

**Logs the active bindings.**
```bash
# bash
yarn rmq:b
```

> use these when minimum one consumer is active.