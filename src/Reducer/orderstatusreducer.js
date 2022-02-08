const initialState = {
    status: "",
    page: 0
};
export default function orderstatusreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SETSTATUS":
            return { ...state, status: payload }
        case "SETPAGE":
            return { ...state, page: payload }
        case "RESETPAGE":
            return { ...state, page: 0 }
        case "RESETSTATUS":
            return { ...state, status: "" }
        default:
            return state
    }
}