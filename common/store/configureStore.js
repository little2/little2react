import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

// 一个很便捷的 middleware，用来打印 action 日志
const loggerMiddleware = createLogger({ stateTransformer: state => state.toJS() });

export default function configureStore(preloadedState) {
  /*
  默认情况下，createStore() 所创建的 Redux store 没有使用 middleware，所以只支持 同步数据流。
  像 redux-thunk 或 redux-promise 这样支持异步的 middleware 都包装了 store 的 dispatch() 方法，
  以此来让你 dispatch 一些除了 action 以外的其他内容，
  例如：函数或者 Promise。你所使用的任何 middleware 都可以以自己的方式解析你 dispatch 的任何内容，
  并继续传递 actions 给下一个 middleware。
  比如，支持 Promise 的 middleware 能够拦截 Promise，然后为每个 Promise 异步地 dispatch 一对 begin/end actions。
  */
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      loggerMiddleware,
      thunkMiddleware,  //// 允许我们 dispatch() 函数, thunk 的一个优点是它的结果可以再次被 dispatch：
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
