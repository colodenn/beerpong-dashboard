import { ReactNode } from 'react';

export const TableWrapper = (props: {
  columns: string[];
  children: ReactNode;
}) => {
  const Columns = props.columns.map((e, i: number) => {
    return (
      <th key={i} className='sticky top-0 z-10 bg-white'>
        {e}
      </th>
    );
  });
  return (
    <table className='table overflow-y-scroll w-full h-96 bg-white rounded-lg'>
      <thead className='bg-white'>
        <tr key={'test2'} className='bg-white'>
          {Columns}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
      <tfoot>
        <tr>{Columns}</tr>
      </tfoot>
    </table>
  );
};
