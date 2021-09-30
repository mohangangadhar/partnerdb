import {Component} from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";

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