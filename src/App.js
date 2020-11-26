import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import PageChat from "./PageChat";
import PageLogin from "./PageLogin";
import { initialState } from "./store";

const App = () => {
  // TODO subscribe to store
  const isLogin = initialState.username !== null;

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
