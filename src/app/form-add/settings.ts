const settings = {
    name : {
        min: 4
    },
    password : {
        min: 4
    },
    age: {
        from: 18,
        till : 65
    },
    birthday : {
        format: 'YYYY/MM/DD'
    },
    dateOfLogin : {
        format: 'DD MMMM YYYY'
    },
    dateOfNotification : {
        format: 'DD-MMM-YY'
    }
}
export default settings;