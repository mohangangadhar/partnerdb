import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const Item = () => {
    let history = useHistory();
    return (
            <button onClick={() => history.goBack()}><ArrowBackIcon/></button>
    );
};
