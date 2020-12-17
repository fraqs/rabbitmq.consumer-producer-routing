import * as amqp from 'amqplib/channel_api';
import dotenv from 'dotenv';
dotenv.config();
const RMQ_HOST: string | undefined = process.env.RMQ_HOST;
const RMQ_EXCHANGE: string | undefined = process.env.RMQ_EXCHANGE;
const RMQ_EXCHANGE_TYPE: string | undefined = process.env.RMQ_EXCHANGE_TYPE;
// https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchanges

if (!RMQ_HOST || !RMQ_EXCHANGE || !RMQ_EXCHANGE_TYPE) {
	throw Error('Missing values <RMQ_HOST>, <RMQ_EXCHANGE> and/or <RMQ_EXCHANGE_TYPE> in .env');
}

// Routing key to route for a specific user (mail)
const routingKey: string = process.argv[2] || 'main';
const msg: string = process.argv.slice(3).join(' ') || 'Hi RMQ!';

console.log(`Starting <PRODUCER> with routing key: <${routingKey}>...`);

(async () => {
	const connection = await amqp.connect(RMQ_HOST);
	const channel = await connection.createChannel();

	channel.assertExchange(RMQ_EXCHANGE, RMQ_EXCHANGE_TYPE, { durable: true }); // https://www.rabbitmq.com/queues.html#durability
	channel.publish(RMQ_EXCHANGE, routingKey, Buffer.from(msg));
	console.log(`Emitted:: ${msg} -> ${RMQ_EXCHANGE}`);

	setTimeout(() => {
		connection.close();
		process.exit(0);
	}, 500);
})();
