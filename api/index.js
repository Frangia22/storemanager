const { sequelize, Op } = require('sequelize');
const db = require('../models');
/* FRONTEND */
const getSales = async () => {
    const sales = await db.sales.findAll()
    .then(result => {
        return result;
    });
    return sales;
};
const getSaleById = async (id) => {
    const sale = await db.sales.findByPk(id)
    .then(result => {
        return result;
    });
    return sale;
}
/* BACKEND */
const addSale = async (products, date, amount, payment) => {
    const sale = await db.sales.create({
        products,
        date,
        amount,
        payment,
    });
    return sale;
};
const editSale = async (id, products, date, amount, payment) => {
    const sale = await db.sales.update({products, date, amount, payment}, {
        where: {
            id
        }
    });
    return sale;
};
const deleteSale = async (idSale) => {
    const sale = await db.sales.destroy({
        where: {
            id: idSale
        }
    });
    return sale;
};
module.exports = {
    addSale,
    editSale,
    deleteSale,
    getSales,
    getSaleById
}