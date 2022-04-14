module.exports = (sequelize, DataTypes) => {

    const things = sequelize.define("things", {
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
    }, { timestamps: false });

    things.associate = (models) => {
        things.hasMany(models.suborders);
    };

    return things;
}