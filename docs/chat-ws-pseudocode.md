emit('login', username)

...

on('welcome', (username, isMyself) => {
  if (isMyself) {
    dispatch('AUTH/LOGIN', username)
  }
})

on('joined', (room, username, isMyself) => {
  if (isMyself) {
    dispatch('JOINED_ROOM', room)
  }
})