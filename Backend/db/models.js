const Sequelize = require('sequelize');

const db = new Sequelize('shoppingcartfinal', 'root', 'mysql', {
    host: 'localhost',
    dialect: 'mysql',
    pool : {
 		max : 5,
 		min : 0,
 		idle : 10000
 	}
});

const Product = db.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    prodname: Sequelize.STRING,
    // quantity : Sequelize.INTEGER,
    price : Sequelize.INTEGER,
    // imgURL : Sequelize.STRING
});

const Cart = db.define('cartProduct',{
    cid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qty:{
        type:Sequelize.INTEGER,
        defaultValue:1
    }
});

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

Cart.belongsTo(Product);
Cart.belongsTo(User);



db.sync({force: false})
    .then(() => {
        console.log("Database Synchronised");
    })
    .catch((err) => {
        console.log("Error setting up Database");
        console.error(err);
    });

// inc qty by 1
function increaseQty(id){
    return Cart.update({
        qty: Sequelize.literal('qty + 1')
        },
        { where: {
            productId:id
        }
        });
}

/// dec qty to 1
function decreaseQty(id){
    return Cart.update({
            qty: Sequelize.literal('qty - 1')
        },
        { where: {
            productId:id,
            qty:{$ne:1}
        }
        });
}

// for all products
function getAllProducts() {
    return Product.findAll({});
}

// for single product
function getProductById(id){
    return Product.findOne({
        where:{id:id}
    })
};

// adding product to cart
function addProductToCart(id) {
    return FOC(id);
}

// reading cart data
function retrieveCart() {
  return  Cart.findAll({
      attributes:['qty','productId'],
        include:[{
            model:Product,
            attributes:['prodname','price']},
            {model:User}]
    })
}

// deleting all items in cart
function emptyCart() {
    return Cart.destroy({
        where:{}
    });
}

function FOC(id){
    return Cart.findOrCreate({
        where:{productId:id},
        defaults:{productId:id}
    })
}

module.exports = {
    getAllProducts,
    emptyCart,
    increaseQty,
    addProductToCart,
    decreaseQty,
    retrieveCart,
    FOC,
    getProductById

};