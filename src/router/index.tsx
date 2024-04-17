import { FC } from 'react';
import { commonRoutes } from '../config/routesConfig';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import { ErrorBlock } from 'antd-mobile';
import MainLayout from '@/pages/layouts/mainLayout';
import RouteDecorator from '@/components/routeDecorator';
import { IRoute } from '@/types/router';

// react-router 4.0 以后不再推荐将所有路由规则放在同一个地方集中式路由，
// 子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活

const RouterComponent: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/main/dashboard" />} />
      <Route path="/index" element={<Navigate to="/main/dashboard" />} />
      <Route path="/main/*" element={<MainLayout />} />
      <Route path="*" element={<ErrorBlock fullPage />} />
      {commonRoutes.map((route: IRoute) => (
        <Route
          key={route.pathname}
          path={route.pathname}
          element={<RouteDecorator route={route} />}
        />
      ))}
    </Routes>
  </BrowserRouter>
);

export default RouterComponent;
