module.exports = {
  // errorHandler: require("./dbErrorHandler").errorHandler,
  uploaddocuments: require("./multer").uploaddocuments,
  uploadimageforscan: require("./multer").uploadimageforscan,
  sendEmail: require("./mailer").sendEmail,
  // dbConnection: require("./dbConnection"),
};
