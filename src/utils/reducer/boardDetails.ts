export const boardDetailsReducer = (state, action) => {
    switch ( action.type) {
        case "boardNameEdit" :
            return {...state, boardNameEdit : !state.boardNameEdit}
        case "boardDelete" :
            return {...state, boardDelete : !state.boardDelete}
        default:
            return state;
    }
}
