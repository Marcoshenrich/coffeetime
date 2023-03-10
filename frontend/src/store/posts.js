import csrfFetch from './csrf';

const RECEIVE_POST = "RECEIVE_POST"
const RECEIVE_POSTS = "RECEIVE_POSTS"
const REMOVE_POST = "DELETE_POST"

const receivePost = (post) => {
    return {
        type: RECEIVE_POST,
        post
    };
}

const receivePosts = (posts) => {
    return {
        type: RECEIVE_POSTS,
        posts
    };
}

const removePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    };
}

export const getPosts = (sortBy) => (store) => {
    if (!store.posts) return []
    if (sortBy) {
        return Object.values(store.posts)
    } else {
        return Object.values(store.posts).reverse()
    }
}

export const fetchPosts = () => async dispatch => {
    const response = await csrfFetch(`/api/posts/`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receivePosts(data));
    }
};

export const createPost = (post) => async dispatch => {
    const response = await csrfFetch(`/api/posts/`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        dispatch(receivePost(data.post));
    }
}

export const deletePost= (postId) => async dispatch => {
    const response = await csrfFetch(`/api/posts/${postId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removePost(postId));
    }
};

const postsReducer = (oldState = {}, action) => {
    const newState = { ...oldState }
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...newState, ...action.posts };

        case RECEIVE_POST:
            newState[action.post.id] = action.post
            return newState;


        case REMOVE_POST:
            delete newState[action.postId]
            return newState;

        default:
            return oldState;
    }
};

export default postsReducer

