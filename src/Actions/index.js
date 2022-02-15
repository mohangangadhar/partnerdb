import { APIURL } from '../constants/Constants';
const setstatusvalue = (value) => async dispatch => {
    dispatch({
        type: "SETSTATUS",
        payload: value
    })
}
const setpagevalue = (value) => async dispatch => {
    dispatch({
        type: "SETPAGE",
        payload: value
    })
}

const setstatusresetvalue = () => async dispatch => {
    dispatch({
        type: "RESETSTATUS"
    })
}
const setpageresetvalue = () => async dispatch => {
    dispatch({
        type: "RESETPAGE"
    })
}
const setexpressstatusvalue = (value) => async dispatch => {
    dispatch({
        type: "SETEXPRESSSTATUS",
        payload: value
    })
}
const setexpresspagevalue = (value) => async dispatch => {
    dispatch({
        type: "SETTEXPRESSPAGE",
        payload: value
    })
}
const setexpressstatusresetvalue = () => async dispatch => {
    dispatch({
        type: "RESETEXPRESSSTATUS"
    })
}
const setexpresspageresetvalue = () => async dispatch => {
    dispatch({
        type: "RESETEXPRESSPAGE"
    })
}
const RequestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

export async function fetchTodos(dispatch, getState) {
    const response = await fetch(APIURL, RequestOptions)
        .then(response => response.json());
    dispatch({ type: 'GETDATA', payload: response })
}



export default {
    setstatusvalue,
    setstatusresetvalue,
    setexpressstatusvalue,
    setexpressstatusresetvalue,
    setpagevalue,
    setpageresetvalue,
    setexpresspagevalue,
    setexpresspageresetvalue
}
