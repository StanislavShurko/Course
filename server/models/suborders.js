module.exports = ( sequelize, DataTypes ) => {
    const suborders = sequelize.define("suborders", {
       os_count: {
           type: DataTypes.INTEGER,
           allowNull: false,
       },
    }, { timestamps: false });

    return suborders ;
}