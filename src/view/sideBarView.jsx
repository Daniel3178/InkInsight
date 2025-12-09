import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { FaBars } from "react-icons/fa";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const SidebarView = (props) => {

  const renderSettingsMenuItems = () => {
    return (
      <Menu
        id="appBar"
        anchorEl={props.anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(props.anchorElUser)}
        onClose={props.handleSettingsCloseClick}
      >
        {props.settingsPages.map((setting, index) => (
          <MenuItem key={index} onClick={props.handleSettingsCloseClick}>
            {index === 0 ? (
              <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit'}}>
                <Typography variant="body1" style={{ textAlign: 'center', fontSize: '20px'   }}>{setting.name}</Typography>
              </Link>
            ) : (
              <Typography variant="body1" style={{ textAlign: 'center', }}>{setting}</Typography>
            )}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  const renderSidebarList = () => {
    return (
      <Drawer anchor="left" open={props.sidebarOpen} onClose={props.toggleDrawer(false)}>
        <List style={{ width: 250 }}>
          {props.allPages.map((page) => (
            <ListItem
            key={page.name}
            component={page.name === 'Lists Page' && !props.isLoggedIn ? 'div' : Link}
            to={page.path}
            onClick={(event) => {
              props.toggleDrawer(false)(event);
              if (!props.isLoggedIn && page.name === 'Lists Page') {
                alert('Please log in to access this page');
              }
            }}
            >
              <Typography variant="body1"style={{ textAlign: 'center', fontSize: '20px'   }}>{page.name}</Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };


  return (

      <div style={{ display: 'flex' }}>
        <AppBar position="fixed" style={{ backgroundColor: '#30475e' }}>
          <Toolbar>
            <IconButton onClick={props.toggleDrawer(true)} edge="start" color="inherit" aria-label="menu"
              style={{ fontSize: '32px' }} >
              <FaBars />
            </IconButton>
            <Typography variant="h4" style={{ flexGrow: 1 }}>
              InkInsight
            </Typography>
            <Box style={{ flexGrow: 0 }}>
              <Tooltip title="Open Settings">
                <IconButton onClick={props.handleSettingsOpenClick} style={{ padding: 0 }}>
                  <Avatar alt="Settings" src="https://static-00.iconduck.com/assets.00/settings-icon-2048x2046-cw28eevx.png" />
                </IconButton>
              </Tooltip>
              {renderSettingsMenuItems()}
            </Box>
          </Toolbar>
        </AppBar>
        {renderSidebarList()}
        <div style={{ marginLeft: 30, marginTop: 64, padding: 20 }}>
        </div>
      </div>

  );
};

export  {SidebarView};