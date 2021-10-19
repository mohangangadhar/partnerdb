import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
    root: {
        background: "transparent"
    },
    input: {
        color: "wheat"
    }
};

function CustomTextField(props) {
    const { classes, value } = props;

    return (
        <TextField
            disabled
            defaultValue= {value}
            value={value}
            className={classes.root}
            InputProps={{
                className: classes.input
            }}
        />
    );
}

CustomTextField.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTextField);
