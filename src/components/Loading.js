
export default function Loading () {
	// const [state, setState] = useState(1)

	// useEffect(()=>{
    //     const interval = setInterval(() => {
    //         console.log("++")
    //         setState(s => s >= 3 ? 0 : s + 1);
    //     }, 500);

	// 	return () => {
    //         console.log("clear interval");
	// 		clearInterval(interval);
	// 	}
	// }, [])

	// return (<>{".".repeat(state)}</>)
	return (<img src="media/Pulse-1.4s-21px.svg" style={{height: "23px"}} alt="[Loading link]"/>)
}