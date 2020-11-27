const { initialState } = require("./store");

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
    default:
      return state;
  }
};
