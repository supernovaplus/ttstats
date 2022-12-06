import React from "react";
import { useDataContext } from "../data/store";

export default function HighestID() {
	const { servers } = useDataContext();

	const playersList = Object.values(servers)
		.reduce((acc, server) => (server.loaded && server.playersData ? [...acc, ...server.playersData.filter((player) => player[2] !== "?")] : acc), [])
		.sort((a, b) => b[2] - a[2])
		.map((data, index) => ({
			index: index + 1,
			name: data[0],
			id: data[2],
		}));

	const sortedList =
		playersList.length > 25
			? [
					...playersList.splice(0, 10),
					{
						index: "...",
						name: "...",
						id: "...",
					},
					...playersList.splice(playersList.length - 10),
			  ]
			: playersList;

	return (
		<div className="container">
			<div className="border-start">
				<div className="border-title">Highest and lowest player IDs currently online</div>
				<div className="border-end">
					{
						<table>
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>ID</th>
								</tr>
							</thead>
							<tbody>
								{!sortedList.length ? (
									<tr>
										<th></th>
										<th>No Data</th>
										<th></th>
									</tr>
								) : (
									sortedList.map((player, index) => (
										<tr key={index} style={index === 0 ? { fontSize: "2em" } : {}}>
											<td data-label="# Place">#{player.index}</td>
											<td data-label="Player">
												<b>{player.name ? player.name : "?"}</b>
											</td>
											<td data-label="ID">{player.id}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					}
				</div>
			</div>
		</div>
	);
}
