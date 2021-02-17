import * as axios from "axios";

const instance = axios.create({});


export const charactersAPI = {
    getCharacters () {
        return instance.get(`https://swapi.dev/api/people`).then(response => {
            return response.data;
        });
    },
    getUrlValue(url){
        return instance.get(url).then(response => {
            return response.data;
        });
    }
}