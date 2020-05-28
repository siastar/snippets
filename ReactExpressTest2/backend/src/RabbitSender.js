import amqp from "amqplib";
import { Buffer } from "buffer";
import _ from "lodash";
import { error } from "util";
import { ok } from "assert";

export default class RabbitSender {
  /**
   * Function gets connection string to connect with Rabbit Server.
   * @param  {string} connectionString
   */
  constructor(connectionString) {
    if (!_.isEmpty(connectionString))
      this.connection = this.initalizeConnection(connectionString);
  }

  exchangeType = {
    direct: "direct",
    fanout: "fanout",
    headers: "headers",
    topic: "topic"
  };

  /**
   * Function Initiates explicit connection with Rabbit Server and return promise.
   * @param  {string} connectionString
   */
  initalizeConnection = async connectionString => {
    try {
      if (!_.isEmpty(connectionString)) {
        return await amqp.connect(connectionString);
      } else throw new Error("connectionString cannot be empty.");
    } catch (err) {
      console.error("Error while connecting to server", err);
    }
  };

  /**
   * Function creates channel on Rabbit Server and return channel object.
   */
  createChannel = async () => {
    try {
      const connection = await this.connection;
      const ch = await connection.createChannel();
      return ch;
    } catch (err) {
      console.error("error while creating channel", err);
    }
  };
  /**
   * Function creates exchange for Rabbit Server.
   * @param  {string} exchangeName
   * @param  {exchangeType} type
   * @param  {object} channel
   * @param  {boolean} isDurable=true
   */
  createExchange = async (exchangeName, type, channel, isDurable = true) => {
    try {
      const x = exchangeName || undefined;
      const ch = await channel;
      if (!_.isEmpty(exchangeName) && !_.isEmpty(type) && !_.isEmpty(ch)) {
        ch.assertExchange(x, type, isDurable);
      } else {
        throw new Error("exchangeName,type or channel cannot be empty");
      }
    } catch (err) {
      console.error("error while creating exchange", err);
    }
  };
  /**
   * Function create Queue for Rabbit Server.
   * @param  {string} queueName
   * @param  {object} channel
   * @param  {boolean} isDurable=true
   */
  createDurableQueue = async (queueName, channel, isDurable = true) => {
    try {
      const q = queueName || undefined;
      const ch = await channel;
      if (!_.isEmpty(queueName) && !_.isEmpty(ch)) {
        ch.assertQueue(q, isDurable);
      } else {
        throw new Error("queueName or channel cannot be empty");
      }
    } catch (err) {
      console.error("error while creating Queue", err);
    }
  };
 
  /**
   * Function pushes message to Queue.
   * @param  {string} exchangeName
   * @param  {string} routingKey
   * @param  {object} channel
   * @param  {string} msg
   * @param  {number} deliveryMode=2
   */
  sendMessageToQueue = async (
    exchangeName,
    routingKey,
    channel,
    msg,
    deliveryMode = 2
  ) => {
    try {
      const ch = await channel;
      const options = {
        deliveryMode,
        correlationId: Math.random().toString(),
        replyTo: "response"
      };
      if (
        !_.isEmpty(exchangeName) &&
        !_.isEmpty(routingKey) &&
        !_.isEmpty(ch) &&
        !_.isEmpty(msg)
      ) {
        ch.publish(
          exchangeName,
          routingKey,
          new Buffer.from(msg),
          options,
          () => this.closeConnection()
        );
      } else {
        throw new Error("exchangeName,routingKey,channel,msg cannot be empty");
      }
    } catch (err) {
      console.error("unable to send message to the queue", err);
    }
  };
  /**
   * Function binds to exchange of Rabbit Server.
   * @param  {string} queueName
   * @param  {string} exchangeName
   * @param  {object} channel
   * @param  {string} routingKey
   */
  bindToQueue = async (queueName, exchangeName, channel, routingKey) => {
    try {
      const q = queueName;
      const x = exchangeName;
      const rKey = routingKey;
      const ch = await channel;
      if (
        !_.isEmpty(q) &&
        !_.isEmpty(x) &&
        !_.isEmpty(rKey) &&
        !_.isEmpty(ch)
      ) {
        ch.bindQueue(q, x, rKey);
        ch.consume(
          queueName,
          msg => {
            //console.log(msg);
            console.log("SERVER:", msg.content.toString());
            setTimeout(function() {
              console.log(" [x] Done");
              ch.ack(msg);
            }, 2000);
          },
          { noAck: false }
        );
      } else {
        console.error(
          "queueName, exchangeName, channel, routingKey cannot be empty"
        );
      }
    } catch (err) {
      console.error("error while binding to queue", err);
    }
  };
  /**
   * Function closes connection on Rabbit Server.
   */
  closeConnection = async () => {
    const connection = await this.connection;
    connection.close();
  };
}
