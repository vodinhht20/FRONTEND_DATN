import moment from "moment";

// format date time
export const formatDate = (date, format = 'DD-MM-YY') => {
    return moment(date).format(format);
}