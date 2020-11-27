export const initialState = {
  messages: [
    {
      timestamp: 1606462227000,
      formattedTime: "08:30",
      username: "Username",
      text: "a quitté #general",
      isSystem: true,
    },
    {
      timestamp: 1606462205000,
      formattedTime: "08:30",
      username: "Username",
      text: "Bon ben bye…",
    },
    {
      timestamp: 1606461130000,
      formattedTime: "08:12",
      username: "Un autre username plus long",
      text:
        "Un texte très long qui devrait passer à la ligne on va voir comment ça se passe, ah bah ça a l’air de bien se passer",
    },
    {
      timestamp: 1606461000000,
      formattedTime: "08:10",
      username: "Un autre username",
      text: "a rejoint #general",
      isSystem: true,
    },
    {
      timestamp: 1606460460000,
      formattedTime: "08:01",
      username: "Username",
      text: "Yo ? よ !?",
    },
    {
      timestamp: 1606460400000,
      formattedTime: "08:00",
      username: "Username",
      text: "a rejoint #general",
      isSystem: true,
    },
  ],
  showSystemMessages: true,
  currentRoom: null, // room name (e.g. "#general")
  username: null,
  // Fake rooms when not authenticated
  rooms: [
    { label: "(system)", disabled: true },
    { label: "@username", disabled: true },
    { label: "#general", disabled: true },
  ],
  /* sample rooms:
  [
    { label: "(system)", notif: 3 },
    { closable: true, label: "@bob" },
    { closable: true, label: "#general" },
  ]*/
};
