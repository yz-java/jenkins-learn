import api from '../../utils/api'
import displayErrors from '../../utils/displayErrors'

// get a list of all users in the database
export const getUsers = async () => {
  try {
    const response = (await api.get('/utils/users')).data.data

    return response
  } catch (error) {
    console.log(error)

    displayErrors(error)
  }
}
