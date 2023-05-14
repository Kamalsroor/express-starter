const mongoose = require('mongoose');

const withReletion = function(schema) {

  schema.statics.with = function(...args) {
    const query = this.find();
    args.forEach(arg => {
      query.populate(arg);
    });
    return query;
  };


};









module.exports = withReletion;