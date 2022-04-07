

const GetDate = () => {
    var currentdate = new Date();
    var datetime =
        currentdate.getFullYear() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getDate()
        + " " + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}

export default GetDate