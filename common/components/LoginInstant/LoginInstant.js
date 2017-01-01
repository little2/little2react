import React from 'react';
import { Table,FormGroup,ControlLabel,FormControl,Alert,Button } from 'react-bootstrap';
import LoginInstantContainer from '../../containers/LoginInstantContainer';
//import keyboard from '../../../server/public/keyboard.css';
import { Shake } from 'reshake'


const LoginInstant = ({
  password,
  shakeFixed,
  keyframe,
  loginStatus,
  onClickKeyboardNumber,
}) => (
<div>
  <FormGroup >
    <ControlLabel><h1>請輸入密碼</h1></ControlLabel>
    <Shake h={10} v={0} r={3} int={keyframe} fixed={shakeFixed}>
      <FormControl type="password" id="instantPassword" className='textAlignCenter textH1' value={password} readOnly/>
    </Shake>
  </FormGroup>
  <Table bsClass='KeyboardTable' onClick={onClickKeyboardNumber} >
    <tbody>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>4</td>
        <td>5</td>
        <td>6</td>
      </tr>
      <tr>
        <td>7</td>
        <td>8</td>
        <td>9</td>
      </tr>
      <tr>
        <td></td>
        <td>0</td>
        <td></td>
      </tr>
    </tbody>
  </Table>



</div>
);

export default LoginInstant;
