exports.catchError = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
