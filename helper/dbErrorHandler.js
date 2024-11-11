"use strict";

/**
 * Get unique error field name
 */

// responsible for extracting a user-friendly error message from a MongoDB unique index violation error
const uniqueMessage = (error) => {
  let output;
  try {
    let fieldName = error.message.substring(
      error.message.lastIndexOf(".$") + 2,
      error.message.lastIndexOf("_1")
    );
    output =
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1) +
      " already exists";
  } catch (ex) {
    output = "Unique field already exists";
  }
  return output;
};

/**
 * Get the erroror message from error object
 */
// handle various types of errors that can occur during interactions with MongoDB
exports.errorHandler = (error) => {
  let message = "";

  //   It first checks if the error has a code property, which indicates a MongoDB-specific error code.
  if (error.code) {
    switch (error.code) {
      case 11000:
      case 11001:
        message = uniqueMessage(error);
        break;
      default:
    }
  } else {
    if (error.message.indexOf("Cast to ObjectId failed") !== -1) {
      message = "No data found";
    }
    for (let errorName in error.errors) {
      if (error.errors[errorName].message) {
        message = error.errors[errorName].message;
      }
    }
  }
  console.log("Error--> ", error);
  if (message.includes("Path")) {
    message = message.slice(6);
  }
  console.log("Message--> ", message);
  return message;
};
