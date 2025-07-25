import { useUserDataContext } from '../store/UserDataContext';
import { syncData } from '../controllers/syncData';
import { useEffect } from 'react';

export default function DataSyncBlock() {
  const { userDataState, setUserDataState } = useUserDataContext();

  const getData = async () => {
    await syncData({ endpoint: 'https://d.ttstats.eu/user/vehicles/8694', setUserDataState });
  };

  return (
    <div className="flex gap-5">
      <input type="button" value="sync" className="lnk-btn w-[200px] m-0 cursor-pointer" onClick={getData} />
      <input type="number" defaultValue="" placeholder="player id" className="block w-[200px] p-1 my-1 text-black" />
      {/* <div>{userDataState.data1}</div> */}
      {/* <textarea className='text-black bg-white break-before-auto'>
        {userDataState.data1}
      </textarea> */}
    </div>
  );
}
