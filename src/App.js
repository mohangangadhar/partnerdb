import './App.css';
import {PureComponent} from "react";
import OrderDetail from "./OrderDetail";
import {Box, Container} from "@material-ui/core";
import {HashRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import Header from "./Header";
import OrderList from "./OrderList";

class App extends PureComponent {
    render() {
        return (
            <div className="App">
                <Header/>
                <Box m={5}/>
                <Container maxWidth="md">
                    {/*<OrderList/>*/}
                    <HashRouter>
                        <Switch>
                            <Route path="/" exact component={OrderList}/>
                            <Route path="/order" exact component={OrderDetail}/>
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
