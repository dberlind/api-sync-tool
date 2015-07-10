'use strict';

var util = require('util');

var BaseError = require('./BaseError');

module.exports = function (messages) {
  /**
   * Conflicts were found while pushing.
   *
   * @param {String} conflicts The conflicts parameter with all conflicts found
   */
  var ConflictsFoundError = function (conflicts) {
    this.message = messages.conflictsFound(conflicts);
    BaseError.call(this, this.message);
  };

  util.inherits(ConflictsFoundError, BaseError);

  return ConflictsFoundError;
};