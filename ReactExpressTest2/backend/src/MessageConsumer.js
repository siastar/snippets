import RabbitConsumer from "./RabbitConsumer";
import { throws } from "assert";

export default class MessageConsumer {
  constructor(connectionString) {
    this.consumer = new RabbitConsumer(connectionString);
    this.channel = this.createChannel();
  }
  getExchangeType = () => {
    return this.consumer.exchangeType;
  };
  createChannel = () => {
    return this.consumer.createChannel();
  };
  setExchange = (exchangeName, type) => {
    this.exchangeName = exchangeName;
    this.consumer.setExchange(this.exchangeName,type,this.channel)
  };
  bindToQueue = responseKey => {
    this.queueName = responseKey;  
    this.consumer.bindToQueue(
      responseKey,
      this.exchangeName,
      this.channel,
      responseKey
    );
  };
  listMessage = () => {
      this.consumer.listMessages(this.queueName,this.channel);
  }
  respondBack = (msg,correlationId) => {
      this.consumer.respondBack(this.exchangeName,this.queueName,this.channel,msg,correlationId)
  }



}
