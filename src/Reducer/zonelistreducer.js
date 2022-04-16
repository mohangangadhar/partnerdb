const initState = {
    zoneList: []
};
export default function zonelistreducer(state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case "GETZONELIST":
            return { zoneList: payload }
        case "RESETZONELIST":
            return { zoneList: [] }
        default:
            return state
    }
}