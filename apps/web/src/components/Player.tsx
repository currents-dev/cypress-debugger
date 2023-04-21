import { useEffect, useRef } from 'react';

import { usePlayback } from '@/context/playback';
import { useReplayerContext } from '@/context/replayer';
import RRWebPlayer from 'rrweb-player';

function Player() {
  const divRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<RRWebPlayer | null>(null);

  const { playerData, origin } = useReplayerContext();
  const { rrIdOrTs } = usePlayback();

  useEffect(() => {
    if (!origin) return;
    if (!divRef.current) return;

    playerRef.current = new RRWebPlayer({
      target: divRef.current,
      props: {
        width: 800,
        height: 600,
        autoPlay: false,
        events: playerData.map((e) => e.payload),
      },
    });

    // eslint-disable-next-line consistent-return
    return () => playerRef.current?.getReplayer().destroy();
  }, [origin]);

  useEffect(() => {
    if (!playerRef.current) return;

    const start = playerData[0].timestamp;

    if (typeof rrIdOrTs === 'string') {
      const rrNode = playerData.find((e) => e.id === rrIdOrTs);
      if (!rrNode) return;

      playerRef.current.goto(rrNode.timestamp - start);
      playerRef.current.pause();
    }
    if (typeof rrIdOrTs === 'number') {
      playerRef.current.goto(rrIdOrTs - start);
      playerRef.current.pause();
    }
  }, [rrIdOrTs, origin]);

  return <div className="max-w-full overflow-auto p-4" ref={divRef} />;
}

export default Player;
