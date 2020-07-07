import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout} from './components';

import {
    UserList as UserListView,
    User as UserView,
    Settings as SettingsView,
    Position as PositionView,
} from './views';

const Routes = () => {
    return (
        <Switch>
            <Redirect
                exact
                from="/"
                to="/users"
            />

            <RouteWithLayout
                component={UserListView}
                exact
                layout={MainLayout}
                path="/users"
            />
            <RouteWithLayout
                component={UserView}
                exact
                layout={MainLayout}
                path="/users/:id"
            />
            <RouteWithLayout
                component={SettingsView}
                exact
                layout={MainLayout}
                path="/settings"
            />
            <RouteWithLayout
                component={PositionView}
                exact
                layout={MainLayout}
                path="/settings/position"
            />
            <Redirect to="/users"/>
        </Switch>
    );
};

export default Routes;
