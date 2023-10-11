import mongoose from "mongoose";
import userSchemaProperties from "../schemaproperties/userSchemaProperties";

const userSchema = new mongoose.Schema(
  userSchemaProperties,

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
console.log(User);
export default User;
