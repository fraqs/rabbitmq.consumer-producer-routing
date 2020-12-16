import * as amqp from 'amqplib/channel_api';
import dotenv from 'dotenv';
dotenv.config();

const RMQ_HOST: string | undefined = process.env.RMQ_HOST;
const RMQ_EXCHANGE: string | undefined = process.env.RMQ_EXCHANGE;

if (!RMQ_HOST || !RMQ_EXCHANGE) throw Error('Missing values <RMQ_HOST> and/or <RMQ_EXCHANGE> in .env');

// Routing key to route for a specific user (mail)
const routingKey: string = process.argv[2] || 'main';
const msg: string = process.argv.slice(3).join(' ') || 'Hi RMQ!';

console.log(`Starting <PRODUCER> with routing key: <${routingKey}>...`);

(async () => {
	const connection = await amqp.connect(RMQ_HOST);
	const channel = await connection.createChannel();

	channel.assertExchange(RMQ_EXCHANGE, 'direct', { durable: false });
	channel.publish(RMQ_EXCHANGE, routingKey, Buffer.from(msg));
	console.log(`Emitted:: ${RMQ_EXCHANGE}>${msg}`);

	setTimeout(() => {
		connection.close();
		process.exit(0);
	}, 500);
})();
