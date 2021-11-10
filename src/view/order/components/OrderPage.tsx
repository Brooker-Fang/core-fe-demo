
import {showLoading} from "core-fe";
import React, {createContext, FC} from "react";
import {connect, DispatchProp} from "react-redux";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { RootState } from "../../../type/state";
import {LOADING_ORDER_LIST, Order} from "../type";
import { OrderList } from "./OrderList";

interface StateProps {
    showLoading: boolean;
    list: Array<Order>;
}

interface Props extends StateProps, DispatchProp {}
export const orderContext = createContext<StateProps>({list:[], showLoading: false})
export const OrderListPage:FC<Props> = ({list, showLoading, dispatch }: Props) => {
  useDocumentTitle('订单页面')
    return (
            <orderContext.Provider value={{list, showLoading}} >
              <OrderList></OrderList>
            </orderContext.Provider>
        );
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        showLoading: showLoading(state, LOADING_ORDER_LIST),
        list: state.app.order.list,
    };
};

export default connect(mapStateToProps)(OrderListPage);
