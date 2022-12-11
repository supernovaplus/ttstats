import { useState } from 'react';

export default function Modal({ dd, children }) {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => setVisible((s) => !s);
	const DD = dd;

	return (
		<div>
			{DD}
			<input type="button" value="show" onClick={() => toggleVisibility()} />
			{visible ? (
				<div className="modal" onClick={() => toggleVisibility()}>
					<div className="modal-content">{children}</div>
					<input type="button" value="close" onClick={() => toggleVisibility()} />
				</div>
			) : (
				<></>
			)}
		</div>
	);
}
