module.exports = async function createBaseUserData(logger, db) {

    await db.grant.bulkCreate([
        { name: 'GuestAccess1' },
        { name: 'GuestAccess2' },
        { name: 'StandardAccess1' },
        { name: 'StandardAccess2' },
        { name: 'PremiumAccess1' },
        { name: 'PremiumAccess2' },
        { name: 'SystemAccess1' },
        { name: 'SystemAccess2' },
    ]);

    const userGrants = await db.grant.findAll();
    let grants = {};
    userGrants.map(grant => { grants[grant.name] = grant });

    const observer = await db.role.create({ name: 'Observer' });
    observer.addGrant(grants.GuestAccess1);
    observer.addGrant(grants.GuestAccess2);
    observer.addGrant(grants.StandardAccess1);
    observer.addGrant(grants.StandardAccess2);

    const admin = await db.role.create({ name: 'Administrator' });
    userGrants.map(grant => { admin.addGrant(grant) });

    const guest = await db.user.create({
        name: 'Guest',
        email: 'guest',
        picture: '',
        authorization: {
            source: 'email',
            source_id: 'guest',
            password_hash: 'hJg8YPfarcHLhphiH4AsDZ+aPDwpXIEHSPsEgRXBhuw='
        }
    }, {
        include: [{
            association: db.user.Authorization,
        }]
    });

}