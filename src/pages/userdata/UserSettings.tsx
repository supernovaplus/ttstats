import { useNavigate } from 'react-router-dom';
import ContentBlock from '../../components/ContentBlock';
import { ChangeEvent, ReactNode, useEffect, useState, MouseEvent } from 'react';
import { serversList } from '../../data/serversList';
import { ServerListRawInterface } from '../../types/serverTypes';
import { prettyNum } from '../../controllers/misc';
import { useMessager, MessagerBlock } from '../../components/MessagerBlock';
import { useUserDataContext } from '../../store/UserDataContext';
import { localStorageKeys } from '../../data/config';

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
  const { userDataState, setUserDataState } = useUserDataContext();
  const [state, setState] = useState({
    selectedUserId: localStorage.getItem(localStorageKeys.SELECTED_USER_ID) || '',
  });
  const { addMessage, clearMessages, messages } = useMessager();

  const onApiKeyInputChange = (serverEndpoint: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setUserDataState((s) => {
      s.servers[serverEndpoint].apikey = e.target.value;
      return { ...s };
    });
  };

  const onApiKeyCheckboxChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.previousElementSibling?.tagName === 'INPUT') {
      (e.target.previousElementSibling as HTMLInputElement).type = e.target.checked ? 'text' : 'password';
    }
  };

  const onSelectedUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((s) => ({
      ...s,
      selectedUserId: e.target.value,
    }));
  };

  const onSaveSelectedUserId = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearMessages();
    if (!state.selectedUserId.length || isNaN(Number(state.selectedUserId))) {
      addMessage('errors', 'Invalid user id');
    } else {
      localStorage.setItem(localStorageKeys.SELECTED_USER_ID, state.selectedUserId);
      addMessage('messages', 'Selected user id saved');
    }
  };

  const saveAndCheckChargesBtn = (serverEndpoint: string) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearMessages();

    const serverState = userDataState.servers[serverEndpoint];
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

              setUserDataState((s) => {
                s.servers[serverEndpoint].charges = '';
                s.servers[serverEndpoint].lastChecked = '';
                return { ...s };
              });
            } else {
              localStorage.setItem(
                localStorageKeys.SERVER_API_PRIVATE_KEY + '.' + serverState.server.endpoint,
                String(serverState.apikey)
              );
              localStorage.setItem(
                localStorageKeys.SERVER_API_PRIVATE_CHARGES + '.' + serverState.server.endpoint,
                String(res[0])
              );
              localStorage.setItem(
                localStorageKeys.SERVER_API_PRIVATE_CHECK_DATE + '.' + serverState.server.endpoint,
                String(Date.now())
              );

              setUserDataState((s) => {
                s.servers[serverEndpoint].charges = res[0];
                s.servers[serverEndpoint].lastChecked = String(Date.now());
                return { ...s };
              });

              addMessage('messages', 'Charges succesfully checked for ' + serverState.server.name);
            }
          } else {
            addMessage('errors', 'Data unavailable');
          }
        })
        .catch((err) => {
          addMessage('errors', 'Server error: ' + err.toString());
        });
    } else {
      addMessage('errors', 'Please enter the api key for ' + serverState.server.name);
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
      {Object.entries(userDataState.servers).map(([serverEndpoint, serverState], index) => (
        <UserSettingsContentBlock title={`${serverState.server.name} Settings`} key={index}>
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
              onChange={onApiKeyInputChange(serverEndpoint)}
              value={serverState.apikey}
            />
            <input type="checkbox" onChange={onApiKeyCheckboxChecked} className="ml-2" />
          </div>
          <div className="flex">
            <div className="min-w-[170px]">Last charges: </div>
            <div>{serverState.charges ? prettyNum(Number(serverState.charges)) : '?'}</div>
          </div>
          <div className="flex">
            <div className="min-w-[170px]">Last check date: </div>
            <div>{serverState.lastChecked ? new Date(Number(serverState.lastChecked)).toString() : '?'}</div>
          </div>
          <div className="flex justify-center">
            <button
              className="lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block w-[200px]"
              onClick={saveAndCheckChargesBtn(serverEndpoint)}>
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

      <div className="flex justify-center mb-5">
        <button
          className="lnk-btn text-white bg-gray-600 dark:bg-gray-800 px-1 text-center block w-[200px]"
          onClick={() => {
            localStorage.clear();
            alert('All data is clear from local storage');
            window.location.href = window.location.href;
          }}>
          clear all saved data
        </button>
      </div>

      <MessagerBlock messages={messages} />
    </ContentBlock>
  );
}
