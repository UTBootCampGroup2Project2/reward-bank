module.exports = {
  format_date: date => {
    let fullDate = `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    let fullTime = `${new Date(date).getHours()}:${new Date(date).getMinutes()}:${new Date(date).getSeconds()}`;
    return `${fullDate}`;
  }
}
