import csrfFetch from './csrf';

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

const removeCoffee = (coffeeId) => {
    return {
        type: REMOVE_COFFEE,
        coffeeId
    };
}

export const getCoffees = (store) => {
    if (store.coffees) return Object.values(store.coffees)
    return []
}

export const fetchCoffees = () => async dispatch => {
    const response = await csrfFetch(`/api/coffees/`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveCoffees(data));
    }
};

export const createCoffee = (coffee) => async dispatch => {
    const response = await csrfFetch(`/api/coffees/`, {
        method: "POST",
        body: JSON.stringify(coffee),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(receiveCoffee(data.coffee));
    }
}

export const deleteCoffee = (coffeeId) => async dispatch => {
    const response = await csrfFetch(`/api/coffees/${coffeeId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeCoffee(coffeeId));
    }
};

const coffeesReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_COFFEES:
            return { ...newState, ...action.coffees };

        case RECEIVE_COFFEE:
            newState[action.coffee.id] = action.coffee
            return newState;


        case REMOVE_COFFEE:
            delete newState[action.coffeeId]
            return newState;

        default:
            return oldState;
    }
};

export default coffeesReducer

