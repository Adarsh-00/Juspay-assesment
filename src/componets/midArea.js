import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableBlock from "./dragable/dragableBlock";

const MidArea = ({sprites, selectedSpriteIndex, setSelectedSpriteIndex, onDrop, onBlockChange }) => {
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item) => {
      onDrop(item, selectedSpriteIndex);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [selectedSpriteIndex]);

  const selectedSprite = sprites[selectedSpriteIndex];
  const blocks = selectedSprite.blocks;

  return (
    <div className="w-2/4 h-full p-4 bg-gray-50 border-x border-gray-300 flex flex-col">
      <div className="flex gap-2 p-2">
        {sprites.map((sprite, index) => (
          <button
            key={index}
            onClick={() => setSelectedSpriteIndex(index)}
            className={`px-2 py-1 rounded ${index === selectedSpriteIndex ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {sprite.name}
          </button>
        ))}
      </div>

      <div
        ref={drop}
        className={`flex-1 bg-white p-4 rounded shadow-inner overflow-y-auto transition-colors ${isOver ? 'bg-yellow-100' : ''}`}
      >
        {blocks.length === 0 ? (
          <p className="text-gray-400 text-sm italic">
            Drag blocks here to add to this sprite’s logic
          </p>
        ) : (
          blocks.map((block, index) => (
            <DraggableBlock
              key={index}
              type={block.type}
              label={block.label}
              data={block.data}
              index={index}
              onChange={onBlockChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MidArea;
