const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// NESTED RESULTS SCHEMA
var ResultsSchema = new Schema({
    payout: String,
    win_type: String,
    winner_count: Number,
    bonus_winner_count: Number
});

// DRAWING SCHEMA
var DrawingsSchema = new Schema({
    
    winning_numbers: [Number],
    bonus_number: Number,
    megaplier: String,
    date: {
        type: Date,
        unique: true
    },
    results: [ResultsSchema]

});

// Compile model from schema
var DrawingsModel = mongoose.model('Drawings', DrawingsSchema);


module.exports = DrawingsModel;