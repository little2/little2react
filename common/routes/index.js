import React from 'react';
import { Route, IndexRoute,Redirect } from 'react-router';
import Main from '../components/Main';
import CheckAuth from '../components/CheckAuth';
import HomePageContainer from '../containers/HomePageContainer';
import LoginPageContainer from '../containers/LoginPageContainer';
import LoginInstantContainer from '../containers/LoginInstantContainer';

import DealerContainer from '../containers/DealerContainer';
import VehicleInventoryContainer from '../containers/VehicleInventoryContainer';
import RecallLogContainer from '../containers/RecallLogContainer';
import SoldLogContainer from '../containers/SoldLogContainer';
import DispatchLogContainer from '../containers/DispatchLogContainer';
import ModelContainer from '../containers/ModelContainer';
import VendorContainer from '../containers/VendorContainer';
import UserPassContainer from '../containers/UserPassContainer';


//合紎詳細內容
import ContractDetailContainer from '../containers/ContractDetailContainer';
import ContractListContainer from '../containers/ContractListContainer';


/*
<IndexRoute component={CheckAuth(HomePageContainer,'home')}/>
<Route path="/login" component={CheckAuth(LoginPageContainer,'guest')}/>
<Route path="/LoginInstant" component={LoginInstantContainer}/>
<Route path="/Dealer" component={CheckAuth(DealerContainer,'auth')}/>
*/




export default (

  <Route path='/' component={Main}>
    <IndexRoute component={HomePageContainer}/>
    <Route path="/login" component={LoginPageContainer}/>
    <Route path="/LoginInstant" component={LoginInstantContainer}/>
    <Route path="/Dealer" component={DealerContainer}/>
    <Route path="/Vehicleinventory" component={VehicleInventoryContainer}/>
    <Route path="/RecallLog" component={RecallLogContainer}/>
    <Route path="/SoldLog" component={SoldLogContainer}/>
    <Route path="/DispatchLog" component={DispatchLogContainer}/>
    <Route path="/Model" component={ModelContainer}/>
    <Route path="/Vendor" component={VendorContainer}/>
    <Route path="/LoginInstant" component={LoginInstantContainer}/>
    <Route path="/UserPass" component={UserPassContainer}/>


    <Route path="/ContractDetail" component={ContractDetailContainer}/>
    <Route path="/ContractList" component={ContractListContainer}/>

  </Route>
);
