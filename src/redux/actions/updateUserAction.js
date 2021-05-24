import actionKeys from '../key'


function markUpdateUserLoading() {
    return {
        type: actionKeys.MARK_UPDATE_USER_LOADING
    }
}

function markUpdateUserSuccess(userId,data) {
    return {
        type: actionKeys.MARK_UPDATE_USER_SUCCESS,
        payload: {userId: userId, data: data}
    }
}

function markUpdateUserError(err) {
    return {
        type: actionKeys.MARK_UPDATE_USER_ERROR,
        payload: err
    }
}


export default function updateUserThunk(data) {
    return async (dispatch) => {
        try {
            dispatch(markUpdateUserLoading())
            dispatch(markUpdateUserSuccess(data.id,data))
        }
        catch (e) {
            dispatch(markUpdateUserError(e));
        }
    }
}
