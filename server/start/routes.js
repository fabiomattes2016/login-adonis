'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Autenticação e registro
Route.post('/register', 'UserController.register')
Route.post('/login', 'UserController.login')
Route.get('/user/profile', 'UserController.show').middleware(['auth'])

Route.resource('posts', 'PostController').apiOnly().middleware(['auth'])
