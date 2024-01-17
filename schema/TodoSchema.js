/* Mongoose Schema and Model */

import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    detail: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["completed", "pending"],
      default: "pending",
      trim: true,
    },
    code: {
      type: String,
      required: true,
      default: "code",
      trim: true,
    },
  },
  { timestamps: true }
);

// pre-save hook => runs everytime beore a task gets saved
TodoSchema.pre("save", function (next) {
  this.code = nanoid(10);
  next();
});

// Todos Model and export
const Todos = mongoose.model("Todos", TodoSchema);
export default Todos;
