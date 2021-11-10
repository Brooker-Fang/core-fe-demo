import { Spin } from "antd";
import { useContext} from "react";
import { orderContext } from "./OrderPage";


export const OrderList = () => {
  const context = useContext(orderContext)
  const {list, showLoading} = context
  return (
          <Spin size="large" spinning={showLoading}>
              <div>
                  <h1>order list</h1>
                  {list.map(item => {
                      return (
                        <div key={item._id}>
                          {item.name}
                        </div>
                        
                      );
                  })}
              </div>
          </Spin>
      );
}


export default (OrderList);
