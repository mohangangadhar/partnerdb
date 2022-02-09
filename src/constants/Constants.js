import CircularProgress from '@mui/material/CircularProgress';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
export const NAMES = new Map([
    ["tBsugnxftHgm4otLNN9RPGUnJYq1", "Prachin"],
    ["nyIhUGpMiUdMMz6CAlKclghdlVg1", "Timios"],
    ["1St2bLHjMMg3egWU97mDF3lWFTS2", "Back To Roots"],
    ["NIgOuTnuZzUOnf23oLisxVFzUfs1", "Organic India"],
    ["riwdTSGv8zWuMnAY3kDbJgP6TBI3", "Karshaka"],
    ["mIn2HQgZL7MwJER3dJ8H8O2BVXR2", "Dhriti Organics"],
    ["C7rNv2Fz39T3hFTI1XiUvJyXR1I3", "Jeevamrut Foods"],
    ["nWI9sKAer6eQTJ3qxTtgRCEyWx43", "Amruthaahaara"],
    ["3KbSoiJdzYO8ZVZ30lzDZ62XPYU2", "Avani Store"],
    ["dnMU78iXBqXlrZ0lvQ3ZB5H2Kp13", "Daman Organics"],
    ["GHS5sVHoRShSE2KmLtvVCGue8X82", "Admin"]
]);
export const VENDORNAMES = new Map([
    ["Prachin", "tBsugnxftHgm4otLNN9RPGUnJYq1",],
    ["Timios", "nyIhUGpMiUdMMz6CAlKclghdlVg1",],
    ["Back To Roots", "1St2bLHjMMg3egWU97mDF3lWFTS2",],
    ["Organic India", "NIgOuTnuZzUOnf23oLisxVFzUfs1",],
    ["Karshaka", "riwdTSGv8zWuMnAY3kDbJgP6TBI3",],
    ["Dhriti Organics", "mIn2HQgZL7MwJER3dJ8H8O2BVXR2",],
    ["Jeevamrut Foods", "C7rNv2Fz39T3hFTI1XiUvJyXR1I3",],
    ["Amruthaahaara", "nWI9sKAer6eQTJ3qxTtgRCEyWx43",],
    ["Avani Store", "3KbSoiJdzYO8ZVZ30lzDZ62XPYU2"],
    ["Daman Organics", "dnMU78iXBqXlrZ0lvQ3ZB5H2Kp13"],
    ["Admin", "GHS5sVHoRShSE2KmLtvVCGue8X82",]
]);
export const COLORS = {
    accepted: "#059669",
    cancelled: "#B91C1C",
    pending: "#6366F1",
    new: "#2563EB",
    complete: "#D97706",
};
export const CircularProgressInTable = <TableRow> <TableCell align="center"><CircularProgress /></TableCell></TableRow>;
