

import React from 'react'
import { Table } from '@mantine/core';
const elements = [
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ];

export default function LeaderboardTable({participantsData}) {

    const rows = participantsData.map((element,i) => (
        <tr key={i}>
          <td>{element.ranking}</td>
          <td>{element.name}</td>
          <td>{element.playtime}</td>
        </tr>
      ));

  return (
    <Table  withBorder withColumnBorders>
    <thead>
      <tr>
        <th>Ranking</th>
        <th>Name</th>
        <th>Play Time</th>
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </Table>
  )
}

