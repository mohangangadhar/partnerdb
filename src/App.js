import './App.css';
import {Component} from "react";
import SpanningTable from "./Table";
import {Box, Container} from "@material-ui/core";
import Header from "./Header";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Box m={5}/>
                <Container maxWidth="md">
                    <SpanningTable/>
                </Container>
            </div>
        );
    }
}

export default App;
