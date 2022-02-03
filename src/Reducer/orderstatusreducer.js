const initialState = {
    status: 0
};
export default function orderstatusreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SETSTATUS":
            return { ...state, status: state.status + payload }
        case "RESETSTATUS":
            return { ...state, status: "accepted" }
        default:
            return state
    }
}