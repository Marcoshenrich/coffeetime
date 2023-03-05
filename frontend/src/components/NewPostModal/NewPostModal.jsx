import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../../store/posts'
import './NewPostModal.css'


const NewPostModal = ({ coffees, onModalClose }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [rating, setRating] = useState("")
    const [coffeeId, setCoffeeId] = useState(1)
    const [text, setText] = useState("Post Text")


    const optionsPrinter = () => {
        return coffees.map((coffee,i )=>{
            return (
                <option key={i} value={coffee.id}>{coffee.name}</option>
            )
        })
    }

    const submitNewPost = () => {
        const post = {
            title,
            rating,
            coffeeId,
            text
        }
      if (validPostChecker(post)) {
          dispatch(createPost(post))
          onModalClose()
        } else {
          setText("Sorry, make sure all fields are filled out and your rating is between 1 to 5.")
        }

    }

  const validPostChecker = (post) => {
    if (!post.title || !post.rating || !post.text) return false
    if (!post.rating.match(/^[1-5]$/)) return false
    return true
  }


  return (
    <div id="new-post-modal">
        <div id="npm-header">Create Post</div>
        <div id="npm-inputs">
              <input id="npm-title" type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
            <div id="npm-sub-inputs">
                  <input id="npm-rating" type="text" placeholder='Rating' onChange={(e) => setRating(e.target.value)} />
                <div id="coffee-picker">
                    <div>Coffee: </div>
                      <select id="npm-select" onChange={(e) => setCoffeeId(e.target.value)}>
                          {optionsPrinter()}
                    </select>
                </div>
            </div>
              <textarea id="npm-text" cols="30" rows="10" placeholder={text} value={text} onChange={(e) => setText(e.target.value)}>

            </textarea>
        </div>
          <button id="npm-submit" onClick={submitNewPost}>Submit</button>

    </div>
  )
}

export default NewPostModal