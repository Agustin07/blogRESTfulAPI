export const format = (date : Date): { now : string, time : string } => {
	return { now : date.toLocaleDateString(), time : date.toLocaleTimeString() };
};
