import moment from "moment";

// format date time
export const formatDate = (date = null, format = 'DD-MM-YY') => {
    if(date) {
        return moment(date).format(format);
    }
    return moment().format(format);
}
export const getDate = (data, format) => {
    return moment(data, format);
}