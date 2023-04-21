import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useCypressEventsContext } from '@/context/cypressEvents';
import { useHttpArchiveContext } from '@/context/httpArchiveEntries';
import { useReplayerContext } from '@/context/replayer';
import { usePayloadQueryParam } from '@/hooks/useQuery';
import Console from './Console';
import CyEvents from './CyEvents';
import DarkModeToggle from './DarkModeToggle';
import { EventDetails } from './EventDetails';
import Network from './Network';
import PayloadHandler from './PayloadHandler';
import Player from './Player';
import { Button } from './ui/Button';

function GridLayout() {
  const {
    events,
    selectedEvent,
    selectedEventObject,
    setSelectedEvent,
    meta,
    browserLogs,
    setEvents,
    setMeta,
    setBrowserLogs,
  } = useCypressEventsContext();
  const { origin, setOrigin, setReplayerData } = useReplayerContext();
  const { entries, setHttpArchiveLog } = useHttpArchiveContext();
  const [, , clearQueryParam] = usePayloadQueryParam();

  const logsCount =
    (browserLogs?.logEntry.length ?? 0) +
    (browserLogs?.runtimeConsoleApiCalled.length ?? 0);

  const handleClick = () => {
    setOrigin(null);
    setEvents([]);
    setReplayerData([]);
    setHttpArchiveLog(null);
    setMeta(null);
    setBrowserLogs(null);
    clearQueryParam();
  };

  return (
    <>
      <div className="absolute top-5 right-8 z-10">
        <DarkModeToggle />
      </div>
      {!origin && (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="h-96 w-[70%]">
            <PayloadHandler />
          </div>
        </div>
      )}
      {!!origin && (
        <div className="">
          <div className="relative flex items-center justify-center h-20 border-b border-slate-300 dark:border-slate-700">
            <p className="px-6">
              <span>Payload from:</span> <span>{origin}</span>
            </p>
            <Button className="px-6 h-9 rounded border" onClick={handleClick}>
              Remove
            </Button>
          </div>
          {events.length > 0 && (
            <div className="w-full grid grid-cols-[2fr_7fr_3fr] h-[calc(100vh-5rem)] divide-x divide-slate-300 dark:divide-slate-700">
              <div className="">
                {meta && (
                  <div className="p-4 border-b">
                    <div className="text-amber-700 dark:text-amber-500 font-semibold">
                      {meta?.spec}
                    </div>
                    <div className="font-base">{meta?.test.join(' > ')}</div>
                    <div className="font-thin">retry: {meta.retryAttempt}</div>
                  </div>
                )}
                <Tabs defaultValue="steps" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="steps">Steps</TabsTrigger>
                  </TabsList>
                  <TabsContent value="steps">
                    <CyEvents
                      events={events}
                      selectedEvent={selectedEvent}
                      setSelectedEvent={setSelectedEvent}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              <div className="flex items-center justify-center">
                <Player />
              </div>
              <div className="min-w-full">
                <Tabs defaultValue="details">
                  <TabsList>
                    <TabsTrigger value="details">Step Details</TabsTrigger>
                    <TabsTrigger value="network">
                      Network{' '}
                      {entries.length > 0 ? (
                        <sup className="text-emerald-700 dark:text-emerald-500">{entries.length}</sup>
                      ) : (
                        ''
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="console">
                      Console{' '}
                      {logsCount > 0 ? (
                        <sup className="text-emerald-700 dark:text-emerald-500">{logsCount}</sup>
                      ) : (
                        ''
                      )}
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="details">
                    <EventDetails event={selectedEventObject} />
                  </TabsContent>
                  <TabsContent value="network">
                    <Network entries={entries} />
                  </TabsContent>
                  <TabsContent value="console">
                    <Console logs={browserLogs} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default GridLayout;
