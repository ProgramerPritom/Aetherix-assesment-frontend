import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCurrentDevice } from '../store/deviceSlice';
import Sidebar from './Sidebar';
import CanvasDropZone from './CanvasDropZone';
import FanVisualizer from './FanVisualizer';
import FanControls from './FanControls';
import LightVisualizer from './LightVisualizer';
import LightControls from './LightControls';
import PresetModal from './PresetModal';

export default function DeviceSimulator() {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.device.devices);
  const presets = useSelector((state) => state.device.presets);
  const currentDeviceId = useSelector((state) => state.device.currentDeviceId);
  const lastAction = useSelector((state) => state.device.lastAction);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isFan = activeDevice?.type === 'Fan';
  const isLight = activeDevice?.type === 'Light';

  const handleClear = () => {
    dispatch(resetCurrentDevice());
    setActiveDevice(null);
  };

  const handleOpenPresetModal = () => {
    if (activeDevice) {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (!lastAction?.type || !currentDeviceId) return;
    const targetList = lastAction.type === 'Device' ? devices : presets;
    const item = targetList.find((x) => x.id === currentDeviceId);
    if (item) {
      setActiveDevice(item);
    }
  }, [currentDeviceId, devices, presets, lastAction]);

  return (
    <div className="min-h-screen flex flex-col bg-[#030712]">
      <div className="flex-1 flex flex-col md:flex-row md:h-screen bg-[#030712]">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-4 text-white bg-slate-800 border-b border-[#1E2939] z-20 flex justify-between items-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="font-semibold text-sm">Menu</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isSidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Sidebar */}
        <Sidebar
          devices={devices}
          presets={presets}
          dispatch={dispatch}
          lastAction={lastAction}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Canvas Area */}
        <main className="flex-1 flex flex-col min-h-[50vh] md:min-h-0 relative">
          {/* Header */}
          <header className="bg-[#030712] px-4 md:px-8 pt-4 md:pt-6 flex justify-between items-center">
            <h1 className="text-base font-semibold text-white">Testing Canvas</h1>
            {currentDeviceId && (
              <div className="flex gap-1 sm:gap-2">
                <button
                  onClick={handleClear}
                  className="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-slate-800 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleOpenPresetModal}
                  disabled={!activeDevice}
                  className="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Preset
                </button>
              </div>
            )}
          </header>

          {/* Canvas DropZone with Visualizer */}
          <CanvasDropZone>
            {isFan && activeDevice && (
              <div className="w-full max-w-sm h-full max-h-sm flex justify-center pt-0 md:pt-16">
                <FanVisualizer
                  isPowerOn={activeDevice.settings.power}
                  speed={activeDevice.settings.speed}
                />
              </div>
            )}
            {isLight && activeDevice && (
              <div className="w-full max-w-sm h-full max-h-sm flex justify-center pt-0 md:pt-16">
                <LightVisualizer
                  isOn={activeDevice.settings.power}
                  brightness={activeDevice.settings.brightness}
                  color={activeDevice.settings.color}
                />
              </div>
            )}
          </CanvasDropZone>

          {/* Controls Footer */}
          {isFan && activeDevice && <FanControls device={activeDevice} dispatch={dispatch} />}
          {isLight && activeDevice && <LightControls device={activeDevice} dispatch={dispatch} />}
        </main>
      </div>

      {/* Preset Modal */}
      {isModalOpen && activeDevice && (
        <PresetModal
          device={activeDevice}
          onClose={() => setIsModalOpen(false)}
          presets={presets}
          lastAction={lastAction}
          setCurrentDevice={setActiveDevice}
        />
      )}
    </div>
  );
}

