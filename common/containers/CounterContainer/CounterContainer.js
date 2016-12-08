import 'babel-polyfill';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';

import {
  incrementCount,
  decrementCount,
} from '../../actions';


//最後把取出的 count 和事件處理方法用 connect 傳到 Counter 就大功告成了
export default connect(
  (state) => ({
    count: state.get('counterReducers').get('count'),
  }),
  (dispatch) => ({
    onIncrement: () => (
      dispatch(incrementCount())
    ),
    onDecrement: () => (
      dispatch(decrementCount())
    ),
  })
)(Counter);
