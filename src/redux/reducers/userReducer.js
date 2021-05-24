import actionKeys from '../key';

const initialState = {
    loading: false,
    success: [],
    error: ''
}

function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case actionKeys.MARK_GET_USER_LIST_LOADING:
            return { ...state, loading: payload }
        case actionKeys.MARK_GET_USER_LIST_SUCCESS:
            return { ...state, success: payload }
        case actionKeys.MARK_GET_USER_LIST_ERROR:
            return { ...state, error: payload }

        case actionKeys.MARK_CREATE_LOADING:
            return { ...state, loading: payload }
        case actionKeys.MARK_CREATE_SUCCESS:
            return { ...state, success: state.success.concat(payload) }
        case actionKeys.MARK_CREATE_ERROR:
            return { ...state, error: payload }
            
        case actionKeys.MARK_UPDATE_USER_LOADING:
            return { ...state, loading: payload }
        case actionKeys.MARK_UPDATE_USER_SUCCESS:
            const userIndex = state.success.findIndex((user) => user.id === payload.userId);
            const userList = state.success
            userList[userIndex] = payload.data
            return { ...state, success: userList }
        case actionKeys.MARK_UPDATE_USER_ERROR:
            return { ...state, error: payload }
        
        case actionKeys.MARK_DELETE_USER_LOADING:
            return { ...state, loading: payload }
        case actionKeys.MARK_DELETE_USER_SUCCESS:
            return { ...state, success: state.success.filter((user) => user.id !== payload)  }
        case actionKeys.MARK_DELETE_USER_ERROR:
            return { ...state, error: payload }

        default:
            return state;
    }
}

export default userReducer;