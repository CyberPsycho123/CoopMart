import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { Cart } from './models/cart.js';
import { fileURLToPath } from 'url';
import { Outfit } from './models/outfit.js';
import { User } from './models/user.js';
import { Seller } from './models/seller.js';
import { Details } from './models/details.js';
import { Delivary } from './models/delivary.js';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.ATLAS_URL;


if (!DB_URL) {
  console.error("ATLAS_URL is undefined");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Successfully connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const secretKey = process.env.JWT_SECRET;

const app = express();
app.use("/images", express.static(path.join(__dirname, "public/images")));
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    "https://coopmart-frontend.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST"]
}));

app.options("/*", cors());

app.use(express.json());
app.use(cookieParser());

async function Items() {
  const items = await Outfit.find();

  return items.map(item => ({
    email: item.email,
    catagory: item.catagory,
    title: item.title,
    desc: item.desc,
    image: item.image,
    price: item.price
  }));
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.post('/sell', upload.single("image"), async (req, res) => {
  const email = req.cookies.email;
  if (!email) return res.status(401).json({ success: false });

  const { title, desc, price, catagory } = req.body;

  const imageUrl = `/images/${req.file.filename}`;

  const outfit = new Outfit({
    image: imageUrl,
    email,
    catagory,
    title,
    desc,
    price
  });

  await outfit.save();
  res.json({ success: true });
});


// User registration
app.post('/create', (req, res) => {
  let { username, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let created_user = await User.create({ username, email, password: hash });
      let token = jwt.sign({ email }, secretKey, { expiresIn: '7d' });
      res.cookie("email", email, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: true, sameSite: "none" });
      res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: true, sameSite: "none" });
      res.send(created_user);
    });
  });
});

// User login
app.post('/login', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send({ message: "User is failed" });
  }
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '7d' });
      res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: true, sameSite: "none" });
      res.cookie("email", user.email, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: true, sameSite: "none" });
      res.json({ message: "Login successful", bool: true });
    } else {
      res.json({ message: "Password is incorrect" });
    }
  });
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie("token", {
    secure: true,
    sameSite: "none"
  });
  res.clearCookie("email", {
    secure: true,
    sameSite: "none"
  });

  res.json({ message: "Logged out" });
});

// Check login status
app.post('/read', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ bool: false });

  try {
    jwt.verify(token, secretKey);
    return res.json({ bool: true });
  } catch (err) {
    return res.json({ bool: false });
  }
});

app.post('/', async (req, res) => {
  try {
    const items = await Items();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load products" });
  }
});


// Cart routes
app.post('/cart', (req, res) => {
  let { image, title, quantity, price } = req.body;
  const email = req.cookies.email;
  const carts = new Cart({ email, image, title, quantity, price });
  carts.save();
  res.json({ success: true });
});

app.post('/loaded', async (req, res) => {
  const email = req.cookies.email;
  const cart_items = await Cart.find({ email });
  let total_price = cart_items.reduce((sum, item) => sum + Number(item.price), 0);
  res.json({ carts: cart_items, price: total_price, len: cart_items.length });
});

app.post('/delcart', async (req, res) => {
  const index = parseInt(req.body.index);
  const email = req.cookies.email;
  const cart_items = await Cart.find({ email });
  await Cart.deleteOne({ email, title: cart_items[index].title });
  res.json({ success: true });
});

// Details
app.post('/info', (req, res) => {
  let { fullName, phone, address, city, postal, notes } = req.body;
  const email = req.cookies.email;
  const detail = new Details({ email, phone, fullname: fullName, address, city, pincode: postal, additional: notes });
  detail.save();
  res.json({ success: true });
});

app.post('/edit', async (req, res) => {
  let { fullName, phone, address, city, postal, notes } = req.body;
  const email = req.cookies.email;
  await Details.updateOne({ email }, { $set: { phone, fullname: fullName, address, city, pincode: postal, additional: notes } });
  res.json({ success: true });
});

app.post('/readdetail', async (req, res) => {
  const email = req.cookies.email;
  if (email) {
    const find_email = await Details.find({ email });
    if (find_email.length !== 0) {
      res.json({ success: true, detail: find_email });
    }
  }
});

