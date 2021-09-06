var express = require('express');
var router = express.Router();
const api = require('../api')

/* Rutas FRONTEND */
/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Store manager' });
});
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
/* Rutas BACKEND */
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
module.exports = router;
