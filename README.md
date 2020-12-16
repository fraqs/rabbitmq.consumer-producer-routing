<h1 align="center">RabbitMQ Routing</h1>
<p align="center"><i>Stephan Duelund Djurhuus</i></p>

<p align="center">
    <img src="https://res.cloudinary.com/cuongbangoc/image/upload/v1440913221/rabbit-logo_dfefmx.jpg" alt="Cover Image"/>
</p>

[Reference](https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html)


## Environment
Runs on MacOS and uses [brew]() as package manager for [RabbitMQ].
> The script 'rmq', 'rmq:q' & 'rmq:b' only supports MacOS [see](https://www.rabbitmq.com/cli.html).
## Prerequisite
* [Node](https://nodejs.org/en/)
* [RabbitMQ](https://www.rabbitmq.com/install-homebrew.html)

## Usage

> **sudo** is used on RabbitMQ commands, see [package.json](package.json) to validate scripts.

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
> Remember to close the service after using it.
### 3. Start a Consumer

`<routing key>` defines which route the exchange should direct to. Has a fallback value of `main`.

```bash
# bash
yarn con <routing key>
```

> Multiple consumers can be started with different routing keys.

### 4. Start a Producer

`<routing key>` defines which route the exchange should direct to. Has a fallback value of `main`.
`<payload>` is the content to publish *(can contain spaces)*. Has a fallback value of `Hi RMQ!`.

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

> Use these when minimum one consumer is active.