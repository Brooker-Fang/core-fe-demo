import { Spin } from "antd";
import {showLoading} from "core-fe";
import React, {FC, useCallback, useEffect} from "react";
import {connect, DispatchProp} from "react-redux";
import { productActions } from "..";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { RootState } from "../../../type/state";
import {LOADING_PRODUCT_LIST, Product} from "../type";
import ProductItem from "./ProductItem";
import { Search } from "./Search";
import Layout from '../../components/Layout'
import { Row, Typography } from 'antd'
import style from "./style.module.css"
import { categoryActions } from "../../category";
const { Title } = Typography
interface StateProps {
    showLoading: boolean;
    list: Array<Product>;
}

interface Props extends StateProps, DispatchProp {}
console.log(style)
export const ProductList:FC<Props> = ({list, showLoading, dispatch }: Props) => {
    useEffect(() => {
        dispatch(categoryActions.list())
    }, [dispatch])
    const searchProduct = useCallback(
        (search, category) => {
            console.log('search===',search, category)
            dispatch(productActions.search(search, category))
        },
        [dispatch],
    )
    useDocumentTitle('产品页面')
    return (
        <Layout  title="商城首页" subTitle="挑选你喜欢的商品吧">
            <Title level={5}>
                最新上架
            </Title>
            <Row gutter={[16, 16]}>
            <Spin size="large" spinning={showLoading}>
                <div>
                    <Search searchProduct={searchProduct}></Search>
                    <div className={style['list-wrap']}>
                        {list.map(item => {
                            return (
                                <ProductItem key={item._id} product={item}></ProductItem>
                            );
                        })}
                    </div>
                    
                </div>
            </Spin>
            </Row>
        </Layout>
        );
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        showLoading: showLoading(state, LOADING_PRODUCT_LIST),
        list: state.app.product.list,
    };
};

export default connect(mapStateToProps)(ProductList);
