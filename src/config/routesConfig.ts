import ReactLazilyComponent from 'react-lazily-component';

const commonRoutes = [
  {
    pathname: '/login',
    name: 'Login',
    title: '登录',
    component: ReactLazilyComponent(() => import('@/pages/login'))
  }
];

const mainRoutes = [
  {
    pathname: '',
    component: ReactLazilyComponent(() => import('@/pages/dashboard')),
    name: 'Dashboard',
    title: '首页',
    meta: {
      isChildren: true,
      parentPathname: '/main',
      fullPathname: '/main',
    }
  },
  {
    pathname: 'dashboard',
    name: 'Dashboard',
    title: '首页',
    component: ReactLazilyComponent(() => import('@/pages/dashboard')),
    meta: {
      isChildren: true,
      parentPathname: '/main',
      fullPathname: '/main/dashboard',
      navigation: '首页',
      requireAuth: true
    }
  },
  {
    pathname: 'boxDetail/:bId',
    name: 'BoxDetail',
    title: '潮品详情',
    component: ReactLazilyComponent(() => import('@/pages/boxDetail')),
    meta: {
      isChildren: true,
      parentPathname: '/main',
      fullPathname: '/main/boxDetail/:bId',
    }
  },
  {
    pathname: 'user',
    name: 'User',
    title: '个人中心',
    component: ReactLazilyComponent(() => import('@/pages/user')),
    meta: {
      isChildren: true,
      parentPathname: '/main',
      fullPathname: '/main/user',
      navigation: '个人中心',
      requireAuth: true
    }
  }
];

export {
  commonRoutes,
  mainRoutes
}