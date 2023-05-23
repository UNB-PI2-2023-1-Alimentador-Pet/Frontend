import React from 'react';
import {useUser} from '../hooks/user';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {isLoggedIn} = useUser();

  return <>{isLoggedIn ? <AppStack /> : <AuthStack />}</>;
};

export default Routes;
