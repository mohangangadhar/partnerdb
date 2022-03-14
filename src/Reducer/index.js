import { combineReducers } from "redux";
import orderstatusreducer from "./orderstatusreducer"
import expressstatusreducer from "./expressstatusreducer";
import dashboardreducer from "./dashboardreducer";
import supportreducer from "./supportreducer";
const reducer = combineReducers({
    orderstatusreducer,
    expressstatusreducer,
    dashboardreducer,
    supportreducer
})
export default reducer;