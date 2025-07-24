import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const { id } = req.user;
    const { jobId } = req.params;
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicants: id,
    });
    if (alreadyApplied) {
      return res.json({
        message: "you have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);

    if (!job) {
      return res.json({ message: "job not found", success: false });
    }
    const application = await Application.create({
      job: jobId,
      applicants: id,
      employer: job.createdBy,
    });
    return res.json({
      success: true,
      application,
      message: "application submitted successfully",
    });
  } catch (error) {
    return res.json({ message: "internal server Error ", success: false });
  }
};
export const getStudentApplications = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.json({ message: "user not found", success: false });
    }
    const applications = await Application.find({ applicants: id })
      .populate({path: "job",populate: {path: "company",
select: "name", 
        },
      })
      .populate("employer", "name email");

    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ message: "internal server Error", success: false });
  }
};

export const getEmployerJobApplicants = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.json({ message: "user not found", success: false });
    }
    const applications = await Application.find({ employer: id })
      .populate("job")
      .populate("applicants");
    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ message: "internal server Error ", success: false });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job")
      .populate("applicants")
      .populate("employer");
    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ message: "internal server Error ", success: false });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.json({ message: "application not found", success: false });
    }
    application.status = status;
    await application.save();
    return res.json({
      success: true,
      application,
      message: "application status updated successfully",
    });
  } catch (error) {
    return res.json({
      message: "Failed to update application ",
      error,
      success: false,
    });
  }
};
