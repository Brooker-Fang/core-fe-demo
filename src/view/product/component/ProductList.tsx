import { Spin } from "antd";
import {showLoading} from "core-fe";
import React, {FC, useCallback} from "react";
import {connect, DispatchProp} from "react-redux";
import { productActions } from "..";
import { RootState } from "../../../type/state";
import {LOADING_PRODUCT_LIST, Product} from "../type";
import { ProductItem } from "./ProductItem";
import { Search } from "./Search";

interface StateProps {
    showLoading: boolean;
    list: Array<Product>;
}

interface Props extends StateProps, DispatchProp {}

export const ProductList:FC<Props> = ({list, showLoading, dispatch }: Props) => {
    const searchProduct = useCallback(
        (search, category) => {
            dispatch(productActions.list(search, category))
        },
        [dispatch],
    )
    return (
            <Spin size="large" spinning={showLoading}>
                <div>
                    <h1>product list</h1>
                    <Search searchProduct={searchProduct}></Search>
                    {list.map(item => {
                        return (
                            <ProductItem key={item._id} product={item}></ProductItem>
                        );
                    })}
                </div>
            </Spin>
        );
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        showLoading: showLoading(state, LOADING_PRODUCT_LIST),
        list: state.app.product.list,
    };
};

export default connect(mapStateToProps)(ProductList);
