const mongoose = require('mongoose');

const cartinfoSchema = mongoose.Schema({
    products: [
        {
            productId: { type: String, required: true },
            status: { type: String, required: true }
        }
    ],
    priceDetails: {
        productCount: { required: true, type: Number, default: 0 },
        totalAmount: { required: true, type: Number, default: 0 },
        totalPayable: { required: true, type: Number, default: 0 },
        deliveryPrice: { required: true, type: Number, default: 0 }
    },
    sessionInfo: {
        email: { type: String, required: true, lowercase: true, unique: true },
        firstName: { type: String, required: true },
        isLoggedIn: { type: Boolean, required: true },
        lastName: { type: String, required: true },
        secureToken: { type: String, required: true },
    },
    orderDate: { type: Date, required: true },
    deliverDate: { type: Date, required: true },
});

/* 
**To use our schema definition, we need to convert our cartinfoSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Cartinfo', cartinfoSchema);