
import { useState } from "react"
import { GiCoffeeCup } from "react-icons/gi"
import { useDispatch } from "react-redux"
import { deleteCoffee } from "../../store/coffee"


const CoffeeTime = ({coffee}) => {
    const dispatch = useDispatch()
    const [showDelete, setShowDelete] = useState(false)

    const deleteCof= () => {
        dispatch(deleteCoffee(coffee.id))
    }

  return (
      <div id="coffeetime"
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}>
            
          <div id="coffeetime-c">
              <GiCoffeeCup />
              <div id="coffeetime-info">{coffee.name} - {coffee.year}</div>
          </div>
          {showDelete && (<div onClick={deleteCof} id="coffee-close">x</div>)}
      </div>
  )
}

export default CoffeeTime