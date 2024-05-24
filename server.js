const express = require('express');
const app = express();
const PORT = 3000;

// Define routes before starting the server
app.get('/', (req, res) => {
    console.log('Hello, World');
    res.send('<script>alert("Hello World");</script>hello world');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});