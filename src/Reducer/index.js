import { combineReducers } from "redux";
import orderstatusreducer from "./orderstatusreducer"
import expressstatusreducer from "./expressstatusreducer";
import dashboardreducer from "./dashboardreducer";
const reducer = combineReducers({
    orderstatusreducer,
    expressstatusreducer,
    dashboardreducer
})
export default reducer;