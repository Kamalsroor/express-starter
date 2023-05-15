const mongoose = require('mongoose');

const baseModel = function(schema) {

  
  mongoose.Query.prototype.withSum = async function(field) {
    const docs = await this.exec();
    const sum = docs.reduce((acc, doc) => acc + doc[field], 0);
    return { docs, sum };
  };


  mongoose.Query.prototype.withReletion = function(...args) {
    // your custom logic here
    args.forEach(arg => {
      this.populate({path:arg});
    });
    return this;
  };
  
  mongoose.Query.prototype.pagination = async function(req) {
      try {


      const page = parseInt(req.query.page) || 1;
      const perPage = parseInt(req.query.perPage) || 10;


      const startIndex = (page - 1) * perPage;
      const data = await this.skip(startIndex).limit(perPage).exec();
      const countQuery = this.model.countDocuments(this.getQuery());
      const total = await countQuery.exec();
      const totalPages = Math.ceil(total / perPage);
      const pagination = {
        currentPage: page,
        lastPage: totalPages,
        perPage,
        total,
      };

      return {
        data,
        pagination
      };
    } catch (error) {
      throw new Error(error);
    }
    // return this;
  };

 
  
  

  // schema.methods.with = function(...args) {
  //   console.log('with args : ' , args);
  //   args.forEach(arg => {
  //     this.populate({path:arg});
  //   });
  //   return this;
  // };


};









module.exports = baseModel;