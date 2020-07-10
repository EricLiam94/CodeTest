const mongo = require("mongoose");
const Schema = mongo.Schema;

const CustomerSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  company_id: { type: String },
  credit_cards: {
    type: String,
  },
});

module.exports = Customers = mongo.model("customers", CustomerSchema);
