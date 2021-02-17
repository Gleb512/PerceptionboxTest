

let SETAUTH = 'SETAUTH'
let SETDATA = 'SETDATA'
let SETPRICTURE = 'SETPRICTURE'

let initialState = {
    login: false,
    data: {},
    picture: ''
}

const loginReducer = (state = initialState , action) => {
    switch (action.type) {
        case SETAUTH:
            return {
                ...state,
                login: action.value
            };
        case SETDATA:
            return {
                ...state,
                data: action.value
            };
        case SETPRICTURE:
            return {
                ...state,
                picture: action.value
            };
        default:
            return state;
    }
}

export const setLogin = (value) => ({type: SETAUTH, value})
export const setData = (value) => ({type: SETDATA, value})
export const setPicture = (name) => ({type: SETPRICTURE, name})

export const setFaceBookLoginThunk = (response) =>{
    return (dispatch) => {
        dispatch(setData(response))
        dispatch(setPicture(response.picture.data.url))
        if (response.accessToken) {
            dispatch(setLogin(true))
        } else {
            dispatch(setLogin(false))
        }
    }
}

export default loginReducer;
