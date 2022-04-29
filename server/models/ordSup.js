module.exports = (sequelize, DataTypes) => {

    const ordSup = sequelize.define("ordSup", {
        ordSup_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { updatedAt: false });

    ordSup.associate = ( models ) => {
        ordSup.hasMany( models.suborders );
        ordSup.belongsTo( models.users );
    };

    return ordSup;
}