
# MoviReco - Component Documentation

## Project Overview
MoviReco is a high-fidelity movie recommendation frontend. It blends the best UX patterns from Amazon Prime and Netflix, featuring a state-of-the-art search engine, a Gemini AI Recommendation Advisor, and a complete user identity system.

---

## 🏗 Component Architecture

### 1. `App.tsx` (The Architect)
Manages global state including authentication (`user`, `isLoggedIn`) and view routing (`home` | `auth` | `profile`).

### 2. `AuthPage.tsx` (The Gatekeeper)
- **Selection Mode**: Presents two distinct high-impact cards: "Get Started" and "Welcome Back".
- **Dynamic Logic**: Clicking "Welcome Back" specifically transitions to the Sign In form.
- **Micro-Interactions**: Features a unique triple-ring orbital loader that triggers on form submission.
- **Access Control**: Form footers use precision clickable spans ("Join for free" and "Sign In") to satisfy specific navigation requirements.

### 3. `ProfilePage.tsx` (The Personal Studio)
- **Identity**: Displays user name, email, and interests.
- **Interests**: Categorized chips showing genre preferences.
- **Activity Feed**: Shows "Liked Movies" (visual grid) and "My Ratings" (detailed list with scores).

### 4. `Navbar.tsx` (The Navigator)
- **Identity Context**: Responsive profile trigger.
- **Enhanced Search**: Universal search across titles, genres, and cast with keyword highlighting.

### 5. `AIAdvisor.tsx` (The Intelligence)
The Gemini-powered personal movie expert providing natural language discovery.

---

## 🎨 Visual Identity
- **Typography**: Inter (Clean, Modern).
- **Palette**: Deep Onyx (#0a0a0a) background with MoviReco Crimson (#dc2626) and Indigo accents.
- **Auth UI**: Rounded [2.5rem] containers, glassmorphism, and interlocking orbital loading animations.
