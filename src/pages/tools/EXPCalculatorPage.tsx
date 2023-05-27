import ContentBlock from '../../components/ContentBlock';
import { useState, useEffect, ChangeEventHandler, KeyboardEvent, ChangeEvent } from 'react';
import { roundFixed } from '../../controllers/misc';

const expStep = 5;
const calculateExp = (level: number) => Math.floor((expStep * level * (level + 1)) / 2);

export default function EXPCalculatorPage() {
  const [state, setState] = useState({
    current: 1,
    target: 100,
    expPerHour: 1000,
  });
  const [output, setOutput] = useState({
    expNeeded: '',
    hoursNeeded: '',
  });

  const changeStateVal = (target: string, val: string) => {
    const numVal = Number(val);
    if (numVal && !isNaN(numVal)) setState((s) => ({ ...s, [target]: numVal }));
  };

  useEffect(() => {
    const expResult = calculateExp(state.target) - calculateExp(state.current);
    const hoursNeeded = expResult / state.expPerHour;
    setOutput({
      expNeeded: expResult <= 0 ? 'Level Reached' : `${expResult.toLocaleString('en-us')} exp`,
      hoursNeeded: `${roundFixed(hoursNeeded, 1)} hours`,
    });
  }, [state]);

  return (
    <ContentBlock title="EXP Calculator">
      <div className="flex flex-col text-center items-center">
        <label htmlFor="current-level">Current Level:</label>
        <input
          type="number"
          name="current-level"
          className="text-black mx-2 p-2 w-full max-w-[400px] mb-2 text-center"
          defaultValue={state.current}
          onChange={(e) => changeStateVal('current', e.target.value)}
          onKeyDown={(e) => changeStateVal('current', (e.target as HTMLInputElement).value)}
        />
        <label htmlFor="target-level" className="block">
          Target Level
        </label>
        <input
          type="number"
          name="target-level"
          className="text-black mx-2 p-2 block w-full max-w-[400px] mb-2 text-center"
          onChange={(e) => changeStateVal('target', e.target.value)}
          onKeyDown={(e) => changeStateVal('target', (e.target as HTMLInputElement).value)}
          defaultValue={state.target}
        />
        <label htmlFor="result" className="block">
          EXP Needed
        </label>
        <input
          name="result"
          type="text"
          className="bg-gray-500 text-white text-shadow-1 outline-none p-2 block w-full max-w-[400px] text-center mb-3"
          readOnly
          value={output.expNeeded}
        />

        <label htmlFor="exp-per-hour" className="block">
          EXP Per Hour
        </label>
        <input
          name="exp-per-hour"
          type="text"
          className="outline-none p-2 block w-full max-w-[400px] text-center text-black mb-2"
          onChange={(e) => changeStateVal('expPerHour', e.target.value)}
          onKeyDown={(e) => changeStateVal('expPerHour', (e.target as HTMLInputElement).value)}
          defaultValue={state.expPerHour}
        />

        <label htmlFor="exp-time-result" className="block">
          Hours To Reach Target Level
        </label>
        <input
          name="exp-time-result"
          type="text"
          className="bg-gray-500 text-white text-shadow-1 outline-none p-2 block w-full max-w-[400px] text-center mb-3"
          value={output.hoursNeeded}
          readOnly
        />
      </div>
    </ContentBlock>
  );
}
