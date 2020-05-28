import amqp from "amqplib";
import _ from "lodash";
export default class RabbitConsumer {

  /**
   * Function gets connection string to connect with Rabbit Server.
   * @param  {string} connectionString
   */
  constructor(connectionString) {
    if (!_.isEmpty(connectionString))
      this.connection = this.initalizeConnection(connectionString);
  }


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

  //get exchageType 
  exchangeType = {
    direct: "direct",
    fanout: "fanout",
    headers: "headers",
    topic: "topic"
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
      console.error("unable to create channel", err);
    }
  };

  /**
   * Function sets exchange for Rabbit Server.
   * @param  {string} exchangeName
   * @param  {exchangeType} type
   * @param  {object} channel
   * @param  {boolean} isDurable=true
   */

  setExchange = async (exchangeName, type, channel, isDurable = true) => {
    try {
      const x = exchangeName || undefined;
      const ch = await channel;
      if (!_.isEmpty(x) && !_.isEmpty(ch)) {
        ch.assertExchange(x, type, isDurable);
      } else {
        throw new Error(
          "setExchange: exchangeName, type, channel cannot be empty"
        );
      }
    } catch (err) {
      console.error("error setting exchange", err);
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
      } else {
        throw new Error(
          "bindToQueue: queueName, exchangeName, channel, routingKey cannot be empty."
        );
      }
    } catch (err) {
      console.error("unable to bind to queue", err);
    }
  };
  /**
   * Function list all messages stored on Rabbit Server.
   * @param  {string} queueName
   * @param  {object} channel
   */
  listMessages = async (queueName, channel) => {
    try {
      const q = queueName;
      const ch = await channel;
      if (!_.isEmpty(q) && !_.isEmpty(ch)) {
        ch.consume(
          q,
          msg => {
            console.log(msg.content.toString(), msg.properties.correlationId);
          },
          { noAck: false }
        );
      } else {
        throw new Error("listMessages:  queueName, channel cannot be empty");
      }
    } catch (err) {
      console.error("unable to list messages", err);
    }
  };
  /**
   * Function sends respond back to the request using correlationId and removes message from Rabbit Server. 
   * @param  {string} exchangeName
   * @param  {string} queueName
   * @param  {object} channel
   * @param  {string} message
   * @param  {string  } correlationId
   */
  respondBack = async (exchangeName, queueName, channel,message, correlationId) => {
    try {
      const x = exchangeName;
      const q = queueName;
      const ch = await channel;
      if (
        !_.isEmpty(x) &&
        !_.isEmpty(q) &&
        !_.isEmpty(ch) &&
        !_.isEmpty(correlationId)
      ) {

        ch.consume(
          q,
          msg => {
            if (msg.properties.correlationId === correlationId) {
              ch.publish(
                x,
                msg.properties.replyTo,
                new Buffer.from("Reply to " + msg.content.toString() + "response" + message)
              );
              ch.ack(msg);
              console.log(" [x] Done");
            }
          },
          { noAck: false }
        )
      } else {
        throw new Error(
          "respondBack: exchangeName, queueName, channel, correlationId cannot be empty"
        );
      }
    } catch (err) {
      console.error("unable to respondBack", err);
    }
  };
/*
  sendMessageToQueue = async (
    exchangeName,
    routingKey,
    channel,
    msg,
    isPresistent = true
  ) => {
    try {
      const ch = await channel;
      const x = exchangeName;
      const rKey = routingKey;
      if (
        !_.isEmpty(ch) &&
        !_.isEmpty(x) &&
        !_.isEmpty(rKey) &&
        !_.isEmpty(msg)
      ) {
        ch.publish(
          exchangeName,
          routingKey,
          new Buffer.from(msg),
          isPresistent,() => this.closeConnection()
        );
      } else {
        throw new Error(
          "sendMessageToQueue: exchangeName,routingKey,channel,msg cannot be empty,"
        );
      }
    } catch (err) {
      console.error("unable to send message to queue", err);
    }
  };
  */

  /**
   * Function closes connection on Rabbit Server.
   */
  closeConnection = async () => {
    const connection = await this.connection;
    connection.close();
  };

}
