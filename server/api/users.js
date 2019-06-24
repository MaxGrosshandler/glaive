const router = require('express').Router()

module.exports = router

router.get('/hello', async (req, res, next) => {
  try {
    res.json('hello!')
  } catch (err) {
    next(err)
  }
})
