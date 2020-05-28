import RabbitSender from "./RabbitSender";
export default class MessageProvider {
  constructor(connectionString) {
    this.sender = new RabbitSender(connectionString);
    this.channel = this.createChannel();
  }

  getExchangeType = () => {
    return this.sender.exchangeType;
  };

  createChannel = () => {
    return this.sender.createChannel();
  };

  createExchange = (exchangeName, type) => {
    this.exchangeName = exchangeName;
    this.sender.createExchange(this.exchangeName, type, this.channel);
  };

  createDurableQueue = queueName => {
    this.queueName = queueName;
    this.sender.createDurableQueue(this.queueName, this.channel);
  };

  sendMessageToQueue = msg => {
    this.sender.sendMessageToQueue(
      this.exchangeName,
      this.queueName,
      this.channel,
      msg
    );
  };

  bindToQueue = responseKey => {
    this.sender.bindToQueue(
      responseKey,
      this.exchangeName,
      this.channel,
      responseKey
    );
  };
}
