module.exports = ( sequelize, DataTypes ) => {
    const suborders = sequelize.define("suborders", {
       os_count: {
           type: DataTypes.INTEGER,
           allowNull: false,
       },
    }, { timestamps: false });

    suborders.associate = (models) => {
        suborders.belongsTo(models.things);
    };

    return suborders ;
}