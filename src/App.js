import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';


import Individual from './components/AddIndividual';
import Organization from './components/AddOrganization';
import Customer from './components/Customer';
import EditIndividual from './components/EditIndividual';
import EditOrganization from './components/EditOrganization';

const generateClassName = createGenerateClassName({
    productionPrefix: 'Customer',
    productionPrefix: 'Individual',
    productionPrefix: 'Organization',
    productionPrefix: 'EditIndividual',
    productionPrefix: 'EditOrganization',
});

export default ({ history }) => {
    return <div>
        <StylesProvider generateClassName={generateClassName}>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={Customer} exact />

                    <Route path="/components/Organization" component={Organization} exact />

                    <Route path="/components/Individual" component={Individual} exact />

                    <Route path="/Edit/Organization/:id" component={EditOrganization} exact />

                   <Route path="/Edit/Individual/:id" component={EditIndividual} exact />

                </Switch>
            </Router>
        </StylesProvider>
    </div>
};