// Last order handling
let lastOrder = null;
app.post('/ordered', (req, res) => {
  let { image, title, quantity, price } = req.body;
  lastOrder = { image, title, quantity, price };
  res.json({ success: true });
});

app.post('/last-order', (req, res) => {
  if (lastOrder) res.json({ success: true, order: lastOrder });
  else res.json({ success: false });
});

// Delivary
app.post('/delivary', async (req, res) => {
  const email = req.cookies.email;
  if (email) {
    const find_email = await Details.find({ email });
    if (find_email.length !== 0) {
      let { title, image, quantity, price, method } = req.body;

      if (lastOrder?.cart) {
        const cart_items = await Cart.find({ email });
        for (let i = 0; i < cart_items.length; i++) {
          const delivar = new Delivary({
            email,
            phone: find_email[0].phone,
            fullname: find_email[0].fullname,
            address: find_email[0].address,
            action: "Check",
            city: find_email[0].city,
            pincode: find_email[0].pincode,
            prod_title: cart_items[i].title,
            prod_img: cart_items[i].image,
            prod_quantity: parseInt(cart_items[i].quantity),
            price: method === "Cash on delivary" ? cart_items[i].price : 0,
            delivary_method: method
          });
          await delivar.save();
          if (method === "Cash on delivary") await Cart.deleteOne({ email });
        }
      } else {
        const delivar = new Delivary({
          email,
          phone: find_email[0].phone,
          fullname: find_email[0].fullname,
          address: find_email[0].address,
          action: "Check",
          city: find_email[0].city,
          pincode: find_email[0].pincode,
          prod_title: title,
          prod_img: image,
          prod_quantity: parseInt(quantity),
          price: method === "Cash on delivary" ? price : 0,
          delivary_method: method
        });
        await delivar.save();
      }
      res.json({ success: true });
    }
  }
});

// Save order
app.post('/saveorder', async (req, res) => {
  const email = req.cookies.email;
  if (email) {
    const find_email = await Delivary.find({ email });
    if (find_email.length !== 0) res.json({ success: true, detail: find_email });
  }
});

app.post('/check', (req, res) => {
  let { Cart_price } = req.body;
  lastOrder = { price: Cart_price, cart: true };
  res.json({ success: true });
});


app.post('/sellerdetails', async (req, res) => {
  const email = req.cookies.email;
  if (email) {
    const find_email = await User.findOne({ email });
    if (find_email) {
      let { upid, phone } = req.body;
      const new_seller = new Seller({ name: find_email.username, email, phone, upi_id: upid });
      await new_seller.save();
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});

// Validate seller
app.post('/validateseller', async (req, res) => {
  const email = req.cookies.email;
  if (email) {
    const find_email = await User.findOne({ email });
    if (find_email) {
      const created_seller = await Seller.findOne({ email });
      if (created_seller) res.json({ email_sucess: true, success: true });
      else res.json({ email_sucess: true, success: false });
    } else {
      res.json({ email_sucess: false, success: false });
    }
  } else {
    res.json({ email_sucess: false, success: false });
  }
});

// Seller admin
app.post('/selleradmin', async (req, res) => {
  const email = req.cookies.email;
  const find_items = await Outfit.find({ email });
  const items = [];
  for (let i = 0; i < find_items.length; i++) {
    const prod_items = await Delivary.find({ prod_title: find_items[i].title, email });
    if (prod_items) items.push(prod_items);
  }
  const new_items = items[0];
  res.json({ items: new_items, success: true, seller_items: find_items });
});

// Check order
app.post('/checking', async (req, res) => {
  let { id } = req.body;
  await Delivary.updateOne({ _id: id }, { $set: { action: "Checked" } });
  res.json({ success: true });
});

app.post('/deleteitem', async (req, res) => {
  const { id } = req.body;

  const item = await Outfit.findById(id);
  if (!item) return res.json({ success: false });

  const filePath = path.join(__dirname, "public", item.image);
  fs.unlink(filePath, () => { }); // safe delete

  await Outfit.deleteOne({ _id: id });
  res.json({ success: true });
});


// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
