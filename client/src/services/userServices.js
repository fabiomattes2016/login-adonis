import axios from 'axios'

export const register = newUser => {
  return axios
    .post('register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered', response.data)
    })
}

export const login = user => {
  return axios
    .post('login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('userToken', response.data.token)
      return response.data
    })
    .catch(err => {
      console.log('Invalid credencials', err)
    })
}

export const getUser = (token) => {
  return axios
    .get('user/profile', {
      headers: {
        'Authorization': `bearer ${token}`
      }
    })
    .then(response => {
      return response
    })
    .catch(err => {
      return err
    })
}

export const isAuthenticated = () => !!localStorage.getItem('userToken')
