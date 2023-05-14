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

  return <div className='text-center text-lg'>Current skill boost: {state || '?'}</div>;
}
