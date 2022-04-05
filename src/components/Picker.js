import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core";

const useStyles = (theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 140,
        fontColor: 'white',
    },
});

class Picker extends Component {
    render() {
        const { classes, color, dateChange } = this.props;
        return (
            <form className={classes.container} noValidate={false}>
                <TextField
                    id="date"
                    onChange={dateChange}
                    type="date"
                    defaultValue="2021-07-24"
                    style={{ color: 'white' }}
                    className={classes.textField}
                    InputProps={{
                        style: {
                            color: color,
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                        style: { color: color },
                    }}

                />
            </form>
        );
    }
}

export default withStyles(useStyles, { withTheme: true })(Picker);
