import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addPreset, updatePreset } from '../store/deviceSlice';

export default function PresetModal({ device, onClose, presets, lastAction, setCurrentDevice }) {
  const [name, setName] = useState('');
  const [editingPreset, setEditingPreset] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lastAction || !presets) return;
    const found = presets.find((p) => lastAction.type === 'Preset' && p.id === lastAction.id);
    if (found) {
      setEditingPreset(found);
      setName(found.name);
    }
  }, [lastAction, presets]);

  if (!device) return null;

  const handleSave = async () => {
    try {
      const currentSettings = { ...device.settings };
      let payload;
      if (editingPreset) {
        payload = {
          id: editingPreset.id,
          device_id: editingPreset.device_id,
          type: editingPreset.type,
          name,
          settings: currentSettings,
        };
        dispatch(updatePreset(payload));
        toast.success('Preset updated successfully!');
      } else {
        payload = {
          device_id: device.id,
          name,
          type: device.type,
          settings: currentSettings,
        };
        if (setCurrentDevice) setCurrentDevice(payload);
        dispatch(addPreset(payload));
        toast.success('Preset created successfully!');
      }
      onClose();
    } catch (err) {
      console.error('Error saving preset:', err);
      const msg = err.response?.data?.message || 'Failed to save preset. Please try again.';
      toast.error(msg);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-[#364153] bg-[#141D2B] shadow-2xl m-2 md:m-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2 md:mb-4 border-b border-[#364153] p-3 md:p-6">
          <h3 className="text-base md:text-xl font-medium md:font-semibold text-slate-100">
            Give me a name
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 cursor-pointer hover:text-slate-200 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-3 md:p-6">
          <input
            type="text"
            placeholder="Name it"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full rounded-lg border-0 bg-[#364153] px-2 md:px-4 py-2 md:py-3 text-base text-slate-100 placeholder-slate-500 focus:border-transparent focus:ring-0 outline-none"
          />
          <p className="mt-2 text-sm text-slate-400">
            By adding this effect as a preset you can reuse this anytime.
          </p>
        </div>

        <div className="flex justify-end space-x-3 px-4 md:px-6 pb-4 md:pb-6 pt-2 md:pt-4">
          <button
            onClick={onClose}
            className="md:px-4 px-3 cursor-pointer py-1 md:py-2 rounded-lg text-sm md:text-base font-medium bg-[#1E2939] border border-[#364153] text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="md:px-4 px-3 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-colors cursor-pointer bg-[#2B7FFF] text-white hover:bg-blue-700"
          >
            Save Preset
          </button>
        </div>
      </div>
    </div>
  );
}

