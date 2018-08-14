class Chat {
  constructor() {

    window.addEventListener('message', this.receiveMessageFromFrame.bind(this));

    this.messages = [];
    this.frames = [];

    this.plus = document.querySelector('.chat__plus');
    this.errBox = document.querySelector('.chat__err-box');
    this.nameInput = document.querySelector('.chat__name-input');
    this.chatContainer = document.querySelector('.chat__container');

    this.nameInput.onkeyup = this.detectEnter.bind(this);
    this.plus.onclick = this.onPlusClick.bind(this);
  }

  // pushing received message to chat array
  receiveMessageFromFrame(event) {
    this.messages.push(event.data);
    this.sendMessagesToFrames();
  }

  // sending messages to all frames
  sendMessagesToFrames() {
    let messages = this.messages;
    this.frames.forEach(id => {
      let frame = document.getElementById(id);
      frame.contentWindow.postMessage(messages, '*');
    })

  }
  // calling for addFrame() on click
  onPlusClick() {
    this.addFrame(this.nameInput.value);
  }

  // calling for addFrame() on enter
  detectEnter(event) {
    if (event.key === "Enter") {
      this.addFrame(this.nameInput.value);
    }
  }

  // appending generated iframe to container and send initial messages data
  addFrame(frameName){
    if (!this.frames.includes(frameName) && frameName.length > 1 && !frameName.includes(' ')) {
      this.frames.push(frameName);
      this.chatContainer.appendChild(this.buildIframeNode(frameName));
      this.nameInput.value = '';

      let self = this;
      setTimeout(function () {
        self.sendMessagesToFrames();
      }, 1000)

    } else {
      let errBox = this.errBox;
      errBox.innerHTML = 'Name should be unique, and do not contain spaces and be at least 2 chars long';
      errBox.style.display = 'flex';
      setTimeout(function () {
        errBox.innerHTML = '';
        errBox.style.display = 'none';
      }, 3000);
    }
  }

  // generating iframe node
  buildIframeNode(frameName) {
    let item = document.createElement('iframe');
    item.src = 'iframe.html?name=' + frameName;
    item.classList.add('chat__iframe');
    item.classList.add('draggable');
    item.id = frameName;
    return item;
  }
}


window.chat = new Chat();


