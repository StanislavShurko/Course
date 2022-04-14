module.exports = (sequelize, DataTypes) => {

    const things = sequelize.define("things", {
        id_thing: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        thing_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thing_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thing_price: {
            type: DataTypes.DOUBLE.UNSIGNED,
            allowNull: false,
        },
        thing_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });

    things.associate = (models) => {
        things.hasMany(models.suborder, {

        });
        things.belongsTo(models.users)
    }
    return things;
}