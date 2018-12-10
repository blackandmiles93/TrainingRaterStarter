// So this function takes a promise and in the .then() then returns that data response if the response works
pe = require("parse-error");

to = function(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [pe(err)]);
};

//throw error
TE = function(errMessage, log) {
  if (log === true) {
    console.error(errMessage);
  }
  throw new Error(errMessage);
};

//return error
ReE = function(res, err, code) {
  if (typeof err == "object" && typeof err.message != "undefined") {
    err = err.message;
  }

  if (typeof code !== "undefined") res.statusCode = code;
  return res.json({ success: false, error: err });
};

//return success
ReS = function(res, data, code) {
  let sendData = { success: true };

  if (typeof data == "object") {
    sendData = Object.assign(data, sendData);
  }

  if (typeof code !== "undefined") res.statusCode = code;

  return res.json(sendData);
};
