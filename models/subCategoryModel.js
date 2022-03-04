const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
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
  discount: {
    type: Number
  },
  date: {
    type: Date,
    default: new Date()
  }
});

const subCategory = mongoose.model('subCategory', subCategorySchema);

module.exports = subCategory;
