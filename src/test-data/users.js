const { expect } = require("@playwright/test");

const validInputAtLogin = [
    {
        expect: "success",
        desc: "valid credentials",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "6501",
            password: "1234",
            resetRadio: "",
        },
        url: "https://hms.humansoft.co.th/welcome",
    },
   
];

const invalidInputAtLogin = [
    {
        expect: "error",
        desc: "without username and password",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "",
            password: "",
            resetRadio: "",
        },
        url: "",
    },
    {
        expect: "error",
        desc: "without username",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "",
            password: "1234",
            resetRadio: "",
        },
        url: "",
    },
    {
        expect: "error",
        desc: "without password",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "6501",
            password: "",
            resetRadio: "",
        },
        url: "",
    },
    {
        expect: "error",
        desc: "invalid credentials",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "6501",
            password: "4567",
            resetRadio: "",
        },
        url: "",
    },
];

const validInputAtResetPassword = [
    {
        expect: "success",
        desc: "valid username select email",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "6501",
            password: "1234",
            resetRadio: "email",
        },
        url: "https://hms.humansoft.co.th/welcome",
    },
    {
        expect: "success",
        desc: "valid username select phone",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "6501",
            password: "1234",
            resetRadio: "mobilephone",
        },
        url: "https://hms.humansoft.co.th/welcome",
    },
];

const invalidInputAtResetPassword = [
    {
        expect: "error",
        desc: "username",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "",
            password: "",
            resetRadio: "",
        },
        url: "https://hms.humansoft.co.th/welcome",
    },
    {
        expect: "error",
        desc: "invalid username select email",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "1111",
            password: "1234",
            resetRadio: "email",
        },
        url: "https://hms.humansoft.co.th/welcome",
    },
    {
        expect: "error",
        desc: "invalid username select phone",
        company: {
            name: "OumforTest",
        },
        credentials: {
            username: "1111",
            password: "1234",
            resetRadio: "mobilephone",
        },
        url: "https://hms.humansoft.co.th/welcome",
    },
];

module.exports = {
    validInputAtLogin,
    invalidInputAtLogin,
    validInputAtResetPassword,
    invalidInputAtResetPassword,
}