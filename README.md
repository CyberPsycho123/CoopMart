# 🛒 CoopMart

> Buy what you need. Sell what you have. No barriers.

**CoopMart** is an inclusive e-commerce platform built for everyone — especially those who struggle to sell their products online. Whether you're a buyer looking for deals or a small seller trying to reach customers, CoopMart gives you a simple, accessible marketplace to do it all.

> 💡 *"I solved this problem for people who can't sell their products online normally — especially those with limited resources."* — CyberPsycho123

🔗 **Live Demo:** [coopmart-fawn.vercel.app](https://coopmart-fawn.vercel.app)

---

## 🚀 Features

- 🛍️ **Buy Products** — Browse and purchase products listed by sellers on the platform
- 📦 **Sell Products** — Anyone can list their products for sale via the dedicated Seller Page
- 👥 **Dual Role Support** — Seamlessly switch between buyer and seller modes
- 🌐 **Accessible to All** — Designed with simplicity in mind so even first-time users can get started
- ⚡ **Fast & Lightweight** — Built with plain JavaScript and CSS for a snappy experience
- 🚀 **Deployed on Vercel and Render** — Always live and available

---

## 🛠️ Tech Stack

| Layer     | Technology            |
|-----------|-----------------------|
| Frontend  | React.js, CSS3        |
| Backend   | Node.js,Express,js    |
| Hosting   | Vercel,Render         |

---

## 📁 Project Structure

```
CoopMart/
├── Backend/       # Server-side logic — product listings, user handling, APIs
└── Frontend/      # Client-side UI — buyer storefront & seller dashboard
```

---

## 🧭 How It Works

```
         ┌──────────────────────────────┐
         │           CoopMart           │
         └──────────────┬───────────────┘
                        │
          ┌─────────────┴─────────────┐
          │                           │
   🛍️ Buyer Page              📦 Seller Page
   Browse & purchase          List & manage
     products                   products
          │                           │
          └─────────────┬─────────────┘
                        │
               Backend / Node.js API
               (product data, listings)
```

1. **Buyers** visit the storefront, browse available products, and make purchases.
2. **Sellers** navigate to the Seller Page to list their products with details and pricing.
3. The **backend** manages all product data, user actions, and communication between buyer and seller views.

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/CyberPsycho123/CoopMart.git
cd CoopMart
```

### 2. Set Up the Backend

```bash
cd Backend
npm install
npm start
```

The backend server will start locally (default: `http://localhost:3000`).

### 3. Set Up the Frontend

```bash
cd ../Frontend
# Open index.html in your browser, or serve with:
npx serve .
```

> If the frontend calls backend APIs, update the base URL in the frontend source to point to your local backend (`http://localhost:3000`).

---

## 🌍 Deployment

The project is deployed on **Vercel**. To deploy your own fork:

1. Fork this repository
2. Go to [vercel.com](https://vercel.com) and import your fork
3. Deploy the `Frontend/` folder as the main site
4. Deploy the `Backend/` folder separately (Vercel serverless, Render, or Railway)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project does not currently specify a license. Please contact the author before using it in production or redistributing.

---

## 👤 Author

**CyberPsycho123**
- GitHub: [@CyberPsycho123](https://github.com/CyberPsycho123)

---

> 🤲 **Mission:** CoopMart was built to empower small sellers and individuals with limited access to traditional e-commerce platforms — giving everyone an equal chance to participate in online trade.
