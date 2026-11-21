# Aetherix-assesment-frontend

A high-fidelity recreation of the [Device Sandbox Simulator](https://device-sandbox-simulator.vercel.app/) built with React, Redux Toolkit, React DnD, Tailwind CSS, and Vite.

---

## 🚀 Live Demo & Reference
- **Reference Application**: [https://device-sandbox-simulator.vercel.app/](https://device-sandbox-simulator.vercel.app/)

---

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) (`@reduxjs/toolkit` + `react-redux`)
- **Drag and Drop**: [React DnD](https://react-dnd.github.io/react-dnd/) (`react-dnd` + `react-dnd-html5-backend`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Notifications**: [React-Toastify](https://fkhadra.github.io/react-toastify/)

---

## ✨ Features

### 1. Interactive Sidebar
- **Devices List**: Shows available devices with counts (`Living Room Fan`, `Kitchen Light`) and icons.
- **Saved Presets List**: Shows saved presets with counts, or an empty state indicator (`Nothing added yet`).
- **Drag Source**: Devices and presets can be dragged directly onto the Testing Canvas.
- **Click to Select**: Clicking any item in the sidebar immediately activates it on the canvas and highlights the active item.
- **Responsive Mobile Menu**: Collapsible mobile sidebar with hamburger/close toggle.

### 2. Testing Canvas & Drop Zone
- **Drag & Drop**: Accepts Fan, Light, and Preset items.
- **Dynamic Visual Feedback**:
  - Yellow border highlight when hovering draggable items.
  - Green border and "Release to add device!" banner when hover is valid.
  - Slate border in idle state.
- **Empty State**: Displays "Drag anything here" when no device is active.
- **Header Actions**:
  - **Clear**: Resets the active device and clears the canvas.
  - **Save Preset**: Opens the preset modal to snapshot current device settings.

### 3. Device Simulators

#### Living Room Fan
- Custom SVG blade geometry with smooth gradients.
- Centered 3D-styled motor hub.
- Multi-tier dynamic rotation speeds:
  - **Off**: Stopped.
  - **Speed < 33%**: Slow spin (`animate-spin-slow`).
  - **Speed 33% - 65%**: Medium spin (`animate-spin-medium`).
  - **Speed >= 66%**: Fast spin (`animate-spin-fast`).
- Bottom control card with **Power Toggle** switch and interactive **Speed Slider** (0–100%) featuring a filled accent gradient track.

#### Kitchen Light
- Realistic glass bulb graphic with multi-layer radial gradients, internal filament, reflection highlights, and metallic screw base.
- Dynamic ambient illumination glow that dynamically scales in size, opacity, and blur radius based on brightness.
- Bottom control card with:
  - **Power Toggle** switch.
  - **Color Temperature selector**: Warm (`#FFCC80`), Neutral (`#FFFFFF`), Cool (`#C0D8FF`), and Sunset (`#FFB6C1`).
  - **Brightness Slider** (0–100%) with filled accent gradient track.

### 4. Preset Management
- **Snapshot Settings**: Saves current power, speed/brightness, and color settings.
- **Modal Dialog**: Enter preset name with keyboard support (`Enter` to save, `Esc`/backdrop to cancel).
- **Toast Alerts**: Success notifications on preset creation and update.
- **Update Existing Preset**: Modifying an active preset and clicking Save Preset updates the preset in place.

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ProgramerPritom/Aetherix-assesment-frontend.git
cd Aetherix-assesment-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Production build
```bash
npm run build
```

---

## 🚢 Deploying to Vercel
You can deploy this project to Vercel in one step:
```bash
npx vercel
```
Or import the Git repository directly into the [Vercel Dashboard](https://vercel.com/new).
