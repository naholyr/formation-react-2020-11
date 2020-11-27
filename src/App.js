import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import PageChat from "./PageChat";
import PageLogin from "./PageLogin";
import { useLogLifecycle } from "./use-log-lifecycle";
import { useSelector } from "react-redux";
import memoize from "memoize-one";

// À réserver aux cas coûteux, c'est débile ici
const isNotNull = (username) => username !== null;
const memoizedIsNotNull = memoize(isNotNull);

const App = () => {
  useLogLifecycle("App");

  const isLogin = useSelector((appState) =>
    memoizedIsNotNull(appState.username)
  );

  return (
    <>
      <Header />
      {isLogin && <PageChat />}
      {!isLogin && <PageLogin />}
      <Footer />
    </>
  );
};

export default App;
