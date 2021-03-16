import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...rest}) => {
 return <Route {...rest} render={() => {
   return localStorage.getItem('token') ? (<Component />) : (<Redirect to="/" />)}}/>
}

export default ProtectedRoute;