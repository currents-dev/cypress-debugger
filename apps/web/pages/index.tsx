import {
  Layout,
  Metadata,
  Network,
  Replayer,
  StepDetails,
  CySteps,
  Tabs,
  PayloadHandler,
} from "../components";
import ReplayerContextProvider, {
  useReplayerContext,
} from "../context/replayer";
import CypressStepsContextProvider, {
  useCypressStepsContext,
} from "../context/cypressSteps";
import HttpArchiveContextProvider, {
  useHttpArchiveContext,
} from "../context/httpArchiveEntries";

function App() {
  const { steps, setSteps, activeStep, activeStepObj, setActiveStep } =
    useCypressStepsContext();

  const { onBefore, onAfter, setReplayerData } = useReplayerContext();
  const { entries, setHttpArchiveLog } = useHttpArchiveContext();

  return (
    <Layout
      topBlock={
        <PayloadHandler
          setSteps={setSteps}
          setReplayerData={setReplayerData}
          setHttpArchiveLog={setHttpArchiveLog}
        />
      }
      leftSidebar={
        <Tabs
          tabs={[
            {
              title: "Steps",
              content: (
                <CySteps
                  steps={steps}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  onBefore={onBefore}
                  onAfter={onAfter}
                />
              ),
            },
            {
              title: "Metadata",
              content: <Metadata step={activeStepObj} />,
            },
          ]}
        />
      }
      content={
        <Tabs
          tabs={[
            {
              title: "Action",
              content: <Replayer />,
            },
            {
              title: "Network calls",
              content: <div>TODO</div>,
            },
          ]}
        />
      }
      rightSidebar={
        <Tabs
          tabs={[
            {
              title: "Step Details",
              content: <StepDetails step={activeStepObj} />,
            },
            {
              title: `Network ${
                entries.length > 0 ? `(${entries.length})` : ""
              }`,
              content: <Network entries={entries} />,
            },
          ]}
        />
      }
    ></Layout>
  );
}

export default function Web() {
  return (
    <CypressStepsContextProvider>
      <ReplayerContextProvider>
        <HttpArchiveContextProvider>
          <App />
        </HttpArchiveContextProvider>
      </ReplayerContextProvider>
    </CypressStepsContextProvider>
  );
}
