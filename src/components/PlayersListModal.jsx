// import ModalInstance from "./Modalx";

export default function PlayersListModal({linkTitle, server}) {

	return (
        <div>Modal</div>
		// <ModalInstance linkTitle={linkTitle}>
        //     <div className="border-start">
        //         <div className="border-title">Players on {server.name}</div>
        //         <div className="border-end">
        //             {!server.playersData || server.playersData.length === 0 ? 
        //             <h2>No Players</h2> : 
        //             <div className="scroll" style={{maxHeight: "80vh"}}>
        //                 <table>
        //                     <thead>
        //                         <tr>
        //                             <th>Avatar</th>
        //                             <th>#</th>
        //                             <th>Name #ID</th>
        //                             <th>Job</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>
        //                         {server.playersData.map((player, index) => (
        //                         <tr key={index}>
        //                             <td data-label="Avatar">
        //                                 {
        //                                     player[3] ? 
        //                                         <a href={player[3]} target="_blank" rel="noopener noreferrer"><img src={player[3] || "#"} height="50px" alt="img" className="avatar"/></a> : 
        //                                             <img className="no-avatar" src="media/no-avatar.gif" alt="-"/>
        //                                 }
        //                             </td>
        //                             <td data-label="#">#{index+1}</td>
        //                             <td data-label="Name #ID">
        //                                 {player[0]} <small className={"mg"}>#{player[2]}</small> 
        //                                 {player[4] && <small className={"bg-blue mg"}>Staff</small>}
        //                                 {player[6] && <small className={"bg-orange mg"}>Donator</small>}
        //                             </td>
        //                             <td data-label="Job">{player[5] || "-"}</td>
        //                         </tr>
        //                         ))}
        //                     </tbody>
        //                 </table>
        //             </div>}
        //         </div>
        //     </div>
		// </ModalInstance>
	)
}