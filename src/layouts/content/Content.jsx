import style from "./Content.module.css";

export default function Content({ children }) {
	return <div className={style.main}>{children}</div>;
}
