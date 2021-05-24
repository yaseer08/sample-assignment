import actionKeys from '../key'
import { deleteUser } from '../../services/userService'


function markDeleteUserLoading() {
    return {
        type: actionKeys.MARK_DELETE_USER_LOADING
    }
}

function markDeleteUserSuccess(data) {
    return {
        type: actionKeys.MARK_DELETE_USER_SUCCESS,
        payload: data
    }
}

function markDeleteUserError(err) {
    return {
        type: actionKeys.MARK_DELETE_USER_ERROR,
        payload: err
    }
}


export default function deleteUserThunk(userId) {
    return async (dispatch) => {
        try {
            dispatch(markDeleteUserLoading())
            dispatch(markDeleteUserSuccess(userId))
        }
        catch (e) {
            dispatch(markDeleteUserError(e));
        }
    }
}
