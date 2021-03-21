const router = require('express').Router()

const Accounts = require('./accounts-model')
const { checkAccountId } = require('./accounts-middleware')

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
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: 'something went wrong inside the accounts router',
    errMessage: err.message,
  })
})

module.exports = router;
