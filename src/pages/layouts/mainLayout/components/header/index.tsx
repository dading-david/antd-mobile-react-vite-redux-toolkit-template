import { Popup, List, Switch } from 'antd-mobile';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { FC, useState, useEffect, memo } from 'react';
import style from './header.module.less';
import { mainRoutes } from '@/config/routesConfig';
import { isLogin, fetchUserInfo } from '@/utils/userLogin';
import { useAppDispatch, useAppSelector } from '@/store';
import { userSelector } from '@/store/features/userSlice';
import { useTranslation } from "react-i18next";
import { i18nSelector, setI18nInfo } from '@/store/features/i18nSlice';

const MainHeader: FC = () => {
  const [popupShow, setPopupShow] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(userSelector); // 或直接获取  const user = useAppSelector(store => store.user);
  const i18nState = useAppSelector(i18nSelector);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const handleI18nChange = (val: boolean) => {
    const selectedLanguage = val ? "en-US" : "zh-CN";
    i18n.changeLanguage(selectedLanguage);
    // Storage.setStorage(Constants.storageKey.i18nLocal, selectedLanguage);
    dispatch(setI18nInfo({localLanguage: selectedLanguage}));
  }

  const initSwitch = () => {
    // const i18nLocal = Storage.getStorage(Constants.storageKey.i18nLocal)
    const i18nLocal = i18nState.localLanguage;
    return i18nLocal && i18nLocal === "en-US" ? true : false;
  }

  useEffect(() => {
    setPopupShow(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isLogin()) {
      fetchUserInfo();
    }
  }, []);

  return (
    <div>
      <div className={style['main-header']}>
        <span
          className={style['header-tool']}
          onClick={() => {
            setPopupShow(flag => !flag);
          }}
        >
          ≡
        </span>
        <div className={style['title']} onClick={() => navigate('/main/dashboard')}>
          <img
            className={style['header-logo']}
            src="/src/assets/images/logo.png"
            alt="潮玩"
          />
          {/* <span>潮玩盲盒</span> */}
          <span>{t("title")}</span>
          <Switch uncheckedText='ZH' checkedText='EN' onChange={handleI18nChange} defaultChecked={initSwitch()} />
        </div>
        <div className={style['user-site']} onClick={() => navigate('/main/user')}>
          {!isLogin() ? (
            <span>登录</span>
          ) : (
            <div className={style['user-icon']}>
              <img src={user.avatar} className={style['avatar']} />
              <div className={style['user-name']}>{user.username}</div>
            </div>
          )}
        </div>
      </div>
      <Popup position="left" visible={popupShow}>
        <List header="潮玩盲盒" className={style['header-list']}>
          {mainRoutes
            .filter(r => r.meta?.navigation)
            .map((item, key) => {
              return (
                <List.Item
                  key={key}
                  onClick={() => {
                    navigate(item.meta?.fullPathname || item.pathname as string);
                    setPopupShow(false);
                  }}
                >
                  {item.meta?.navigation}
                </List.Item>
              );
            })}
        </List>
      </Popup>
    </div>
  );
};

export default memo(MainHeader);
