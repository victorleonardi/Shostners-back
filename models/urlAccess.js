const mongoose = require('mongoose')

const urlAccessScheema = new mongoose.Schema({

    encode: {
        type: String,
        required: true
    },
    view: {
        type: Number,
        required: false,
        default: 0
    }
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
},
{ collection: 'urlaccess_prod'})

module.exports = mongoose.model('urlaccess_prod', urlAccessScheema)