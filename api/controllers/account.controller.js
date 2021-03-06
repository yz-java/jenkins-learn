const globalResponseDto = require('../dtos/responses/globalResponseDto')
const catchException = require('../utils/catchExceptions')
const accountService = require('../domain/services/account.service')
const userService = require('../domain/services/user.service')
const bookService = require('../domain/services/book.service')

const getAccountById = catchException(async (req, res) => {
  const account = await accountService.getById(req.user._id)

  res.status(200).json(
    globalResponseDto({
      message: `The current auth user's account settings.`,
      data: account
    })
  )
})

const updateAccountById = catchException(async (req, res) => {
  // update location of all relevant books if submitted location is non-empty and different
  if (req.body.location) {
    const account = await accountService.getById(req.user._id)
    if (account.location != req.body.location) {
      const books = await bookService.getAllByUserId(req.user._id)
      books.forEach(async (book) => {
        book.location = req.body.location
        await bookService.updateBookById(book._id, book)
      })
    }
  }
  const account = await accountService.updateById(req.user._id, req.body)

  res.status(200).json(
    globalResponseDto({
      message: `Updated the current auth user's account settings.`,
      data: account
    })
  )
})

const updateUserById = catchException(async (req, res) => {
  const user = await userService.updateById(req.user._id, req.body)

  res.status(200).json(
    globalResponseDto({
      message: `Updated the current auth user's settings.`,
      data: user
    })
  )
})

const getAccountByUsername = catchException(async (req, res) => {
  const account = await accountService.getAccountByUsername(req.params.username)

  res.status(200).json(
    globalResponseDto({
      message: `Here is the account associated with the username.`,
      data: account
    })
  )
})

module.exports = {
  getAccountById,
  updateAccountById,
  getAccountByUsername,
  updateUserById
}
