const { initialState } = require("./store");

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH/LOGIN":
      return {
        ...state,
        username: action.payload.username,
        rooms: [],
        currentRoom: null,
      };
    case "LOGOUT":
      return initialState;
    /*
      return {
        ...state,
        username: null,
        rooms: initialState.rooms,
        currentRoom: initialState.currentRoom,
      };
      */
    case "JOINED_ROOM":
      // state: AppState
      // state.rooms: Array<Room>
      // Room: { label: string, .... }

      const hasRoom = state.rooms.some(
        (room) => room.label === action.payload.label
      );

      if (hasRoom)
        return {
          ...state,
          rooms: state.rooms.map((room) =>
            room.label === action.payload.label && room.notif > 0
              ? { ...room, notif: 0 }
              : room
          ),
          currentRoom: action.payload.label,
        };

      const newRoom = {
        label: action.payload.label,
        closable: action.payload.closable,
        notif: 0,
        disabled: false,
      };

      return {
        ...state,

        currentRoom: newRoom.label,
        rooms: [...state.rooms, newRoom],
      };

    case "RECEIVED_MESSAGE": {
      const { timestamp, text, username, room: label } = action.payload;
      const newMessage = {
        timestamp,
        text,
        username,
        isSystem: label === "(system)",
        formattedTime: dateFormatter.format(timestamp),
      };

      return {
        ...state,
        rooms:
          label !== state.currentRoom
            ? state.rooms.map((room) =>
                room.label === label ? { ...room, notif: room.notif + 1 } : room
              )
            : state.rooms,
        messages: {
          ...state.messages,
          [label]: [newMessage, ...(state.messages[label] ?? [])],
        },
      };
    }

    default:
      return state;
  }
};
