import {
  Layout,
  Metadata,
  Network,
  Replayer,
  StepDetails,
  CySteps,
  Tabs,
  JSONFileUpload,
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
import { CypressStep, HttpArchiveLog, ReplayerStepData } from "../types";

type Payload = {
  cy: CypressStep[];
  rr: ReplayerStepData[];
  har: HttpArchiveLog;
};

function App() {
  const { steps, setSteps, activeStep, activeStepObj, setActiveStep } =
    useCypressStepsContext();

  const { onBefore, onAfter } = useReplayerContext();
  const { entries } = useHttpArchiveContext();

  const handleDataChange = (payload: Payload | null) => {
    setSteps(payload?.cy || []);
    console.log(payload);
  };

  const validate = (payload: Payload) =>
    Object.keys(payload).every((key) => ["cy", "rr", "har"].includes(key));

  return (
    <Layout
      topBlock={
        <JSONFileUpload onChange={handleDataChange} validate={validate} />
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
