const mongo = require("mongoose");
const Schema = mongo.Schema;

const CompanySchema = new Schema({
  company_id: {
    type: Schema.types.ObjectID,
    required: true,
    unique: true,
  },
  company_name: {
    type: String,
    required: true,
  },
});

module.exports = Companies = mongo.model("companies", CustomerSchema);
