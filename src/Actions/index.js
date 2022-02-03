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
export default {
    setstatusvalue,
    setstatusresetvalue,
    setexpressstatusvalue,
    setexpressstatusresetvalue
}
