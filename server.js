const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to mongoDB
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req,res) => {
    res.json({ msg: 'Welcome to the Contact Keeper API' });
});
  
// Define routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/contacts', require('./Routes/contacts'));
app.use('/api/auth', require('./Routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));