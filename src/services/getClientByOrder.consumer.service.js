const amqplib = require('amqplib');
const AccountsServices = require('./accounts.service');
const sendClientToInvoice = require('./sendClientToInvoice.producer.service');

const getClientByOrder = async (queue, exchange) => {
  const connectionMQ = await amqplib.connect('amqp://guest:guest@rabbit-ms-gateway:5672');
  const consumerChannel = await connectionMQ.createChannel();
  await consumerChannel.bindQueue(queue, exchange, '');

  await consumerChannel.consume(queue, async (msg) => {
    const msgContent = msg.content.toString();
    const actualMessage = JSON.parse(msgContent);

    if (actualMessage) {
      const account = await AccountsServices.findOne(actualMessage.orderData.clientId);
      sendClientToInvoice('invoiceCreation', {
        messageContent: {
          name: account.name,
          cpf: account.cpf,
          buyerAddress: account.address,
        },
        processHash: actualMessage.processHash,
      });
      consumerChannel.ack(msg);
    }
  });
};

module.exports = getClientByOrder;
