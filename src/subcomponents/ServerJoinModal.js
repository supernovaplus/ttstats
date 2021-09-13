import ModalInstance from "./Modal";

export default function ServerJoinModal({server}) {

	return (
        // window.location.href = "fivem://connect/cfx.re/join/" + server.endpoint;
		<ModalInstance
                linkTitle={"Connect"}
                linkClicked={() => {
                    window.location.href = "fivem://connect/cfx.re/join/" + server.endpoint;
                }}
                smallLink={true}
            >
            <div className="border-start">
				<div className="border-title">Joining {server.name}</div>
				<div className="border-end">
                    Sometimes connecting doesnt work on first try, click the link again below if that happens<br/>
			        <a href={"fivem://connect/cfx.re/join/" + server.endpoint} className="normalLink mg">Connect again</a><br/>
                </div>
            </div>
		</ModalInstance>
	)
}