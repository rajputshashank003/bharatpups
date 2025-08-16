import * as React from 'react';
import { useState, useEffect } from "react";

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../Hooks/useAuth.jsx';
import { useCart } from '../Hooks/useCart.jsx';
import classes from "./Header.module.css";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '100%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));
import axios from 'axios';
import Menu_v2 from './Menu_v2.jsx';
import { theme_color } from '../../constants/constants.js';

export default function PrimarySearchAppBar() {
    // userDefined Functions 
    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { searchTerm } = useParams();
    const { cart } = useCart();
    const totalCount = cart.totalCount;

    const { user, logout } = useAuth();
    const [search_placeholder, set_search_placeholder] = useState("AI Search...");
    const [fade_placeholder, set_fade_placeholder] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setTerm(searchTerm ?? '');
    }, [searchTerm]);

    const search = async () => {
        term ? navigate("/search/" + term) : navigate("/");
    };

    useEffect(() => {
        const values = ["AI Search...", "Jaggery", "Gud", "Sweet food"];
        let ind = 0;
        const interval = setInterval(() => {
            set_fade_placeholder(true);
            setTimeout(() => {
                ind = (ind + 1) % values.length;
                set_search_placeholder(values[ind]);
                set_fade_placeholder(false);
            }, 1000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // preDefined style functions 


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMenuOpen(true);
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>
                <Link style={{ color: "black", textDecoration: "none" }} to="/profile">Profile</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
                <span style={{ color: "black", textDecoration: "none" }} onClick={logout}>Logout</span>
            </MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton>
                    {
                        user ? <Link to="/dashboard" style={{ color: "black", textDecoration: "none" }}>
                            {user.name}
                        </Link>
                            :
                            <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
                                login
                            </Link>
                    }
                </IconButton>
            </MenuItem>
            <Link to="/cart" style={{ color: "black", textDecoration: "none" }} >
                <MenuItem>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={totalCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    <p>cart</p>
                </MenuItem>
            </Link>
            {user && <Link to="/orders" style={{ color: "black", textDecoration: "none" }} >
                <MenuItem>
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <BorderColorIcon />
                    </IconButton>
                    <p>orders</p>
                </MenuItem>
            </Link>
            }
            {user && <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>}
        </Menu>
    );



    return (
        <div className="mx-2 sm:my-2" >
            <Box sx={{ flexGrow: 1, position: 'relative' }} >
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: "#2e7d32", // Main AppBar background = green
                        borderRadius: "12px",
                        overflow: 'hidden',
                    }}
                >
                    <Toolbar sx={{ bgcolor: "#ffffff" }}> {/* main inside area near white */}
                        <div
                            className={classes.title + " cursor-pointer relative h-full w-[80px]"}
                            style={{ color: "white", textDecoration: "none" }}
                            onClick={() => navigate('/')} 
                        >
                            <img
                                src={"/AIKSAVA.png"}
                                className="h-[220px] absolute -top-[108px] -left-8 min-w-[125px]"
                            />
                        </div>

                        <Search
                            sx={{
                                bgcolor: '#FEE2E2', // Tailwind green-300
                                borderRadius: "8px",
                                "&:hover": {
                                    bgcolor: "#FECACA", // slightly darker green on hover
                                },
                                "@media only screen and (max-width: 600px)": {
                                    padding: "0px",
                                    margin: "0px",
                                },
                            }}
                        >
                            <SearchIconWrapper>
                                <SearchIcon
                                    sx={{
                                        color: theme_color, // green for icon
                                        "@media only screen and (max-width: 600px)": {
                                            fontSize: "1rem",
                                        },
                                    }}
                                    onClick={search}
                                />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder={search_placeholder}
                                inputProps={{ "aria-label": "search" }}
                                onChange={(e) => setTerm(e.target.value)}
                                onKeyUp={(e) => e.key === "Enter" && search()}
                                value={term}
                                sx={{
                                    width: "100%",
                                    "@media only screen and (max-width: 800px)": {
                                        width: "100%",
                                    },
                                    "@media only screen and (max-width: 600px)": {
                                        width: "100%",
                                        padding: "0px",
                                        margin: "0px",
                                    },
                                    fontWeight: 800,
                                    color: "black", // green input text
                                    opacity: fade_placeholder && term?.length === 0 ? 0 : 1,
                                    transition: "opacity 1.2s linear",
                                }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { xs: "flex", zIndex: "99999999" } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={() => setMenuOpen((prev) => !prev)}
                                sx={{ color: "black" }} // green for MoreIcon
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Menu_v2 totalCount={totalCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
                {/* {renderMobileMenu} */}
                {renderMenu}
            </Box>
        </div>
    );
}