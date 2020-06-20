const express = require('express')
const connectDB = require('./config/DB')
const app = express()


app.get('/', (req, res) => {
    res.send('ToDo app api is running')
})
connectDB();

app.use(express.json({ extended: false }))
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/todo', require('./routes/todo'))

const PORT = process.env.PORT || 5000;


app.listen(PORT, (err) => {
    if (err)
        console.log(err)
    else
        console.log('API is running');
})