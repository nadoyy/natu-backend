module.exports = function onlyKorban(req, res, next) {
  if (req.user.role !== "korban") {
    return res.status(403).json({ error: "Korban only" });
  }
  next();
};
