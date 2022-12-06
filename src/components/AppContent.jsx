import style from "./Content.module.css";

export default function AppContent({ children }) {
	return <div className={style.main}>{children}</div>;
}
