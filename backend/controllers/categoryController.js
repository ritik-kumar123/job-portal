import { Category } from "../models/category.model.js";

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const logo = req.file.filename;
        if (!name || !logo) {
            return res.json({ success: false, message: "All fields are required" });
        }
        const category = await Category.create({ name, logo });
       return res.json({success:true,category, message: "Category added successfully" });
    } catch (error) {
       return res.json({ success: false, message: "Internal server error" });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
     return res.json({success:true,categories});
    } catch (error) {
     return res.json({ success: false, message: "Internal server error" });
    }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: "Internal server error" });
  }
};
