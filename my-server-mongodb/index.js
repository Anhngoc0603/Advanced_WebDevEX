const express = require('express');
const app = express();
const port = 3002;

const morgan=require("morgan")
app.use(morgan("combined"))

const bodyParser=require("body-parser")
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json());

const cors=require("cors");
app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})
app.get("/",(req,res)=>{
    res.send("This Web server is processed for MongoDB")
})
const { MongoClient, ObjectId } = require('mongodb');
client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
database = client.db("FashionData");
fashionCollection = database.collection("Fashion");

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/FashionData')
  .then(() => console.log('Mongoose connected to FashionData'))
  .catch(err => console.error('Mongoose connection error:', err));
const Product = require('./models/Product');

app.get("/fashions",cors(),async (req,res)=>{
    const result = await fashionCollection.find({}).toArray();
    res.send(result)
    }
)
app.get("/fashions/:id",cors(),async (req,res)=>{
var o_id = new ObjectId(req.params["id"]);
const result = await fashionCollection.find({_id:o_id}).toArray();
res.send(result[0])
}
)

app.post("/fashions",cors(),async(req,res)=>{
//put json Fashion into database
await fashionCollection.insertOne(req.body)
//send message to client(send all database to client)
res.send(req.body)
})

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await usersCollection.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({ message: "Email đã tồn tại!" });
  }

  const newUser = {
    _id: "u" + Date.now(),   // id ngắn
    email: email,
    password: password
  };

  await usersCollection.insertOne(newUser);

  res.json({ message: "Đăng ký thành công!", user: newUser });
});

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get("/create-cookie",cors(),(req,res)=>{
  res.cookie("username","tranduythanh")
  res.cookie("password","123456")
  account={"username":"tranduythanh",
  "password":"123456"}
  res.cookie("account",account)
  res.send("cookies are created")
})

app.get("/read-cookie",cors(),(req,res)=>{
//cookie is stored in client, so we use req
username=req.cookies.username
password=req.cookies.password
account=req.cookies.account
infor="username = "+username+"<br/>"
infor+="password = "+password+"<br/>"
infor+="account.username = "+account.username+"<br/>"
infor+="account.password = "+account.password+"<br/>"
res.send(infor)
//Expires after 360000 ms from the time it is set.
res.cookie("infor_limit1", 'I am limited Cookie - way 1', {expire: 360000 + Date.now()});
res.cookie("infor_limit2", 'I am limited Cookie - way 2', {maxAge: 360000});
})

app.get("/clear-cookie",cors(),(req,res)=>{
res.clearCookie("account")
res.send("[account] Cookie is removed")
})

app.get("/read-cookie",cors(),(req,res)=>{
//cookie is stored in client, so we use req
username=req.cookies.username
password=req.cookies.password
account=req.cookies.account
infor="username = "+username+"<br/>"
infor+="password = "+password+"<br/>"
if(account!=null)
{
infor+="account.username = "+account.username+"<br/>"
infor+="account.password = "+account.password+"<br/>"
}
res.send(infor)
})

app.post("/login", async (req,res)=>{

const {username,password} = req.body

const user = await usersCollection.findOne({
    username:username,
    password:password
})

if(user){
    res.cookie("username",username)
    res.cookie("password",password)
    res.send({status:"success"})
}
else{
    res.send({status:"fail"})
}

})

var session = require('express-session');
app.use(session({secret: "Shh, its a secret!"}));

app.get("/contact",cors(),(req,res)=>{
if(req.session.visited!=null)
{
req.session.visited++
res.send("You visited this page "+req.session.visited +" times")
}
else
{
req.session.visited=1
res.send("Welcome to this page for the first time!")
}
})

app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// ==================== E-COMMERCE SHOPPING CART APIs ====================

// API 1: GET ALL PRODUCTS
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success: true,
            count: products.length,
            products: products
        });
    } catch (error) {
        console.error("Get products error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        });
    }
});

// API 2: GET PRODUCT BY ID
app.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        console.error("Get product error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching product",
            error: error.message
        });
    }
});

// API 3: ADD PRODUCT TO CART (Session based)
app.post("/cart/add", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate input
        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "ProductId and quantity are required"
            });
        }

        // Find product in database
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check if enough stock
        if (!product.isAvailable(quantity)) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock available"
            });
        }

        // Initialize cart if not exists
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if product already in cart
        const existingItemIndex = req.session.cart.findIndex(
            item => item.productId === productId
        );

        if (existingItemIndex !== -1) {
            // Product already in cart, update quantity
            req.session.cart[existingItemIndex].quantity += parseInt(quantity);
        } else {
            // Add new product to cart
            req.session.cart.push({
                productId: product._id.toString(),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: parseInt(quantity)
            });
        }

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart: req.session.cart
        });

    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error adding product to cart",
            error: error.message
        });
    }
});

// API 4: GET CART
app.get("/cart", (req, res) => {
    try {
        // Return cart from session (or empty array if not exists)
        const cart = req.session.cart || [];
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        res.status(200).json({
            success: true,
            cart: cart,
            itemCount: cart.length,
            total: total
        });
    } catch (error) {
        console.error("Get cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching cart",
            error: error.message
        });
    }
});

// API 5: UPDATE CART ITEM QUANTITY
app.post("/cart/update", (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate input
        if (!productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "ProductId and quantity are required"
            });
        }

        // Check if cart exists
        if (!req.session.cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });
        }

        // Find product in cart
        const itemIndex = req.session.cart.findIndex(
            item => item.productId === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        // Update quantity (remove if quantity is 0)
        if (parseInt(quantity) <= 0) {
            req.session.cart.splice(itemIndex, 1);
        } else {
            req.session.cart[itemIndex].quantity = parseInt(quantity);
        }

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: req.session.cart
        });

    } catch (error) {
        console.error("Update cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error updating cart",
            error: error.message
        });
    }
});

// API 6: REMOVE PRODUCT FROM CART
app.post("/cart/remove", (req, res) => {
    try {
        const { productId } = req.body;

        // Validate input
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "ProductId is required"
            });
        }

        // Check if cart exists
        if (!req.session.cart) {
            return res.status(404).json({
                success: false,
                message: "Cart is empty"
            });
        }

        // Filter out the product
        const initialLength = req.session.cart.length;
        req.session.cart = req.session.cart.filter(
            item => item.productId !== productId
        );

        if (req.session.cart.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart: req.session.cart
        });

    } catch (error) {
        console.error("Remove from cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error removing product from cart",
            error: error.message
        });
    }
});

// API 7: CLEAR CART
app.post("/cart/clear", (req, res) => {
    try {
        req.session.cart = [];
        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart: []
        });
    } catch (error) {
        console.error("Clear cart error:", error);
        res.status(500).json({
            success: false,
            message: "Error clearing cart",
            error: error.message
        });
    }
});