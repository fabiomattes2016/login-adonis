import axios from 'axios'

export const listPosts = token => {
  return axios.get('/posts', {
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

export const savePost = (token, newPost) => {
  return axios.post('/posts', {
    content: newPost.content
  }, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
}

export const deletePost = (token, post) => {
  return axios.delete(`/posts/${post}`, {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
}
