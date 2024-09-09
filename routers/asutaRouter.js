const express = require("express");
const userModel = require("../models/userModel");

const router = express.Router();

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
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
