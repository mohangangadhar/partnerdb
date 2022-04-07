const initState = {
    poData: []
};
export default function poreducer(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case "GETPODATA":
            return { poData: payload }
        case "RESETPODATA":
            return { poData: [] }
        default:
            return state
    }
}