import actionKeys from '../key';
import { getUserList} from '../../services/userService'
function markGetUserListLoading(data) {
    return {
        type: actionKeys.MARK_GET_USER_LIST_LOADING,
        payload: data
    }
}

function markGetUserListSuccess(data) {
    return {
        type: actionKeys.MARK_GET_USER_LIST_SUCCESS,
        payload: data
    }
}

function markGetUserListError(err) {
    return {
        type: actionKeys.MARK_GET_USER_LIST_ERROR,
        payload: err
    }
}


export default function getUserListThunk() {
    return async (dispatch) => {
        try {
            dispatch(markGetUserListLoading(true))
            const data = await getUserList();
            dispatch(markGetUserListLoading(false))
            dispatch(markGetUserListSuccess(data))

        }
        catch (e) {
            dispatch(markGetUserListLoading(false))
            dispatch(markGetUserListError(e))
        }
    }
}
