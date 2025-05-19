import React, { useState } from 'react';
import LeftPannel from "./componets/leftPannel";
import MidArea from "./componets/midArea";
import RightPanel from "./componets/rightPannel";
import CatSprite from './/componets/CatSprite';

function App() {
  const [sprites, setSprites] = useState([
    {
      name: "cat-sprite",
      image: CatSprite,
      x: 0,
      y: 0,
      rotation: 0,
      blocks: []
    }
  ]);

  const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(0);

  const handleDrop = (item, targetIndex) => {
    setSprites(prev => {
      const updated = [...prev];
      updated[targetIndex] = {
        ...updated[targetIndex],
        blocks: [...updated[targetIndex].blocks, item]
      };
      return updated;
    });
  };

  const handleBlockChange = (blockIndex, newData) => {
    setSprites(prev => {
      const updated = [...prev];
      const sprite = updated[selectedSpriteIndex];
      const newBlocks = [...sprite.blocks];
      newBlocks[blockIndex] = { ...newBlocks[blockIndex], data: newData };
      updated[selectedSpriteIndex] = { ...sprite, blocks: newBlocks };
      return updated;
    });
  };

  const [heroModeEnabled, setHeroModeEnabled] = useState(false);


  return (
    <div className="flex h-screen">
      <LeftPannel />
      <MidArea
        sprites={sprites}
        selectedSpriteIndex={selectedSpriteIndex}
        setSelectedSpriteIndex={setSelectedSpriteIndex}
        onDrop={handleDrop}
        onBlockChange={handleBlockChange}
      />
      <RightPanel
        sprites={sprites}
        setSprites={setSprites}
        selectedSpriteIndex={selectedSpriteIndex}
        setSelectedSpriteIndex={setSelectedSpriteIndex}
        heroModeEnabled={heroModeEnabled}
        setHeroModeEnabled={setHeroModeEnabled}
      />
    </div>
  );
}

export default App;
