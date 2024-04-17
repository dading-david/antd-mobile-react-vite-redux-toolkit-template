import { FC } from "react";
import MainContent from "./components/content";
import MainHeader from "./components/header";

const MyLayout: FC = () => {
	return (
		<div id="main" className="main-page-content">
      {/* header Component */}
      <MainHeader />
      {/* content Component */}
      <MainContent />
      {/* footer COmponent */}
    </div>
	)
}

export default MyLayout;