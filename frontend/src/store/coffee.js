

const RECEIVE_COFFEE = "RECEIVE_COFFEE"
const RECEIVE_COFFEES = "RECEIVE_COFFEES"
const REMOVE_COFFEE = "DELETE_COFFEE"

const receiveCoffee = (coffee) => {
    return {
        type: RECEIVE_COFFEE,
        coffee
    };
}

const receiveCoffees = (coffees) => {
    return {
        type: RECEIVE_COFFEES,
        coffees
    };
}

const deleteCoffees = (coffeeId) => {
    return {
        type: REMOVE_COFFEE,
        coffeeId
    };
}

