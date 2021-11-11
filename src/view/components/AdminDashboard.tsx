import { Col, Descriptions, Menu, Row, Typography } from 'antd'
import { ShoppingCartOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import { useGetUser } from '../../hooks/useGetUser'
const { Title } = Typography
const AdminDashboard = () => {
  const { name } = useGetUser()
  const adminLinks = () => (
    <>
    <Title level={5}>管理员链接</Title>
    <Menu>
      <Menu.Item key="/category/create">
        <ShoppingCartOutlined></ShoppingCartOutlined>
        <Link to="/create/category">添加分类</Link>
      </Menu.Item>
      <Menu.Item key="/create/product">
        <UserOutlined></UserOutlined>
        <Link to="/create/product">添加产品</Link>
      </Menu.Item>
      <Menu.Item key="/order">
        <OrderedListOutlined></OrderedListOutlined>
        <Link to="/order">订单列表</Link>
      </Menu.Item>
    </Menu>
    </>
  )
  const adminInfo = () => (
    <Descriptions title="管理员信息" bordered>
      <Descriptions.Item label="昵称">{name} </Descriptions.Item>
      <Descriptions.Item label="角色">管理员 </Descriptions.Item>
    </Descriptions>
  )
  return (
    <Layout title="管理员 Dashboard" subTitle="">
      <Row>
        <Col span="4">{adminLinks()}</Col>
        <Col span="20">{adminInfo()}</Col>
      </Row>
    </Layout>
  )
}

export default AdminDashboard
