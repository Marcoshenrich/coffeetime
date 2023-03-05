import React, { useState } from 'react'
import "./post.css"
import { AiFillStar } from "react-icons/ai"
import { useDispatch } from 'react-redux'
import { deletePost } from '../../store/posts'

const Post = ({post}) => {
  const [showDelete, setShowDelete] = useState(false)
  const dispatch = useDispatch()
  
  const deletePos = () => {
    dispatch(deletePost(post.id))
  }

  const starPrinter = () => {
    let i  = post.rating
    let icons = []
    while (i > 0) {
      icons.push(<AiFillStar key={i} />)
      i--
    }
    return icons
  }

  return (
    <div id="post-container">
        <div id="post-title">{post.title}</div>
      <div id="post-rating">{starPrinter()}</div>
        <div id="post-text">{post.text}</div>
        <div id="post-bottom"
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}>
        {showDelete && (<div ></div>)}
         <div id="coffee-info">{post.coffee.name} - {post.coffee.caffeineContent} mg per oz</div>
        {showDelete && (<div onClick={deletePos} id="post-delete">x</div>)}
        </div>
        

    </div>
  )
}

export default Post
