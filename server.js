const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.get('/', (req,res) => {
    res.json({ msg: 'Welcome to the Contact Keeper API' });
});

// Define routes
app.use('/api/users', require('./Routes/users'));
app.use('/api/contacts', require('./Routes/contacts'));
app.use('/api/auth', require('./Routes/auth'));