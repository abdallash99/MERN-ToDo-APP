const express = require('express')
const connectDB = require('./config/DB')
const path = require('path')
const app = express()

connectDB();

app.use(express.json({ extended: false }))
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/todo', require('./routes/todo'))

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}


app.listen(PORT, (err) => {
    if (err)
        console.log(err)
    else
        console.log('API is running');
})