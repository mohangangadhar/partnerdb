import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
export const NAMES = new Map([
    ["rmD3GlROgVa05wuO4FL69kSTW2h1", "Prachin"],
    ["R3YblWKbKKdKMHql49Old8poLV33", "Timios"],
    ["dj13uVdGK5VTZQDz0T4teFgUSwq2", "Back To Roots"],
    ["QdK65tLzh2bLFsJAeg7rNXgvls02", "Organic India"],
    ["BmrmogRff2acERXFBGJllLAVLCQ2", "Karshaka"],
    ["ojw2faaKUSUauSwfRnjKQhnCaGE3", "Dhriti Organics"],
    ["aCZkj4jPAlWskwhzz2atj0RvqHL2", "Jeevamrut Foods"],
    ["b3No08iVKeX3vAWy7YrKDrlOg742", "Amruthaahaara"],
    ["Z6ZPi59BlLNP9VoeFtQ9IIRbzSB2", "Avani Store"],
    ["sRTIRzWVFFZfZKZcbEYo8H3XRra2", "Daman Organics"],
    ["MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2", "Admin"],
    ["YemIZZ6WV4bzx3uFY7jJP8nQ9DL2", "Devanna Organics"],
    ["p3xMPOxBQpdUnIXfGJAXJ47JYzu1", "Fresh N Desi"],
]);
export const VENDORNAMES = new Map([
    ["Prachin", "rmD3GlROgVa05wuO4FL69kSTW2h1",],
    ["Timios", "R3YblWKbKKdKMHql49Old8poLV33",],
    ["Back To Roots", "dj13uVdGK5VTZQDz0T4teFgUSwq2",],
    ["Organic India", "QdK65tLzh2bLFsJAeg7rNXgvls02",],
    ["Karshaka", "BmrmogRff2acERXFBGJllLAVLCQ2",],
    ["Dhriti Organics", "ojw2faaKUSUauSwfRnjKQhnCaGE3",],
    ["Jeevamrut Foods", "aCZkj4jPAlWskwhzz2atj0RvqHL2",],
    ["Amruthaahaara", "b3No08iVKeX3vAWy7YrKDrlOg742",],
    ["Avani Store", "Z6ZPi59BlLNP9VoeFtQ9IIRbzSB2"],
    ["Daman Organics", "sRTIRzWVFFZfZKZcbEYo8H3XRra2"],
    ["Admin", "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2"],
    ["Devanna Organics", "YemIZZ6WV4bzx3uFY7jJP8nQ9DL2"],
    ["Fresh N Desi", "p3xMPOxBQpdUnIXfGJAXJ47JYzu1"],
]);
export const COLORS = {
    accepted: "#059669",
    cancelled: "#B91C1C",
    pending: "#6366F1",
    new: "#2563EB",
    complete: "#D97706",
};
export const CircularProgressInTable = <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>;