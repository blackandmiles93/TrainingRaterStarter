const Sessions = require("../models").Sessions;
const Ratings = require("../models").Ratings;

const getAll = async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  // here sessions because more than one
  let err, sessions;

  let whereStatement = {};

  if (req.query.name) {
    whereStatement.name = {
      $like: `%${req.query.name}%`
    };
  }

  [err, sessions] = await to(
    Sessions.findAll({ include: [{ model: Ratings }], where: whereStatement })
  );

  let sessionsWithAvg = [];

  for (let i in sessions) {
    let sessionInfo = sessions[i].toJSON();
    sessionInfo.avgRating = 0;
    for (let r in sessionInfo.ratings) {
      sessionInfo.avgRating += parseInt(sessionInfo.Ratings[r].rating);
    }

    if (sessionInfo.Ratings.length > 0) {
      sessionInfo.avgRating =
        sessionInfo.avgRating / sessionInfo.Ratings.length;
    }

    sessionsWithAvg.push(sessionInfo);
  }

  return res.json(sessionsWithAvg);
};

module.exports.getAll = getAll;

// this is basically saying return either an error or a session information
const get = async (req, res) => {
  let err, session;
  let sessionId = parseInt(req.params.sessionId);
  res.setHeader("Content-Type", "application/json");

  [err, session] = await to(Sessions.findById(sessionId));
  // error handling here in this if()
  if (!session) {
    res.statusCode = 404;
    return res.json({ success: false, error: err });
  }
  return res.json(session);
};

module.exports.get = get;

const update = async function(req, res) {
  let err, session, data;
  data = req.body;

  [err, session] = await to(
    Sessions.update(data, {
      where: {
        id: data.id
      }
    })
  );
  if (err) {
    if (typeof err == "object" && typeof err.message != "undefined") {
      err = err.message;
    }

    if (typeof code !== "undefined") res.statusCode = code;
    res.statusCode = 422;
    return res.json({ success: false, error: err });
  }

  return res.json(session);
};
module.exports.update = update;

const create = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, session, sessionInfo;

  sessionInfo = req.body;
  [err, session] = await to(Sessions.create(sessionInfo));
  if (err) {
    if (typeof err == "object" && typeof err.message != "undefined") {
      err = err.message;
    }

    if (typeof code !== "undefined") res.statusCode = code;
    res.statusCode = 422; // unprocessable entity
    return res.json({ success: false, error: err });
  }
  [err, session] = await to(session.save());
  if (err) {
    if (typeof err == "object" && typeof err.message != "undefined") {
      err = err.message;
    }

    if (typeof code !== "undefined") res.statusCode = code;
    res.statusCode = 422;
    return res.json({ success: false, error: err });
  }
  res.statusCode = 201;
  return res.json(session);
};
module.exports.create = create;
