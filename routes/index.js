var express = require('express');
var router = express.Router();
const api = require('../api')

/* Rutas FRONTEND */
/* GET home page. */
router.get('/', async (req, res) => {
  const products = await api.getCountProduct();
  const ingresoTotal = await api.getIngresoTotal();
  const vendidoTotal = await api.getTotalVendido();
  const lastSales = await api.getLastSales();
  console.log(vendidoTotal);
  res.render('index', { title: 'Store manager', products, ingresoTotal, vendidoTotal, lastSales });
});
/* ---------------- Sales -------------------------------- */
/* Admin sales Get */
router.get('/adminSale', async (req, res) => {
  const sales = await api.getSales();
  res.render('pages/sales/adminSale', { title: 'Admin Ventas', sales, message:'' });
});
/* Agregar sales Get */
router.get('/addSale', (req, res) => {
  res.render('pages/sales/addSale', { title: 'Agregar Venta' });
});
/* Editar sales Get */
router.get('/editSale/:id', async(req, res) => {
  const sale = await api.getSaleById(req.params.id);
  res.render('pages/sales/editSale', { title: 'Editar Venta', sale });
});
/* Delete sales Get */
router.get('/deleteSale/:id', async(req, res) => {
  const sales = await api.getSales();
  const affectedRows = await api.deleteSale(req.params.id);
  if (affectedRows > 0) {
    res.render('pages/sales/adminSale', { title: 'Admin Ventas', sales, message: 'Venta eliminada correctamente'});
  }else{
    res.send('Algo salio mal en el proceso de eliminación');
  }
});
/* ---------------- Product -------------------------------- */
/* Admin product Get */
router.get('/adminProduct', async (req, res) => {
  const products = await api.getProducts();
  res.render('pages/product/adminProduct', { title: 'Admin Productos', products, message:'' });
});
/* Agregar product Get */
router.get('/addProduct', (req, res) => {
  res.render('pages/product/addProduct', { title: 'Agregar Producto' });
});
/* Editar product Get */
router.get('/editProduct/:id', async(req, res) => {
  const product = await api.getProductById(req.params.id);
  res.render('pages/product/editProduct', { title: 'Editar producto', product });
});
/* Delete product Get */
router.get('/deleteProduct/:id', async(req, res) => {
  const products = await api.getProducts();
  const affectedRows = await api.deleteProduct(req.params.id);
  if (affectedRows > 0) {
    res.render('pages/product/adminProduct', { title: 'Admin Productos', products, message: 'Producto eliminado correctamente'});
  }else{
    res.send('Algo salio mal en el proceso de eliminación');
  }
});
/* Rutas BACKEND */
/* ---------------- Sales -------------------------------- */
/* Add sales POST */
router.post('/add', async (req, res) => {
  const { products, date, amount, payment } = req.body
  await api.addSale(products, date, amount, payment);
  const sales = await api.getSales()
  res.render('pages/sales/adminSale', { title: 'Admin Ventas', sales, message: 'Venta Agregada correctamente'});
});
/* Editar sales POST */
router.post('/editSale/:id', async (req, res) => {
  const id = req.params.id;
  const { products, date, amount, payment } = req.body
  await api.editSale(id, products, date, amount, payment);
  const sales = await api.getSales()
  res.render('pages/sales/adminSale', { title: 'Admin Ventas', sales, message: 'Venta actualizada correctamente'});
});
/* ---------------- Product -------------------------------- */
router.post('/addProduct', async (req, res) => {
  const { name, amount, stock, url } = req.body
  await api.addProduct(name, amount, stock, url);
  const products = await api.getProducts()
  res.render('pages/product/adminProduct', { title: 'Agregar producto', products, message: 'Producto Agregado correctamente'});
});
/* Editar product POST */
router.post('/editProduct/:id', async (req, res) => {
  const id = req.params.id;
  const { name, amount, stock, url} = req.body
  await api.editProduct(id, name, amount, stock, url);
  const products = await api.getProducts()
  res.render('pages/product/adminProduct', { title: 'Admin Productos', products, message: 'Producto actualizado correctamente'});
});
module.exports = router;
