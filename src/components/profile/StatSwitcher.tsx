import { useState } from 'react';

import { StatType } from './Stat';
import { Stat } from './Stat';

export const StatSwitcher = (props: { stats: StatType[] }) => {
  const statComponents: JSX.Element[] = [];
  props.stats.forEach((stat) => {
    statComponents.push(
      <Stat text={stat.text} stats={stat.stats} imageUrl={stat.imageUrl} />
    );
  });

  const [shownStatIndex, setShownStatIndex] = useState(0);
  function switchStat() {
    setShownStatIndex((shownStatIndex + 1) % statComponents.length);
  }
  return (
    <div className='cursor-pointer' onClick={switchStat}>
      {statComponents[shownStatIndex]}
    </div>
  );
};
