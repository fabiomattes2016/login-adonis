import React, { Component } from 'react'
import { listPosts, savePost, deletePost } from '../../services/postServices'

export default class Post extends Component {
  constructor() {
    super()
    this.state = {
      newPostContent: '',
      token: localStorage.getItem('userToken'),
      posts: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const post = {
      content: this.state.newPostContent
    }

    savePost(this.state.token, post).then(res => {
      this.setState({ posts: [...this.state.posts, res.data], newPostContent: '' })
      console.log(this.state.posts)
    })
  }

  handleDelete = (id) => {
    deletePost(this.state.token, id).then(res => {
      this.setState({ posts: this.state.posts.filter(item => item.id !== id) })
    })
  }

  componentDidMount() {
    listPosts(this.state.token).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-6 mx-auto">
            <h1 className="text-center">POSTS</h1>
            <hr />
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="newPostContent">Conteúdo</label>
                <textarea
                  className="form-control"
                  id="newPostContent"
                  rows="5"
                  value={this.state.newPostContent}
                  onChange={e => this.setState({ newPostContent: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success btn-lg btn-block">Postar</button>
            </form>
            <hr />
            {this.state.posts.map(post => (
              <div className="card border-dark mb-3" key={post.id}>
                <div className="card-body">
                  <h4 className="card-title">{post.content}</h4>
                  <p className="card-text">{post.created_at}</p>
                  <div className="text-right">
                    <button type="button" onClick={() => this.handleDelete(post.id)} className="btn btn-danger btn-sm">Excluir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
