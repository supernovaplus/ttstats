import React, { useState, useEffect } from 'react';
import { SkillBoostData } from '../../types/serverTypes';

export default function Skillboost() {
  const [state, setState] = useState('');

  useEffect(() => {
    let isSubscribed = true;

    fetch('https://d.ttstats.eu/skillboost')
      .then((res) => res.json())
      .then((res: SkillBoostData) => {
        if (isSubscribed) {
          if (!res.data) {
            setState(() => '-');
          } else {
            setState(() => `${res.data.skill} +${res.data.bonus}% exp`);
          }
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
          setState(() => '-');
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return <div className='text-lg font-bold text-black dark:text-white text-center before:w-3 px-3 bg-nova-opa1 pt-1' >Current skill boost: {state || '?'}</div>;
}
