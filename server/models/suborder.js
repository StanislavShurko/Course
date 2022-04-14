module.exports = (sequelize, DataTypes) => {

    const suborder = sequelize.define("suborder", {
        id_suborder: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        suborder_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })

    return suborder;
}