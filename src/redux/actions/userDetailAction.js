import actionKeys from '../key';
import { getUserDetails } from '../../services/userService'


function markGetUserDetailsLoading() {
    return {
        type: actionKeys.MARK_GET_USER_DETAILS_LOADING
    }
}

function markGetUserDetailsSuccess(data) {
    return {
        type: actionKeys.MARK_GET_USER_DETAILS_SUCCESS,
        payload: data
    }
}

function markGetUserDetailsError(err) {
    return {
        type: actionKeys.MARK_GET_USER_DETAILS_ERROR,
        payload: err
    }
}


export default function getUserDetailsThunk(productId) {
    return async (dispatch) => {
        try {
            dispatch(markGetUserDetailsLoading())
            const data = await getUserDetails(productId);
            dispatch(markGetUserDetailsSuccess(data))
        }
        catch (e) {
            dispatch(markGetUserDetailsError(e));
        }
    }
}
