import actionKeys from '../key'


function markCreateUserLoading() {
    return {
        type: actionKeys.MARK_CREATE_LOADING
    }
}

function markCreateUserSuccess(data) {
    return {
        type: actionKeys.MARK_CREATE_SUCCESS,
        payload: data
    }
}

function markCreateUserError(err) {
    return {
        type: actionKeys.MARK_CREATE_ERROR,
        payload: err
    }
}


export default function createUserThunk(data) {
    return (dispatch) => {
        try {
            dispatch(markCreateUserLoading())
            dispatch(markCreateUserSuccess(data))
        }
        catch (e) {
            dispatch(markCreateUserError(e));
        }
    }
}
