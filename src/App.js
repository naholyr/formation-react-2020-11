import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import PageChat from "./PageChat";
import PageLogin from "./PageLogin";

const data = {
  messages: [
    {
      date: "22:44",
      username: "Username",
      text: "a quitté #general",
      isSystem: true,
    },
    { date: "22:44", username: "Username", text: "Bon ben bye…" },
    {
      date: "22:41",
      username: "Un autre username plus long",
      text:
        "Un texte très long qui devrait passer à la ligne on va voir comment ça se passe, ah bah ça a l’air de bien se passer",
    },
    {
      date: "22:40",
      username: "Un autre username",
      text: "a rejoint #general",
      isSystem: true,
    },
    { date: "21:00", username: "Username", text: "Yo ? よ !?" },
    {
      date: "20:58",
      username: "Username",
      text: "a rejoint #general",
      isSystem: true,
    },
  ],
  currentRoom: "#general",
  rooms: [
    { label: "(system)", notif: 3 },
    { closable: true, label: "@bob" },
    { closable: true, label: "#general" },
    { closable: true, label: "#toto", notif: 1 },
  ],
  username: null,
};

const App = ({
  username = data.username,
  rooms = data.rooms,
  messages = data.messages,
  currentRoom = data.currentRoom,
}) => {
  const isLogin = username != null;

  return (
    <>
      <Header username={username} />
      {isLogin && (
        <PageChat rooms={rooms} currentRoom={currentRoom} messages={messages} />
      )}
      {!isLogin && <PageLogin />}
      <Footer />
    </>
  );
};

export default App;
