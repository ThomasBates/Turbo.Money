
module.exports = (logger, table) => {

    const encode = (user) => {
        const data = {
            //id: user.id,
            source: user.source,
            source_id: user.sourceId,
            name: user.name,
            email: user.email,
            picture: user.picture
        };
        return [null, data];
    }

    const decode = (data) => {
        const user = {
            id: data.id,
            source: data.source,
            sourceId: data.source_id,
            name: data.name,
            email: data.email,
            picture: data.picture
        };
        return [null, user];
    }

    const decodeList = (data) => {

        const users = data.map(item => {
            return { id: item.id, name: item.name }
        });
        
        return [null, users];
    }

    const validate = (user) => {
        if (!user.source) {
            return "User source can not be empty!";
        }
        if (!user.sourceId) {
            return "User sourceId can not be empty!";
        }
        if (!user.name) {
            return "User name can not be empty!";
        }
        if (!user.email) {
            return "User email can not be empty!";
        }
        if (!user.picture) {
            return "User picture can not be empty!";
        }
        return null
    }

    const owner = "UserData";
    const common = require('./CommonData')(logger, owner, table, encode, decode, decodeList, validate);

    const getOneBySourceId = async (source, sourceId) => {
        logger.debug("UserData", `UserData.getOneBySourceId: source="${source}", sourceId="${sourceId}"`);
        try {
            let data = await table.findAll({
                where: {
                    source: source,
                    source_id: sourceId
                }
            })

            if (!data || data.length == 0)
                return [`Cannot find user object with source="${source}" and sourceId="${sourceId}".`, null];

            let [error, user] = decode(data[0]);
            if (error) {
                return [error, null];
            }

            return [null, user];
        }
        catch (ex) {
            let error = ex.message || `Unknown error occurred while finding one database record matching source="${source}" and sourceId="${sourceId}".`;
            logger.error("UserData", `${owner}.getOneBySourceId: error = `, error);
            return [error, null];
        }
    }

    return {
        ...common,
        getOneBySourceId
        }
}