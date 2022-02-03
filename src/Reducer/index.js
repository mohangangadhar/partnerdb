import { combineReducers } from "redux";
import orderstatusreducer from "./orderstatusreducer"
import expressstatusreducer from "./expressstatusreducer";
const reducer = combineReducers({
    orderstatusreducer,
    expressstatusreducer
})
export default reducer;