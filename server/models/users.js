module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_tnum: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { timestamps: false });

    users.associate = (models) => {
        users.hasMany( models.ordSup );
    };

    return users;
}