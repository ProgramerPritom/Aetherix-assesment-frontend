import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { loadInitialData, setCurrentDevice, applyPreset } from '../store/deviceSlice';

const ITEM_BASE_CLASS =
  'w-full border border-[#364153] rounded-lg px-4 py-2 md:py-3 text-left text-sm font-medium transition-colors flex items-center gap-2';
const ACTIVE_CLASS = 'bg-[#646F7F]/80 text-white';
const INACTIVE_CLASS = 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white';

const DeviceItem = ({ device, dispatch, lastAction, setIsSidebarOpen }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: device.type,
      item: { id: device.id, name: device.name, type: device.type },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [device.id, device.name, device.type]
  );

  const isActive = lastAction?.type === 'Device' && lastAction?.id === device.id;

  const handleClick = () => {
    dispatch(setCurrentDevice(device.id));
    setIsSidebarOpen(false);
  };

  return (
    <button
      ref={dragRef}
      onClick={handleClick}
      className={`${ITEM_BASE_CLASS} ${isActive ? ACTIVE_CLASS : INACTIVE_CLASS}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer' }}
    >
      <span className="text-lg">
        {device.type === 'Light' && <img src="/icons/light.svg" alt="light" className="w-5 h-5 inline-block" />}
        {device.type === 'Fan' && <img src="/icons/fan.svg" alt="fan" className="w-5 h-5 inline-block" />}
      </span>{' '}
      {device.name}
    </button>
  );
};

const PresetItem = ({ preset, dispatch, lastAction, setIsSidebarOpen }) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'Preset',
      item: { id: preset.id, name: preset.name, type: 'Preset' },
      collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }),
    [preset.id, preset.name]
  );

  const isActive = lastAction?.type === 'Preset' && lastAction?.id === preset.id;

  const handleClick = () => {
    dispatch(applyPreset(preset.id));
    setIsSidebarOpen(false);
  };

  return (
    <button
      ref={dragRef}
      onClick={handleClick}
      className={`${ITEM_BASE_CLASS} ${isActive ? ACTIVE_CLASS : INACTIVE_CLASS}`}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
    >
      <span className="text-lg">
        {preset.type === 'Light' && <img src="/icons/light.svg" alt="light" className="w-5 h-5 inline-block" />}
        {preset.type === 'Fan' && <img src="/icons/fan.svg" alt="fan" className="w-5 h-5 inline-block" />}
      </span>{' '}
      {preset.name}
    </button>
  );
};

export default function Sidebar({ devices, presets, dispatch, lastAction, isSidebarOpen, setIsSidebarOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  const initialDevices = [
    { id: 10, type: 'Fan', name: 'Living Room Fan', settings: { power: false, speed: 0 } },
    { id: 20, type: 'Light', name: 'Kitchen Light', settings: { power: false, brightness: 50, color: '#ffffff' } },
  ];

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        dispatch(loadInitialData({ storeDevices: initialDevices, devices: initialDevices, presets: [] }));
      } catch (err) {
        console.error('Error fetching data:', err);
        dispatch(loadInitialData({ storeDevices: [], devices: [], presets: [] }));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <aside
      className={`
        w-56 md:w-56 h-screen
        border-r border-[#1E2939] bg-[#101828] 
        p-4 md:p-6 
        overflow-y-auto overflow-x-auto 
        transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 
        fixed top-0 bottom-0 left-0 z-20
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-slate-400">Loading...</div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Devices Section */}
          <div className="mb-4 md:mb-8 shrink-0">
            <h2 className="mb-2 md:mb-4 text-xs font-semibold tracking-wider text-[#F3F4F6]">
              Devices ({devices?.length || 0})
            </h2>
            <div className="space-x-2 space-y-2">
              {devices && devices.length > 0 ? (
                devices.map((device) => (
                  <DeviceItem
                    key={device.id}
                    device={device}
                    dispatch={dispatch}
                    lastAction={lastAction}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                ))
              ) : (
                <div className="w-full border border-[#364153] text-[#E5E7EB]/40 rounded-lg px-4 py-3 text-left text-sm font-medium">
                  No devices available
                </div>
              )}
            </div>
          </div>

          {/* Presets Section */}
          <div className="shrink-0">
            <h2 className="mb-4 text-xs font-semibold tracking-wider text-[#F3F4F6]">
              Saved Presets ({presets?.length || 0})
            </h2>
            {!presets || presets.length === 0 ? (
              <div className="w-full border border-[#364153] text-[#E5E7EB]/40 rounded-lg px-4 py-3 text-left text-sm font-medium">
                Nothing added yet
              </div>
            ) : (
              <div className="space-y-2">
                {presets.map((preset) => (
                  <PresetItem
                    key={preset.id}
                    preset={preset}
                    dispatch={dispatch}
                    lastAction={lastAction}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}

