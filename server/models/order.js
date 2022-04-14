module.exports = (sequelize, DataTypes) => {

    const orders = sequelize.define("order", {
        id_order: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type_order: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    orders.associate = (models) => {
        orders.hasMany(models.suborder, {

        });
        orders.belongsTo(models.users, {

        });
    };

    return orders;
}