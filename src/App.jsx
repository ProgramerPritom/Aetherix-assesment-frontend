import React from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer } from 'react-toastify';
import { store } from './store/store';
import DeviceSimulator from './components/DeviceSimulator';
import './App.css';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <DeviceSimulator />
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </DndProvider>
  );
}
