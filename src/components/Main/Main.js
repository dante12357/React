import React, {useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {useMediaQuery} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './main.css'
import {Sidebar, Topbar, Footer} from './components';


const Main = props => {
  const {children} = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div className="wrap">
      <Topbar className="appBar" onSidebarOpen={handleSidebarOpen}/>
      <Sidebar
        className="drawer"
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main>
        {children}
        {/*<Footer />*/}
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;