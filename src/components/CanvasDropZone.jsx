import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { applyPreset, setCurrentDevice } from '../store/deviceSlice';

const DEVICE_TYPES = {
  FAN: 'Fan',
  LIGHT: 'Light',
  PRESET: 'Preset',
};

export default function CanvasDropZone({ children }) {
  const dispatch = useDispatch();
  const devices = useSelector((state) => state.device.devices);
  const currentDeviceId = useSelector((state) => state.device.currentDeviceId);

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: [DEVICE_TYPES.FAN, DEVICE_TYPES.LIGHT, DEVICE_TYPES.PRESET],
      drop: (item) => {
        if (item.type === DEVICE_TYPES.PRESET) {
          dispatch(applyPreset(item.id));
        } else {
          const found = devices.find((d) => d.type === item.type);
          if (found) {
            dispatch(setCurrentDevice(found.id));
          }
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [devices, dispatch]
  );

  const isActive = isOver && canDrop;
  let borderColor = 'border-slate-700';
  if (isActive) {
    borderColor = 'border-green-500';
  } else if (canDrop) {
    borderColor = 'border-yellow-500';
  }

  const isEmpty = !currentDeviceId;
  const containerClass = `flex-1 flex items-center justify-center rounded-2xl m-2 md:m-5 p-4 sm:p-8 relative bg-[#10182880] border border-[#10182880]/50 ${borderColor} transition-colors`;

  let content;
  if (isEmpty) {
    content = <p className="text-base font-light text-slate-500 text-center p-8"> Drag anything here </p>;
  } else if (isActive) {
    content = <p className="text-base text-green-400 font-bold text-center">Release to add device!</p>;
  } else {
    content = children;
  }

  return (
    <div ref={dropRef} className={containerClass}>
      {content}
    </div>
  );
}

