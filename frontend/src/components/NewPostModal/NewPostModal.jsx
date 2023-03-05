import { useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../../store/posts'
import './NewPostModal.css'


const NewPostModal = ({ coffees, onModalClose }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [rating, setRating] = useState("")
    const [coffeeId, setCoffeeId] = useState("")
    const [text, setText] = useState("")


    const optionsPrinter = () => {
        return coffees.map((coffee)=>{
            return (
                <option value={coffee.id}>{coffee.name}</option>

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
        dispatch(createPost(post))
        onModalClose()
    }


  return (
    <div id="new-post-modal">
        <div id="npm-header">Create Post</div>
        <div id="npm-inputs">
            <input id="npm-title" type="text" placeholder='Title' />
            <div id="npm-sub-inputs">
                <input id="npm-rating" type="text" placeholder='Rating' />
                <div id="coffee-picker">
                    <div>Coffee: </div>
                    <select id="npm-select">
                          {optionsPrinter()}
                    </select>
                </div>
            </div>
            <textarea id="npm-text" cols="30" rows="10" placeholder='Post Text'></textarea>
        </div>
          <button id="npm-submit" onClick={submitNewPost}>Submit</button>

    </div>
  )
}

export default NewPostModal