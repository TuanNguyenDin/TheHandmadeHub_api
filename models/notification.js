const mongoose = require("mongoose");

const notifiPaymentschema = new mongoose.Schema({
    notifiContent: { type: String, required: true },
    OrderID: {type:Object, required: true},
    status:{type: string, default: "waiting"}
},{ timestamps: true });
module.exports = mongoose.model("notifiPayments",notifiPaymentschema);