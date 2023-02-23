import * as api from "../api"
import { fetchAllPosts } from "./post"

export const fetchAllUsers = () => async(dispatch) => {
    try {
        const {data} = await api.fetchAllUsers()
        dispatch({type: 'FETCH_USERS', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
        const {data} = await api.updateProfile(id, updateData)
        dispatch({type: 'UPDATE_CURRENT_USER', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const addFriend = (id, postId) => async (dispatch) => {
    try {
        const {data} = await api.addFriend(id, postId)
        dispatch(fetchAllPosts());
        dispatch(fetchAllUsers());
    } catch (error) {
        console.log(error)
    }
}

export const acceptFriend = (id, friendId) => async (dispatch) => {
    try {
        const {data} = await api.acceptFriend(id, friendId)
        dispatch(fetchAllUsers());
    } catch (error) {
        console.log(error)
    }
}

export const deleteFriend = (id, friendId) => async (dispatch) => {
    try {
        const {data} = await api.deleteFriend(id, friendId)
        dispatch(fetchAllUsers());
        dispatch(fetchAllPosts());
    } catch (error) {
        console.log(error)
    }
}