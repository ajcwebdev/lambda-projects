function protected(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.username) {
    next();
  } else {
    res.status(401).json({ error: 'Not authorized' });
  }
}

module.exports = protected;