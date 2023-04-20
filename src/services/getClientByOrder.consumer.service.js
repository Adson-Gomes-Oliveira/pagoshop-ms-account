const amqplib = require('amqplib');
const AccountsServices = require('./accounts.service');
const sendClientToInvoice = require('./sendClientToInvoice.producer.service');

const getClientByOrder = async (queue, exchange) => {
  const connectionMQ = await amqplib.connect('amqp://guest:guest@rabbit-ms-gateway:5672');
  const consumerChannel = await connectionMQ.createChannel();
  await consumerChannel.assertExchange(exchange, 'fanout', { durable: true });
  await consumerChannel.assertQueue(queue, { durable: true });
  await consumerChannel.bindQueue(queue, exchange, '');

  await consumerChannel.consume(queue, async (msg) => {
    const msgContent = msg.content.toString();
    const actualMessage = JSON.parse(msgContent);

    if (actualMessage) {
      const account = await AccountsServices.findOne(actualMessage.orderData.clientId);
      sendClientToInvoice('invoiceCreation', {
        messageContent: {
          email: account.email,
          name: account.name,
          cpf: account.cpf,
          buyerAddress: account.address,
        },
        invoiceId: actualMessage.invoiceId,
      });
      consumerChannel.ack(msg);
    }
  });
};

module.exports = getClientByOrder;
