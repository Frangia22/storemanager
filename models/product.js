module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('storemanager', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING(200),
        stock: DataTypes.INTEGER(8),
        amount: DataTypes.DECIMAL(10,2),
        url: DataTypes.STRING(200),
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return product;
};