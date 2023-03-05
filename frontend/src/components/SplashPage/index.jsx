import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoffees, getCoffees } from "../../store/coffee"
import { GiCoffeeCup } from "react-icons/gi"
import "./splash.css"
import Post from "../Post"
import { fetchPosts, getPosts } from "../../store/posts"
import { FixedModal } from "../../context/Modal"
import NewPostModal from "../NewPostModal/NewPostModal"
import csrfFetch from "../../store/csrf"
import NewCoffeeModal from "../NewCoffeeModal/NewCoffeeModal"


const SplashPage = () => {
    const [sortBy, setSortBy] = useState(true)
    const dispatch = useDispatch()
    const coffees = useSelector(getCoffees)
    const posts = useSelector(getPosts(sortBy))
    const [showModal, setShowModal] = useState(false)
    const [showCoffeeModal, setShowCoffeeModal] = useState(false)

    
    const switchSort = () => {
        setSortBy((sortBy) =>  !sortBy )
    }

    const fetchping = () => async dispatch => {
        const response = await csrfFetch(`/api/coffees/ping`)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
        }
    };
    dispatch(fetchping())
    
    useEffect(()=>{
        dispatch(fetchCoffees())
        dispatch(fetchPosts())
    },[])

    const coffeePrinter = () => {
        return coffees.map((coffee, i)=>{
            return (
                <div id="coffeetime" key={i}>
                    <GiCoffeeCup />
                    <div>{coffee.name} - {coffee.year}</div>
                </div>
            )
        })
    }

    const postsPrinter = () => {

        return posts.map((post,i) => {
            return <Post post={post} coffee={coffees[post.coffeeId]} key={i}/>
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