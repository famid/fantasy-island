

import { Table } from '@mantine/core';

import React from 'react'

import {prizePool as prizeData} from '../../../uitls'

function PrizePool() {
    const rows = prizeData.map((Prize,i) => (
        <tr key={Prize.prizeIndex}>
          <td>{Prize.prizeIndex}</td>
          <td>{Prize.prizeAmount}</td>
          <td>{Prize.type}</td>

        </tr>
      ));
  return (
    <Table  withBorder withColumnBorders >
      <thead>
        <tr>
          <th>Prize position</th>
          <th>Prize Amount</th>
          <th>Prize Type</th>

        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  )
}

export default PrizePool

