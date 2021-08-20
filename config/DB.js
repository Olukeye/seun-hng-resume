require('dotenv').config();
const mongoose = require('mongoose');
const URI = process.env.MONGOURL;


const DBConnector = async () => {
  mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then((result) => console.log("DB Running..."))
  .catch((err) => console.log(err));
};

module.exports = DBConnector;