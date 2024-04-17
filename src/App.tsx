import store, { useAppSelector } from "./store";
import RouterComponent from "@/router";

import { ConfigProvider } from "antd-mobile";
import { useEffect, useState } from "react";
import { antI18n } from "./i18n";
import { setHtmlLang } from "./utils/i18n";
import { i18nSelector } from "./store/features/i18nSlice";
import { II18nKey } from "./interface/i18n";

const App = () => {
	const i18nState = useAppSelector(i18nSelector);
	// 通过全局状态获取当前语言
	const locale = i18nState.localLanguage as II18nKey;
	const [i18nLanguage, setI18nLanguage] = useState(antI18n[locale]);

	useEffect(() => {
		setHtmlLang(locale);
		setI18nLanguage(antI18n[locale]);
	}, [locale]);

	return (
		<ConfigProvider locale={i18nLanguage}>
			<div className="myApp">
				<RouterComponent />
			</div>
		</ConfigProvider>
	)
}

export default App;