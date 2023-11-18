// Delete user with the email if is unverified
//  Input : email via body;
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500.
const deleteUser = (req, res) => {
  try {
    const user = req.user
    user.isDeleted = true
    user.tokens = []
    user.save((err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      } else {
        return res
          .status(200)
          .json({ message: 'Delete of user succeeded.', user: user })
      }
    })
  } catch (e) {
    return res.status(500).send('An unexpected error occurred')
  }
}

exports.deleteUser = deleteUser
