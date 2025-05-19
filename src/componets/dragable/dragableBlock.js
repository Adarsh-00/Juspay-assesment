import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';

const DraggableBlock = ({ type, label, data, index, onChange }) => {

  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    if (!onChange) {
      setLocalData(data);
    }
  }, [data]);

  const usedData = onChange ? data : localData;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { type, label, data: usedData, action: usedData.action },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [usedData]);

  const handleInputChange = (key, value) => {
    const updated = { ...usedData, [key]: value };

    if (onChange) {
      onChange(index, updated);
    } else {
      setLocalData(updated);
    }
  };

  return (
    <div
      ref={drag}
      className={`p-2 rounded mb-2 text-white cursor-move ${
        type === 'motion' ? 'bg-blue-500' : 'bg-purple-500'
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {usedData.action === 'move' && (
        <>Move <input type="number" value={usedData.value} onChange={(e) => handleInputChange('value', Number(e.target.value))} className="w-12 text-black rounded px-1" /> steps</>
      )}
      {usedData.action === 'turn' && (
        <>Turn <input type="number" value={usedData.value} onChange={(e) => handleInputChange('value', Number(e.target.value))} className="w-12 text-black rounded px-1" /> degrees</>
      )}
      {usedData.action === 'goto' && (
        <>Go to x: <input type="number" value={usedData.x} onChange={(e) => handleInputChange('x', Number(e.target.value))} className="w-12 text-black rounded px-1" />
        y: <input type="number" value={usedData.y} onChange={(e) => handleInputChange('y', Number(e.target.value))} className="w-12 text-black rounded px-1" /></>
      )}
      {usedData.action === 'repeat' && (
        <>Repeat <input type="number" value={usedData.value} onChange={(e) => handleInputChange('value', Number(e.target.value))} className="w-12 text-black rounded px-1" /> times</>
      )}
      {usedData.action === 'say' && (
        <>Say "<input type="text" value={usedData.message} onChange={(e) => handleInputChange('message', e.target.value)} className="w-20 text-black rounded px-1" />" for <input type="number" value={usedData.duration} onChange={(e) => handleInputChange('duration', Number(e.target.value))} className="w-12 text-black rounded px-1" /> sec</>
      )}
      {usedData.action === 'think' && (
        <>Think "<input type="text" value={usedData.message} onChange={(e) => handleInputChange('message', e.target.value)} className="w-20 text-black rounded px-1" />" for <input type="number" value={usedData.duration} onChange={(e) => handleInputChange('duration', Number(e.target.value))} className="w-12 text-black rounded px-1" /> sec</>
      )}
    </div>
  );
};

export default DraggableBlock;
