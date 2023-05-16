
async function getModelsByAggregateAndPagination(model, aggregatePipeline = [] , page = 1, limit = 10) {

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    try {
      const results = await model.aggregate(aggregatePipeline)
        .skip(startIndex)
        .limit(limit)
        .exec();
  
      const totalResults = await model.aggregate(aggregatePipeline).count('total');
  
      const response = {
        data: results,
        pagination: {
            currentPage: parseInt(page),
            lastPage:  Math.ceil(totalResults[0].total / limit),
            perPage: parseInt(limit),
            total: parseInt(totalResults[0].total),
        }
      };
  
      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Server error');
    }
  }

  module.exports = {
    getModelsByAggregateAndPagination,
  };