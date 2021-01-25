import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BlogService {
  async getBlogs() {
    const res = await api.get('api/blogs')
    logger.log(res)
    AppState.blogs = res.data
  }

  async getMyBlogs() {
    const res = await api.get('account/blogs')
    logger.log(res)
    AppState.myblogs = res.data
  }

  async createBlog(blogData) {
    const res = await api.post('api/blogs', blogData)
    logger.log(res)
    const myBlog = AppState.myblogs.push(blogData)
    logger.log(myBlog)
    this.getBlogs()
  }

  async getComments(id) {
    logger.log('all comments')
    const res = await api.get('api/blogs/' + id + '/comments')
    logger.log(res.data)
    AppState.comments = res.data
  }

  async addComments(newComment) {
    newComment.blog = AppState.activeblog.id
    AppState.comments.push(newComment)
    // this.getComments(data.blog)
    await api.post('api/comments', newComment)
  }
  // async addComments(newComment) {
  //   console.log('comments')
  //   // const res = await api.post('api/blogs/' + newComment + '/comments')
  //   const res = await api.post('api/blogs/comments', newComment)
  //   console.log(res)
  //   // const res = await api.post('api/blogs/comments', newComment)
  //   const val = await api.get('api/blogs/' + AppState.activeblog.id)
  //   AppState.comments = val.data
  // }

  async deleteComment(commentId) {
    await api.delete('api/comments/' + commentId)
    const commentInd = AppState.blogs.findIndex(c => c.id === commentId)
    AppState.comments.splice(commentInd, 1)
  }

  async editComment(commentId, newComment) {
    const commentData = { title: newComment }
    const res = await api.put('api/comments/' + commentId, commentData)
    const commentInd = AppState.comments.findIndex(c => c.id === commentId)
    AppState.comments.splice(commentInd, 1, res.data)
  }

  async getActiveBlog(id) {
    logger.log('pick one blog')
    const res = await api.get('api/blogs/' + id)
    AppState.activeblog = res.data
  }

  async deleteBlog(blogId) {
    await api.delete('api/blogs/' + blogId)
    const blogInd = AppState.blogs.findIndex(b => b.id === blogId)
    AppState.blogs.splice(blogInd, 1)
  }

  async editBlog(blogId, newTitle) {
    const blogData = { title: newTitle }
    const res = await api.put('api/blogs/' + blogId, blogData)
    const blogInd = AppState.blogs.findIndex(b => b.id === blogId)
    AppState.blogs.splice(blogInd, 1, res.data)
  }
}

export const blogService = new BlogService()
