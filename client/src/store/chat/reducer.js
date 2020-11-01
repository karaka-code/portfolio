import {AFTER_POST_MESSAGE, GET_CHATS} from "./consts"

const initialState = {
    chats: null
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS:
            return {...state, chats: action.payload}
        case AFTER_POST_MESSAGE:
            return {...state, chats: state.chats.concat(action.payload)}
        default:
            return state;
    }
}

export default chatReducer