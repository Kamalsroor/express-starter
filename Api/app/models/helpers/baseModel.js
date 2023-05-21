const mongoose = require('mongoose');

const baseModel = function(schema) {



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
      
      const perPage = req.query.perPage != 'all' ? parseInt(req.query.perPage) || 10 : 'all';

      let data = this;
      
      if(perPage === 'all'){
        data = await this.exec();
      }else{
        const startIndex = (page - 1) * perPage;

         data = await this.skip(startIndex).limit(perPage).exec();

      }

      const countQuery = this.model.countDocuments(this.getQuery());
      const total = await countQuery.exec();
      const totalPages = perPage != 'all' ? Math.ceil(total / perPage) : 1;
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
  };

  mongoose.Query.prototype.test = async function (pipeline, options = {}) {
    const { page = 1, limit = 10 } = options;
    const countPipeline = [...pipeline, { $count: 'count' }];
  
    const [result, countResult] = await Promise.all([
      this.aggregate(pipeline).skip((page - 1) * limit).limit(limit),
      this.aggregate(countPipeline)
    ]);
  
    const count = countResult.length ? countResult[0].count : 0;
    const totalPages = Math.ceil(count / limit);
  
    return {
      result,
      pagination: {
        page,
        limit,
        totalPages,
        totalResults: count
      }
    };
  };
 


};









module.exports = baseModel;