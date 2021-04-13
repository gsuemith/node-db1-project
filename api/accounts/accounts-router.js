const router = require('express').Router()

const Accounts = require('./accounts-model')
const { 
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
} = require('./accounts-middleware')

router.use('/:id', checkAccountId(Accounts))

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.getAll()
  .then(accounts => {
    res.json(accounts)
  })
  .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  if (req.account) {
    console.log(req.account)
    res.json(req.account)
  } else {
    next()
  }
})

router.post('/', 
  checkAccountPayload,
  checkAccountNameUnique(Accounts), 
  (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.create(req.body)
  .then(([id]) => {
    return Accounts.getById(id)
  })
  .then(account => {
    res.status(201).json(account)
  })
  .catch(err => next(err))
})

router.put('/:id', checkAccountPayload, checkAccountNameUnique(Accounts), (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
  .then(() => {
    return Accounts.getById(req.params.id)
  })
  .then(account => {
    res.json(account)
  })
  .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
  .then(() => {
    res.json(req.account)
  })
  .catch(err => next(err))
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
