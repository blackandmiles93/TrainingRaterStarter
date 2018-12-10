"use strict";

const bcrypt = require("bcrypt");
const bcrypt_promise = require("bcrypt-promise");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isEmail: { msg: "Email is invalid" } }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: { args: [7, 20], msg: "Phone number is invalid" },
          isNumeric: { msg: "Not a valid Phone number" }
        }
      },
      isTrainer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      password: DataTypes.STRING
    },
    {}
  );
  Users.beforeSave(async user => {
    let err;
    if (user.changed("password")) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });
  Users.prototype.comparePassword = async function(pw) {
    let err, pass;
    if (!this.password) TE("Password not set");

    [err, pass] = await to(bcrypt_promise.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE("Invalid password");

    return this;
  };
  Users.prototype.getJWT = () => {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return (
      "Bearer " +
      jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, {
        expiresIn: expiration_time
      })
    );
  };
  return Users;
};
