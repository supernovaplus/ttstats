import style from "./Main.module.css";

export default function Main({ children }) {
	return (
		<div className={style.main}>
			{children}
		</div>
	);
}
