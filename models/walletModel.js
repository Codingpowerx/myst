const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['visa', 'paypal'],
    default: 'visa'
  },
  amount: {
    type: Number,
    default: 0
  },
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: false
  },
  Category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    default: 1
  },
  date: {
    type: Date,
    default: new Date()
  }
});

const subCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = subCategory;
