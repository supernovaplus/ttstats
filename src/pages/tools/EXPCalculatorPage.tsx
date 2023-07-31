import ContentBlock from '../../components/ContentBlock';
import { useState, useEffect } from 'react';
import { roundFixed } from '../../controllers/misc';

const expStep = 5;
const calculateExp = (level: number) => Math.floor((expStep * level * (level + 1)) / 2);

const changeStateVal = (target: string, val: string, setState: any) => {
  const numVal = Number(val);
  if (numVal >= 0 && !isNaN(numVal)) setState((s: any) => ({ ...s, [target]: numVal }));
};

function EXPCalculator() {
  const [state, setState] = useState({
    current: 1,
    target: 100,
    expPerHour: 1000,
  });

  const [output, setOutput] = useState({
    expNeeded: '',
    hoursNeeded: '',
  });

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
          min={1}
          type="number"
          name="current-level"
          className="text-black mx-2 p-2 w-full max-w-[400px] mb-2 text-center"
          defaultValue={state.current}
          onChange={(e) => changeStateVal('current', e.target.value, setState)}
          onKeyDown={(e) => changeStateVal('current', (e.target as HTMLInputElement).value, setState)}
        />
        <label htmlFor="target-level" className="block">
          Target Level
        </label>
        <input
          type="number"
          name="target-level"
          className="text-black mx-2 p-2 block w-full max-w-[400px] mb-2 text-center"
          onChange={(e) => changeStateVal('target', e.target.value, setState)}
          onKeyDown={(e) => changeStateVal('target', (e.target as HTMLInputElement).value, setState)}
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
          className="p-2 block w-full max-w-[400px] text-center text-black mb-2"
          onChange={(e) => changeStateVal('expPerHour', e.target.value, setState)}
          onKeyDown={(e) => changeStateVal('expPerHour', (e.target as HTMLInputElement).value, setState)}
          defaultValue={state.expPerHour}
        />

        <label htmlFor="exp-time-result" className="block">
          Hours To Reach The Target Level
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

function EXPConverter() {
  const [state, setState] = useState({
    expToLevelInput: 5,
    lvlToEXPInput: 1,
  });

  const [output, setOutput] = useState({
    expToLevelOutput: '',
    lvlToEXPOutput: '',
  });

  useEffect(() => {
    setOutput(() => ({
      lvlToEXPOutput: String(Math.floor((5 * state.lvlToEXPInput * (state.lvlToEXPInput + 1)) / 2)),
      expToLevelOutput: String(Math.floor((Math.sqrt(1 + (8 * state.expToLevelInput) / 5) - 1) / 2)),
    }));
  }, [state]);

  return (
    <ContentBlock title="EXP Converter">
      <div className="flex flex-col text-center items-center">
        <div className="mb-2">
          <label htmlFor="exp-1" className="block">
            EXP To Level
          </label>
          <input
            min={0}
            type="number"
            name="exp-1"
            value={state.expToLevelInput === 0 ? '' : state.expToLevelInput}
            onChange={(e) =>
              changeStateVal('expToLevelInput', (e.target as HTMLInputElement).value, setState)
            }
            className="p-2 text-black max-w-[200px] outline-none appearance"
          />
          <input
            type="text"
            readOnly
            className="bg-gray-500 text-white text-shadow-1 outline-none p-2 text-center mb-3 max-w-[200px]"
            value={`${Number(output.expToLevelOutput).toLocaleString('en-us')} Lvl`}
          />
        </div>
        <div>
          <label htmlFor="exp-2" className="block">
            Level To EXP
          </label>
          <input
            min={0}
            type="number"
            name="exp-2"
            value={state.lvlToEXPInput === 0 ? '' : state.lvlToEXPInput}
            onChange={(e) => changeStateVal('lvlToEXPInput', (e.target as HTMLInputElement).value, setState)}
            className="p-2 text-black max-w-[200px] outline-none auto appearance"
          />
          <input
            type="text"
            readOnly
            className="bg-gray-500 text-white text-shadow-1 outline-none p-2 text-center mb-3 max-w-[200px]"
            value={`${Number(output.lvlToEXPOutput).toLocaleString('en-us')} EXP`}
          />
        </div>
      </div>
    </ContentBlock>
  );
}

export default function EXPCalculatorPage() {
  return (
    <>
      <EXPCalculator />
      <EXPConverter />
    </>
  );
}
