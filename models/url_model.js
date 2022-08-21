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
    category: {
        type: String,
        required: false,
        default: "Sem categoria"
    },
    start_date: {
        type: String,
        required: false,
        default: Date.now()
    },
    end_date: {
        type: String,
        required: false,
        default: "3000-01-01T00:00:00.000Z" //Default para uma data infinita
    }

},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
})

module.exports = mongoose.model('UrlModel', customUrlScheema)