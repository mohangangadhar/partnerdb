const initialState = {
    expressstatus: "",
    page: 0
};
export default function expressstatusreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SETEXPRESSSTATUS":
            return { ...state, expressstatus: payload }
        case "SETEXPRESSPAGE":
            return { ...state, page: payload }
        case "RESETEXPRESSPAGE":
            return { ...state, page: 0 }
        case "RESETEXPRESSSTATUS":
            return { ...state, expressstatus: "" }
        default:
            return state
    }
}