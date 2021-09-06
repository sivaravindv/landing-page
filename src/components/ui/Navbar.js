import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import Drawer from '@material-ui/core/Drawer';
import { BrowserRouter as Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: 'Montserrat, sans-serif',
    fontStyle: 'normal',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  mobileToolBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    flexGrow: 1,
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '32px',
    textAlign: 'center',
    letterSpacing: '0.1px',
    color: '#FFFFFF',
  },
  menuButton: {
    padding: '1.31rem',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '24px',
    textAlign: 'center',
    letterSpacing: '0.2px',
  },
  navMenu: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'Flex-end',
    marginRight: '4rem',
  },

  mobileNavMenu: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'Flex-end',
  },

  appBarTransparent: {
    backgroundColor: 'transparent',
  },
  appBarSolid: {
    backgroundColor: ' #252B42',
  },
}));

const navBarData = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Product',
    href: '/product',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Navbar() {
  const classes = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const NavbarShortcuts = () => {
    return (
      <div style={{ padding: '1.31rem' }}>
        <IconButton aria-label="search" style={{ color: '#ffff' }}>
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="shoppingcart" style={{ color: '#ffff' }}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
      </div>
    );
  };
  const displayDesktop = () => {
    return (
      <Toolbar className={classes.toolBar}>
        {companyName}
        <div className={classes.navMenu}>
          {getMenuButtons()}
          <NavbarShortcuts />
        </div>
        <div>
          <IconButton
            aria-label="sort"
            style={{
              color: '#ffff',
              transform: 'scaleX(-1)',
              padding: '1.31rem',
            }}
          >
            <SortIcon />
          </IconButton>
        </div>
      </Toolbar>
    );
  };

  const companyName = (
    <Typography variant="h6" component="h1" className={classes.logo}>
      Nasscorp
    </Typography>
  );

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar className={classes.mobileToolBar}>
        <div>{companyName}</div>
        <div className={classes.mobileNavMenu}>
          <NavbarShortcuts />
          <IconButton
            {...{
              edge: 'start',
              color: 'inherit',
              'aria-label': 'menu',
              'aria-haspopup': 'true',
              onClick: handleDrawerOpen,
            }}
          >
            <SortIcon
              style={{
                color: '#ffff',
                transform: 'scaleX(-1)',
              }}
            />
          </IconButton>
        </div>
        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div>{getDrawerChoices()}</div>
        </Drawer>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return navBarData.map(({ label, href }) => {
      return (
        <Link
          {...{
            component: Link,
            to: href,
            color: 'inherit',
            style: { textDecoration: 'none' },
            key: label,
          }}
        >
          <Button>{label}</Button>
        </Link>
      );
    });
  };
  const getMenuButtons = () => {
    return navBarData.map(({ label, href }) => {
      return (
        <Button
          className={classes.menuButton}
          {...{
            key: label,
            color: 'inherit',
            to: href,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <ElevationScroll>
      <AppBar className={clsx(classes.root, classes.appBarTransparent)}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </ElevationScroll>
  );
}
