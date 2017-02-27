const got = require('got');
const merge = require('lodash.merge');
const logger = require('./logger.js')('Transport');
const CREATE_ENDPOINT = 'https://chatbase-area120.appspot.com/api/message';
const UPDATE_ENDPOINT = 'https://chatbase-area120.appspot.com/api/message/update';

/**
 * Transport class providing wrapped net methods which provide basic request
 * setup options.
 * @class Transport
 */
class Transport {
  /**
   * Sends a object as the JSON body to the Chatbase create URL
   * @function sendMessage
   * @static
   * @param {Object} messageBody - the message create payload
   * @returns {Promise} - returns a promise that will be resolved/rejected upon
   * request completion/error
   */
  static sendMessage (messageBody) {
    logger('Sending Create Message \n %O', messageBody);
    return got(
      CREATE_ENDPOINT
      , merge({
          method: 'POST'
          , json: true
          , headers: {
            'Content-Type': 'application/json'
          }
        }, {body: JSON.stringify(messageBody)})
    );
  }
  /**
   * Sends a query-string and JSON message body to the Chatbase update URL
   * @function sendUpdate
   * @static
   * @param {Object} params - single topology key-value object which will be
   * converted to a query-string
   * @param {Object} messageBody - the message update payload
   * @returns {Promise} - returns a promise that will be resolved/rejected upon
   * request completion/error
   */
  static sendUpdate (params, messageBody) {
    logger('Sending Update Message:');
    logger('Query \n %O', params);
    logger('Body \n %O', messageBody);
    return got(
      UPDATE_ENDPOINT
      , merge({
        method: 'PUT'
        , json: true
        , query: params
        , headers: {
          'Content-Type': 'application/json'
        }
      }, {body: JSON.stringify(messageBody)})
    );
  }
}

Transport.CREATE_ENDPOINT = CREATE_ENDPOINT;
Transport.UPDATE_ENDPOINT = UPDATE_ENDPOINT;

module.exports = Transport;