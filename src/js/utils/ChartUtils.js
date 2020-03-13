export function hasNoMatchingXAxis(data, settings) {
    const columns = data[0];
    const {axis} = settings;
    return columns[0] === "" && (!axis || !axis.x || axis.x.value === "") && !(columns.find(col => col === axis.x.value));
}
