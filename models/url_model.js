// const nanoId = require('nanoid') //Ver como usar
const mongoose = require('mongoose')


const customUrlScheema = new mongoose.Schema({

    url: {
        type: String,
        required: true
    },
    encode: {
        type: String,
        required: false
    },
    views: {
        type:Number,
        required: false,
        default: 0
    },
    category: { //Não ta funfando... mesmo passando a categoria. Pedir ajuda.
        type: String,
        required: false
    },
    start_date: {
        type: Date,
        required: false
    },
    end_date: {
        type: Date,
        required: false
    }

},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
})

module.exports = mongoose.model('UrlModel', customUrlScheema)