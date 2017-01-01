import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/*
在 checkAuth 這個 Component 中，我們使用到了 Higher Order Components 的觀念。
Higher Order Components 為一個函數， 接收一個 Component 後在 Class Component 的 render 中
return 回傳入的 components 方式去確認使用者是否有登入，若有沒登入則不能進入分享食譜頁面，
反之若已登入也不會再進到登入頁面：
*/

// High Order Component
export default function requireAuthentication(Component, type) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }
    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }
    checkAuth() {
      if(type === 'auth') {
        if (!this.props.isAuthorized) {
          this.props.router.push('/');
        }
      } else if(type === 'guest') {
        if (this.props.isAuthorized) {
          this.props.router.push('/');
        }
      } else if(type === 'home') {
        //若是首頁, 則驗証是否豋入
        if (this.props.isAuthorized) {
          this.props.router.push('/Dealer');
        }
        else {
          this.props.router.push('/login');
        }
      }
    }
    render() {
      return (
        <div>
        {
          (type === 'auth') ?
          this.props.isAuthorized === true ? <Component {...this.props } /> : null
          : this.props.isAuthorized === false ? <Component {...this.props } /> : null
        }
        </div>
      )
    }
  };

  const mapStateToProps = (state) => ({
    isAuthorized: state.getIn(['user', 'isAuthorized']),
  });

  return connect(mapStateToProps)(withRouter(AuthenticatedComponent));
}
