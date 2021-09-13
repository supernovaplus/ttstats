import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serversAtom } from "../controllers/dataStore";
import { useRecoilValue } from 'recoil';

export default function TopJobs () {
	const servers = useRecoilValue(serversAtom);
	const [state, setState] = useState({entries: [], counter: 0});
	const [state2, setState2] = useState({entries: [], counter: 0});
	
	useEffect(() => {
		const jobs = {}

		const companyJobs = {
			"COCO": 0,
			"PIGS": 0,
			"RTS": 0,
			"BAT": 0,
			"FRLLC": 0,
			"IA": 0
		}

		Object.values(servers).forEach(server => {
			if(server.loaded === true && server.playersData !== null){
				server.playersData.forEach(player => {
					if(!jobs.hasOwnProperty(player[5])){
						jobs[player[5]] = 1;
					}else{
						jobs[player[5]]++;
					}

					if(player[5].startsWith("P.I.G.S.")){
						companyJobs["PIGS"]++;
					}else if(player[5].startsWith("R.T.S.")){
						companyJobs["RTS"]++;
					}else if(player[5].startsWith("CollinsCo")){
						companyJobs["COCO"]++;
					}else if(player[5].startsWith("IA ")){
						companyJobs["IA"]++;
					}else if(player[5].startsWith("BAT")){
						companyJobs["BAT"]++;
					}else if(player[5].startsWith("FRLLC")){
						companyJobs["FRLLC"]++;
					}

				})
			}
		})
		const sortedJobs = Object.entries(jobs).sort((item1, item2) => item2[1] - item1[1]);
		const sortedCompanyJobs = Object.entries(companyJobs).sort((item1, item2) => item2[1] - item1[1]);
		setState(s => ({
			...s,
			entries: sortedJobs,
			counter: sortedJobs.reduce((acc, val) => acc + val[1], 0)
		}))
		setState2(s => ({
			...s,
			entries: sortedCompanyJobs,
			counter: sortedCompanyJobs.reduce((acc, val) => acc + val[1], 0)
		}))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [servers]); 

	return (
		<div className="container">
			<div className="border-start">
				<div className="border-title">Top Jobs Now</div>
				<div className="border-end scroll">
					<table>
						<thead>
							<tr><th>%</th><th>Job Name</th><th>Active</th><th></th></tr>
						</thead>
						<tbody>
							{state.counter === 0 ? <tr><td>-</td><td>N/A</td><td>N/A</td></tr> : 
								state.entries.map((job,index)=>{
									return <tr key={index}>
										<td data-label="%">{Number(job[1]/state.counter*100).toFixed(1)}%</td>
										<td data-label="Job Name">{job[0]}</td>
										<td data-label="Active">{job[1]}</td>
										<td data-label="Links"><Link to={encodeURI("/playerfinder?job=" + job[0])} className="smallLink mg">Players</Link></td>
									</tr>
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			<div className="border-start">
				<div className="border-title">Top Company Jobs Now</div>
				<div className="border-end">
					<table>
						<thead>
							<tr><th>%</th><th>Job Name</th><th>Active</th></tr>
						</thead>
						<tbody>
						{state2.counter === 0 ? <tr><td>-</td><td>N/A</td><td>N/A</td></tr> : 
							state2.entries.map((job,index)=>{
								return <tr key={index}>
									<td data-label="%">{Number(job[1]/state2.counter*100).toFixed(1)}%</td>
									<td data-label="Job Name">{job[0]}</td>
									<td data-label="Active">{job[1]}</td>
								</tr>
							})
						}  
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
