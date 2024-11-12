// sync.js
const sequelize = require('./config/database');
const { Admin, Item, Supplier, Category } = require('./models');

// Sinkronisasi dan pembuatan tabel jika belum ada
sequelize.sync({ force: true }).then(() => {
  console.log("Database and tables created!");
}).catch((err) => {
  console.log("Error creating tables: ", err);
});
