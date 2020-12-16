import * as amqp from 'amqplib/channel_api';
import dotenv from 'dotenv';
dotenv.config();

/** Reference
 * https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html
 */

const RMQ_HOST: string | undefined = process.env.RMQ_HOST;
const RMQ_EXCHANGE: string | undefined = process.env.RMQ_EXCHANGE;

if (!RMQ_HOST || !RMQ_EXCHANGE) throw Error('Missing values <RMQ_HOST> and/or <RMQ_EXCHANGE> in .env');

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

	channel.assertExchange(RMQ_EXCHANGE, 'direct', { durable: false });
	const { queue } = await channel.assertQueue('', { exclusive: true });

	console.log('Listening on', queue);
	channel.bindQueue(queue, RMQ_EXCHANGE, routingKey);

	channel.consume(queue, callback, { noAck: true });
})();
