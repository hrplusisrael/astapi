const express = require("express");
const userModel = require("../models/userModel");
const fs = require("fs");
const { Parser } = require("json2csv");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const router = express.Router();

sgMail.setApiKey(process.env.SendGridKey);

router.post("/", async (req, res) => {
  const {
    PhoneNumber,
    IsInject,
    InjectionDate,
    InjectionDosge,
    IsSideEffects,
    NauseaLevel,
    VomitingLevel,
    DiarrheaLevel,
    ConstipationLevel,
    BurpLevel,
    FollowedTipsLevel,
    IsStillSideEffects,
    StillSideEffectsLevel,
    IsDietitian,
    EatingGuidelines,
    InjectionWay,
    SurveyName,
    InjectionDosge1,
    InjectionType,
    DrugType,
    InjectionTiming,
    SideEffectOther,
  } = req.body;
  const user = new userModel({
    PhoneNumber,
    IsInject,
    InjectionDate,
    InjectionDosge,
    IsSideEffects,
    NauseaLevel,
    VomitingLevel,
    DiarrheaLevel,
    ConstipationLevel,
    BurpLevel,
    FollowedTipsLevel,
    IsStillSideEffects,
    StillSideEffectsLevel,
    IsDietitian,
    Date: new Date().toISOString(),
    EatingGuidelines,
    InjectionWay,
    SurveyName,
    InjectionDosge1,
    InjectionType,
    DrugType,
    InjectionTiming,
    SideEffectOther,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/test", (req, res) =>
  res.status(200).json({ message: "Works Good" })
);

router.get("/generate_report", async (req, res) => {
  try {
    // Step 1: Fetch data from MongoDB
    const users = await userModel.find();
    if (!users.length) {
      return res.status(404).json({ message: "No users found." });
    }

    // Step 2: Generate CSV
    const fields = [
      "PhoneNumber",
      "Date",
      "SurveyName",
      "DrugType",
      "IsInject",
      "InjectionTiming",
      "InjectionDate",
      "InjectionWay",
      "InjectionDosge",
      "InjectionDosge1",
      "InjectionType",
      "IsSideEffects",
      "NauseaLevel",
      "VomitingLevel",
      "DiarrheaLevel",
      "ConstipationLevel",
      "BurpLevel",
      "SideEffectOther",
      "FollowedTipsLevel",
      "IsStillSideEffects",
      "StillSideEffectsLevel",
      "IsDietitian",
      "EatingGuidelines",
    ];
    const parser = new Parser({ fields });
    const csv = `\uFEFF${parser.parse(users)}`;

    // Step 3: Save CSV file
    const filePath = "users_report.csv";
    fs.writeFileSync(filePath, csv, "utf8");

    // Step 4: Prepare email with SendGrid
    const email = {
      to: "yohai@hrplus.co.il",
      from: "no-reply@hrpluscloud.com",
      subject: "Daily User Report",
      text: "Attached is the daily user report.",
      attachments: [
        {
          content: fs.readFileSync(filePath).toString("base64"),
          filename: "users_report.csv",
          type: "text/csv",
          disposition: "attachment",
        },
      ],
    };

    // Step 5: Send email
    await sgMail.send(email);
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ message: "Report generated and emailed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
});

module.exports = router;
