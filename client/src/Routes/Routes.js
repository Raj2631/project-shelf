import React from 'react';
import { Switch } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/Signin';
import Logout from '../pages/Logout/Logout';
import Submitproject from '../pages/SubmitYourProject/Submit';
import Weekly from '../pages/WeeklyProjects/Weekly';
import Error from '../pages/Error/error';

import Activated from '../pages/Activated/Activated';
import NotActivated from '../pages/NotActivated/Notactivated';

import Admin from '../pages/Admin/Admin';

import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

import Edit from '../pages/Edit/Edit';

function Routes(props) {
  return (
    <Switch>
      <PrivateRoutes exact path='/' component={Home}/>
      <PrivateRoutes path='/contact' component={Contact}/>
      <PublicRoutes path='/register' component={Register}/>
      <PublicRoutes path='/signin' component={SignIn}/>

      <PrivateRoutes path='/activated' component={Activated}/>
      <PrivateRoutes
        path='/notactivated'
        component={NotActivated}
      />

      <PrivateRoutes
        isForAdmin='true'
        path='/admin'
        component={Admin}
      />
      <PrivateRoutes path='/logout' component={Logout}/>
      <PrivateRoutes path='/edit/:projectId' component={Edit}/>
      <PrivateRoutes path='/submit' component={Submitproject}/>
      <PrivateRoutes path='/weekly' component={Weekly}/>
      <PublicRoutes component={Error}/>
    </Switch>
  );
}

export default Routes;
