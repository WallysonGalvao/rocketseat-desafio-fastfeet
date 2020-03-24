import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/SignIn';

/** Order */
import ListOrder from '~/pages/Order/List';
import AddOrder from '~/pages/Order/Add';
import EditOrder from '~/pages/Order/Edit';

/** Deliveryman */
import ListDeliveryman from '~/pages/Deliveryman/List';
import AddDeliveryman from '~/pages/Deliveryman/Add';
import EditDeliveryman from '~/pages/Deliveryman/Edit';

/** Recipients */
import ListRecipient from '~/pages/Recipient/List';
import AddRecipient from '~/pages/Recipient/Add';
import EditRecipient from '~/pages/Recipient/Edit';

/** Problems */
import Problem from '~/pages/Problem';

import Route from './Routes';

export default function routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />
            {/** Order */}
            <Route path="/order" exact component={ListOrder} isPrivate />
            <Route path="/order/add" exact component={AddOrder} isPrivate />
            <Route
                path="/order/edit/:id"
                exact
                component={EditOrder}
                isPrivate
            />

            {/** Deliveryman */}
            <Route
                path="/deliveryman"
                exact
                component={ListDeliveryman}
                isPrivate
            />
            <Route
                path="/deliveryman/add"
                exact
                component={AddDeliveryman}
                isPrivate
            />
            <Route
                path="/deliveryman/edit/:id"
                exact
                component={EditDeliveryman}
                isPrivate
            />
            {/** Recipients */}
            <Route
                path="/recipient"
                exact
                component={ListRecipient}
                isPrivate
            />
            <Route
                path="/recipient/add"
                exact
                component={AddRecipient}
                isPrivate
            />
            <Route
                path="/recipient/edit/:id"
                exact
                component={EditRecipient}
                isPrivate
            />
            {/** Problems */}
            <Route path="/problem" exact component={Problem} isPrivate />
        </Switch>
    );
}
