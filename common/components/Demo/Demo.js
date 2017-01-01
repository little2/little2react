import React from 'react';
import AppBarContainer from '../../containers/AppBarContainer';
import LoginInstantContainer from '../../containers/LoginInstantContainer';
import DealerContainer from '../../containers/DealerContainer';
//import DealerContainer from '../../containers/DealerContainer';
import { browserHistory, Router, Route,IndexRoute } from 'react-router';
import { Panel } from 'react-bootstrap';

//透過 route 機制讓 AppBarContainer 可以成為整個 App 母模版：
const Main = (props) => (
  <div>
    <AppBarContainer />
    <div>
      <Panel>
        {LoginInstantContainer}
      </Panel>
    </div>
  </div>
);





export default Main;
