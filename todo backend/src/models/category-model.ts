import mongoose from "mongoose";
import categorySchemaProperties from "../schemaproperties/categorySchemaProperties";

const categorySchema = new mongoose.Schema(categorySchemaProperties);

const Category = mongoose.model("Category", categorySchema);

export default Category;
