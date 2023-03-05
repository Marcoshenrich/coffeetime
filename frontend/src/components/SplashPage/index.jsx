import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoffees, getCoffees } from "../../store/coffee"
import { GiCoffeeCup } from "react-icons/gi"
import "./splash.css"
import Post from "../Post"
import { fetchPosts, getPosts } from "../../store/posts"
import { FixedModal } from "../../context/Modal"


const SplashPage = () => {
    const dispatch = useDispatch()
    const coffees = useSelector(getCoffees)
    const posts = useSelector(getPosts)
    const [showModal, setShowModal] = useState(false)

    
    
    useEffect(()=>{
        dispatch(fetchCoffees())
        dispatch(fetchPosts())
    },[])

    const coffeePrinter = () => {
        return coffees.map((coffee)=>{
            return (
                <div id="coffeetime">
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
        console.log("in on modalclose")
        setShowModal(false)
    }


    return (
        <>
        <div id="body">

            <div id="posts-section">
                <div id="posts-navbar">
                    <div id="posts-navbar-left">
                        <div>Posts</div>
                        <button>New Post</button>
                    </div>
                    <div id="posts-navbar-right">
                        <select name="" id="">
                            <option value="">asc</option>
                            <option value="">desc</option>
                        </select>
                    </div>
                </div>
                <div id="posts-container">
                    {postsPrinter()}
                </div>


            </div>

            <div id="coffee-section">
                <div id="coffee-nav">
                    <div>Coffees</div>
                    <button>New Coffee</button>
                </div>
                <div id="coffee-container">
                    {coffeePrinter()}
                </div>

            </div>

        </div>
        {showModal && (
            <FixedModal onModalClose={onModalClose}>
                <div>hello</div>
            </FixedModal>
            )}
            </>
    )
}

export default SplashPage