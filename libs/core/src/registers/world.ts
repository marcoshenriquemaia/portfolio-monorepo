import { ClientsModule, Transport } from '@nestjs/microservices';

export const worldRabbitmqClient = ClientsModule.register([
  {
    name: 'RABBITMQ_SERVICE',
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`,
      ],
      queue: 'world',
      queueOptions: { durable: true },
    },
  },
]);
