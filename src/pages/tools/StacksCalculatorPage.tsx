import { useState, useEffect, startTransition } from 'react';
import ContentBlock from '../../components/ContentBlock';
import { shortenLargeMoney } from '../../controllers/misc';

const localStorageKey = 'ttstats-stacks-price';

export default function StacksCalculatorPage() {
  const savedPrice = window.localStorage.getItem(localStorageKey);
  const [stackAmountString, setStackAmountString] = useState('');
  const [singleStackPrice, setSingleStackPrice] = useState(savedPrice || '1000');
  const [result, setResult] = useState(0);

  const handleStackPriceChange = (value: string) => {
    startTransition(() => {
      let price = parseInt(value) || 0;
      if (price < 0) price = 0;
      if (price > 1000) price = 1000;
      setSingleStackPrice(price === 0 ? '' : String(price));
    });
  };

  //if any value changed, calculate the price with a delay
  useEffect(() => {
    //calculate the total price
    const calculateAmountTimeout = window.setTimeout(() => {
      try {
        let multiplier = 1;
        const parsedStackAmountString = stackAmountString
          .toLocaleLowerCase()
          .replace(',', '.')
          .replace(/[_-]/g, '');
        if (parsedStackAmountString.includes('tril')) multiplier = 1_000_000_000_000;
        else if (parsedStackAmountString.includes('bil')) multiplier = 1_000_000_000;
        else if (parsedStackAmountString.includes('m')) multiplier = 1_000_000;
        else if (parsedStackAmountString.includes('k')) multiplier = 1_000;

        if (singleStackPrice && parsedStackAmountString) {
          const [amount] = parsedStackAmountString.match(/[0-9.]+/) || ['0'];
          if (amount) {
            startTransition(() => {
              const fullAmount = parseFloat(amount) * multiplier * (parseInt(singleStackPrice) || 0);
              setResult(Math.round(fullAmount));
            });
          } else {
            setResult(0);
          }
        } else {
          setResult(0);
        }
      } catch (err) {
        setResult(0);
      }
    }, 100);

    return () => {
      window.clearTimeout(calculateAmountTimeout);
    };
  }, [stackAmountString, singleStackPrice]);

  //save single stack price to localStorage with a delay
  useEffect(() => {
    const saveSingleStackTimeout = window.setTimeout(() => {
      window.localStorage.setItem(localStorageKey, String(singleStackPrice) || '1000');
      console.log('single stack price saved');
    }, 1000);

    return () => {
      window.clearTimeout(saveSingleStackTimeout);
    };
  }, [singleStackPrice]);

  return (
    <ContentBlock title="stacks sell/buy calculator">
      <div className="flex flex-col justify-center items-center">
        <label htmlFor="stackAmountString">Stacks amount (eg. 1.2mil)</label>
        <input
          id="stackAmountString"
          name="stackAmountString"
          type="text"
          onChange={(e) => setStackAmountString(e.target.value)}
          value={stackAmountString}
          className="block px-2 w-full max-w-sm py-1 text-center text-black"
          placeholder="..."
        />
        <label htmlFor="singleStackPrice">Price for each (1 stack usually sells for $970 to $1000)</label>
        <input
          id="singleStackPrice"
          name="singleStackPrice"
          type="text"
          onChange={(e) => handleStackPriceChange(e.target.value)}
          value={singleStackPrice}
          className="block px-2 w-full max-w-sm py-1 text-center spin text-black"
          placeholder="..."
        />
        <hr className="border-1 mt-2 border-white w-full" />
        <div>Copy/Paste To Chat:</div>
        <textarea
          value={!result ? '-' : `send ${shortenLargeMoney(result)} [${result.toLocaleString('us')}]`}
          readOnly
          className="block shadow-md p-1 w-full max-w-sm resize-none text-center bg-blue-200 border border-black outline-none text-black"
          rows={1}
        />
        <div>Copy/Paste To "Give Money" Input:</div>
        <textarea
          value={result || '-'}
          readOnly
          className="block shadow-md p-1 w-full max-w-sm resize-none my-1 text-center bg-blue-200 border border-black outline-none text-black"
          rows={1}
        />
        <hr />
        <p className="max-w-md text-center dark:bg-black rounded p-2 my-3">
          This tool is made for lazy people who don't want to count zeroes when selling/buying stacks.
          <br />
          Single stack price is saved for later.
        </p>
      </div>
    </ContentBlock>
  );
}
