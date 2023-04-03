import { useEffect, useRef } from "react";
import styles from "./Replayer.module.scss";

import rrwebPlayer from "rrweb-player";
import { usePlayback } from "../../context/playback";
import { useReplayerContext } from "../../context/replayer";

export function Player() {
  const divRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<rrwebPlayer | null>(null);

  const { playerData, origin } = useReplayerContext();
  const { rrIdOrTs } = usePlayback();

  useEffect(() => {
    if (!origin) return;
    if (!divRef.current) return;

    playerRef.current = new rrwebPlayer({
      target: divRef.current,
      props: {
        width: 800,
        height: 600,
        autoPlay: false,
        events: playerData.map((e) => e.payload),
      },
    });
    return () => playerRef.current?.getReplayer().destroy();
  }, [origin]); // eslint-disable-line

  useEffect(() => {
    if (!playerRef.current) return;

    const start = playerData[0].timestamp;

    if (typeof rrIdOrTs === "string") {
      const rrNode = playerData.find((e) => e.id === rrIdOrTs);
      if (!rrNode) return;

      playerRef.current.goto(rrNode.timestamp - start);
      playerRef.current.pause();
    }
    if (typeof rrIdOrTs === "number") {
      playerRef.current.goto(rrIdOrTs - start);
      playerRef.current.pause();
    }
  }, [rrIdOrTs, origin]); // eslint-disable-line

  return <div className={styles.container} ref={divRef}></div>;
}
