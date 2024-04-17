/**
 * i18n国际化配置初始化
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// 检测当前浏览器的语言或者从服务器获取配置资源,不过也没有什么用处
import Backend from "i18next-http-backend";
// 嗅探当前浏览器语言
import LanguageDetector from "i18next-browser-languagedetector";
import ThemeConfig from '@/config/themeConfig';
import Storage from "@/utils/storage";
import Constants from "@/constants";
import zhCNLocale from "./modules/zhCN.json";
import enUSLocale from "./modules/enUS.json";
import zhCN from 'antd-mobile/es/locales/zh-CN'; // antd国际化翻译文件
import enUS from 'antd-mobile/es/locales/en-US'; // antd国际化翻译文件

export const antI18n = {
  [ThemeConfig.i18nEnum.ZHCN.value]: zhCN,
  [ThemeConfig.i18nEnum.ENUS.value]: enUS,
};

export const initI18n = () => {
  // @ts-ignore
  i18n
    .use(Backend)
    .use(LanguageDetector) // 检测用户当前使用的语言
    .use(initReactI18next) // 注入 react-i18next 实例
    .init({
      resources: {
        [ThemeConfig.i18nEnum.ZHCN.value]: {
          translation: {
            ...zhCNLocale,
            ...zhCN
          }
        },
        [ThemeConfig.i18nEnum.ENUS.value]: {
          translation: {
            ...enUSLocale,
            ...enUS
          }
        }
      },
      fallbackLng: Storage.getStorage(Constants.storageKey.i18nLocal) || ThemeConfig.i18nDef, // 备选语言。
      lng: Storage.getStorage(Constants.storageKey.i18nLocal) || ThemeConfig.i18nDef, // 当前语言
      preload: ThemeConfig.i18nKeyArr, // 需要预加载的语言列表
      debug: true,
      interpolation: {
        escapeValue: false, // 设置了插值选项，escapeValue: false表示不对插值的值进行HTML转义。
      },
      detection: ["localStorage", "sessionStorage", "cookie"], // 定义了语言检测的顺序，这里使用了本地存储、会话存储和cookie。
    })
};
