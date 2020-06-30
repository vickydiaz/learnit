const mongoose = require('mongoose');
const slugify = require('slugify');

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: String
})

// Create recipe slug from the title
ListSchema.pre('save', function(next){
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('List', ListSchema);