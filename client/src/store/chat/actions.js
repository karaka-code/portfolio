import axios from 'axios';
import {AFTER_POST_MESSAGE, GET_CHATS} from './consts';

export const getChats = () => dispatch => {
    axios.get(`api/chat/`)
        .then(res => {
            dispatch({
                type: GET_CHATS,
                payload: res.data
            })
        }).catch(err => console.log(err))

}

export function afterPostMessage(data) {

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}