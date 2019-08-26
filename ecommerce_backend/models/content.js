const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    siteTitle: { type: String, required: true },
    sitePage: [{ 
        pageName: {type: String },
        pageHeader: {type: String }
    }],
    slider: [{ 
        title: {type: String },
        caption: {type: String },
        url: {type: String }
    }],
    productPage: {
        sidebar: {
            header: {type: String },
            subheader: [{type:String}]
        },
        rightSide: {
            header: {type: String },
            subheaders: [{type:String}]
        }
    }
});

/* 
**To use our schema definition, we need to convert our contentSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Content', contentSchema);