import {message} from "antd";
import {ErrorListener, Exception, SagaGenerator} from "core-fe";

export class ErrorHandler implements ErrorListener {
    // eslint-disable-next-line require-yield
    *onError(exception: Exception): SagaGenerator {
        // in dev mode, it will show error twice which is expected, refer to https://github.com/facebook/react/issues/10474
        message.error(exception.message, 5);
    }
}
