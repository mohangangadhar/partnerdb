import { APIURL, GetRequestOptions } from '../constants/Constants';
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

const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/vendor/report`;

export async function fetchTodos(dispatch, getState) {
    const response = await fetch(apiUrl, GetRequestOptions)
        .then(response => response.json());
    dispatch({ type: 'GETDATA', payload: response })
}
export async function fetchPoData(dispatch, getState) {
    const response = await fetch(APIURL + "po-report-info/po-summary", GetRequestOptions)
        .then(response => response.json());
    dispatch({ type: 'GETPODATA', payload: response })
}
export async function fetchSupportReport(dispatch, getState) {
    const response = await fetch(APIURL + "support/report", GetRequestOptions)
        .then(response => response.json());
    dispatch({ type: 'GETSUPPORTDATA', payload: response })
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
