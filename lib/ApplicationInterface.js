/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const MessageStateWrapper = require('./MessageStateWrapper.js');
const MessageSink = require('./MessageSink.js');

/** 
 * Exported Application Interface
 * @class ApplicationInterface
 */
class ApplicationInterface {
  constructor () {
    /** @property {Null|String} api_key - the Chatbase api key */
    this.api_key = null;
    /** @property {Null|String} user_id - the Chatbase user id */
    this.user_id = null;
    /** @property {Null|String} platform - origin platform */
    this.platform = null;
    /** @property {Null|ChatbaseMessageTypes} type - Chatbase message types */
    this.type = null;
  }
  /**
   * Set the API Key field for all new messages produced by this interface
   * @function setApiKey
   * @param {String} apiKey - the Chatbase API key
   * @chainable
   */
  setApiKey (apiKey) {
    this.api_key = apiKey;
    return this;
  }
  /**
   * Set the user id field for all new messages produced by this interface
   * @function setUserId
   * @param {String} userId - the user id for this client instance
   * @chainable
   */
  setUserId (userId) {
    this.user_id = userId;
    return this;
  }
  /**
   * Set the platform field for all new messages produced by the interface
   * @function setPlatform
   * @param {String} platform - the platform the client is operating on
   * @chainable
   */
  setPlatform (platform) {
    this.platform = platform;
    return this;
  }
  /**
   * Set the user type field for all new messages produced by the interface
   * @function setAsTypeUser
   * @chainable
   */
  setAsTypeUser () {
    this.type = MessageSink.messageTypes().user;
    return this;
  }
  /**
   * Set the user type field for all new messages produced by the interface
   * @function setAsTypeAgent
   * @chainable
   */
  setAsTypeAgent () {
    this.type = MessageSink.messageTypes().agent;
    return this;
  }
  /**
   * Create a new message instance which will have any default values set on
   * the interface by any applicable setters exposed publically. Optionally, API
   * key and User Id can be supplied at function invocation to override any
   * values set for these fields on the interface.
   * @function newMessage
   * @param {String} [apiKey] - the Chatbase API key
   * @param {String} [userId] - the Chatbase user id
   * @returns {MessageStateWrapper} - a new instance of MessageStateWrapper
   */
  newMessage (apiKey=null, userId=null) {
    const key = apiKey ? apiKey : this.api_key;
    const id = userId ? userId  : this.user_id;
    const msg = new MessageStateWrapper(key, id);
    if (this.platform) {
      msg.setPlatform(this.platform);
    }
    if (this.type) {
      msg.type = this.type;
    }
    return msg;
  }
}

module.exports = ApplicationInterface;