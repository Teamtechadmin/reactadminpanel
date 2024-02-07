import VerticalLayout from "./VerticalLayout";
import { LayoutProps } from "../types";

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return <VerticalLayout {...props}>{children}</VerticalLayout>;
};

export default Layout;
