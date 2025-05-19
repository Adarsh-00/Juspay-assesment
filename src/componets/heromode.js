export function handleHeroModeCollisions(sprites, setSprites, executeBlocks, setBubble) {
  const updatedSprites = [...sprites];

  for (let i = 0; i < updatedSprites.length; i++) {
    for (let j = i + 1; j < updatedSprites.length; j++) {
      const spriteA = updatedSprites[i];
      const spriteB = updatedSprites[j];

      const collisionDistance = 10;
      const isColliding =
        Math.abs(spriteA.x - spriteB.x) < collisionDistance &&
        Math.abs(spriteA.y - spriteB.y) < collisionDistance;

      if (isColliding) {
        console.log(`Collision detected between sprite ${i} and ${j}`);

        const temp = spriteA.blocks;
        spriteA.blocks = spriteB.blocks;
        spriteB.blocks = temp;


        [spriteA, spriteB].forEach((sprite, index) => {
          const realIndex = sprites.findIndex(s => s.name === sprite.name); // find actual index in state
          executeBlocks(sprite, (updateFn) => {
            setSprites(prev => {
              const newSprites = [...prev];
              newSprites[realIndex] = updateFn(prev[realIndex]);
              return newSprites;
            });
          }, (text, type) => {
            setSprites(prev => {
              const newSprites = [...prev];
              newSprites[realIndex] = {
                ...newSprites[realIndex],
                bubble: { text, type }
              };
              return newSprites;
            });
          });
        });
      }
    }
  }

  return updatedSprites;
}
