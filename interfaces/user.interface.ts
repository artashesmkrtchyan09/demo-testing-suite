export interface UserAccount {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    birthDay: {
        day: string,
        month: string,
        year: string
    }
}

export interface UserAddress {
    companyName: string,
    address: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    mobileNumber: string
}

export interface Contacts {
    userName: string,
    email: string,
    subject: string,
    message: string
}