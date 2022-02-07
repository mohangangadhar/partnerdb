const setstatusvalue = (value) => async dispatch => {
    dispatch({
        type: "SETSTATUS",
        payload: value
    })
}
const setstatusresetvalue = () => async dispatch => {
    dispatch({
        type: "RESETSTATUS"
    })
}
const setexpressstatusvalue = (value) => async dispatch => {
    dispatch({
        type: "SETEXPRESSSTATUS",
        payload: value
    })
}
const setexpressstatusresetvalue = () => async dispatch => {
    dispatch({
        type: "RESETEXPRESSSTATUS"
    })
}
const RequestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};
const apiUrl = `https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/order/vendor/report`;

export async function fetchTodos(dispatch, getState) {
    const response = await fetch(apiUrl, RequestOptions)
        .then(response => response.json());
    dispatch({ type: 'GETDATA', payload: response })
}



export default {
    setstatusvalue,
    setstatusresetvalue,
    setexpressstatusvalue,
    setexpressstatusresetvalue,
}
