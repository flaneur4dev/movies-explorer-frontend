import { memo } from "react";
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => (
  <Route path={props.path}>
    {props.isLoggedIn ? props.children : <Redirect to="/signin" />}
  </Route>
)

export default memo(ProtectedRoute)
