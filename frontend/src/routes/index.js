import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/SignIn';

import Route from './Routes';

export default function routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
        </Switch>
    );
}
