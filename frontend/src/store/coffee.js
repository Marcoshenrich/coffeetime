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

const deleteCoffees = (coffeeId) => {
    return {
        type: REMOVE_COFFEE,
        coffeeId
    };
}

export const getCoffees = (store) => {
    if (store.coffee) return Object.values(store.coffee)
    return []
}

export const fetchCoffees = () => async dispatch => {
    const response = await csrfFetch(`/api/coffees/`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveCoffees(data));
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

