import * as api from '../api'

export const verify = (email) => async (dispatch) => {
    try {
        const { data } = await api.verify(email)
        dispatch({type: "VERIFY", payload: data.token})
    } catch (error) {
        console.log(error)
    }
}