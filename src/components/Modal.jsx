import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
	// backgroundColor: "rgba(0, 0, 0, 0.7)",
	backgroundColor: "rgba(6, 18, 36, 0.9)",
	boxShadow: "5px 5px 10px black",
	border: "1px solid #008cff",
	maxWidth: "800px",
	width: "100%",
	maxHeight: "100vh",
	minHieght: "500px",
	minWidth: "350px",

	top: "50%",
	left: "50%",
	right: "auto",
	bottom: "auto",
	marginRight: "-50%",
	transform: "translate(-50%, -50%)",
	textAlign: "center"
  },
  overlay: {
	backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export default function ModalInstance({linkTitle = "Open Modal", children, linkClicked = () => {}, smallLink = false}) {
	const [modalIsOpen, setIsOpen] = useState(false);
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	return (
		<>
			<a href={window.location.href} onClick={(e) => {
					e.preventDefault()
					openModal();
					linkClicked();
				}} className={smallLink ? "smallLink mg" : "normalLink"}>
					{linkTitle}
				</a>
			
			<Modal
				isOpen={modalIsOpen}
				// onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
			>
				{children}
				<div style={{textAlign: "right"}}>
					<a href={window.location.href} onClick={(e) => {
						e.preventDefault();
						closeModal();
					}} className="smallLink unselectable mg">
						CLOSE
					</a>
				</div>
			</Modal>
		</>
	);
}