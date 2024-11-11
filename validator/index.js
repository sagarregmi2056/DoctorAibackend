const Joi = require("joi");

exports.steponeValidation = Joi.object({
  travelName: Joi.string().required(),
  pincode: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  country: Joi.string().required(),
  district: Joi.string().required(),
});

exports.steptwovalidation = Joi.object({
  bankName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  beneficaryName: Joi.string().required(),
  bankaccountType: Joi.string().required(),
  citizenshipNumber: Joi.string().required(),
});

exports.stepthreeValidation = Joi.object({
  panName: Joi.string().required(),
  panAddress: Joi.string().required(),
  issuedate: Joi.date().iso().required(),
  dateofbirth: Joi.date().iso().required(),
});

exports.busSubmitValidation = Joi.object({
  name: Joi.string().required(),
  type: Joi.string(),
  busNumber: Joi.string().required(),
  fare: Joi.number().required(),
  features: Joi.array().items(Joi.string()),
  description: Joi.string(),
  seatsAvailable: Joi.number().required(),
  numberOfSeats: Joi.number().required(),
  departure_time: Joi.string(),
  travel: Joi.string().required(), // Assuming 'travel' is the ID of the travel entity
  startLocation: Joi.string().required(), // Assuming 'startLocation' is the ID of the location entity
  endLocation: Joi.string().required(), // Assuming 'endLocation' is the ID of the location entity
  journeyDate: Joi.string().isoDate().required(),
  boardingPoints: Joi.array().items(Joi.string()),
  droppingPoints: Joi.array().items(Joi.string()),
  acType: Joi.string().valid("AC", "Non-AC").default("Non-AC"),
  toiletType: Joi.string().valid("Yes", "No").default("No"),
  tvType: Joi.string().valid("Yes", "No").default("No"),
  wifi: Joi.string().valid("Yes", "No").default("No"),
}).options({ allowUnknown: true });

exports.imageValidator = (req, res, next) => {
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({
        error: "Please upload a image file which could be jpeg,png,gif,jpg",
      });
    }
    const allowedFileTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    if (!allowedFileTypes.includes(req.file.mimetype.toLowerCase())) {
      return res.status(400).json({
        error:
          "Invalid file type. Please upload an image file (jpeg, png, gif, jpg).",
      });
    }
    next();
  } catch (error) {
    console.error("Error handling file validation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.signupValidation = Joi.object({
  name: Joi.string().max(32).required(),
  address: Joi.string().max(32),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.signinValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.userSignupValidator = (req, res, next) => {
  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();

  // email is not null, valid and normalized
  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Invalid email :must be on appropriate order")
    .isLength({
      min: 4,
      max: 2000,
    });
  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError, errors });
  }
  // proceed to next middleware
  next();
};

exports.passwordResetValidator = (req, res, next) => {
  // check for password
  req.check("newPassword", "Password is required").notEmpty();
  req
    .check("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long")
    .matches(/\d/)
    .withMessage("must contain a number")
    .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};

// we can validate registeration too
//    exports.kfcverification = (req, res, next) => {
//     const errors = req.validationErrors();

//     req.check("", "").notEmpty();

//     // if error show the first one as they happen
//     if (errors) {
//         const firstError = errors.map(error => error.msg)[0];
//         return res.status(400).json({ error: firstError });
//     }
//     // proceed to next middleware
//     next();
//    };

exports.ownerSignupValidator = (req, res, next) => {
  // Travel Name
  req.check("travelName", "Travel name is required").notEmpty();

  // Pincode
  req.check("pincode", "Pincode is required").notEmpty();

  // State
  req.check("state", "State is required").notEmpty();

  // City
  req.check("city", "City is required").notEmpty();

  // Phone
  req.check("phone", "Phone is required").notEmpty();

  req
    .check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Invalid email")
    .isLength({
      min: 4,
      max: 2000,
    });

  // name is not null and between 4-10 characters
  req.check("name", "Name is required").notEmpty();

  req.check("country", "Country is required").notEmpty();

  // District
  req.check("district", "District is required").notEmpty();

  // Bank Name
  req.check("bankName", "Bank name is required").notEmpty();

  // Account Number
  req.check("accountNumber", "Account number is required").notEmpty();

  req.check("panName", "PAN name is required").notEmpty();

  // PAN Address
  req.check("panAddress", "PAN address is required").notEmpty();

  // Issue Date
  req.check("issuedate", "Issue date is required").notEmpty();

  // Date of Birth
  req.check("dateofbirth", "Date of birth is required").notEmpty();

  // National ID
  req.check("nationalID", "National ID is required").notEmpty();

  // Driver's License
  req.check("DriverLisence", "Driver's license is required").notEmpty();

  // Citizenship Image
  req.check("citizenship", "Citizenship image is required").notEmpty();

  // PAN Card Image
  req.check("pancard", "PAN card image is required").notEmpty();

  // Owner Avatar Image
  req.check("photo", "Owner avatar image is required").notEmpty();

  // Business Background
  req.check("businessBackground", "Business background is required").notEmpty();
  // Beneficiary Name
  // req.check("beneficaryName", "Beneficiary name is required").notEmpty();

  // // Bank Account Type
  // req.check("bankaccountType", "Bank account type is required").notEmpty();

  // // Citizenship Number
  // req.check("citizenshipNumber", "Citizenship number is required").notEmpty();

  // PAN Name

  // Status
  // req.check("status", "Invalid status").isIn(["pending", "approved", "rejected"]);

  // // Driver's License
  // req.check("DriverLisence", "Driver's license is required").notEmpty();

  // // Citizenship Image
  // req.check("citizenship", "Citizenship image is required").notEmpty();

  // // PAN Card Image
  // req.check("pancard", "PAN card image is required").notEmpty();

  // // Owner Avatar Image
  // req.check("photo", "Owner avatar image is required").notEmpty();

  // Postal Code
  // req.check("postalCode", "Postal code is required").notEmpty();

  // Optional Email ID
  // req.check("optionalEmailid", "Invalid optional email").optional().isEmail();

  // PAN Number
  req.check("panNumber", "PAN number is required").notEmpty();

  // email is not null, valid and normalized

  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
