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

// logs the received content
function callback(msg): void {
	if (!msg.content) throw Error('No message content.');
	const content = Buffer.from(msg.content).toString();
	console.log(content);
	// console.log(msg.fields.routingKey);
}

console.log(`Starting <CONSUMER> with routing key: <${routingKey}>...`);

(async () => {
	const connection = await amqp.connect(RMQ_HOST);
	const channel = await connection.createChannel();

	channel.assertExchange(RMQ_EXCHANGE, RMQ_EXCHANGE_TYPE, { durable: true }); // https://www.rabbitmq.com/queues.html#durability
	const { queue } = await channel.assertQueue('', { exclusive: true });

	console.log('Listening on', queue);
	channel.bindQueue(queue, RMQ_EXCHANGE, routingKey);

	channel.consume(queue, callback, { noAck: true });
})();
