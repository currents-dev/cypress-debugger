import { useEffect, useRef } from "react";
import { useReplayerContext } from "../../context/replayer";
import styles from "./Replayer.module.scss";

export function Replayer() {
  const divRef = useRef<HTMLDivElement>(null);
  const { init } = useReplayerContext();

  useEffect(() => {
    if (!divRef.current) return;

    init(divRef.current);
  }, [divRef.current]); // eslint-disable-line

  return <div className={styles.container} ref={divRef}></div>;
}
