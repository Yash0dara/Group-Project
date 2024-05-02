const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const cardSchema = new mongoose.Schema
({
	cardName : {
		type : String,
		required : true
	},

	cardNumber : {
		type : Number,
		required : true
	},	

    expiredate : {
		type : Date,
		required : true
	},

    cvvNumber : {
		type : Number,
		required : true
	},
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;


