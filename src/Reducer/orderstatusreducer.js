const initialState = {
    status: ""
};
export default function orderstatusreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SETSTATUS":
            return { status: payload }
        case "RESETSTATUS":
            return { status: "" }
        default:
            return state
    }
}