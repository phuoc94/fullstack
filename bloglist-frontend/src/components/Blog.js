import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs, blogs, user, notiHandler }) => {
  const [visible, setVisible] = useState(false)
  const [blikes, setBlikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeHandler = async () => {
    try {
      const id = blog.id
      const likes = blikes + 1
      setBlikes(likes)
      const resBlog = await blogService.update({ id }, { likes })
      blog = { ...blog, likes: resBlog.likes }
    } catch (exception) {
      console.log('error', exception)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`remove blog ${blog.title}`)) {
      try {
        const id = blog.id
        await blogService.remove({ id })
        notiHandler(`blog ${blog.title} removed`, 'success')
        setBlogs(blogs.filter(b => b.id !== id))
      } catch (exception) {
        console.log('error', exception)
      }
    }
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} <button onClick={() => setVisible(false)}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blikes} <button onClick={likeHandler}>like</button></p>
        <p>{blog.author}</p>
        { user.username === blog.user.username && <p><button onClick={deleteBlog}>remove</button></p>}
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setVisible(true)}>view</button>
    </div>
  )
}
export default Blog