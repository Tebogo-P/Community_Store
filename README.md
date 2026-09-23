# Community-Store

> **PRM370/371/372S 2026 Group Project Implementation**  
> A mobile-first campus-community marketplace and hub connecting students, faculty, local vendors, and residents.

---

## 🌟 Architecture Overview

- **Backend**: Java 17 + Spring Boot 3
  - **Security**: Spring Security with stateless JWT Authentication
  - **Database**: H2 In-Memory Database (with automated table creation and seed data)
  - **API Documentation**: OpenAPI / Swagger UI at `/swagger-ui.html`
- **Frontend**: React 18 + Vite
  - **Styling**: Modern CSS Design System (HSL colors, dark mode, glassmorphism, responsive cards)
  - **State Management**: React Context API (`AuthContext`, `CartContext`)
  - **API Client**: Axios with JWT Request Interceptor

---

## 📁 Repository Structure

```
Community-Store/
├── backend/
│   ├── pom.xml                                   # Spring Boot Maven configuration
│   └── src/main/java/com/communitystore/
│       ├── CommunityStoreApplication.java        # Application Main Entry
│       ├── config/                               # SecurityConfig, CorsConfig, SwaggerConfig, DataInitializer
│       ├── controller/                           # AuthController, ProductController, BulletinController, OrderController, UserController
│       ├── dto/                                  # AuthDtos, ProductDto, BulletinDto, OrderDto, ApiResponse
│       ├── model/                                # User, Role, Category, Product, BulletinPost, Order, OrderItem, Review
│       ├── repository/                           # Spring Data JPA Repositories
│       ├── security/                             # JwtUtils, JwtAuthFilter, UserDetailsServiceImpl, UserDetailsImpl
│       └── service/                              # AuthService, ProductService, BulletinService, OrderService
└── frontend/
    ├── package.json                              # Vite & React dependencies
    ├── vite.config.js                            # Vite dev server & proxy settings
    ├── index.html                                # Main HTML shell with Google Fonts
    └── src/
        ├── App.jsx                               # Router & Context provider wrapper
        ├── main.jsx                               # React DOM root render
        ├── index.css                             # Custom campus marketplace theme & utilities
        ├── components/                           # Navbar, Footer, ProductCard, BulletinCard, CartDrawer, AuthModal
        ├── context/                              # AuthContext, CartContext
        ├── pages/                                # Home, Marketplace, ProductDetail, BulletinBoard, SellItem, Dashboard, AdminPanel
        └── services/                             # Axios API client module
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Java 17 JDK** installed (`java -version`)
- **Maven** (or Maven wrapper)
- **Node.js v18+** and **npm** (`node -v`, `npm -v`)

---

### 2. Running the Spring Boot Backend

Navigate to the `backend/` folder:

```bash
cd backend
```

Build and run using Maven:

```bash
# If Maven (mvn) is installed on your PATH:
mvn spring-boot:run
```

The Spring Boot backend will start on **`http://localhost:8080/api`**.

- **Swagger UI Interactive API Docs**: `http://localhost:8080/api/swagger-ui.html`
- **H2 Console Database View**: `http://localhost:8080/api/h2-console`
  - *JDBC URL*: `jdbc:h2:mem:communitystoredb`
  - *Username*: `sa`
  - *Password*: (leave empty)

#### Seed Accounts Pre-loaded:
| Role | Email | Password | Details |
|---|---|---|---|
| **Student** | `student@campus.ac.za` | `password123` | Verified student account |
| **Vendor** | `vendor@campusbooks.co.za` | `password123` | Verified local business |
| **Faculty** | `professor@campus.ac.za` | `password123` | Department tutor |
| **Admin** | `admin@communitystore.org` | `admin123` | Admin & verification moderator |

---

### 3. Running the React Frontend

Navigate to the `frontend/` folder:

```bash
cd frontend
```

Install Node dependencies:

```bash
npm install
```

Start Vite local development server:

```bash
npm run dev
```

The frontend application will launch at **`http://localhost:3000`**.

---

## 🔑 Core Features & API Endpoints

### Auth & User Verification (`/api/auth`, `/api/users`)
- `POST /api/auth/register` - Register new account (Student uni email auto-verification rule included)
- `POST /api/auth/login` - Authenticate & obtain JWT bearer token
- `GET /api/users/pending-verification` - Admin view pending user verifications
- `PUT /api/users/{id}/verify` - Admin approve user verification status

### Campus Marketplace (`/api/products`)
- `GET /api/products` - List all active marketplace products & services
- `GET /api/products/{id}` - View detailed product listing
- `GET /api/products/category/{category}` - Filter by category (`TEXTBOOKS`, `ELECTRONICS`, `SERVICES`, `ECO_FRIENDLY`, etc.)
- `GET /api/products/search?q={query}` - Search listings by keyword
- `POST /api/products` - Publish new listing (Requires Authentication)

### Community Bulletin Board (`/api/bulletin`)
- `GET /api/bulletin` - List community announcements, campus events & club fundraisers
- `POST /api/bulletin` - Publish new bulletin post (Requires Authentication)

### Checkout & Cart Orders (`/api/orders`)
- `POST /api/orders` - Complete checkout with SnapScan / PayFast / Cash payment method
- `GET /api/orders/my-orders` - View user purchase history
