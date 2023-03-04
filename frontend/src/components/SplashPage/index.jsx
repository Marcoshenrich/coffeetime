import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoffees, getCoffees } from "../../store/coffee"
import { GiCoffeeCup } from "react-icons/gi"
import "./splash.css"
import Post from "../Post"
import { fetchPosts, getPosts } from "../../store/posts"

const SplashPage = () => {
    const dispatch = useDispatch()
    const coffees = useSelector(getCoffees)
    const posts = useSelector(getPosts)
    
    
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
        console.log(posts)
        return posts.map((post,i) => {
            console.log("in posts")
            return <Post post={post} coffee={coffees[post.coffeeId]} key={i}/>
        })
    }


    return (
        
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
    )
}

export default SplashPage