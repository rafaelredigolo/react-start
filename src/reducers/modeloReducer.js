import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function modelos( state = initialState.modelos, action) {
    
    switch (action.type) {
        case types.LOAD_MODELO_SUCCESS:            
            return action.modelos;

        case types.CREATE_MODELO_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.modelo)
            ];
        
        case types.UPDATE_MODELO_SUCCESS:
            return [
                ...state.filter(modelo => modelo.id !== action.modelo.id),
                Object.assign({}, action.modelo)
            ];
            
        default:
            return state;
    }
    
}