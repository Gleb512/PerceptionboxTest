export const updateObjectIArray = (items, itemId, objectPropName) => {
    return items.map(u => {
        if(u[objectPropName] === itemId){
            return {...u, liked: true}
        }
        return u;
    })
}