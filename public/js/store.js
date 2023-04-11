let username;
let socketId;
let inputValue;

const getInput = () => {
  return inputValue;
};

const setInputValue = (messageContent) => {
 inputValue = messageContent
}

const getUsername = () => {
  return username;
};

const setUsername = (name) => {
  username = name;
};

const getSocketId = () => {
  return socketId;
};

const setSocketId = (id) => {
  socketId = id;
};

export default {
  getUsername,
  setUsername,
  getSocketId,
  setSocketId,
  getInput,
  setInputValue,
};
