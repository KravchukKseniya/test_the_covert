export const selectUserId = (state, id) => {
  return state.users.find(user => user.id === id);
};