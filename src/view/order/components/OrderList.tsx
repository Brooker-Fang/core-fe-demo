import { Spin } from "antd";
import { useContext} from "react";
import { useDocumentTitle } from "../../../hooks/useDocumentTitle";
import { orderContext } from "./OrderPage";


export const OrderList = () => {
  const context = useContext(orderContext)
  const {list, showLoading} = context
  useDocumentTitle('订单列表页面')
  return (
          <Spin size="large" spinning={showLoading}>
              <div>
                  <h1>order list</h1>
                  {list.map(item => {
                      return (
                        <div key={item._id}>
                          {item}
                        </div>
                        
                      );
                  })}
              </div>
          </Spin>
      );
}


export default (OrderList);
