module.exports = async function createSampleUserData(logger, db) {

    let user = await db.user.create({
        name: 'John Doe',
        email: 'john.doe@provider.com',
        picture: 'https://provider.com/johndoe.jpg',
        authorization: {
            source: 'email',
            source_id: 'john.doe@provider.com',
            password_hash: 'abcdefghijklmnopqrstuvwxyz'
        }
    }, {
        include: [{
            association: db.user.Authorization,
        }]
    });

    //logger.debug('Model', `createSampleUserData: user.toJSON() =`, user.toJSON());

    user = await db.user.findByPk(1, {
        include: [{
            association: db.user.Authorization,
        }]
    });

    //logger.debug('Model', `createSampleUserData: user.toJSON() =`, user.toJSON());

    user = await db.user.findOne({
        include: [{
            association: db.user.Authorization,
            where: {
                source: 'email',
                source_id: 'john.doe@provider.com',
            },
        }]
    });
    //logger.debug('Model', `createSampleUserData: user.toJSON() =`, user.toJSON());

}