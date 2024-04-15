
export function getRandomString(size: number) {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < size; ++i) {
        result += characters[Math.floor(Math.random() * charactersLength)];
    }
    return result;
}