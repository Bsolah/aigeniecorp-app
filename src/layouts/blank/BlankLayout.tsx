import { Outlet } from "react-router";
import ScrollToTop from "src/components/shared/ScrollToTop.tsx";

const BlankLayout = () => (
  <>
  <ScrollToTop>
    <Outlet />
    </ScrollToTop>
  </>
);

export default BlankLayout;
