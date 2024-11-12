// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const sequelize = require('./config/database');

app.use(bodyParser.json());
app.use('/api', apiRoutes);

// Sync Database
sequelize.sync().then(() => {
  console.log('Database synced');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
