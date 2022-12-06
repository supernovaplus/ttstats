import style from "./Sidemenu.module.css";

export default function AppSidemenu({ children }) {
	return <div className={style.main}>{children}</div>;
}
