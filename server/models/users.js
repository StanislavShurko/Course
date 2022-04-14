module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        id_user: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
    });

    users.associate = (models) => {
        users.hasMany( models.things , {

        });
    };

    return users;

}