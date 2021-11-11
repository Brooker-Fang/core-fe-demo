import { Spin, Table, Space } from "antd";
import {showLoading} from "core-fe";
import React, {FC} from "react";
import {connect, DispatchProp} from "react-redux";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { RootState } from "../../../type/state";
import {LOADING_PRODUCT_LIST, Product} from "../type";
import Layout from '../../components/Layout'
import { Category } from "../../category/type";
import { Link } from 'react-router-dom'
import productListData from "../data";
interface StateProps {
    showLoading: boolean;
    list: Array<Product>;
}
interface Props extends StateProps, DispatchProp {}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'category',
    dataIndex: 'category',
    key: 'category',
    render: (category: Category) => (
      <>
        {category.name}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: Product) => {
      return <Space size="middle">
        <Link to={`/edit/product/${record._id}`}>编辑</Link>
      </Space>
    }
  },
]
export const ProductAdminList:FC<Props> = ({list, showLoading, dispatch }: Props) => {
  if(!list.length) {
    list = [...productListData]
  }
    useDocumentTitle('产品列表页面')
    return (
      <Layout  title="产品列表" subTitle="管理你的商品吧">
            <Spin size="large" spinning={showLoading}>
                <div>
                <Table rowKey="_id" columns={columns} dataSource={list} />
                </div>
            </Spin>
            </Layout>
        );
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        showLoading: showLoading(state, LOADING_PRODUCT_LIST),
        list: state.app.product.list,
    };
};

export default connect(mapStateToProps)(ProductAdminList);
