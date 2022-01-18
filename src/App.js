import './App.css';
import OrderDetail from "./orders/OrderDetail";
import Dashboard from './dashboard/Dashboard';
import { HashRouter, Link } from 'react-router-dom';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import OrderList from "./orders/OrderList";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LunchDining from "@mui/icons-material/LunchDining";
import { Box, Container } from "@material-ui/core";
import ProductList from "./products/ProductList";
import { ShoppingCart } from "@material-ui/icons";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductDetail from "./products/ProductDetail";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Wallet from "./Wallet/Wallet";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Login from "./Login";
import UserList from "./users/UserList";
import Button from '@mui/material/Button';
import PeopleIcon from '@mui/icons-material/People';
import AodIcon from '@mui/icons-material/Aod';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Reset from './Reset'
import DetailOrderList from './DetailOrder/DetailOrderList';
const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [member, setMember] = React.useState("");
    const [user, error] = useAuthState(auth);
    const history = useHistory();
    let id;
    const logout = () => {
        alert("Signed Out");
        auth.signOut();
    };
    console.log(id);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    if (user) {
        id = auth.currentUser.uid;
        if (id == "GHS5sVHoRShSE2KmLtvVCGue8X82") {
            return (
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" open={open} style={{ background: '#2E3B55' }}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography style={{ flex: 1 }} variant="h6" noWrap component="div">
                                Jeevamrut Partner Dashboard
                            </Typography>
                            <Button variant="contained" onClick={logout}>LogOut</Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open} style={{ background: '#2E3B55' }}>
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </DrawerHeader>
                        <Divider />
                        <List>
                            <HashRouter>
                                <ListItem style={{ color: "wheat" }} button key="DashBoard">
                                    <ListItemIcon>
                                        <Link to={{
                                            pathname: '/app/dashboard',
                                            id: "3"
                                        }}><DashboardIcon /></Link>
                                    </ListItemIcon>
                                    <Link to={{
                                        pathname: '/app/dashboard',
                                        id: "3"
                                    }}><ListItemText primary="DashBoard" /></Link>
                                </ListItem>
                                <ListItem style={{ color: "wheat" }} button key="User">
                                    <ListItemIcon>
                                        <Link to={{
                                            pathname: '/app/user',
                                            id: "3"
                                        }}><PeopleIcon /></Link>
                                    </ListItemIcon>
                                    <Link to={{
                                        pathname: '/app/user',
                                        id: "3"
                                    }}><ListItemText primary="Users" /></Link>
                                </ListItem>
                                <ListItem style={{ color: "wheat" }} button key="Product">
                                    <ListItemIcon>
                                        <Link to={{
                                            pathname: `/app/${id}/product`,
                                            id: "1"
                                        }}><LunchDining /></Link>
                                    </ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/${id}/product`,
                                        id: "1"
                                    }}><ListItemText primary="Product" /></Link>
                                </ListItem>
                                <ListItem button key="Orders">
                                    <ListItemIcon>
                                        <Link to={{
                                            pathname: `/app/order`,
                                            id: "2"
                                        }}><ShoppingCart /></Link>
                                    </ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/order`,
                                        id: "2"
                                    }}><ListItemText primary="Orders" /></Link>
                                </ListItem>
                                <ListItem style={{ color: "wheat" }} button key="Wallet">
                                    <ListItemIcon>
                                        <Link to={{
                                            pathname: '/app/wallet',
                                            id: "3"
                                        }}><AccountBalanceWalletIcon /></Link>
                                    </ListItemIcon>
                                    <Link to={{
                                        pathname: '/app/wallet',
                                        id: "3"
                                    }}><ListItemText primary="Wallet" /></Link>
                                </ListItem>
                                <ListItem button key="DetailOrders">
                                    <ListItemIcon>
                                        <Link to={{
                                            pathname: '/app/detail/order',
                                            id: "4"
                                        }}><AodIcon /></Link>
                                    </ListItemIcon>
                                    <Link to={{
                                        pathname: '/app/detail/order',
                                        id: "4"
                                    }}><ListItemText primary="DetailOrders" /></Link>
                                </ListItem>
                            </HashRouter>
                        </List>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <Container maxWidth="md">
                            <HashRouter>
                                <Switch>
                                    <Route path="/" exact render={() => <Redirect to="/app/dashboard" />} />
                                    <Route path="/app/wallet" user={user} exact component={Wallet} />
                                    <Route path="/app/user" exact component={UserList} />
                                    <Route path="/app/dashboard" exact component={Dashboard} />
                                    <Route exact path="/reset" component={Reset} />
                                    <Route path="/app/detail/order" exact component={DetailOrderList} />
                                    <Route path="/app/:vendorId" exact component={OrderList} />
                                    <Route path="/app/:vendorId/order/:orderId" exact component={OrderDetail} />
                                    <Route path="/app/:vendorId/product/" exact component={ProductList} />
                                    <Route path="/app/:vendorId/product/:productId" exact component={ProductDetail} />
                                    {/*<Route path="/app/:vendorId/product/" exact component={ProductList}/>*/}
                                    {/*<Route path="/" exact render={() => <Redirect to="/app"/>}/>*/}
                                    {/*<PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent}/>*/}
                                    <Redirect from="*" to="/app/user" />
                                </Switch>
                                <NotificationContainer />
                            </HashRouter>
                        </Container>

                    </Box>
                </Box>
            );
        }
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} style={{ background: '#2E3B55' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography style={{ flex: 1 }} variant="h6" noWrap component="div">
                            Jeevamrut Partner Dashboard
                        </Typography>
                        <Button variant="contained" onClick={logout}>LogOut</Button>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} style={{ background: '#2E3B55' }}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <HashRouter>
                            <ListItem style={{ color: "wheat" }} button key="Product">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/${id}/product`,
                                        id: "1"
                                    }}><LunchDining /></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/${id}/product`,
                                    id: "1"
                                }}><ListItemText primary="Product" /></Link>
                            </ListItem>
                            <ListItem button key="Orders">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/${id}`,
                                        id: "2"
                                    }}><ShoppingCart /></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/${id}`,
                                    id: "2"
                                }}><ListItemText primary="Orders" /></Link>
                            </ListItem>
                        </HashRouter>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Container maxWidth="md">
                        <HashRouter>
                            <Switch>
                                <Route path="/" exact render={() => <h1 style={{ color: "white" }}>Welcome to Jeevamrut</h1>} />
                                <Route path="/app/:vendorId" exact component={OrderList} />
                                <Route path="/app/:vendorId/order/:orderId" exact component={OrderDetail} />
                                <Route path="/app/:vendorId/product/" exact component={ProductList} />
                                <Route path="/app/:vendorId/product/:productId" exact component={ProductDetail} />
                                <Redirect from="*" to="/" />
                            </Switch>
                            <NotificationContainer />
                        </HashRouter>
                    </Container>

                </Box>
            </Box>
        );
    }
    else {
        return (
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <HashRouter>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route exact path="/reset" component={Reset} />
                        <Redirect from="*" to="/login" />
                    </Switch>
                </HashRouter>
            </Box>
        )
    }
}

// export default App;