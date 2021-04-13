exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  
  const { name, budget } = req.body
  let message = '';

  switch (false) {
    case name !== undefined && budget !== undefined:
      message = "name and budget are required";
      break;
    case typeof(name) === 'string':
      message = "name of account must be a string";
      break;
    case name.trim().length >= 3 && name.trim().length <= 100:
      message = "name of account must be between 3 and 100";
      break;
    case typeof(budget) === 'number':
      message = "budget of account must be a number"
      break;
    case budget >= 0 && budget <= 1000000:
      message = "budget of account is too large or too small"
      break;
  }
  
  if (message) {
    res.status(400).json({ message })
  } else {
    req.body.name = req.body.name.trim()
    next()
  }
}

exports.checkAccountNameUnique = Accounts => async (req, res, next) => {
  // DO YOUR MAGIC
  req.body.name = req.body.name.trim()

  Accounts.checkUnique(req.body.name)
  .then(found => {
    if (found.length > 0) {
      res.status(400).json({
        message: "that name is taken"
      })
    } else {
      next()
    }
  })
  .catch(err => next(err))
}

exports.checkAccountId = Accounts => async (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getById(req.params.id)
  .then(account => {
    if (account) {
      req.account = account
      // req.body = {
      //   name: req.body.name || account.name,
      //   budget: req.body.budget || account.budget
      // }
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
