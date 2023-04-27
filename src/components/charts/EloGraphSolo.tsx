import dynamic from 'next/dynamic';
import * as React from 'react';
import { AxisOptions } from 'react-charts';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { fetcher } from '@/utils/fetch';
const Chart = dynamic(() => import('react-charts').then((mod) => mod.Chart), {
  ssr: false,
});

export default function EloGraphSolo(props: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data: elo_changes } = useSWR(
    `/api/player/stats/elo/changes/${props.id}/${season}`,
    fetcher
  );

  type Elo = {
    date: Date;
    elo: number;
  };

  type Series = {
    label: string;
    data: Elo[];
  };

  type elo_stat_entry = {
    ts: string;
    elo: number;
  };

  const elo_entries: Elo[] = [];
  let last_entry_date: Date;
  let current_date;

  //create chart data from elo_changes
  //create one elo entry for each day
  if (elo_changes) {
    elo_changes.stats.forEach((change: elo_stat_entry) => {
      current_date = new Date(change.ts);
      current_date.setHours(0, 0, 0, 0);
      if (last_entry_date == null || current_date > last_entry_date) {
        //push new elo entry if elo_changes are on different days
        last_entry_date = current_date;
        elo_entries.push({
          date: new Date(change.ts),
          elo: change.elo,
        });
      } else {
        //update elo if elo_changes are on the same day
        elo_entries[elo_entries.length - 1].elo = change.elo;
      }
    });
  }
  const chartData: Series[] = [{ label: 'Elo', data: elo_entries }];

  const primaryAxis = React.useMemo(
    (): AxisOptions<Elo> => ({
      getValue: (datum: { date: Date }) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<Elo>[] => [
      {
        getValue: (datum: { elo: number }) => datum.elo,
      },
    ],
    []
  );
  return (
    <>
      <div className='h-96 bg-white rounded-lg'>
        {/* Das Chart hier wird immer als Fehler angezeigt. Liegt glaube dran dass man das so weird importieren muss.
            Aber solang es funktioniert is ja eigentlich wayne. */}
        {elo_changes ? (
          <Chart
            options={{
              data: chartData,
              primaryAxis: primaryAxis,
              secondaryAxes: secondaryAxes,
            }}
          />
        ) : (
          <div>loading...</div>
        )}
      </div>
    </>
  );
}
