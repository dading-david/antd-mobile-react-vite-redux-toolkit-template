import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { mainRoutes } from "@/config/routesConfig";
import { ErrorBlock } from "antd-mobile";
import RouteDecorator from "@/components/routeDecorator";
import { IRoute } from "@/types/router";
import style from './content.module.less';

const MainContent: FC = () => {
  return (
    <div className={style['main-content']}>
      <Routes>
        {/* 根据路由配置注册路由，后期可根据项目需求更改为动态路由注册，只注册当前用户可访问的路由 */}
        {mainRoutes.map((route: IRoute) => (
          <Route
            key={route.pathname}
            path={route.pathname}
            element={<RouteDecorator route={route}/>}
          />
        ))}
        <Route path="*" element={<ErrorBlock fullPage/>}/>
      </Routes>
    </div>
  )
}

export default MainContent;