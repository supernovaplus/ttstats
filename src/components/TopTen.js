import React, { useState, useEffect } from "react";
import Loading from "../subcomponents/Loading";

function TopBlock({board, index, savedTop10Statuses}) {
	const [isOpen, setOpenStatus] = useState(savedTop10Statuses[index] === true || (index === 0 && !(index in savedTop10Statuses)));

	function handleChanges(){
		savedTop10Statuses[index] = !isOpen;
		localStorage.setItem("top10", JSON.stringify(savedTop10Statuses));
		setOpenStatus(() => !isOpen);
	}

	return (
		<div className="border-start selected-border">
			<div className="border-title button-title text-center" onClick={handleChanges}>{board.title}</div>
			<div className="border-end">
				{ isOpen === true &&
					<table>
						<thead>
							<tr>
								<th>#</th>
								{board.labels.map((label, index2)=><th key={index2}>{label}</th>)}
							</tr>
						</thead>
						<tbody>
							{board.rows.map((row, index2) => 
								<tr key={index2} title={row[0]}>
									<td data-label="# Place">{index2+1}</td>
									{board.rows[index2].slice(1).map((column, index3) => <td key={index3} data-label={board.labels[index3]}>{column}</td>)}
								</tr>
							)}
						</tbody>
					</table>
				}
			</div>
		</div>
	)
}

export default function Top10 () {
	const [state, setState] = useState({
		loading: true,
		error: null,
		data: null,
		timestamp: 0
	});

	const savedTop10Statuses = state.loading === false && localStorage.getItem("top10") ? JSON.parse(localStorage.getItem("top10")) : {};

	useEffect(()=>{
		const controller = new AbortController();
		const signal = controller.signal;
		let isSubscribed = true;
		fetch("https://aca.lt/api_v1/top10.json", {signal})
		.then(res=>res.json())
		.then(res=>{
			if (isSubscribed){
				setState(s => ({
					...s, 
					loading: false,
					...res
				}))
			}
		}).catch(err => {
			if (isSubscribed) {
				console.log(err);
				setState(s => ({
					...s, 
					error: "Failed to load the data, try again later.", 
					loading: false
				}))
			}
		})
		return () => {
			controller.abort();
			isSubscribed = false;
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	return (
		<div className="container">
			<div className="border-start">
				<div className="border-title">Top 10 Leaderboards</div>
				<div className="border-end">
					{state.loading && <div className="border-title">Loading... <Loading/></div>}
					{state.error && <div className="border-title">{state.error === null ? "" : "Error - " + state.error}</div>}
				</div>
			</div>

			{state.data && <>
				{state.data.map((board, index) => <TopBlock key={index} board={board} index={index} savedTop10Statuses={savedTop10Statuses}/>)}
				<div className="border-start">
					<div className="border-title text-center">
						Leaderboards updates every hour<br/>
						Last Updated: {new Date(state.timestamp).toTimeString()}<br/>
						*Data collected since November 12, 2020
					</div>
					<div className="border-end"></div>
				</div>
			</>}
		</div>);
}