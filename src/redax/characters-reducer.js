import {charactersAPI} from "./../API/API"
const CHARACTERS = 'CHARACTERS'
const FETCH = 'FETCH'
const PROFILE = 'PROFILE'
const LIKED = 'LIKED'
let initialState = {
    characters: [],
    isFetching: false,
    profile: {},
    liked: []
}

const charactersReducer = (state = initialState , action) => {
    switch (action.type) {
        case CHARACTERS:
            return {
                ...state,
                characters: action.characters
            };
        case FETCH:
            return {
                ...state,
                isFetching: action.value
            }
        case PROFILE:
            return {
                ...state,
                profile: action.name
            }
        case LIKED:
            return {
                ...state,
                liked: [...state.liked, action.likedItem]
            }
        default:
            return state;
    }
}

export const setCharacters = (characters) => ({type: CHARACTERS, characters})
export const setFetching = (value) => ({type: FETCH, value})
export const setProfile = (name) => ({type: PROFILE, name})
export const setLiked = (likedItem) => ({type: LIKED, likedItem})

export const getCharactersThunk = () =>{
    return async (dispatch) => {
        try{
            dispatch(setFetching(true))
            let response = await charactersAPI.getCharacters();
            dispatch(setCharacters(response.results));
            dispatch(setFetching(false))
        }catch (e) {
            if(e){
                console.log(e)
            }
        }
    }
}


export const getProfileThunk = (name) =>{
    return async (dispatch) => {
        try{
            dispatch(setFetching(true))
            if(window.store.getState().characters.characters.length === 0){
                let response = await charactersAPI.getCharacters();
                dispatch(setCharacters(response.results));
            }
            const profile = window.store.getState().characters.characters.find(obj => obj.name.replace(/\s+/g, '') === name);
            dispatch(setProfile(profile));
            dispatch(setFetching(false))
        }catch (e) {
            if(e){
                console.log(e)
            }
        }
    }
}

export const likeCharacterThunk = (name) =>{
    return (dispatch) => {
        if(window.store.getState().characters.liked.find(obj => obj.name === name) === undefined){
            const likedItem = window.store.getState().characters.characters.find(obj => obj.name === name);
            dispatch(setLiked(likedItem))
        }
    }
}


export default charactersReducer;
