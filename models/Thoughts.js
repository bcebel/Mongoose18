import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const ThoughtSchema = new Schema({
  thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [ReactionSchema],
});

const Thought = model("Thought", ThoughtSchema);
export default Thought;
