import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchCoffees } from "../../store/coffee"


const SplashPage = () => {
    const dispatch = useDispatch()

    const coffeeClicker = (e) => {
        e.stopPropagation()

        dispatch(fetchCoffees())
    }
    


    return (
        <div onClick={coffeeClicker}>hello</div>
    )
}

export default SplashPage