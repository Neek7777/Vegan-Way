const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  notes: [{ type: Types.ObjectId, ref: 'Note' }], // Переделать под свои данные
});

module.exports = model('User', schema);
