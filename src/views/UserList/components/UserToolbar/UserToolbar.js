import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SearchInput} from '../../../../components';
import './userToolbar.css'
import {Button, Drawer, IconButton} from '@material-ui/core';
import AddUser from '../AddUser';


const UserToolbar = props => {
  const {onChange, value} = props;
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (value) => {
    setOpenSidebar(value);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  return (
    <div className="userToolbar">
      <AddUser
        onClose={handleSidebarClose}
        open={openSidebar}
        closeForm={handleSidebarOpen}
      />
      <div className="row">
        <span className= "spacer"/>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleSidebarOpen}>
          Добавить сотрудника
        </Button>

      </div>
      <div className="row">
        <SearchInput
          label={'Введите имя'}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

UserToolbar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,

};

export default UserToolbar;
