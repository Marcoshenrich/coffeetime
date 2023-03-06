import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoffees, getCoffees } from "../../store/coffee"
import "./splash.css"
import Post from "../Post"
import { fetchPosts, getPosts } from "../../store/posts"
import { FixedModal } from "../../context/Modal"
import NewPostModal from "../NewPostModal/NewPostModal"
import csrfFetch from "../../store/csrf"
import NewCoffeeModal from "../NewCoffeeModal/NewCoffeeModal"
import CoffeeTime from "../CoffeeTime/CoffeeTime"


const SplashPage = () => {
    const [sortBy, setSortBy] = useState(true)
    const dispatch = useDispatch()
    const coffees = useSelector(getCoffees)
    const posts = useSelector(getPosts(sortBy))
    const [showModal, setShowModal] = useState(true)
    const [showCoffeeModal, setShowCoffeeModal] = useState(false)

    
    const switchSort = () => {
        setSortBy((sortBy) =>  !sortBy )
    }
    
    useEffect(()=>{
        dispatch(fetchCoffees())
        dispatch(fetchPosts())
    },[])

    const coffeePrinter = () => {
        return coffees.map((coffee, i)=>{
            return <CoffeeTime key={i} coffee={coffee}/>
        })
    }

    const postsPrinter = () => {

        return posts.map((post,i) => {
            return <Post post={post} key={i}/>
        })
    }

    const onModalClose = () => {
        setShowModal(false)
    }



    return (
        <>
        <div id="body">

            <div id="posts-section">
                <div id="posts-navbar">
                    <div id="posts-navbar-left">
                        <div>Posts</div>
                            <button onClick={() => { setShowModal(true) }}>New Post</button>
                    </div>
                    <div id="posts-navbar-right">
                            <select name="" id="" onChange={switchSort}>
                            <option value="">asc</option>
                            <option value="">desc</option>
                        </select>
                    </div>
                </div>
                <div id="posts-container">
                    {coffees.length > 0 && posts.length > 0 && (postsPrinter())}
                </div>


            </div>

            <div id="coffee-section">
                <div id="coffee-nav">
                    <div>Coffees</div>
                        <button id="new-coffe-btn" onClick={() => { setShowCoffeeModal((showCoffeeModal) => !showCoffeeModal) }}>New Coffee</button>
                </div>
                    {showCoffeeModal && (<NewCoffeeModal showCoffeeModal={setShowCoffeeModal}/>)}
                <div id="coffee-container">
                    {coffees && (coffeePrinter())}
                </div>

            </div>

        </div>
        {showModal && (
            <FixedModal onModalClose={onModalClose}>
                    <NewPostModal coffees={coffees} onModalClose={onModalClose} />
            </FixedModal>
            )}
            </>
    )
}

export default SplashPage