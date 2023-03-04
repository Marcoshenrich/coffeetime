import React from 'react'
import "./post.css"
import { AiFillStar } from "react-icons/ai"

const Post = () => {
  return (
    <div id="post-container">
        <div id="post-title">The Third Cup</div>
          <div id="post-rating"><AiFillStar /></div>
        <div id="post-text">text</div>
        <div id="coffee-info">Latte - 64 mg per oz</div>
        

    </div>
  )
}

export default Post
