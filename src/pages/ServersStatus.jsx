import React from "react";
// import { Link } from "react-router-dom";
import Uptime from "../components/Uptime";
import SkillBoost from "../components/SkillBoost";
import ServerInfoModal from "../components/ServerInfoModal";
import ServerJoinModal from "../components/ServerJoinModal";
import PlayersListModal from "../components/PlayersListModal";
import ModalInstance from "../components/Modal";
import DXPModal from "../components/DXPModal";
import { useDataContext } from "../data/store";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

export default function ServersStatus() {
	const { servers } = useDataContext();

	return (
		<div className="container">
			<div className="border-start">
				<div className="border-title">Transport Tycoon Servers List</div>
				<motion.input type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 1.2 }} value={"kebab"} />
				<div className="border-end">
					<table>
						<thead>
							<tr>
								<th>Connect</th>
								<th>Players</th>
								<th>Status</th>
								<th>Uptime</th>
								<th>DXP</th>
							</tr>
						</thead>
						<tbody>
							{Object.values(servers).map((server, index) => {
								const isOnline = server.loaded && !!server.serverData;
								const dxp = server?.["serverData"]?.["dxp"];
								const isDxpActive = dxp !== undefined && dxp[0] === true;

								return (
									<tr key={index} className={!server.loaded ? "cgp-lightgrey" : isOnline ? "" : "cgp-grey"}>
										<td data-label="Server">
											<b>{server.name}</b>
											<br />
											<ServerJoinModal server={server} />
										</td>
										<td data-label="Players">
											<div style={{ minWidth: "60px" }}>
												{
													!isOnline ? "-/-" : <PlayersListModal server={server} linkTitle={(server.playersData.length <= server.serverData.limit ? server.playersData.length : server.serverData.limit + "+") + "/" + server.serverData.limit} />
													// <Link to={`/playerfinder?server=${encodeURI(server.name)}`} className="btn" title="Server Info">
													// 	{server.playersData.length <= server.serverData.limit ? server.playersData.length : server.serverData.limit + "+"}/{server.serverData.limit}
													// </Link>
												}
											</div>
										</td>
										<td data-label="Status">
											<div style={{ minWidth: "66px" }}>
												{!server.loaded ? (
													"Loading"
												) : isOnline ? (
													<>
														<ServerInfoModal server={server} linkTitle="Online" />
													</>
												) : (
													"Offline"
												)}
											</div>
										</td>
										<td data-label="Uptime">
											<div style={{ minWidth: "80px" }}>{isOnline ? <ModalInstance linkTitle={<Uptime time={server.serverData.uptime} />}>Servers usually restarts every 18 hours</ModalInstance> : "-"}</div>
										</td>
										<td className="dxp" data-label="DXP">
											{isOnline && isDxpActive ? (
												<span style={{ display: "inline-block", minWidth: "110px" }}>
													<DXPModal dxp={dxp} server={server} />
												</span>
											) : (
												<>-</>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<div className="border-start">
				<div className="border-end text-center text-shadow">
					<SkillBoost />
				</div>
			</div>
		</div>
	);
}
