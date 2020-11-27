import { memo } from "react";
import { useLogLifecycle } from "./use-log-lifecycle";

const Footer = memo(() => {
  useLogLifecycle("Footer");

  return <div />;
});

export default Footer;
