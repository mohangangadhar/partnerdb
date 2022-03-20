const initialState = {
    apiData: []
};
export default function dashboardreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "GETDATA":
            return { apiData: payload }
        case "RESETDATA":
            return { apiData: [] }
        default:
            return state
    }
}
