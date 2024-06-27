var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var authRouter = require('./routes/auth');
var supplierRouter = require('./routes/suppliers');
var ordersRouter = require('./routes/orders');
var shippersRouter = require('./routes/shippers');
var orderDetailsRouter = require('./routes/orderDetails');
var employeesRouter = require('./routes/employees');
var customersRouter = require('./routes/customers'); // Ubah ini

var app = express();

var sequelize = require('./models/index');
var Category = require('./models/category');
var Product = require('./models/product');
var user = require('./models/user');
var customer = require('./models/customer');
var employee = require('./models/employee');
var order = require('./models/order');
var orderDetail = require('./models/orderDetail');
var supplier = require('./models/supplier');
var shipper = require('./models/supplier');


app.use(logger('dev'));
app.use(express.json()); // Middleware untuk memproses data JSON
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Middleware untuk menyajikan file statis

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); 
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);
app.use('/suppliers', supplierRouter);
app.use('/shippers', shippersRouter);
app.use('/orderDetails', orderDetailsRouter);
app.use('/orders', ordersRouter);
app.use('/employees', employeesRouter);
app.use('/customers', customersRouter); // Ubah ini

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
