import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import PageChat from "./PageChat";
import PageLogin from "./PageLogin";
import { useCallback, useMemo, useState } from "react";

/*
class App extends Component {
  state = { username: null };

  // this statically bound (function instance member)
  handleLogout = () => {
    this.setState({ username: null });
  };

  // nope
  // handleLogout() {}

  render() {
    return (
      <Header username={this.state.username} onLogout={this.handleLogout} />
    );
  }
}
*/

const data = {
  messages: [
    {
      date: "22:45",
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
  initialRooms = data.rooms,
  messages = data.messages,
  initialCurrentRoom = data.currentRoom,
}) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [currentRoom, setCurrentRoom] = useState(initialCurrentRoom);
  const [username, setUsername] = useState(null);

  // Plutôt à réserver aux calculs coûteux
  const isLogin = useMemo(() => {
    console.log("compute isLogin");
    return username !== null;
  }, [username]);

  const handleSubmitLogin = (username) => {
    setUsername(username);
  };

  const handleJoinRoom = (label) => {
    setRooms([...rooms, { closable: true, label }]);
    setCurrentRoom(label);
  };

  const handleChangeRoom = (label) => {
    setCurrentRoom(label);
  };

  const handleLogout = useCallback(() => {
    setUsername(null);
  }, []);

  return (
    <>
      <Header username={username} onLogout={handleLogout} />
      {isLogin && (
        <PageChat
          rooms={rooms}
          currentRoom={currentRoom}
          messages={messages}
          onJoinRoom={handleJoinRoom}
          onChangeRoom={handleChangeRoom}
        />
      )}
      {!isLogin && <PageLogin onSubmitLogin={handleSubmitLogin} />}
      <Footer />
    </>
  );
};

export default App;
