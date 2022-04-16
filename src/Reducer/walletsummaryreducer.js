const initialState = {
    walletData: {}
};
export default function walletsummaryreducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case "GETWALLETSUMMARY":
            return { walletData: payload }
        case "RESETWALLETSUMMARY":
            return { walletData: {} }
        default:
            return state
    }
}
