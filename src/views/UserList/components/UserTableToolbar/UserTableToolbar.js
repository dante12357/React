import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {SearchInput} from '../../../../components';
import './userTableToolbar.css'
import {Button, Drawer, IconButton} from '@material-ui/core';
import AddUser from '../AddUser';
import {useTranslation} from "react-i18next";


const UserTableToolbar = props => {
  const {onChange, value} = props;
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (value) => {
    setOpenSidebar(value);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
    const { t, i18n } = useTranslation('translation');

  return (
    <div className="userTableToolbar">
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
            {t('Add employee')}
        </Button>

      </div>
      <div className="row">
        <SearchInput
          label={t('Enter name')}
          placeholder={t('Enter name')}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};

UserTableToolbar.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,

};

export default UserTableToolbar;
