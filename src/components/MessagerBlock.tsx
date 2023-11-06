import { ReactNode, useState } from 'react';

interface InitialMessagesStateInterface {
  errors: string[];
  messages: string[];
}

const initialMessagesState: InitialMessagesStateInterface = {
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

  return { messages, setMessages, clearMessages, addMessage };
}

export function MessagerBlock({ messages }: { messages: InitialMessagesStateInterface }) {
  return (
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
}
