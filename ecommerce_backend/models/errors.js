const mongoose = require('mongoose');

const errorsSchema = mongoose.Schema({
    errorslist: { type: {}, required: true }
});

/* 
**To use our schema definition, we need to convert our categoriesSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Errors', errorsSchema);