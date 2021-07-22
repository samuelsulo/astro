export const getDate = (date) => {
    date = new Date(date);
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? '0' + ( date.getMonth() + 1 ) : ( date.getMonth() + 1 );
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '-' + month + '-' + day;
}


export const getTimeNow = () => {
    let time = new Date();
    let hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    return hours + ':' + minutes;
}

export const randomColor = () => {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + hex.toString(16);
}

export const avatarColor = randomColor();