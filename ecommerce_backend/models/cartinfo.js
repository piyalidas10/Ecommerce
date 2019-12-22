const mongoose = require('mongoose');
// require('mongoose-double')(mongoose);

const cartinfoSchema = mongoose.Schema({
    cartResponse: [
        {
            productId: { type: String, required: true },
            subCategory: { type: String, required: true },
            category: { type: String, required: true },
            supplierName: { type: String, required: true },
            name: { type: String, required: true },
            productPicUrl: { type: String, required: true },
            status: { type: String, required: true },
            quantity_in_stock: { type: Number, required: true },
            currencyCode: { type: String, required: true, default: "INR" },
            price: { type: Number, required: true, default: 0 },
            deliveryPrice: { type: Number, required: true },
            qauntity_buy: { type: Number, required: true, default: 1 },
            price_payable: { type: Number, required: true, default: 0 }
        }
    ],
    sessionInfo: {
        email: { type: String, required: true, lowercase: true, unique: true },
        isLoggedIn: { type: Boolean, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
        secureToken: { type: String, required: true },
    }
});

/* 
**To use our schema definition, we need to convert our cartinfoSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Cartinfo', cartinfoSchema);