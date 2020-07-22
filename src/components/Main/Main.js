import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useMediaQuery} from '@material-ui/core';
import {useTheme } from '@material-ui/core/styles';
import './main.css'
import {Sidebar, Topbar} from './components';


const Main = props => {
  const {children} = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (value) => {
    setOpenSidebar(value);
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
        closeSidebar={handleSidebarOpen}
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
