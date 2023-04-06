import { useCypressEventsContext } from "../../context/cypressEvents";
import { useHttpArchiveContext } from "../../context/httpArchiveEntries";
import { Console } from "../Console/Console";
import { CyEvents } from "../CyEvents/CyEvents";
import { Network } from "../Network/Network";
import { PayloadHandler } from "../PayloadHandler/PayloadHandler";
import { Player } from "../Replayer/Replayer";
import { EventDetails } from "../EventDetails/EventDetails";
import { Tabs } from "../Tabs/Tabs";
import styles from "./Layout.module.scss";

export function Layout() {
  const {
    events,
    selectedEvent,
    selectedEventObject,
    setSelectedEvent,
    meta,
    browserLogs,
  } = useCypressEventsContext();
  const { entries } = useHttpArchiveContext();

  const logsCount =
    (browserLogs?.logEntry.length ?? 0) +
    (browserLogs?.runtimeConsoleApiCalled.length ?? 0);

  return (
    <div className={styles.layout}>
      <div className={styles["layout_top-block"]}>
        <PayloadHandler />
      </div>
      {events.length > 0 && (
        <div className={styles["layout_main-block"]}>
          <div className={styles["layout_left-sidebar"]}>
            <Tabs
              tabs={[
                {
                  title: "Steps",
                  content: (
                    <CyEvents
                      meta={meta}
                      events={events}
                      selectedEvent={selectedEvent}
                      setSelectedEvent={setSelectedEvent}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className={styles["layout_content"]}>
            <Player />
          </div>
          <div className={styles["layout_right-sidebar"]}>
            <Tabs
              tabs={[
                {
                  title: "Step Details",
                  content: <EventDetails event={selectedEventObject} />,
                },
                {
                  title: `Network ${
                    entries.length > 0 ? `(${entries.length})` : ""
                  }`,
                  content: <Network entries={entries} />,
                },
                {
                  title: `Console  ${logsCount > 0 ? `(${logsCount})` : ""}`,
                  content: <Console logs={browserLogs} />,
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
