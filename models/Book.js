const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  bookEdition: { type: String, required: true },
  authorName: { type: String, required: true },
  dob: { type: String, required: true },
  isbn: { type: String, required: true },
  yop: { type: String, required: true },
  publisher: { type: String, required: true },
  website: { type: String, required: true },
  country: { type: String, required: true },
  hash: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  txReceipt: {
    blockHash: { type: String },
    blockNumber: { type: Number },
    contractAddress: { type: String },
    cumulativeGasUsed: { type: Number },
    effectiveGasPrice: { type: Number },
    from: { type: String },
    gasUsed: { type: Number },
    logs: { type: Array },
    logsBloom: { type: String },
    status: { type: Boolean },
    to: { type: String },
    transactionHash: { type: String },
    transactionIndex: { type: Number },
    type: { type: String },
  },
  publishingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);
