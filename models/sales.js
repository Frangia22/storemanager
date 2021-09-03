module.exports = (sequelize, DataTypes) => {
    const sales = sequelize.define('storemanager', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        products: DataTypes.STRING(200),
        date: {
            type: DataTypes.DATETIME,
            defaultValue: sequelize.NOW
        },
        amount: DataTypes.DECIMAL(10,2),
        payment: DataTypes.STRING(50),
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    return sales;
};