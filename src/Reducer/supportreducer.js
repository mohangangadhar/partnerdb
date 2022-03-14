const initialState = {
    apiData: []
};
export default function supportreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "GETSUPPORTDATA":
            return { apiData: payload }
        case "RESETSUPPORTDATA":
            return { apiData: [] }
        default:
            return state
    }
}
