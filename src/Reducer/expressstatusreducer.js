const initialState = {
    expressstatus: ""
};
export default function expressstatusreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "SETEXPRESSSTATUS":
            return { expressstatus: payload }
        case "RESETEXPRESSSTATUS":
            return { expressstatus: "" }
        default:
            return state
    }
}