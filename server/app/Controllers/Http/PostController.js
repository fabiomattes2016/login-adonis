'use strict'

const Post = use('App/Models/Post')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  async index ({ response }) {
    const posts = await Post.query()
      .with('user')
      .fetch()

    return response.status(200).send(posts)
  }

  async store ({ request, response, auth }) {
    const user = await auth.getUser()
    const data = request.all()

    if (!data.content) {
      return response.status(400).send({
        success: false,
        message: 'Um texto deve ser digitado'
      })
    }

    const post  = await Post.create({ user_id: user.id, ...data })

    return response.status(200).send(post)
  }

  async show ({ params, response }) {
    const id = params.id

    const post = await Post.find(id)

    return response.status(200).send(post)
  }

  async update ({ params, request, response }) {
    const id = params.id
    const data = request.all()
    const post = await Post.find(id)

    post.merge(data)
    await post.save()

    return response.status(200).send(post)
  }

  async destroy ({ params, response, auth }) {
    const user = await auth.getUser()
    const id = params.id
    const post = await Post.find(id)

    if (post.user_id != user.id) {
      return response.status(401).send({
        success: false,
        message: 'Você não tem permissão para executar essa tarefa!'
      })
    }

    await post.delete()

    return response.status(200).send({
      success: true,
      message: 'Post excluido com sucesso!'
    })
  }
}

module.exports = PostController
