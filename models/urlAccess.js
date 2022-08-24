const mongoose = require('mongoose')

const urlAccessScheema = new mongoose.Schema({

    encode: {
        type: String,
        required: true
    },
    access_date: {
        type: String,
        required: false,
        default: () => new Date().toISOString().split('T')[0]
    },
    access_time: {
        type: String,
        required: false,
        default: () => new Date().toISOString().split('T')[1].slice(0,8) 
    }
},
{ collection: 'urlaccess_prods'})

module.exports = mongoose.model('urlaccess_prods', urlAccessScheema)