export const authLogin = (username) => ({
  type: "AUTH/LOGIN",
  payload: { username },
});

export const logout = () => ({
  type: "LOGOUT",
  payload: {},
});

export const joinedRoom = (label, closable = true) => ({
  type: "JOINED_ROOM",
  payload: { label, closable },
});
