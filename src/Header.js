import {Component} from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

class Header extends Component {

    render() {
        return (
            <AppBar position="static" style={{ background: '#2E3B55' }}>
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit">
                        Jeevamrut Partner Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;