import ContentBlock from '../../components/ContentBlock';
import { useState, useEffect } from 'react';
import { roundFixed } from '../../controllers/misc';
import { calcLvlToEXP, calcEXPToLvl, prettyNum } from '../../controllers/misc';

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
    const expResult = calcLvlToEXP(state.target) - calcLvlToEXP(state.current);
    const hoursNeeded = expResult / state.expPerHour;
    setOutput({
      expNeeded: expResult <= 0 ? 'Level Reached' : `${prettyNum(expResult)} exp`,
      hoursNeeded: `${roundFixed(hoursNeeded, 1)} hours`,
    });
  }, [state]);

  return (
    <ContentBlock title="EXP Target Calculator">
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
      lvlToEXPOutput: String(calcLvlToEXP(state.lvlToEXPInput)),
      expToLevelOutput: String(calcEXPToLvl(state.expToLevelInput)),
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
            value={`${prettyNum(Number(output.expToLevelOutput))} Lvl`}
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
            value={`${prettyNum(Number(output.lvlToEXPOutput))} EXP`}
          />
        </div>
      </div>
    </ContentBlock>
  );
}

function NotableLevels() {
  const data: [target: string, value: number][] = [
    ["lvl", 10],
    ["lvl", 100],
    ["exp", 500_000],
    ["exp", 1_000_000],
    ["lvl", 1000]
  ];

  return (
    <ContentBlock title="Notable levels">
      <div className="flex flex-col text-center items-center">
        <div className="mb-2 w-full max-w-[400px]">
          <table className='w-full'>
            <tbody>
              {data.map(([target, value], index) => {
                const [lvl, exp] = target === "lvl" ?
                  [prettyNum(value), prettyNum(calcLvlToEXP(value))]
                  : [prettyNum(calcEXPToLvl(value)), prettyNum(value)];

                return (
                  <tr className='bg-gray-500 text-white w-full text-shadow-1' key={index}>
                    <td className='p-2'>{lvl} Lvl</td>
                    <td className='p-1 bg-gray-600 dark:text-white'>=</td>
                    <td className='p-2'>{exp} EXP</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div >
    </ContentBlock >
  )
};


export default function EXPCalculatorPage() {
  return (
    <>
      <EXPCalculator />
      <EXPConverter />
      <NotableLevels />
    </>
  );
}
