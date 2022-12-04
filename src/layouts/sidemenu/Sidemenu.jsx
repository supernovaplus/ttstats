import style from "./Sidemenu.module.css";

export default function Sidemenu({ children }) {
	return <div className={style.main}>{children}</div>;
}
