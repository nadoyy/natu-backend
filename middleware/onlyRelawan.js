module.exports = function onlyRelawan(req, res, next) {
  if (req.user.role !== "relawan") {
    return res.status(403).json({ error: "Relawan only" });
  }
  next();
};
