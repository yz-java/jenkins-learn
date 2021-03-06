const mongoose = require('mongoose')

// middleware to check for a valid object id
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck])) {
    res.status(400).json({ message: 'Invalid ID' })
  } else {
    next()
  }
}

module.exports = checkObjectId
