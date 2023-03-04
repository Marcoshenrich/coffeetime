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

const deletePost = (postId) => {
    return {
        type: REMOVE_POST,
        postId
    };
}

export const getPosts = (store) => {
    if (store.posts) return Object.values(store.posts)
    return []
}

export const fetchPosts = () => async dispatch => {
    const response = await csrfFetch(`/api/posts/`)
    if (response.ok) {
        const data = await response.json();
        dispatch(receivePosts(data));
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

