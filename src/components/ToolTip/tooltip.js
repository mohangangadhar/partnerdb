import react, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { APIURL, GetRequestOptions } from '../../constants/Constants';

import CircularProgress from '@mui/material/CircularProgress';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const CustomTooltip = ({ type, status, id }) => {
    const [orderIds, setOrderIds] = useState([]);
    const [noData, setNoData] = useState(false);
    useEffect(async () => {
        await fetch(APIURL + `order/${type}-order-ids/${status}`, GetRequestOptions).then(
            response => response.json()).
            then(data => {
                setOrderIds(data);
                if (data.length == 0 && setNoData(true));
            });
    }, [])
    return (
        <div>

            <HtmlTooltip
                title={
                    <>
                        <Typography color="inherit">Order Ids:</Typography>
                        {orderIds.length > 0 ?
                            <div style={{ maxHeight: '250px', overflowY: 'scroll' }}>
                                {orderIds.map((data, index) => (
                                    <p><Link to={{
                                        pathname: '/app/order' + '/order/' + data.id,
                                        id: data.id
                                    }}>{data.id}</Link></p>
                                ))
                                }
                            </div> :
                            <>
                                {noData ?
                                    <b>Nothing here:(</b>
                                    : <CircularProgress />
                                }


                            </>
                        }

                    </>
                }
            >
                <p>{id}</p>
            </HtmlTooltip>
        </div>
    );
}
export default CustomTooltip;