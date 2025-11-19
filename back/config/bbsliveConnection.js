const mongoose = require("mongoose");

const bbsliveConnection = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = bbsliveConnection;
