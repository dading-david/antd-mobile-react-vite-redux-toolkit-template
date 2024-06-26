import React, { FC, useEffect, useState } from 'react';
import { Tabs, Skeleton } from 'antd-mobile';
import { FillinOutline } from 'antd-mobile-icons';
import request from '@/api/index';
import { TUser } from '@/types/user/info';
import BoxList from '@/components/box/boxList';
import style from './user.module.less';

const User: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<TUser>>({});

  /**
   * 获取用户信息
   * @param token
   */
  function getUserInfo(token?: string) {
    setLoading(true);
    request.user
      .userInfo({
        data: {
          token
        }
      })
      .then(res => {
        setUser(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getUserInfo('123');
  }, []);

  return (
    <div>
      {loading ? (
        <div className={style['skeleton']}>
          <Skeleton.Title animated />
          <Skeleton.Paragraph lineCount={5} animated />
        </div>
      ) : (
        <div className={style['user-info']}>
          <div className={style['basic-info']}>
            <img src={user.avatar} className={style['user-pic']} />
            <p className={style['user-name']}>
              <span>{user.username}</span>
              <FillinOutline />
            </p>
          </div>

          <div className={style['my-box']}>
            <Tabs defaultActiveKey="0">
              <Tabs.Tab title="我拥有" key="0">
                <BoxList list={user?.box || []} />
              </Tabs.Tab>
              <Tabs.Tab title="我送出" key="1">
                <BoxList list={[]} />
              </Tabs.Tab>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
