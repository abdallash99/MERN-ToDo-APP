const mongoose = require('mongoose')
const config = require('config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        console.log('mongoDB connected ...')
    } catch (err) {
        console.log(err)
    }

}

module.exports = connectDB;