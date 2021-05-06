import { padStart } from 'lodash';
import React, { useEffect, useState } from 'react';

export default function TimerComp() {
  const [seconds, setSeconds] = useState('00');
  const [minutes, setMinutes] = useState('00');
  let totalSeconds = 0;

  function setTime() {
    ++totalSeconds;
    setSeconds(padStart(totalSeconds % 60, 2, 0));
    setMinutes(padStart(parseInt(totalSeconds / 60, 10), 2, 0));
  }

  useEffect(() => {
    setInterval(setTime, 1000);
  }, []);
  return (
    <>
      <span>
        {minutes} : {seconds}
      </span>
    </>
  );
}
