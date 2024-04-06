
export default interface UserInfo {
    name: string
    email: string
    picture: string
    subscription: string

    familyNames: string[]

    selectedFamily: {
        name: string
        role: {
            name: string
            grants: string[]
        }
    }
}
