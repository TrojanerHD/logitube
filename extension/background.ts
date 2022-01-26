interface Message {
  url: string;
  properties: string;
}

interface Native {
  postMessage(content: string): void;
}

interface Tab {
  url: string;
}
// This type is incomplete and only includes the values used in this project
declare const browser: {
  runtime: {
    onMessage: {
      addListener(listener: (message: string) => void): void;
    };
    connectNative(app: string): Native;
    sendMessage(message: string): void;
  };
  tabs: {
    query(options: { currentWindow: boolean; active: boolean }): Promise<Tab[]>;
  };
};

browser.runtime.onMessage.addListener(messageListener);
const native: Native = browser.runtime.connectNative('logitube');
const lastMessages: Message[] = [];

function messageListener(message: string): void {
  const messageObject: Message = JSON.parse(message);
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
    })
    .then((tabs: Tab[]) => getActiveTab(tabs, messageObject), console.error);
}

function getActiveTab(tabs: Tab[], message: Message): void {
  let tab = tabs[0]; // Safe to assume there will only be one result
  lastMessages.unshift({ url: message.url, properties: message.properties });
  if (lastMessages.length === 50) lastMessages.length--;
  let properties: string;
  for (const lastMessage of lastMessages)
    if (tab.url === lastMessage.url) {
      properties = lastMessage.properties;
      break;
    }

  if (properties) native.postMessage(properties);
  else
    native.postMessage(
      JSON.parse('{"currentTime": 0, "duration": 0, "color": "none"}')
    );
}
