import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { Toast } from 'antd-mobile';
import { initialize } from "@/utils/workflow.ts";
import '@/styles/index.less'
import { initI18n } from './i18n';
import { Provider } from 'react-redux';
import store from './store';

// 动态渲染路由页面
const render = (Component: any) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Provider store={store}>
        <Component />
      </Provider>
    </React.StrictMode>
  )
}
initialize().then(flat => {
  if (!flat) {
    // 提示初始化失败
    Toast.show({
      icon: 'fail',
      content: '初始化失败'
    })
    return;
  }
  initI18n();
  render(App);
});
