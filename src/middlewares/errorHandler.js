module.exports = (err, req, res) => {
  res.status(404).render('error', { status: res.statusCode });
};
