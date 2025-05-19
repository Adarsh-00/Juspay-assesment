import React from 'react';
import DraggableBlock from './dragable/dragableBlock';
const LeftPannel = () => {
  return (
    <div className="w-1/4 p-4 bg-gray-100">
      <h2 className="text-lg font-bold text-blue-600 mb-2">Motion</h2>
      <DraggableBlock type="motion" label="Move 10 steps" data={{ action: 'move', value: 10 }} />
      <DraggableBlock type="motion" label="Turn 15 degrees" data={{ action: 'turn', value: 15 }} />
      <DraggableBlock type="motion" label="Go to x:0 y:0" data={{ action: 'goto', x: 0, y: 0 }} />
      <DraggableBlock type="motion" lable="Repeat 3 times" data={{action: 'repeat', value: 3}}/>

      <h2 className="text-lg font-bold text-purple-600 mt-4 mb-2">Looks</h2>
      <DraggableBlock type="looks" label='Say "Hello" for 2s' data={{ action: 'say', message: 'Hello', duration: 2 }} />
      <DraggableBlock type="looks" label='Think "Hmm" for 2s' data={{ action: 'think', message: 'Hmm', duration: 2 }} />
    </div>
  );
};

export default LeftPannel;
