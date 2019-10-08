const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customersSchema = mongoose.Schema({
    customerEmail: { type: String, required: true, lowercase: true, unique: true },
    customerPass: { type: String, required: true, select: false },
    customerFirstName: { type: String, required: true },
    customerMiddleName: { type: String },
    customerLastName: { type: String, required: true },
    customerGender: { type: String, required: true, enum: ['male', 'female', 'Others']},
    customerDOB: {type: Date, default: Date.now},
    customerCity: { type: String, default:'Not Given' },
    customerState: { type: String, default:'Not Given' },
    customerZip: { type: Number, default: 0 },
    customerMobile: { type: Number, required: true, unique: true },
    customerCountry: { type: String, default:'india' },
    customerAddress: { type: String, default:'Not Given' },
    customerRegisterDate: { type: Date, default: Date.now}
});


// save encrypted customer password in database
customersSchema.pre('save', function (next) {
    var customer = this;
    if (!customer.isModified('customerPass')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(customer.customerPass, salt, function (err, hash) {
            customer.customerPass = hash;
            next();
        });
    });
});

// check login password with encrypted password
customersSchema.methods.comparePassword = function (password, done) {
    bcrypt.compare(password, this.customerPass, function (err, isMatch) {
        done(err, isMatch);
    });
};

/* 
**To use our schema definition, we need to convert our categoriesSchema into a Model we can work with.
so it's this model which I'll export with the help of the module.exports syntax.
Now this mongoose model can be used outside of this model file
*/
module.exports = mongoose.model('Customers', customersSchema);