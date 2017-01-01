import React from 'react';
import AppBarContainer from '../../containers/AppBarContainer';
import { Panel } from 'react-bootstrap';

//透過 route 機制讓 AppBarContainer 可以成為整個 App 母模版：
const Main = (props) => (
  <div>
    <AppBarContainer />
    <div>
      <Panel>
      {props.children}
      </Panel>
    </div>
  </div>
);

export default Main;
