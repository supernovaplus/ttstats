import { useNavigate } from 'react-router-dom';
import ContentBlock from '../../components/ContentBlock';
import { ChangeEvent, ReactNode, useEffect, useState, MouseEvent } from 'react';
import { serversList } from '../../data/serversList';
import { ServerListRawInterface } from '../../types/serverTypes';
import { prettyNum } from '../../controllers/misc';
const localStorageKey = 'usersettings-v1.';

const initialMessagesState: {
  errors: string[];
  messages: string[];
} = {
  errors: [],
  messages: [],
};

const UserSettingsContentBlock = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="bg-slate-700 p-2 mb-3 my-5 box-shadow-3">
      <div className="mt-[-20px]">{title}</div>
      {children}
    </div>
  );
};

export default function UserSettings() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    servers: serversList
      .filter((server) => !!server.apiname)
      .map((server) => ({
        server,
        apikey: localStorage.getItem(localStorageKey + server.endpoint + '.apikey') || '',
        charges: localStorage.getItem(localStorageKey + server.endpoint + '.charges') || '',
        lastChecked: Number(localStorage.getItem(localStorageKey + server.endpoint + '.chargesDate')) || '',
      })),
    selectedUserId: localStorage.getItem(localStorageKey + 'selected_user_id') || '',
    errors: '',
  });

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

  const onApiKeyInputChange = (serverIndex: number) => (e: ChangeEvent<HTMLInputElement>) => {
    setState((s) => {
      const servers = s.servers;
      servers[serverIndex].apikey = e.target.value;
      return {
        ...s,
        servers,
      };
    });
  };

  const onApiKeyCheckboxChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.previousElementSibling?.tagName === "INPUT"){
      (e.target.previousElementSibling as HTMLInputElement).type = e.target.checked ? "text" : "password";
    }
  }

  const onSelectedUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({
      ...s,
      selectedUserId: e.target.value,
    }));
  };

  const onSaveSelectedUserId = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearMessages();
    if(!state.selectedUserId.length || isNaN(Number(state.selectedUserId))){
      addMessage('errors','Invalid user id  ');
    }else{
      localStorage.setItem(localStorageKey + 'selected_user_id', state.selectedUserId);
      addMessage('messages','Selected user id saved');
    }
  };

  const saveAndCheckChargesBtn = (serverIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearMessages();

    const serverState = state.servers[serverIndex];
    if (serverState.apikey.length > 10) {
      fetch(`https://d.transporttycoon.eu/${serverState.server.apiname}/charges.json`, {
        headers: {
          'x-tycoon-key': serverState.apikey,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && typeof res[0] === 'number') {
            if (res[0] === 0) {
              addMessage('errors', 'Invalid key or no charges left');
              console.error('invalid key or no charges');
            } else {
              localStorage.setItem(
                localStorageKey + serverState.server.endpoint + '.apikey',
                String(serverState.apikey)
              );
              localStorage.setItem(
                localStorageKey + serverState.server.endpoint + '.charges',
                String(res[0])
              );
              localStorage.setItem(
                localStorageKey + serverState.server.endpoint + '.chargesDate',
                String(Date.now())
              );

              setState((s) => {
                const servers = s.servers;
                s.servers[serverIndex].charges = res[0];
                s.servers[serverIndex].lastChecked = Date.now();

                return {
                  ...s,
                  servers,
                };
              });

              addMessage('messages','Charges succesfully checked for ' + serverState.server.name);
            }
          } else {
            addMessage('errors', 'Data unavailable');
          }
        })
        .catch((err) => {
          addMessage('errors','Server error: ' + err.toString());
        });
    } else {
      addMessage('errors','Please enter the api key for ' + serverState.server.name);
    }
  };

  return (
    <ContentBlock title="User Settings">
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block">
          Go back
        </button>
      </div>
      {state.servers.map(({ server }, serverIndex) => (
        <UserSettingsContentBlock title={`${server.name} Settings`} key={serverIndex}>
          {/* <div className="flex">
                <div className="min-w-[150px]">Public API Key</div>
                <input
                  type="password"
                  className="inline-block text-black p-1 mb-1 placeholder:text-gray-600 w-full"
                  disabled
                  placeholder="currently not available"
                />
              </div> */}
          <div className="flex mb-2">
            <div className="min-w-[170px]">Private API Key</div>
            <input
              type="password"
              className="inline-block text-black p-1 w-full dislay box-border"
              placeholder="enter you key here"
              onChange={onApiKeyInputChange(serverIndex)}
              value={state.servers[serverIndex].apikey}
            />
            <input type="checkbox" onChange={onApiKeyCheckboxChecked} className='ml-2'/>
          </div>
          <div className="flex">
            <div className="min-w-[170px]">Last charges: </div>
            <div>
              {state.servers[serverIndex].charges
                ? prettyNum(Number(state.servers[serverIndex].charges))
                : '?'}
            </div>
          </div>
          <div className="flex">
            <div className="min-w-[170px]">Last check date: </div>
            <div>
              {state.servers[serverIndex].lastChecked
                ? new Date(state.servers[serverIndex].lastChecked).toString()
                : '?'}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block w-[200px]"
              onClick={saveAndCheckChargesBtn(serverIndex)}>
              save and check charges
            </button>
          </div>
        </UserSettingsContentBlock>
      ))}
      <UserSettingsContentBlock title="Other Settings">
        <div className="flex mb-2">
          <div className="min-w-[170px]">Default User Id</div>
          <input
            type="text"
            className="inline-block text-black p-1 w-full dislay box-border"
            placeholder="enter any in-game player id"
            onChange={onSelectedUserIdChange}
            value={state.selectedUserId}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block w-[200px]"
            onClick={onSaveSelectedUserId}>
            save
          </button>
        </div>
      </UserSettingsContentBlock>

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
    </ContentBlock>
  );
}
