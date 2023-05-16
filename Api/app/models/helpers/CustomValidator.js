
const CustomValidator = function(schema , validationClass) {

  schema.pre('save', async function(next) {
    try {
      await validationClass.validated(this);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  
  schema.pre('update', async function(next) {

    try {
      await validationClass.validated(this);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  schema.pre('findOneAndUpdate', async function(next) {
    try {
      await validationClass.validated(this.getUpdate());
      next();
    } catch (error) {
      next(error);
    }
  });

  schema.pre('findByIdAndUpdate', async function(next) {
    try {
      await validationClass.validated(this);
      next();
    } catch (error) {
      next(error);
    }
  });



};









module.exports = CustomValidator;