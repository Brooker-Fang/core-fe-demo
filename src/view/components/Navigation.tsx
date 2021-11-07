import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons'
import { RootState } from '../../type/state'
import { connect } from 'react-redux'
import { userActions } from "../user";
import { Dispatch } from 'redux'
interface Props {
  user: UserState
} 
const Navigation: React.FunctionComponent<Props> = ({user}: Props) => {
  return (
    <Menu selectable={false} mode="horizontal">
      <Menu.Item key="home"  icon={<MailOutlined />}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item key="shop"  icon={<AppstoreOutlined />}>
        <Link to="/shop">商城</Link>
      </Menu.Item>
      {!user && (
        <>
          <Menu.Item key="login" icon={<MailOutlined />}>
            <Link to="/login">登录</Link>
          </Menu.Item>
          <Menu.Item key="register" icon={<AppstoreOutlined />}>
            <Link to="/register">注册</Link>
          </Menu.Item>
        </>
      )}
      {
        user && (
          <Menu.Item >
            <Link to="/signin">dashboard</Link>
          </Menu.Item>
        )
      }
    </Menu>
  )
}
const mapStateToProps = (state: RootState) => {
  return {
    user: state.app.user.currentUser
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({
  register: () => {
      dispatch(userActions.register());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
