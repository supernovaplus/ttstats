import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serversAtom } from "../data/dataStore";
import { useRecoilValue } from "recoil";

/** @type {[startsWith: string, tagInGame: string]} */
const companyTags = [
	["COCO", "CollinsCo"],
	["PIGS", "P.I.G.S."],
	["RTS", "R.T.S."],
	["BAT", "BAT"],
	["FRLLC", "FRLLC"],
	["IA", "IA "],
];

export default function TopJobs() {
	const servers = useRecoilValue(serversAtom);
	const [jobsState, setJobsState] = useState({ entries: [], counter: 0 });
	const [companyJobsState, setCompanyJobsState] = useState({ entries: [], counter: 0 });

	useEffect(() => {
		const jobs = {};
		const companyJobs = {};
		companyTags.forEach(([jobTitle]) => (companyJobs[jobTitle] = 0));

		for (const key in servers) {
			if (servers[key].loaded === true && servers[key].playersData !== null) {
				servers[key].playersData.forEach((player) => {
					if (!jobs.hasOwnProperty(player[5])) {
						jobs[player[5]] = 1;
					} else {
						jobs[player[5]]++;
					}

					const companyJobFound = companyTags.find((job) => player[5].startsWith(job[1]));
					if (companyJobFound) {
						companyJobs[companyJobFound[0]]++;
					}
				});
			}
		}

		const sortedJobs = Object.entries(jobs).sort((item1, item2) => item2[1] - item1[1]);
		const sortedCompanyJobs = Object.entries(companyJobs).sort((item1, item2) => item2[1] - item1[1]);

		setJobsState((s) => ({
			...s,
			entries: sortedJobs,
			counter: sortedJobs.reduce((acc, val) => acc + val[1], 0),
		}));

		setCompanyJobsState((s) => ({
			...s,
			entries: sortedCompanyJobs,
			counter: sortedCompanyJobs.reduce((acc, val) => acc + val[1], 0),
		}));
	}, [servers]);

	return (
		<div className="container">
			<div className="border-start">
				<div className="border-title">Top Jobs Now</div>
				<div className="border-end scroll">
					<table>
						<thead>
							<tr>
								<th>%</th>
								<th>Job Name</th>
								<th>Active</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{jobsState.counter === 0 ? (
								<tr>
									<td>-</td>
									<td>No Data</td>
									<td>N/A</td>
								</tr>
							) : (
								jobsState.entries.map((job, index) => {
									return (
										<tr key={index}>
											<td data-label="%">{Number((job[1] / jobsState.counter) * 100).toFixed(1)}%</td>
											<td data-label="Job Name">{job[0]}</td>
											<td data-label="Active">{job[1]}</td>
											<td data-label="Links">
												<Link to={encodeURI("/playerfinder?job=" + job[0])} className="smallLink mg">
													Players
												</Link>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>

			<div className="border-start">
				<div className="border-title">Top Company Jobs Now</div>
				<div className="border-end">
					<table>
						<thead>
							<tr>
								<th>%</th>
								<th>Job Name</th>
								<th>Active</th>
							</tr>
						</thead>
						<tbody>
							{companyJobsState.counter === 0 ? (
								<tr>
									<td>-</td>
									<td>No Data</td>
									<td>N/A</td>
								</tr>
							) : (
								companyJobsState.entries.map((job, index) => {
									return (
										<tr key={index}>
											<td data-label="%">{Number((job[1] / companyJobsState.counter) * 100).toFixed(1)}%</td>
											<td data-label="Job Name">{job[0]}</td>
											<td data-label="Active">{job[1]}</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
