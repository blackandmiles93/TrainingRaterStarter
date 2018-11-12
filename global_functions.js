// So this function takes a promise and in the .then() then returns that data response if the response works
pe = require("parse-error");

to = function(promise) {
  return promise
    .then(data => {
      return [null, data];
    })
    .catch(err => [pe(err)]);
};
