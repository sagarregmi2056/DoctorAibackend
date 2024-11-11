const mongoose = require("mongoose");
const { v1 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    address: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    imagesWithResponses: [
      {
        // New field to store images and responses
        imageUrl: { type: String },
        responseText: { type: String },
      },
    ],

    email: {
      type: String,
      trim: true,
    },
    info: {
      type: String,
      trim: true,
    },
    hashed_password: {
      type: String,
    },
    resetPasswordLink: {
      type: String,
      default: "",
    },
    salt: String,
  },
  { timestamps: true }
);

// virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = v1();
    // encryptPassword()
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
