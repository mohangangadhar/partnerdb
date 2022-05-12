import './App.css';
import OrderDetail from "./orders/OrderDetail";
import Dashboard from './dashboard/Dashboard';
import { HashRouter, Link } from 'react-router-dom';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import OrderList from "./orders/OrderList";
import React, { useState, useEffect } from 'react';
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
import ExpressProductList from "./products/ExpressProductList";
import { ShoppingCart } from "@material-ui/icons";
import PhoneIcon from '@mui/icons-material/Phone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProductDetail from "./products/ProductDetail";

import Wallet from "./Wallet/Wallet";
import Wrapper from "./Wrapper"
import PersonIcon from '@mui/icons-material/Person';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import Login from "./Login";
import UserList from "./users/UserList";
import Button from '@mui/material/Button';

import * as Constants from './constants/Constants'
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Reset from './Reset'
import SellerDashBoard from './dashboard/SellerDashboard';
import SellerProfile from './Profile/SellerProfile';
import UserProfile from './Profile/UserProfile';
import ContactUs from './Contact/ContactUs';
import ExpressOrderList from './orders/ExpressOrderList';
import setstatus from './Actions';
import { useSelector, useDispatch } from 'react-redux'

import Support from './Support/Support';
import dummy from './dummy';
import ServiceZones from './ServiceZones/ServiceZones';
import PaymentReports from './PaymentReports/PaymentReports';
import SeasonalOrders from './orders/SeasonalOrders';
import SupplyPlanning from './SupplyPlanning/SupplyPlanning';
import PoReports from './PoReports/PoReports';
import PoReportInfo from './PoReports/PoReportInfo';
import SeasonalTest from './orders/SeasonalTest';
import Expenses from './expenses/Expenses';
import Mango from './mango/mango';

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
    const order = useSelector(state => state.orderstatusreducer);
    const dispatch = useDispatch();
    let id;
    let orderStyle = { fontWeight: 'bold', marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -9 };
    const logout = () => {
        dispatch(setstatus.setstatusresetvalue());
        dispatch(setstatus.setexpressstatusresetvalue());
        history.replace("/login/");
        auth.signOut();
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    if (user) {
        // dispatch(setstatus.setstatusvalue(auth.currentUser.uid == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2" ? "all" : "accepted"));
        id = auth.currentUser.uid;
        if (id == "MWzJ2s6kM5ZUZyaa4l2o37ZQCWj2") {
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
                            <Typography style={{ fontSize: 20, marginRight: 15, fontStyle: 'italic' }}>
                                Hii {Constants.NAMES.get(id)}
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

                                    <Link to={{
                                        pathname: '/app/user',
                                        id: "3"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>Users</h6></Link>


                                    <Link to={{
                                        pathname: '/app/user',
                                        id: "3"
                                    }}><ListItemText primary="Users" /></Link>
                                </ListItem>
                                <ListItem button key="Mango">

                                    <Link to={{
                                        pathname: '/app/mango',
                                        id: "5"
                                    }}><h4 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -10 }}>Mango</h4></Link>

                                    <Link to={{
                                        pathname: '/app/mango',
                                        id: "5"
                                    }}><ListItemText primary="Mango" /></Link>
                                </ListItem>
                                <ListItem button key="Support">
                                    <Link to={{
                                        pathname: '/app/support',
                                        id: "5"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -10 }}>Support</h6></Link>

                                    <Link to={{
                                        pathname: '/app/support',
                                        id: "5"
                                    }}><ListItemText primary="Support" /></Link>
                                </ListItem>
                                <ListItem button key="Expenses">

                                    <Link to={{
                                        pathname: '/app/expenses',
                                        id: "5"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -10 }}>Expenses</h6></Link>

                                    <Link to={{
                                        pathname: '/app/expenses',
                                        id: "5"
                                    }}><ListItemText primary="Expenses" /></Link>
                                </ListItem>
                                <ListItem style={{ color: "wheat" }} button key="Product">

                                    <Link to={{
                                        pathname: `/app/${id}/product`,
                                        id: "1"
                                    }}>
                                        <h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>Products</h6></Link>

                                    <Link to={{
                                        pathname: `/app/${id}/product`,
                                        id: "1"
                                    }}><ListItemText primary="Product" /></Link>
                                </ListItem>
                                <ListItem style={{ color: "wheat" }} button key="ExpressProduct">

                                    <Link to={{
                                        pathname: `/app/${id}/expressproduct`,
                                        id: "8"
                                    }}>
                                        <h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>Express</h6></Link>

                                    <Link to={{
                                        pathname: `/app/${id}/expressproduct`,
                                        id: "8"
                                    }}><ListItemText primary="Express" /></Link>
                                </ListItem>
                                <ListItem button key="Orders">

                                    <Link to={{
                                        pathname: `/app/order`,
                                        id: "2"
                                    }}>
                                        <div >
                                            <h6 style={orderStyle}>Regular</h6>
                                            <h6 style={orderStyle}>Orders</h6>
                                        </div></Link>

                                    <Link to={{
                                        pathname: `/app/order`,
                                        id: "2"
                                    }}><ListItemText primary="Orders" /></Link>
                                </ListItem>

                                <ListItem button key="Orders">

                                    <Link to={{
                                        pathname: `/app/order/express`,
                                        id: "5"
                                    }}>
                                        <div >
                                            <h6 style={orderStyle}>Express</h6>
                                            <h6 style={orderStyle}>Orders</h6>
                                        </div></Link>

                                    <Link to={{
                                        pathname: `/app/order/express`,
                                        id: "5"
                                    }}><ListItemText primary="Orders" /></Link>
                                </ListItem>
                                <ListItem button key="Seasonal Orders">

                                    <Link to={{
                                        pathname: `/app/order/seasonal`,
                                        id: "8"
                                    }}>
                                        <div >
                                            <h6 style={orderStyle}>Seasonal</h6>
                                            <h6 style={orderStyle}>Orders</h6>
                                        </div></Link>

                                    <Link to={{
                                        pathname: `/app/order/seasonal`,
                                        id: "8"
                                    }}><ListItemText primary="Seasonal Orders" /></Link>
                                </ListItem>
                                <ListItem style={{ color: "wheat" }} button key="Wallet">

                                    <Link to={{
                                        pathname: '/app/wallet',
                                        id: "3"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>Wallet</h6></Link>

                                    <Link to={{
                                        pathname: '/app/wallet',
                                        id: "3"
                                    }}><ListItemText primary="Wallet" /></Link>
                                </ListItem>
                                <ListItem button key="ServiceZones">

                                    <Link to={{
                                        pathname: '/app/servicezones',
                                        id: "4"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -10 }}>Service Zones</h6></Link>

                                    <Link to={{
                                        pathname: '/app/servicezones',
                                        id: "4"
                                    }}><ListItemText primary="Service Zones" /></Link>
                                </ListItem>
                                <ListItem button key="PaymentReports">

                                    <Link to={{
                                        pathname: '/app/paymentreports',
                                        id: "6"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -10 }}>Payment Reports</h6></Link>

                                    <Link to={{
                                        pathname: '/app/paymentreports',
                                        id: "6"
                                    }}><ListItemText primary="Payment Reports" /></Link>
                                </ListItem>
                                <ListItem button key="PaymentReports">

                                    <Link to={{
                                        pathname: '/app/poreportsinfo',
                                        id: "8"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -10 }}>Po Reports</h6></Link>

                                    <Link to={{
                                        pathname: '/app/poreportsinfo',
                                        id: "8"
                                    }}><ListItemText primary="Po Reports" /></Link>
                                </ListItem>
                                <ListItem button key="Supply Planning">

                                    <Link to={{
                                        pathname: '/app/supplyplanning',
                                        id: "9"
                                    }}><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -10 }}>Supply Planning</h6></Link>

                                    <Link to={{
                                        pathname: '/app/supplyplanning',
                                        id: "9"
                                    }}><ListItemText primary="Supply Planning" /></Link>
                                </ListItem>

                            </HashRouter>
                        </List>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <DrawerHeader />
                        <Container sx={{ maxWidth: '100%' }} maxWidth={false}>
                            <HashRouter>
                                <Switch>
                                    <Route path="/" exact render={() => <Redirect to="/app/wrapper" />} />
                                    <Route path="/app/wrapper" exact component={Wrapper} />
                                    <Route path="/app/login" exact component={Login} />
                                    <Route exact path="/app/reset" component={Reset} />
                                    <Route path="/app/wallet" user={user} exact component={Wallet} />
                                    <Route path="/app/user" exact component={UserList} />
                                    <Route path="/app/mango" exact component={Mango} />
                                    <Route path="/app/support" exact component={Support} />
                                    <Route path="/app/expenses" exact component={Expenses} />
                                    <Route path="/app/:poNumber/poreports" exact component={PoReports} />
                                    <Route path="/app/poreportsinfo" exact component={PoReportInfo} />
                                    <Route path="/app/servicezones" exact component={ServiceZones} />
                                    <Route path="/app/paymentreports" exact component={PaymentReports} />
                                    <Route path="/app/supplyplanning" exact component={SupplyPlanning} />
                                    <Route path="/app/dummy" exact component={dummy} />
                                    <Route path="/app/dashboard" exact component={Dashboard} />
                                    <Route exact path="/reset" component={Reset} />
                                    <Route path="/app/:vendorId" exact component={OrderList} />
                                    <Route path="/app/:vendorId/seasonal" exact component={SeasonalTest} />
                                    <Route path="/app/:vendorId/express" exact component={ExpressOrderList} />
                                    <Route path="/app/:vendorId/order/:orderId" exact component={OrderDetail} />
                                    <Route path="/app/:vendorId/product/" exact component={ProductList} />
                                    <Route path="/app/:vendorId/product/:productId" exact component={ProductDetail} />
                                    <Route path="/app/:vendorId/expressproduct" exact component={ExpressProductList} />
                                </Switch>
                                <NotificationContainer />
                            </HashRouter>

                        </Container>

                    </Box>
                </Box >
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
                        <Typography style={{ fontSize: 20, marginRight: 15, fontStyle: 'italic' }}>
                            Hii {Constants.NAMES.get(id)}
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
                                        pathname: '/app/sellerdashboard',
                                        id: "1"
                                    }}><DashboardIcon /></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: '/app/sellerdashboard',
                                    id: "1"
                                }}><ListItemText primary="DashBoard" /></Link>
                            </ListItem>
                            <ListItem style={{ color: "wheat" }} button key="Product">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/${id}/product`,
                                        id: "2"
                                    }}><LunchDining /><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>Products</h6></Link>
                                </ListItemIcon>

                                <Link to={{
                                    pathname: `/app/${id}/product`,
                                    id: "2"
                                }}><ListItemText primary="Product" /></Link>
                            </ListItem>
                            <ListItem style={{ color: "wheat" }} button key="ExpressProduct">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/${id}/expressproduct`,
                                        id: "8"
                                    }}><LunchDining />
                                        <h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>Express</h6></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/${id}/expressproduct`,
                                    id: "8"
                                }}><ListItemText primary="Express" /></Link>
                            </ListItem>
                            <ListItem button key="Orders">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/${id}`,
                                        id: "3"
                                    }}><ShoppingCart />
                                        <div >
                                            <h6 style={orderStyle}>Regular</h6>
                                            <h6 style={orderStyle}>Orders</h6>
                                        </div></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/${id}`,
                                    id: "3"
                                }}><ListItemText primary="Orders" /></Link>
                            </ListItem>
                            <ListItem button key="Orders">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/${id}/express`,
                                        id: "3"
                                    }}><ShoppingCart />
                                        <div >
                                            <h6 style={orderStyle}>Express</h6>
                                            <h6 style={orderStyle}>Orders</h6>
                                        </div>
                                    </Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/${id}/express`,
                                    id: "3"
                                }}><ListItemText primary="Orders" /></Link>
                            </ListItem>
                            <ListItem button key="Orders">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/sellerprofile`,
                                        id: "4"
                                    }}><PersonIcon /><p style={{ fontSize: 10, fontWeight: 'bold', marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -9 }}>Seller Profile</p></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/sellerprofile`,
                                    id: "4"
                                }}><ListItemText primary="Profile" /></Link>
                            </ListItem>
                            <ListItem button key="Orders">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/userprofile`,
                                        id: "5"
                                    }}><PersonIcon /><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>User Profile</h6></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/userprofile`,
                                    id: "5"
                                }}><ListItemText primary="Profile" /></Link>
                            </ListItem>
                            <ListItem button key="Orders">
                                <ListItemIcon>
                                    <Link to={{
                                        pathname: `/app/contactus`,
                                        id: "6"
                                    }}><PhoneIcon /><h6 style={{ marginRight: 30, marginTop: 0, marginBottom: 0, marginLeft: -6 }}>Contact Us</h6></Link>
                                </ListItemIcon>
                                <Link to={{
                                    pathname: `/app/contactus`,
                                    id: "6"
                                }}><ListItemText primary="Profile" /></Link>
                            </ListItem>
                        </HashRouter>
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    <Container sx={{ maxWidth: '100%' }} maxWidth={false}>
                        <HashRouter>
                            <Switch>
                                <Route path="/" exact render={() => <Redirect to="/app/wrapper" />} />
                                <Route path="/app/wrapper" exact component={Wrapper} />
                                <Route path="/app/login" exact component={Login} />
                                <Route exact path="/app/reset" component={Reset} />
                                <Route path="/app/sellerdashboard" exact render={(props) => <SellerDashBoard userId={id} {...props} />} />
                                <Route path="/app/sellerprofile" exact component={SellerProfile} />
                                <Route path="/app/userprofile" exact component={UserProfile} />
                                <Route path="/app/contactus" exact component={ContactUs} />
                                <Route path="/app/:vendorId" exact component={OrderList} />
                                <Route path="/app/:vendorId/express" exact component={ExpressOrderList} />
                                <Route path="/app/:vendorId/order/:orderId" exact component={OrderDetail} />
                                <Route path="/app/:vendorId/product/" exact component={ProductList} />
                                <Route path="/app/:vendorId/product/:productId" exact component={ProductDetail} />
                                <Route path="/app/:vendorId/expressproduct" exact component={ExpressProductList} />
                                {/* <Redirect from="*" to="/app/wrapper" /> */}
                            </Switch>
                            <NotificationContainer />
                        </HashRouter>
                    </Container>
                </Box>
            </Box >
        );
    }
    else {
        return (
            <Box component="main">
                <HashRouter>
                    <Switch>
                        <Route path="/" exact render={() => <Redirect to="/app/wrapper" />} />
                        <Route path="/app/wrapper" exact component={Wrapper} />
                        <Route path="/app/login" exact component={Login} />
                        <Route exact path="/app/reset" component={Reset} />
                        <Route path="/app/sellerdashboard" exact component={SellerDashBoard} />
                        <Route path="/app/sellerprofile" exact component={SellerProfile} />
                        <Route path="/app/userprofile" exact component={UserProfile} />
                        <Route path="/app/contactus" exact component={ContactUs} />
                        <Route path="/app/dashboard" exact component={Dashboard} />
                        <Route path="/app/sellerprofile" exact component={SellerProfile} />
                        <Route path="/app/:vendorId" exact component={OrderList} />
                        <Route path="/app/:vendorId/express" exact component={ExpressOrderList} />
                        <Route path="/app/:vendorId/order/:orderId" exact component={OrderDetail} />
                        <Route path="/app/:vendorId/product/" exact component={ProductList} />
                        <Route path="/app/:vendorId/product/:productId" exact component={ProductDetail} />
                        <Redirect from="*" to="/app/wrapper" />
                    </Switch>
                </HashRouter>
            </Box>
        )
    }
}

// export default App;