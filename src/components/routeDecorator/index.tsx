/**
 * 路由装饰器
 */
import { IRoute } from "@/types/router";
import { isLogin } from "@/utils/userLogin";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
	route: IRoute
}
const RouteDecorator: FC<IProps> = (props) => {
	const { route } = props;
	const navigate = useNavigate();

	useEffect(() => {
		// 鉴权路由守卫
		if (route.meta?.requireAuth) {
			if (!isLogin()) {
				navigate('/login', { state: { redirect: route.meta?.fullPathname || route.pathname } });
			}
		}
		// 设置跳转路由的页面标题
		document.title = route.title || route.name;
		// 如果路由有自定义的路由守卫，则执行自定义路由守卫
		return () => route.beforeDestroy && route.beforeDestroy(route);
	}, [route]);
	return <route.component />;
}

export default RouteDecorator;