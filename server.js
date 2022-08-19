//Código voltado para iniciar um servidor para "hospedar" a API.
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT || process.env.LOCAL_PORT
const mongoose = require('mongoose')

const registerRoute = require('./routes/register')
const linkRoute = require('./routes/link')

const app = express()

function connect() {
    mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

    const db = mongoose.connection
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))

}

connect()

app.use(morgan('dev')) //Fornece o log de execução
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json()) //Utilizado para determinar o tipo de dados que queremos receber. Nesse caso, configurado como json.
app.use(cors()) //Como a API vai ser usada localhost, não há motivos para passar a url de hospedagem (dominio de origem).
app.use('/register', registerRoute)
app.use('/', linkRoute)

app.listen(port, () => { //21262 é uma porta qualquer do pc. O arrow-function ('() =>') reduz a declaração, declarando a função e usando na mesma linha, como um lambda em python.
    console.log('Server started')
})
