const mongoose = require('mongoose');

const customersSchema = mongoose.Schema({
    customerEmail: { type: String, required: true, lowercase: true, unique: true },
    customerPass: { type: String, required: true },
    customerFirstName: { type: String, required: true },
    customerMiddleName: { type: String },
    customerLastName: { type: String, required: true },
    customerCity: { type: String, default:'Not Given' },
    customerState: { type: String, default:'Not Given' },
    customerZip: { type: Number, default: 0 },
    customerMobile: { type: Number, required: true, unique: true },
    customerCountry: { type: String, default:'india' },
    customerRegisterDate: { type: Date, default: Date.now}
});

/* 
**To use our schema definition, we need to convert our categoriesSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Customers', customersSchema);