const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    siteTitle: { type: String },
    sitePage:  { type : Array , "default" : [] },
    slider: { type : Array , "default" : [] },
    productPage: {
        sidebar: {
            header: {type: String },
            subheader: {type: [] }
        },
        rightSide: {
            header: {type: String },
            subheaders: {type: [] }
        }
    }
});

/* 
**To use our schema definition, we need to convert our contentSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Content', contentSchema);