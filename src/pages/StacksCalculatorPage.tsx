import PageWrapper from '../components/PageWrapper';
import { useState, useEffect, useRef } from 'react';
import { shortenLargeMoney } from '../components/Misc';

const localStorageKey = 'ttstats-stacks-price';

export default function StacksCalculatorPage() {
  const [stackAmountString, setStackAmountString] = useState('');
  const savedPrice = window.localStorage.getItem(localStorageKey);
  const [singleStackPrice, setSingleStackPrice] = useState(savedPrice ? parseInt(savedPrice) : 1000);
  const [result, setResult] = useState(0);

  function calculateAmount() {
    try {
      let multiplier = 1;
      const parsedStackAmountString = stackAmountString.toLocaleLowerCase().replace(',', '.').replace(/[_-]/g, '');
      if (parsedStackAmountString.includes('tril')) multiplier = 1_000_000_000_000;
      else if (parsedStackAmountString.includes('bil')) multiplier = 1_000_000_000;
      else if (parsedStackAmountString.includes('mil')) multiplier = 1_000_000;
      else if (parsedStackAmountString.includes('k')) multiplier = 1_000;

      if (singleStackPrice && parsedStackAmountString) {
        const [amount] = parsedStackAmountString.match(/[0-9.]+/) || ['0'];
        if (amount) {
          const fullAmount = parseFloat(amount) * multiplier * singleStackPrice;
          setResult(Math.round(fullAmount));
          console.log([amount, fullAmount]);
        }
      }
    } catch (err) {
      setResult(-1);
    }
  }

  useEffect(() => {
    if (singleStackPrice > 1000) {
      setSingleStackPrice(1000);
    }

    const calculateAmountTimeout = window.setTimeout(calculateAmount, 100);
    return () => {
      window.clearTimeout(calculateAmountTimeout);
    };
  }, [stackAmountString, singleStackPrice]);

  useEffect(() => {
    const saveSingleStackTimeout = window.setTimeout(() => {
      if (singleStackPrice) window.localStorage.setItem(localStorageKey, String(singleStackPrice));
    }, 1000);
    console.log(singleStackPrice + '?');

    return () => {
      window.clearTimeout(saveSingleStackTimeout);
    };
  }, [singleStackPrice]);

  return (
    <PageWrapper title="stacks sell/buy calculator">
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="stackAmountString">Stacks amount (eg. 1.2mil)</label>
        <input id="stackAmountString" name="stackAmountString" type="text" onChange={(e) => setStackAmountString(e.target.value)} value={stackAmountString} className="block px-2 w-full max-w-sm py-1 text-center" placeholder="..." />
        <label htmlFor="singleStackPrice">Price for each (1 stack converts to 1000$)</label>
        <input id="singleStackPrice" name="singleStackPrice" type="number" onChange={(e) => setSingleStackPrice(parseInt(e.target.value) || 0)} value={singleStackPrice} className="block px-2 w-full max-w-sm py-1 text-center" min="0" max={1000} />
        <hr className="border-1 mt-2 border-white w-full" />
        <div>Copy/Paste To Chat:</div>
        <textarea value={`send ${shortenLargeMoney(result)} [${result.toLocaleString('us')}]`} readOnly className="block shadow-md p-1 w-full max-w-sm resize-none text-center bg-blue-200  border border-black outline-none" rows={1} />
        <div>Copy/Paste To Inventory Input:</div>
        <textarea value={result} readOnly className="block shadow-md p-1 w-full max-w-sm resize-none my-1 text-center bg-blue-200 border border-black outline-none" rows={1} />
      </div>
    </PageWrapper>
  );
}
