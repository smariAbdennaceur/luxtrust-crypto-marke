
# LuxTrust - Cryptocurrency Market Front-End Assignment

This is the solution for LuxTrust's Front-End Developer interview assignment.

✅ Developed with Angular (standalone components)  
✅ Uses Angular Material for UI components  
✅ Mocked REST API (inside the front-end)  
✅ Role-based access (User / Administrator)  
 

---

## 🚀 Project Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally (Development mode)
```bash
npm run start
```
or
```bash
ng serve
```
The application will be available at:  
👉 [http://localhost:4200](http://localhost:4200)

---

## 🛠 Build for Production
```bash
npm run build
```
Output will be available in the `dist/` folder.

---

## 📋 Features Implemented

- **Register a new user** (POST `/register`)
- **Login as a user**
- **View your own profile** (GET `/user`)
- **Add a new cryptocurrency sell position** (POST `/market`)
- **Buy a cryptocurrency position** (POST `/market/buy/:id`)
- **View details of a cryptocurrency position** (GET `/market/:id`)
- **Delete a position** (DELETE `/market/:id`, only owner or admin)
- **View user details by username** (GET `/user/:username`, admin only)

---

## 👥 User Roles

- **USER**
  - Can register, login
  - Can create and buy crypto positions
  - Can view personal profile

- **ADMINISTRATOR**
  - Can do everything a user can
  - Can view any user's details
  - Can delete any sell position

---

## 📦 Mocked REST API

All backend functionality is **mocked inside the front-end** (`MockApiService`), simulating a real REST API without persistence (no database).

---

## 🧪 Technologies Used

- Angular 17+ (Standalone Components)
- Angular Material
- RxJS Observables
- TypeScript
- SCSS (Responsive design)

---

