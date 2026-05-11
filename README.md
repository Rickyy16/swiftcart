# SwiftCart

SwiftCart is a modern e-commerce web application built with React, TypeScript, Tailwind CSS, and Framer Motion.  
The project was developed as part of a frontend assignment with a focus on clean UI, responsive design, state management, routing, animations, accessibility, and testing.

---

## Live Features

- Product listing page
- Product detail page
- Shopping cart functionality
- Dynamic category filtering
- Responsive UI for mobile and desktop
- Smooth animations using Framer Motion
- Global cart state management using Context API
- URL-based filter persistence using search params
- End-to-End testing using Playwright
- Loading states and empty states
- Accessible semantic HTML elements

---

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router DOM
- Context API
- Playwright

---

## Project Structure

```bash
src/
├── api/
├── components/
├── context/
├── pages/
├── tests/
├── types/
└── App.tsx
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Rickyy16/swiftcart.git
```

### 2. Navigate to Project

```bash
cd swiftcart
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Application will run on:

```bash
http://localhost:5173
```

---

## Run Playwright Tests

### Install Browsers

```bash
npx playwright install
```

### Run Tests

```bash
npx playwright test
```

### Open Test Report

```bash
npx playwright show-report
```

---

## API Used

Products and categories are fetched using:

```bash
https://api.escuelajs.co
```

---

## Important Note Regarding Filtering

As mentioned in the assignment:

> “Data should be refetched using APIs for the selected filters. Don’t filter locally, always call the APIs.”

However, the provided API supports filtering properly for only a single category at a time and does not support multiple category filtering in a single API request.

Because this project supports selecting multiple categories simultaneously, products are fetched initially from the API and then filtered locally on the frontend for multi-select category functionality.

This approach was implemented to maintain a better user experience while still using dynamic API-driven data fetching.

---

## Additional Features Implemented

- Page transition animations
- Cart item remove animations
- Hover interactions
- Responsive mobile navigation
- Persistent URL filters
- Empty cart state UI
- Loading spinners
- Semantic HTML improvements for accessibility
- Test IDs for stable E2E testing

---

## Assumptions

- Cart data is managed locally using Context API.
- No backend/database persistence was required for the assignment.
- Authentication and payment gateway integration were out of scope.

---

## Accessibility Improvements

The project uses semantic HTML elements including:

- `main`
- `section`
- `header`
- `button`
- `nav`

Proper button usage and alt attributes were also added to improve accessibility and testing stability.

---

## GitHub Repository

GitHub Link:

```bash
https://github.com/Rickyy16/swiftcart
```
---

## Author

Mohit Sharma
