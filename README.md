# Puja Parikrama V2 - Divine Precision

**Puja Parikrama** is a modern, interactive web application designed to help users plan their Durga Puja pandal hopping experience in Kolkata with "Divine Precision". It allows users to select specific Puja themes, browse pandals, and generate optimized itineraries based on their location and time constraints.

![Puja Parikrama Banner](/assets/pujas/durga.png)

## 🌟 Features

- **Dynamic Theme Engine**: The entire application visual identity shifts based on the selected deity (Durga, Kali, Jagadhatri, etc.), powered by `PujaContext`.
- **Smart Itinerary Planner**: Algorithmically generates the most efficient route between pandals based on:
  - Starting Location (North/South Kolkata)
  - Available Time Window
  - Logical proximity (Nearest Neighbor algorithm)
- **Interactive Maps**: Visualizes the generated route on a map.
- **Pandal Gallery**: Explore detailed descriptions and locations of famous pandals.
- **PDF Export**: Download your customized itinerary as a beautifully formatted PDF.
- **Dynamic Content**: Automatically updates year references (currently set to **2026**) across the site.
- **Responsive Design**: Fully optimized for mobile and desktop devices with glassmorphism UI.

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations and glassmorphism effects.
- **State Management**: React Context API (`PujaContext`).
- **Routing**: `react-router-dom`.
- **Utilities**:
  - `jspdf` & `html2canvas` for PDF generation.
  - `lucide-react` for iconography.
  - `framer-motion` (implied usage in animations).

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/puja-parikrama-v2.git
   cd puja-parikrama-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📂 Project Structure

```
src/
├── assets/          # Static images and icons
├── components/      # Reusable UI components
│   ├── Navbar.jsx       # Main navigation with smart scroll
│   ├── HeroSection.jsx  # Landing component with dynamic year
│   ├── PlannerForm.jsx  # User input for itinerary planning
│   └── ResultCard.jsx   # Display component for itinerary items
├── context/         # React Context definitions
│   └── PujaContext.jsx  # Theme and global state management
├── pages/           # Route components
│   ├── Home.jsx         # Landing page
│   ├── Planner.jsx      # Core planning logic and results view
│   └── SelectPuja.jsx   # Theme selection portal
├── utils/           # Helper functions and data
│   ├── data.json        # Database of Pandals and Starting Points
│   └── plannerLogic.js  # Routing and sorting algorithms
└── App.jsx          # Main application entry point
```

## 🧩 Key Components

- **`plannerLogic.js`**: PRE-PROCESSES raw data to inject dynamic years and provides the `generateSortedList` function which implements the core routing logic.
- **`PujaSelector.jsx`**: A 3D-interactive card grid that allows users to switch the application's "Divine Theme".
- **`HeroSection.jsx`**: Features a dynamic badge that updates the year automatically (`new Date().getFullYear()`).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
