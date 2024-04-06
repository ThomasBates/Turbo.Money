
import IUserService from 'services/user/IUserService';

export default function PrivateHeaderData(users: IUserService) {

    const signOutItem = {
        content: "Sign Out",
        action: users.auth.signOut,
        icon: (<img src="/assets/icons/icons8-right-52.png" alt="Sign Out" width="24" />)
    }

    if (!users.user) {
        return {
            content: "root",
            minWidth: "12em",
            list: [
                signOutItem,
            ]
        };
    }

    const userNameItem = { content: `Name: ${users.user.name}` };

    if (users.user.subscription === 'Personal') {
        return {
            content: "root",
            minWidth: "24em",
            list: [
                userNameItem,
                signOutItem,
            ]
        };
    }

    const familyNames = users.user.familyNames;
    //const familyNames = ['Thomas Bates', 'Bates Family', 'Joe Bloe'];

    const familyItem = (familyNames.length == 1)
        ? {
            content: `Family: ${users.user.selectedFamily.name}`
        }
        : {
            content: `Family: ${users.user.selectedFamily.name}`,
            list: familyNames
                .filter((familyName: string) => familyName !== users.user?.selectedFamily.name)
                .map((familyName: string) => ({
                    content: `Switch to ${familyName}`,
                    action: () => users.switchFamily(familyName)
                }))
        };

    return {
        content: "root",
        minWidth: "24em",
        list: [
            userNameItem,
            familyItem,
            signOutItem,
        ]
    };
}
