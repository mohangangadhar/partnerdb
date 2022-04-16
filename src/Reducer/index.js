import { combineReducers } from "redux";
import orderstatusreducer from "./orderstatusreducer"
import expressstatusreducer from "./expressstatusreducer";
import dashboardreducer from "./dashboardreducer";
import poreducer from "./poreducer";
import supportreducer from "./supportreducer";
import zonelistreducer from "./zonelistreducer";
const reducer = combineReducers({
    orderstatusreducer,
    expressstatusreducer,
    dashboardreducer,
    supportreducer,
    poreducer,
    zonelistreducer
})
export default reducer;