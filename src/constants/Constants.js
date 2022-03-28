import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
export const APIURL = "https://cors-everywhere.herokuapp.com/http://ec2-3-109-25-149.ap-south-1.compute.amazonaws.com:8080/";
export const NAMES = new Map([
    ["rmD3GlROgVa05wuO4FL69kSTW2h1", "Prachin"],
    ["R3YblWKbKKdKMHql49Old8poLV33", "Timios"],
    ["dj13uVdGK5VTZQDz0T4teFgUSwq2", "Back To Roots"],
    ["QdK65tLzh2bLFsJAeg7rNXgvls02", "Organic India"],
    ["v5ZCktxM9payn1brVLTwDuTxuki1", "Karshaka"],
    ["ojw2faaKUSUauSwfRnjKQhnCaGE3", "Dhriti Organics"],
    ["aCZkj4jPAlWskwhzz2atj0RvqHL2", "Jeevamrut Foods"],
    ["b3No08iVKeX3vAWy7YrKDrlOg742", "Amruthaahaara"],
    ["Z6ZPi59BlLNP9VoeFtQ9IIRbzSB2", "Avani Store"],
    ["sRTIRzWVFFZfZKZcbEYo8H3XRra2", "Daman Organics"],
    ["MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2", "Admin"],
    ["YemIZZ6WV4bzx3uFY7jJP8nQ9DL2", "Devanna Organics"],
    ["p3xMPOxBQpdUnIXfGJAXJ47JYzu1", "Fresh N Desi"],
    ["3DCsUYefHxdD43H0Z1WNw2ghdE52", "Jeevamrut Seasonal"]
]);
export const VENDORNAMES = new Map([
    ["Prachin", "rmD3GlROgVa05wuO4FL69kSTW2h1",],
    ["Timios", "R3YblWKbKKdKMHql49Old8poLV33",],
    ["Back To Roots", "dj13uVdGK5VTZQDz0T4teFgUSwq2",],
    ["Organic India", "QdK65tLzh2bLFsJAeg7rNXgvls02",],
    ["Karshaka", "v5ZCktxM9payn1brVLTwDuTxuki1",],
    ["Dhriti Organics", "ojw2faaKUSUauSwfRnjKQhnCaGE3",],
    ["Jeevamrut Foods", "aCZkj4jPAlWskwhzz2atj0RvqHL2",],
    ["Amruthaahaara", "b3No08iVKeX3vAWy7YrKDrlOg742",],
    ["Avani Store", "Z6ZPi59BlLNP9VoeFtQ9IIRbzSB2"],
    ["Daman Organics", "sRTIRzWVFFZfZKZcbEYo8H3XRra2"],
    ["Admin", "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2"],
    ["Devanna Organics", "YemIZZ6WV4bzx3uFY7jJP8nQ9DL2"],
    ["Fresh N Desi", "p3xMPOxBQpdUnIXfGJAXJ47JYzu1"],
    ["Jeevamrut Seasonal", "3DCsUYefHxdD43H0Z1WNw2ghdE52"]
]);
export const COLORS = {
    accepted: "#059669",
    cancelled: "#B91C1C",
    pending: "#6366F1",
    new: "#2563EB",
    complete: "#D97706",
};
export const CircularProgressInTable = <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>;
export const GetRequestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};
export const detail = (val) => {
    let jsonVal = JSON.parse(val);
    return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
};
export const getRandom = () => {
    let str = (Math.floor(100000 + Math.random() * 900000)).toString();
    console.log(str);
    return str;
}