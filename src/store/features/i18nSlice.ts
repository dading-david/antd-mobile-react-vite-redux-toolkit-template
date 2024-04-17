import { I18n } from "@/types/global/i18n";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from '@/store';


export const i18nSlice = createSlice({
	name: 'i18n',
	initialState: {
		localLanguage: 'zh-CN'
	} as I18n,
	reducers: {
		setI18nInfo: (state: I18n, action: PayloadAction<Partial<I18n>>) => {
			const { payload } = action;
			if (typeof payload === 'object') {
				Object.keys(payload).forEach((key: string) => {
					// @ts-ignore
					state[key] = payload[key]
				})
			}
		}
	}
});

// 导出actions
export const { setI18nInfo } = i18nSlice.actions;

// 导出selector
export const i18nSelector = (state: RootState) => state.i18n;

// 导出reducer，在创建store时使用到
export default i18nSlice.reducer;