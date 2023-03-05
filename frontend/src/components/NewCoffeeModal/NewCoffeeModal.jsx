
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createCoffee } from "../../store/coffee"
import "./NewCoffeeModal.css"

const NewCoffeeModal = ({ showCoffeeModal }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [year, setYear] = useState("")
    const [caffeine, setCaffeine] = useState("")

    const submitCoffee = () => {
      if (!name || !year || !caffeine) return
        const coffee = {
            name,
            year,
            caffeineContent: caffeine
        }
        dispatch(createCoffee(coffee))
        showCoffeeModal(false)
    }


  return (
    <div id="new-coffee-modal">
        <div id="ncm-header">New Coffee</div>
        <div className='ncm-input'>
            <div className='ncm-tag' >Name:</div>
              <input className='ncm-input-box' type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='ncm-input'>
            <div className='ncm-tag' >Year:</div>
              <input className='ncm-input-box' type="text" onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className='ncm-input'>
            <div className='ncm-tag' >Caffeine:</div>
              <input className='ncm-input-box' type="text" onChange={(e) => setCaffeine(e.target.value)} />
        </div>
          <button id="ncm-submit" onClick={submitCoffee}>Submit</button>
    </div>
  )
}

export default NewCoffeeModal