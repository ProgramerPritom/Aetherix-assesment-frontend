import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storeDevices: [],
  devices: [],
  presets: [],
  currentDeviceId: null,
  lastAction: { type: 'None', id: null },
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    loadInitialData: (state, action) => {
      state.storeDevices = action.payload.storeDevices;
      state.devices = action.payload.devices;
      state.presets = action.payload.presets;
    },
    addPreset: (state, action) => {
      const maxId = state.presets.length > 0 ? Math.max(...state.presets.map((c) => c.id)) : 0;
      const newPreset = { ...action.payload, id: maxId + 1 };
      state.presets.push(newPreset);
      state.lastAction = { type: 'Preset', id: newPreset.id };
      state.devices = [...state.storeDevices];
    },
    setCurrentDevice: (state, action) => {
      state.currentDeviceId = action.payload;
      state.lastAction = { type: 'Device', id: action.payload };
    },
    updateDeviceSettings: (state, action) => {
      const { deviceId, newSettings } = action.payload;
      let target;
      if (state.lastAction.type === 'Device') {
        target = state.devices.find((f) => f.id === deviceId);
      } else {
        target = state.presets.find((f) => f.id === deviceId);
      }
      if (target) {
        target.settings = { ...target.settings, ...newSettings };
      }
    },
    applyPreset: (state, action) => {
      const presetId = action.payload;
      const preset = state.presets.find((f) => f.id === presetId);
      if (!preset) return;
      const device = state.devices.find((f) => f.id === preset.device_id);
      if (device) {
        device.settings = { ...device.settings, ...preset.settings };
        state.currentDeviceId = presetId;
        state.lastAction = { type: 'Preset', id: presetId };
      }
    },
    resetCurrentDevice: (state) => {
      state.currentDeviceId = null;
      state.lastAction = { type: 'None', id: null };
    },
    updatePreset: (state, action) => {
      const { id, name, settings } = action.payload;
      const preset = state.presets.find((h) => h.id === id);
      if (preset) {
        preset.name = name;
        if (settings) preset.settings = settings;
        state.lastAction = { type: 'Preset', id };
      }
    },
  },
});

export const {
  loadInitialData,
  setCurrentDevice,
  updateDeviceSettings,
  applyPreset,
  resetCurrentDevice,
  addPreset,
  updatePreset,
} = deviceSlice.actions;

export default deviceSlice.reducer;

