import React from 'react'
import "./post.css"
import { AiFillStar } from "react-icons/ai"

const Post = ({post, coffee}) => {

  const starPrinter = () => {
    let i  = post.rating
    let icons = []
    while (i > 0) {
      icons.push(<AiFillStar />)
      i--
    }
    return icons
  }


  return (
    <div id="post-container">
        <div id="post-title">{post.title}</div>
      <div id="post-rating">{starPrinter()}</div>
        <div id="post-text">{post.text}</div>
        <div id="coffee-info">{coffee.name} - {coffee.caffeineContent} mg per oz</div>
        

    </div>
  )
}

export default Post
