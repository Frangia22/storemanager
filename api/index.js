const { Sequelize, Op } = require('sequelize');
const db = require('../models');
/* FRONTEND */
/* ---------------- Home -------------------------------- */
const getCountProduct = async () => {
    const products = await db.sales.findAll({
        attributes: ['products', 'amount', [Sequelize.fn('count', Sequelize.col('products')), 'cantidad']],
        group: ['products'],
        raw: true,
        order: Sequelize.literal('cantidad DESC'),
        limit: 10
    });
    return products;
}
const getIngresoTotal = async() => { 
    const ingresoTotal = await db.sales.sum('amount');
    return ingresoTotal;
}
const getTotalVendido = async() => { 
    const vendidoTotal = await db.sales.count('products');
    return vendidoTotal;
}
const getLastSales = async () => {
    const sale = await db.sales.findAll({
        limit: 10,
        order: [
            ['date', 'DESC']
        ]
    });
    return sale;
}
/* ---------------- SALES -------------------------------- */
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
/* ---------------- PRODUCT -------------------------------- */
const getProducts = async () => {
    const products = await db.product.findAll()
    .then(result => {
        return result;
    });
    return products;
}
const getProductById = async (id) => {
    const product = await db.product.findByPk(id)
    .then(result => {
        return result;
    });
    return product;
}
/* BACKEND */
/* ---------------- SALES -------------------------------- */
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
/* ---------------- PRODUCT -------------------------------- */
const addProduct = async(name, amount, stock, url) => {
    const product = await db.product.create({
        name, 
        amount, 
        stock, 
        url
    });
    return product;
};
const editProduct = async (id, name, amount, stock, url) => {
    const product = await db.product.update({name, amount, stock, url}, {
        where: {
            id
        }
    });
    return product;
};
const deleteProduct = async (idProduct) => {
    const product = await db.product.destroy({
        where: {
            id: idProduct
        }
    });
    return product;
};
module.exports = {
    /* ---------------- Sales -------------------------------- */
    addSale,
    editSale,
    deleteSale,
    getSales,
    getSaleById,
    /* ---------------- Product -------------------------------- */
    addProduct,
    editProduct,
    deleteProduct,
    getProducts,
    getProductById,
    /* ---------------- Home -------------------------------- */
    getCountProduct,
    getIngresoTotal,
    getTotalVendido,
    getLastSales,
}