import { ReactNode, useState } from 'react';

const initialMessagesState: {
  errors: string[];
  messages: string[];
} = {
  errors: [],
  messages: [],
};

export function useMessager() {
  const [messages, setMessages] = useState(initialMessagesState);

  const clearMessages = () => {
    setMessages(initialMessagesState);
  };

  const addMessage = (key: 'errors' | 'messages', msg: string) => {
    if (key === 'errors' || key === 'messages') {
      setMessages((s) => ({
        ...s,
        [key]: [...s[key], msg],
      }));
    }
  };

  const MessagesDisplayBlock = (
    <>
      {!!messages.errors.length &&
        messages.errors.map((err, index) => (
          <div className="bg-red-600 p-2" key={index}>
            {err}
          </div>
        ))}

      {!!messages.messages.length &&
        messages.messages.map((err, index) => (
          <div className="bg-green-400 p-2" key={index}>
            {err}
          </div>
        ))}
    </>
  );

  return { messages, setMessages, clearMessages, addMessage, MessagesDisplayBlock };
}