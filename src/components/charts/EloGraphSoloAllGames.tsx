import dynamic from 'next/dynamic';
import * as React from 'react';
import {
  AxisLinearOptions,
  Chart as ChartType,
  TooltipOptions,
} from 'react-charts';
import { TooltipRendererProps } from 'react-charts/types/components/TooltipRenderer';
import useSWR from 'swr';
import useLocalStorageState from 'use-local-storage-state';

import { fetcher } from '@/utils/fetch';
const Chart = dynamic(() => import('react-charts').then((mod) => mod.Chart), {
  ssr: false,
}) as typeof ChartType;

export default function EloGraphSoloAllGames(props: { id: string }) {
  const [season] = useLocalStorageState('SS 22');
  const { data: elo_changes } = useSWR(
    `/api/player/stats/elo/changes/${props.id}/${season}`,
    fetcher
  );

  type Elo = {
    gameId: number;
    elo: number;
    date: Date;
    elo_change: number;
    opponent: string;
  };

  type Series = {
    label: string;
    data: Elo[];
  };

  type elo_stat_entry = {
    ts: string;
    elo: number;
    opponent_name: string;
  };

  let elo_entries: Elo[] = React.useMemo(() => [], []);
  let last_game_id = 0;
  let last_elo = elo_changes ? elo_changes.stats[0]?.elo : 0;

  //create chart data from elo_changes
  if (elo_changes) {
    elo_entries = [];
    elo_changes.stats.forEach((change: elo_stat_entry) => {
      elo_entries.push({
        date: new Date(change.ts),
        elo: change.elo,
        gameId: last_game_id++,
        elo_change: change.elo - last_elo,
        opponent: change.opponent_name,
      });
      last_elo = change.elo;
    });
  }

  if (elo_entries.length == 0) {
    elo_entries.push({
      date: new Date('2020-04-20'),
      elo: 69,
      gameId: 0,
      elo_change: 0,
      opponent: 'N/A',
    });
  }

  const chartData: Series[] = [{ label: 'Elo', data: elo_entries }];

  const tooltipOptions: TooltipOptions<Elo> = {
    show: true,
    render: (props: TooltipRendererProps<Elo>) => {
      return (
        <div className='bg-slate-900 p-2 text-xs text-white bg-opacity-90 rounded-md'>
          <div>Opponent: {props.focusedDatum?.originalDatum.opponent}</div>
          <div>Elo-Change: {props.focusedDatum?.originalDatum.elo_change}</div>
        </div>
      );
    },
  };

  const primaryAxis = React.useMemo(
    (): AxisLinearOptions<Elo> => ({
      getValue: (datum: { gameId: number }) => datum.gameId,
      formatters: {
        tooltip: (value: number) => elo_entries[value]?.date.toDateString(),
      },
    }),
    [elo_entries]
  );

  const secondaryAxes = React.useMemo(
    (): AxisLinearOptions<Elo>[] => [
      {
        getValue: (datum: { elo: number }) => datum.elo,
        scaleType: 'linear',
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
              tooltip: tooltipOptions,
            }}
          />
        ) : (
          <div>Wow such empty...</div>
        )}
      </div>
    </>
  );
}
