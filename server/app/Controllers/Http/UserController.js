'use strict'

const User = use('App/Models/User')

class UserController {
  async login({ request, response, auth }) {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.attempt(email, password)

    return response.status(200).json(token)
  }

  async register({ request, response }) {
    const data = request.all()

    await User.create(data)

    return response.status(200).json({
      success: true,
      message: 'Usuário cadastrado com sucesso!'
    })
  }

  async show({ auth, response }) {
    const user = await auth.getUser()

    return response.status(200).send(user)
  }
}

module.exports = UserController
