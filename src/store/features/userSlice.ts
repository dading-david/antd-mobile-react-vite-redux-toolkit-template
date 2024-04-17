import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@/types/user/info';
import { AppDispatch, RootState } from '@/store';

// 模拟异步方法
const delay = (interval = 1000) => {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve(Math.round(Math.random() * 10))
      }, interval)
  })
}

export const userSlice = createSlice({
  // 命名空间
  name: 'user',
  // 初始值
  initialState: {
    token: '',
    userId: '',
    username: '',
    avatar: ''
  } as TUser,
  reducers: {
    setUserInfo: (state: TUser, action: PayloadAction<Partial<TUser>>) => {
      const { payload } = action;
      if (typeof payload === 'object') {
        Object.keys(payload).forEach((key: string) => {
          // @ts-ignore
          state[key] = payload[key];
        });
      }
    }
  }
});

// 导出actions
export const { setUserInfo } = userSlice.actions;

// 实现异步设置用户信息 -- 使用dispatch(setUserInfoAsync({token: '', userId: '', username: '', avatar: ''}))
export const setUserInfoAsync = (user: TUser) => (dispatch: AppDispatch) => {
  delay().then(() => {
    dispatch(setUserInfo(user));
  });
};

// 导出selector
export const userSelector = (state: RootState) => state.user;

// 导出reducer，在创建store时使用到
export default userSlice.reducer;
