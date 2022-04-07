import { combineReducers } from "redux";
import orderstatusreducer from "./orderstatusreducer"
import expressstatusreducer from "./expressstatusreducer";
import dashboardreducer from "./dashboardreducer";
import poreducer from "./poreducer";
import supportreducer from "./supportreducer";
const reducer = combineReducers({
    orderstatusreducer,
    expressstatusreducer,
    dashboardreducer,
    supportreducer,
    poreducer
})
export default reducer;