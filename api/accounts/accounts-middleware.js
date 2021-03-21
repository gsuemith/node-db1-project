exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = Accounts => async (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then(account => {
    if (account) {
      req.account = account
      next()
    } else {
      res.status(404).json({
        message: "account not found"
      })
    }
  })
  .catch(err => next(err))
  // .catch(err => { res.json({ error: err.message }) })
}
