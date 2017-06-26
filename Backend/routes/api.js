const route = require('express').Router();
const data = require('../db/models');


// route.post('/new', (req, res) => {
//    res.send("POST Add new product to cart")
// });


//-------------------------------------------------------------------------------------
// Inc qty of product by 1
route.get('/products/:id/increase',(req,res)=>{
    //res.send("Increase Product ID Qty by 1 : "+ req.params.id);
    data.increaseQty(req.params.id).then((result)=>{
        res.send(result);
        console.log(result);
    })
});

// Dec qty of product by 1
route.get('/products/:id/decrease',(req,res)=>{
    data.decreaseQty(req.params.id).then((result)=>{
        res.send(result);
        console.log(result);
    })
});
//-------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------
// GET All Products
route.get('/products',(req,res)=>{

    data.getAllProducts().then((result)=>{
        res.send(result);
        console.log("Reading All Products");
      
    })
});

// details of product with id
route.get('/products/:id',(req,res)=>{
    data.getProductById(req.params.id).then((result)=>{
        res.send(result);
        console.log("Reading Product : "+ req.params.id);
    })
});
//-------------------------------------------------------------------------------------




//-------------------------------------------------------------------------------------
// To empty cart
route.get('/cart/destroy',(req,res)=>{
    console.log("In cart");
    data.emptyCart().then((result)=>{
                console.log("Deleted : " + result);
                res.send(JSON.stringify({status:result}))
    })
});
// fetch all items into cart
route.get('/cart',(req,res)=>{
    console.log("In cart");
    data.retrieveCart().then((result)=>{
        res.send(result);
    })
});
//To add prods into Cart
route.get('/products/:id/add',(req,res)=>{
    var id = req.params.id;
    data.addProductToCart(req.params.id).then((result)=>{
        if(result[1]==false){
            data.increaseQty(req.params.id);
            console.log("Product Updated")
        }
        res.send(result);
        console.log("Product Added To Cart");
    })

});

route.get('/cart/foc/:id',(req,res)=> {
    data.FOC(req.params.id).then((modal,created)=>{
        if(modal)
            res.send(modal)
        else
            res.send(created);
    })
})
//-------------------------------------------------------------------------------------

module.exports = route;