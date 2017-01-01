import React from 'react';
import { Grid, Row, Col, Image,Alert,Button } from 'react-bootstrap';
import LoginBoxContainer from '../../containers/LoginBoxContainer';

const LoginPage = ({
  spinnerVisible,
  alertVisible,
  alertErrorMsg,
  onClickHide
}) => (
  <div>
    <Row className="show-grid">
      <Col xs={6} xsOffset={3}>

      { alertVisible === true ?
        <Alert bsStyle="danger" >
          <h4>錯誤發生</h4>
          <p> {alertErrorMsg} </p>
          <p>
            <Button onClick={onClickHide}>隱藏</Button>
          </p>
        </Alert> :
        null
      }
        <LoginBoxContainer />
        { spinnerVisible === true ?
          <Image src="/static/images/loading.gif" /> :
          null
        }
      </Col>
    </Row>
  </div>
);

export default LoginPage;
