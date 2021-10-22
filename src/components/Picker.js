import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import {withStyles} from "@material-ui/core";

const useStyles = (theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 140,
        fontcolor: 'white',
    },
});

class Picker extends Component {
    render() {
        const {classes, dateChange} = this.props;
        return (
            <form className={classes.container} noValidate={false}>
                <TextField
                    id="date"
                    onChange={dateChange}
                    type="date"
                    defaultValue="2021-07-24"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </form>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(Picker);
