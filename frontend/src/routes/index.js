import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/SignIn';

/** Orders */
import OrderList from '~/pages/Orders/OrderList';

import Route from './Routes';

export default function routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            {/** Orders */}
            <Route path="/orders" exact component={OrderList} isPrivate />
        </Switch>
    );
}
