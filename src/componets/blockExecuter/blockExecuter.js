export const executeBlocks = async (sprite, setSprite) => {
  const blocks = sprite.blocks;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const action = block.data.action;

    if (action === 'repeat') {
      const repeatCount = block.data.value;
      const nextBlock = blocks[i + 1];

      if (nextBlock) {
        for (let r = 0; r < repeatCount; r++) {
          await runSingleBlock(nextBlock, setSprite);
          await new Promise(res => setTimeout(res, 500));
        }
      }

      i++; // skip the next block
    } else {
      await runSingleBlock(block, setSprite);
    }

    await new Promise(res => setTimeout(res, 300));
  }
};

const runSingleBlock = async (block, setSprite) => {
  const data = block.data;

  switch (data.action) {
    case 'move':
      setSprite(prev => ({ ...prev, x: prev.x + data.value }));
      break;

    case 'turn':
      setSprite(prev => ({ ...prev, rotation: (prev.rotation || 0) + data.value }));
      break;

    case 'goto':
      setSprite(prev => ({ ...prev, x: data.x, y: data.y }));
      break;

    case 'say':
      setSprite(prev => ({ ...prev, bubble: { text: data.message, type: 'say' } }));
      await new Promise(res => setTimeout(res, data.duration * 1000));
      setSprite(prev => ({ ...prev, bubble: null }));
      break;

    case 'think':
      setSprite(prev => ({ ...prev, bubble: { text: data.message, type: 'think' } }));
      await new Promise(res => setTimeout(res, data.duration * 1000));
      setSprite(prev => ({ ...prev, bubble: null }));
      break;

    default:
      break;
  }
};
