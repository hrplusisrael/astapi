const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  PhoneNumber: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  IsInject: {
    type: Boolean,
  },
  InjectionDate: {
    type: Date,
  },
  InjectionDosge: {
    type: Number,
  },
  IsSideEffects: {
    type: Boolean,
  },
  NauseaLevel: {
    type: Number,
  },
  VomitingLevel: {
    type: Number,
  },
  DiarrheaLevel: {
    type: Number,
  },
  ConstipationLevel: {
    type: Number,
  },
  BurpLevel: {
    type: Number,
  },
  FollowedTipsLevel: {
    type: Number,
  },
  IsStillSideEffects: {
    type: Boolean,
  },
  StillSideEffectsLevel: {
    type: Number,
  },
  IsDietitian: {
    type: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
