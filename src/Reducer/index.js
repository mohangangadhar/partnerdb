import { combineReducers } from "redux";
import orderstatusreducer from "./orderstatusreducer"
const reducer = combineReducers({
    orderstatusreducer: orderstatusreducer
})
export default reducer;