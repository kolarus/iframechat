class chatWindow {
  constructor() {
    window.addEventListener('message', this.receivePostMessage.bind(this), false);

    this.name = this.parseName();
    this.globalChatWindow = '';

    this.header = document.querySelector('.chat-window__heading');
    this.ul = document.querySelector('.chat-window__msg-list');
    this.sendBtn = document.querySelector('.chat-window__send-btn');
    this.msgInput = document.querySelector('.chat-window__input');

    this.msgInput.onkeyup= this.detectEnter.bind(this);
    this.sendBtn.onclick = this.sendMessage.bind(this);
    this.showMessages = this.showMessages.bind(this);

    this.isInitMsg = true;
    this.header.innerHTML = this.name;
  }

  // receiving messages from chat
  receivePostMessage(event)
  {
    this.globalChatWindow = event.source;

    if(this.isInitMsg){// if first message, send initial msg
      this.showJoinedMessage();
      this.isInitMsg = false;
    }

    this.showMessages(event.data);
    this.ul.scrollTop = this.ul.scrollHeight;
    return event.source;
  }

  // showing all chat messages
  showMessages(msgArray) {
    let result = '';
    msgArray.forEach(element => {
      result += '<li class="chat-window__msg-item"><span>[' + element['author'] + ']: </span>' + element['message'] + '</li>'
    });
    this.ul.innerHTML = result;
    return result;
  }

  // detecting enter keyup inside input
  detectEnter(event) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  // send initial message when new window created
  showJoinedMessage() {
    this.globalChatWindow.postMessage({author: 'info', message: ' "' + this.name +'" ' +'Joined the chat'}, '*')
  }

  // sending message to chat
  sendMessage() {
    if (this.msgInput.value.length > 0) {
      this.globalChatWindow.postMessage({author: this.name, message: this.msgInput.value}, '*');
      this.msgInput.value = '';
    }
  }

  // getting name from url
  parseName() {
    return decodeURI(location.href.split('?')[1].split('=')[1]);
  }

}

window.addEventListener('load', function() {
  let chatW = new chatWindow();
});
