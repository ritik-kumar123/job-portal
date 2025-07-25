import { Company } from "../models/company.model.js";

export const addCompany = async (req, res) => {
  try {
    const { id } = req.user;
    const { name, about } = req.body;
    const logo = req.file?.filename;

    if (!name?.trim() || !about?.trim() || !logo) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, about, logo) are required",
      });
    }

    const company = await Company.create({
      name,
      about,
      logo,
      createdBy: id,
    });

    return res.json({
      success: true,
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    console.error("Error adding company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getEmployerCompanies = async (req, res) => {
  try {
    const { id } = req.user;
    const companies = await Company.find({ createdBy: id });

    return res.json({ success: true, companies });
  } catch (error) {
    console.error("Error fetching employer companies:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    return res.json({ success: true, companies });
  } catch (error) {
    console.error("Error fetching all companies:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.json({ success: true, company });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    return res.json({
      success: true,
      message: "Company deleted successfully",
      company,
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
