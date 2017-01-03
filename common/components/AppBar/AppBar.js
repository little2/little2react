import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const AppBar = ({
  isAuthorized,
  onToShare,
  onLogout,
}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">VDSS</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {
        isAuthorized === false ?
        (
          <Nav pullRight>
            <LinkContainer to={{ pathname: '/login' }}><NavItem eventKey={2} href="#">登入</NavItem></LinkContainer>
            <NavItem eventKey={6} href="/LoginInstant">快速登入</NavItem>
          </Nav>
        ) :
        (
          <Nav pullRight>
            <NavItem eventKey={1}  href="/Dealer">專分銷</NavItem>
            <NavDropdown eventKey={2} title="新車庫存" id="basic-nav-dropdown" >
              <MenuItem eventKey={2.1} href="/Vehicleinventory">新車庫存修改</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={2.2} href="/DispatchLog" >車輛調動紀錄</MenuItem>
              <MenuItem eventKey={2.3} href="/RecallLog" >公司調回記錄</MenuItem>
              <MenuItem eventKey={2.4} href="/SoldLog" >車輛售出記錄</MenuItem>
            </NavDropdown>
            <NavItem eventKey={3} href="/UserPass">工作人員權限維護</NavItem>

            <NavDropdown eventKey={4} title="基本資料管理" id="basic-nav-dropdown">
               <MenuItem eventKey={4.1} href='/Model'>機型顏色管理</MenuItem>
               <MenuItem eventKey={4.2} href='/Vendor'>廠牌資料維護</MenuItem>
            </NavDropdown>
            <NavItem eventKey={5} onClick={onLogout} href="#">登出</NavItem>

          </Nav>
        )
      }
    </Navbar.Collapse>
  </Navbar>
);

export default AppBar;
