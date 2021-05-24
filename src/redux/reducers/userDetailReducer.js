import actionKeys from '../key';

const initialState = {
    loading: false,
    success: {},
    error: ''
}

function userDetailReducer(state = initialState, { type, payload }) {
    switch (type) {
        case actionKeys.MARK_GET_USER_LIST_LOADING:
            return { ...state, loading: payload }
        case actionKeys.MARK_GET_USER_DETAILS_SUCCESS:
            return { ...state, success: payload }
        case actionKeys.MARK_GET_USER_DETAILS_ERROR:
            return { ...state, error: payload }
        default:
            return state;
    }
}

export default userDetailReducer;