// import IconButton from "@mui/material/IconButton";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import Divider from "@mui/material/Divider";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import ListItemText from "@mui/material/ListItemText";
// import {PureComponent} from "react";
// import {Drawer} from "@material-ui/core";
// import {useTheme} from "@mui/material/styles";
//
// class SideDrawer extends PureComponent {
//     render() {
//
//         const theme = useTheme();
//         const [open, setOpen] = React.useState(false);
//
//         const handleDrawerOpen = () => {
//             setOpen(true);
//         };
//
//         const handleDrawerClose = () => {
//             setOpen(false);
//         };
//
//         return (
//             <Drawer variant="permanent" open={open}>
//                 <DrawerHeader>
//                     <IconButton onClick={handleDrawerClose}>
//                         {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
//                     </IconButton>
//                 </DrawerHeader>
//                 <Divider/>
//                 <List>
//                     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                         <ListItem button key={text}>
//                             <ListItemIcon>
//                                 {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
//                             </ListItemIcon>
//                             <ListItemText primary={text}/>
//                         </ListItem>
//                     ))}
//                 </List>
//                 <Divider/>
//                 <List>
//                     {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                         <ListItem button key={text}>
//                             <ListItemIcon>
//                                 {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
//                             </ListItemIcon>
//                             <ListItemText primary={text}/>
//                         </ListItem>
//                     ))}
//                 </List>
//             </Drawer>
//         )
//     }
// }
//
// export default SideDrawer;