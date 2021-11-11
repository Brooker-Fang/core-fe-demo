import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { MailOutlined, AppstoreOutlined, ShopOutlined } from '@ant-design/icons'
import { RootState } from '../../type/state'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { UserState } from '../user/type'
import { useGetUser } from '../../hooks/useGetUser'
interface Props {
  user: UserState
} 
const Navigation: React.FunctionComponent<Props> = ({user}: Props) => {
  const loginUser = useGetUser(false) || null
  return (
    <Menu selectable={false} mode="horizontal">
      <Menu.Item key="home"  icon={<ShopOutlined />}>
        <Link to="/">商城</Link>
      </Menu.Item>
      {!loginUser && (
        <>
          <Menu.Item key="login" icon={<MailOutlined />}>
            <Link to="/login">登录</Link>
          </Menu.Item>
          <Menu.Item key="register"  icon={<AppstoreOutlined />}>
            <Link to="/register">注册</Link>
          </Menu.Item>
        </>
      )}
      <Menu.Item key="admin"  icon={<AppstoreOutlined />}>
        <Link to="/admin">后台</Link>
      </Menu.Item>
      {
       loginUser && "欢迎" + loginUser.name
       
      }
    </Menu>
  )
}
const mapStateToProps = (state: RootState):Props => {
  return {
    user: state.app.user
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
