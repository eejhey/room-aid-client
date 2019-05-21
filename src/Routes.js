import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Setup, LandingPage } from './App';
import { LoginPage } from './views/login';
import Dashboard from './views/dashboard';

export class RoutePath {
    static Login = "/login";
    static Dashboard = "/home";
}

export const Routes = () => {
    return (
        <>
            <Route path={"/"} component={Setup} />
            <Switch>
                <Route exact path={"/"} component={LandingPage} />
                <Route path={RoutePath.Login} component={LoginPage} />
                <Route path={RoutePath.Dashboard} component={Dashboard} />
            </Switch>
        </>
    )
}