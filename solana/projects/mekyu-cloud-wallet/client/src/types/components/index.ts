// Auth

type AuthUserType = {
    uid: string
    email: string
    displayName: string
    phoneNumber?: number
    photoURL?: string
}

type AuthResponseType = {
    user: AuthUserType
}


export type {
    AuthUserType,
    AuthResponseType
}