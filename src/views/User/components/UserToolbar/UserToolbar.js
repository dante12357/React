import React, {useState} from 'react'
import PropTypes from 'prop-types';
import {Button, Tabs, Tab, Box, AppBar, Divider} from "@material-ui/core";
import TabPanel from "./components/TabPanel";
import UserDetails from "./components/UserDetails";
import './userToolbar.css'
import UserEdit from "../../../UserEdit";
import {useTranslation} from "react-i18next";

const UserToolbar = prop => {
    const {data} = prop
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const { t, i18n } = useTranslation('translation');

    return (

        <Box className="userToolbar">
            <div>
                <Tabs value={value} textColor="secondary" onChange={handleChange}>
                    <Tab label={t("Details")} {...a11yProps(0)} />
                    <Tab label="Что-то" {...a11yProps(1)} />
                    <Tab label="Готовится" {...a11yProps(2)} />
                </Tabs>
                <Divider/>
            </div>
            <TabPanel value={value} index={0}>
                <UserDetails data={data}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Пусто
            </TabPanel>
            <TabPanel value={value} index={2}>
                Тут тоже
            </TabPanel>
        </Box>

    )

}

UserToolbar.propTypes = {
    data: PropTypes.array.isRequired
}

export default UserToolbar
