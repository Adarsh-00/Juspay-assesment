import React from 'react';
import { executeBlocks } from './blockExecuter/blockExecuter';
import { handleHeroModeCollisions } from './heromode';
import CatSprite from './CatSprite';

const RightPanel = ({ sprites, setSprites, selectedSpriteIndex, setSelectedSpriteIndex, heroModeEnabled, setHeroModeEnabled }) => {
  const sprite = sprites[selectedSpriteIndex];

  const handlePlay = () => {
    sprites.forEach((sprite, index) => {
      executeBlocks(sprite, (updateFn) => {
        setSprites(prev => {
          const newSprites = [...prev];
          newSprites[index] = updateFn(prev[index]);
          return newSprites;
        });
      }, (text, type) => {
        setSprites(prev => {
          const newSprites = [...prev];
          newSprites[index] = {
            ...newSprites[index],
            bubble: { text, type }
          };
          return newSprites;
        });
      });
    });
    if (heroModeEnabled) {
      setSprites(prevSprites =>
        handleHeroModeCollisions(prevSprites, setSprites, executeBlocks, () => { })
      );
    }
  };

  const handleReset = () => {
    setSprites(prev => {
      const first = { ...prev[0], x: 0, y: 0, rotation: 0, blocks: [], bubble: null };
      return [first];
    });
    setSelectedSpriteIndex(0);
  };


  const handleAddSprite = () => {
    const newSprite = {
      name: `sprite-${sprites.length + 1}`,
      image: CatSprite,
      x: 0,
      y: 0,
      rotation: 0,
      blocks: []
    };
    setSprites(prev => [...prev, newSprite]);
    setSelectedSpriteIndex(sprites.length);
  };

  return (
    <div className="w-2/5 p-4 flex flex-col justify-between bg-white">
      <div className="h-[400px] bg-gray-100 border relative flex items-center justify-center overflow-scroll">
        {sprites.map((sprite, index) => (
          <div
            key={index}
            className="absolute transition-all duration-300"
            style={{
              left: `${sprite.x + 250}px`,
              top: `${200 - sprite.y}px`,
              transform: `rotate(${sprite.rotation || 0}deg)`
            }}
          >
            {sprite.bubble && (
              <div
                className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded shadow text-sm z-10 ${sprite.bubble.type === 'think' ? 'italic' : 'font-bold'
                  }`}
              >
                {sprite.bubble.text}
              </div>
            )}
            <sprite.image />
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-center text-sm text-gray-500">
          {sprite.name}: {sprite.x}, {sprite.y}
        </p>

        <div className="flex gap-2 justify-center">
          <button onClick={handlePlay} className="bg-green-500 text-white px-4 py-2 rounded">
            Play All
          </button>

          <button onClick={handleReset} className="bg-orange-400 text-white px-4 py-2 rounded">Reset All</button>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <input
            type="checkbox"
            id="heroMode"
            checked={heroModeEnabled}
            onChange={(e) => setHeroModeEnabled(e.target.checked)}
          />
          <label htmlFor="heroMode" className="text-sm">Hero Mode</label>
        </div>
        <p className="text-center text-sm text-gray-500">
          Showing {sprites.length} sprite(s)
        </p>
        <div className="text-center">
          <button
            onClick={handleAddSprite}
            className="p-2 px-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Add Sprite
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
