export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
};

export const msToMMSS = (ms: number) =>{
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${String(seconds).padStart(2, "0")}`
}
