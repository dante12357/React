import React from 'react';
import {Switch, Redirect} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout} from './components';

import {
  UserList as UserListView,
  User as UserView,

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
      <Redirect to="/users"/>
    </Switch>
  );
};

export default Routes;
