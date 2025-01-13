const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  PhoneNumber: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  IsInject: {
    type: String,
  },
  InjectionDate: {
    type: String,
  },
  InjectionDosge: {
    type: String,
  },
  IsSideEffects: {
    type: String,
  },
  NauseaLevel: {
    type: String,
  },
  VomitingLevel: {
    type: String,
  },
  DiarrheaLevel: {
    type: String,
  },
  ConstipationLevel: {
    type: String,
  },
  BurpLevel: {
    type: String,
  },
  FollowedTipsLevel: {
    type: String,
  },
  IsStillSideEffects: {
    type: String,
  },
  StillSideEffectsLevel: {
    type: String,
  },
  IsDietitian: {
    type: String,
  },
  SurveyName: {
    type: String,
  },
  InjectionWay: {
    type: String,
  },
  EatingGuidelines: {
    type: String,
  },
  InjectionDosge1: {
    type: String,
  },
  InjectionType: {
    type: String,
  },
  DrugType: {
    type: String,
  },
  InjectionTiming: {
    type: String,
  },
  SideEffectOther: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
