export const formatTime = (time) => {
    const isPm = time.getHours() - 12 >= 0
    const timeVal = `${isPm ? time.toLocaleTimeString().replace(time.toLocaleTimeString().slice(0, 2), Number(time.getHours()) - 12) : time.toLocaleTimeString() }`
    return `${timeVal.slice(0, timeVal.length - 3)} ${isPm ? "PM" : "AM"}`
}