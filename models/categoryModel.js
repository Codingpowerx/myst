const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
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
  SubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: false
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

// categorySchema.pre('save', async function (next) {
//     if (this.SubCategory) {
//       try {
//         const check = await SubCategory.findById(this.SubCategory);
//         if (!check || JSON.stringify(check.Category) !== JSON.stringify(this.Category)) {
//           throw new Error('Check your Category and/or SubCategory');
//         }
//       } catch (error) {
//         throw error;
//       }
//     }
//     next();
//   });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
