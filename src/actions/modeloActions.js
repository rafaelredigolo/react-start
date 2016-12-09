import CourseApi from '../api/mockCourseApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadModelosSuccess(modelos) {
    return { type: types.LOAD_MODELO_SUCCESS, modelos };
}

export function createModeloSuccess(modelo) {
    return { type: types.CREATE_MODELO_SUCCESS, modelo };
}

export function updateModeloSuccess(modelo) {
    return { type: types.UPDATE_MODELO_SUCCESS, modelo };
}

export function loadModelos() {
    return function (dispatch) {
        dispatch(beginAjaxCall());

        return CourseApi.getAllCourses().then( modelos => {            
            dispatch(loadModelosSuccess(modelos));
        }).catch( error => {
            throw(error);
        });
    };
}

export function saveModelo(modelo) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return CourseApi.saveCourse(modelo).then( modelo => {
            modelo.id ? dispatch(updateModeloSuccess(modelo)) : dispatch(createModeloSuccess(modelo));
        }).catch( error => {
            throw(error);
        });
    };
}