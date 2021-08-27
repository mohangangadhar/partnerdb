import './App.css';
import {PureComponent} from "react";
import OrderDetail from "./OrderDetail";
import {Box, Container} from "@material-ui/core";
import {HashRouter} from 'react-router-dom';
import {Switch, Route, Redirect} from 'react-router';
import Header from "./Header";
import OrderList from "./OrderList";

class App extends PureComponent {
    render() {
        return (
            <div className="App">
                <Header/>
                <Box m={5}/>
                <Container maxWidth="md">
                    <HashRouter>
                        <Switch>
                            <Route path="/" exact render={() => <Redirect to="/app"/>}/>
                            <Route path="/app/:vendorId" exact component={OrderList}/>
                            <Route path="/detail" exact component={OrderDetail}/>
                            {/*<Route path="/" exact render={() => <Redirect to="/app"/>}/>*/}
                            {/*<PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>*/}
                            {/*<Redirect from="*" to="/app/main/dashboard"/>*/}
                        </Switch>
                    </HashRouter>
                </Container>
            </div>
        );
    }
}

export default App;
