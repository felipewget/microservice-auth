export const getDateWithoutTimezone = () => {

    let offset = new Date().getTimezoneOffset() * 60000;
    let utc = new Date().getTime() + offset;
    return new Date(utc);

}