const mongoose = require('mongoose')

const urlModelScheema = new mongoose.Schema({

    url: {
        type: String,
        required: true
    },
    encode: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false,
        default: "Sem categoria"
    },
    start_date: {
        type: Date,
        required: false,
        default: Date.now()
    },
    end_date: {
        type: Date,
        required: false,
        default: "3000-01-01T00:00:00.000Z" //Default para uma data infinita
    }

},
{
    timestamps: { 
        createdAt: 'created_at', 
        updatedAt: 'updated_at' 
    }
},
{ collection: 'urlmodels_prod'})

module.exports = mongoose.model('urlmodels_prod', urlModelScheema)