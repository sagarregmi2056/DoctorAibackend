const path = require("path");
const multer = require("multer");

const storagee = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".JPG" && ext !== ".jpeg") {
    const multerError = new multer.MulterError();
    multerError.code = "LIMIT_UNEXPECTED_FILE";
    multerError.field = file.fieldname;
    multerError.message =
      "Please upload a valid image file (jpeg, png, gif, jpg)";
    return callback(multerError);
  }
  callback(null, true);
};

// working fine

exports.uploadimageforscan = multer({ storage: storagee, fileFilter }).single(
  "image"
);

exports.uploaddocuments = multer({ storage: storagee, fileFilter }).array(
  "docs",
  15
);
