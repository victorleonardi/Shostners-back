// const nanoId = require('nanoid') //Ver como usar
const mongoose = require('mongoose')


const customUrlScheema = new mongoose.Schema({
    // Pedir ajuda
    // nano_id: {
    //     type: String,
    //     unique: true,
    //     default: nanoid(7)
    // },
    true_url: {
        type: String,
        required: true
    },
    custom_url: {
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
    // uri:{
    //     type: String,
    //     required: false,
    //     default: custom_url+nanoid(7)       
    // }
},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
})

module.exports = mongoose.model('UrlModel', customUrlScheema)