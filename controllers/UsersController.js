const Users = require("../models").Users;
const validator = require("validator");

const getAll = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  let err, users;

  let whereStatement = {};

  if (req.query.name) {
    whereStatement.name = {
      $like: `%${req.query.name}%`
    };
  }

  [err, users] = await to(Users.findAll({ where: whereStatement }));

  return res.json(users);
};

module.exports.getAll = getAll;

const get = async (req, res) => {
  let err, user;

  let userId = parseInt(req.params.usersId);
  res.setHeader("Content-Type", "application/json");

  [err, user] = await to(User.findById(userId));

  if (!user) {
    res.statusCode(404);
    return res.json({ success: false, error: err });
  }
  return res.json(user);
};

module.exports.get = get;

// const update = async (req, res) => {
//   let err, user, data;
//   data = req.body;

//   [err, user] = await to(
//     Users.update(data, {
//       where: {
//         id: data.id
//       }
//     })
//   );

//   if (err) {
//     if (typeof err == "object" && typeof err.message != "undefined") {
//       err = err.message;
//     }

//     if (typeof code !== "undefined") {
//       res.statusCode = code;
//     }
//     res.statusCode = 422;
//     return res.json({ success: false, error: err });
//   }

//   return res.json(user);
// };

// module.exports.update = update;

const create = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const body = req.body;

  if (!body.email) {
    return ReE(res, "Please enter an email to register", 422);
  } else if (!body.password) {
    return ReE(res, "Please enter a password to register", 422);
  } else {
    let err, user;

    [err, user] = await to(createUser(body));
    if (err) return ReE(res, err, 422);

    return ReS(res, user, 201);
  }
};

module.exports.create = create;

const createUser = async userInfo => {
  let err;
  if (validator.isEmail(userInfo.email)) {
    [err, user] = await to(Users.create(userInfo));
    if (err) TE("User already exists with that email");
    return user;
  } else {
    TE("Email is invalid");
  }
};

module.exports.createUser = createUser;

//login
const login = async function(req, res) {
  const body = req.body;
  let err, user;

  [err, user] = await to(authUser(req.body));
  if (err) ReE(res, err, 422);

  return ReS(res, { token: user.getJWT(), user: user.toJSON() });
};

module.exports.login = login;

//authUser function
const authUser = async function(userInfo) {
  if (!userInfo.email) TE("Please enter a valid email to login");
  if (!userInfo.password) TE("Please enter a password to login");

  let user;
  if (validator.isEmail(userInfo.email)) {
    [err, user] = await to(Users.findOne({ where: { email: userInfo.email } }));

    if (err) TE(err.message);
  } else {
    TE("A valid email was not entered");
  }

  if (!user) TE("Not registered");

  [err, user] = await to(user.comparePassword(userInfo.password));

  if (err) TE(err.message);

  return user;
};

module.exports.authUser = authUser;
