const createNewMessageContainer = (data) => {
  const { author, messageContent, messageClassName } = data;
  const newMessage = document.createElement("div");
  newMessage.classList.add(messageClassName);
  newMessage.innerHTML = `${author}: ${messageContent}`;
  return newMessage;
};

export default {
  createNewMessageContainer,
};
