
module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.name)
            return ["parse error: data.name is not defined.", null];
        if (!data.email)
            return ["parse error: data.email is not defined.", null];
        if (!data.picture)
            return ["parse error: data.picture is not defined.", null];

        const user = {
            id: data.id,
            name: data.name,
            email: data.email,
            picture: data.picture
        };

        return [null, user];
    }

    const encode = (user) => {
        return [null, user];
    }

    const encodeList = (userList) => {
        let dataList = userList.map(user => {
            return { id: user.id, name: user.name }
        });
        return [null, dataList];
    }

    return require("./CommonController")(logger, "UserController", business, decode, encode, encodeList);
}
