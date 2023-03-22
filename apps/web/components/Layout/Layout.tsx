import { useCypressStepsContext } from "../../context/cypressSteps";
import { useHttpArchiveContext } from "../../context/httpArchiveEntries";
import { useReplayerContext } from "../../context/replayer";
import { CySteps } from "../CySteps/CySteps";
import { Metadata } from "../Metadata/Metadata";
import { Network } from "../Network/Network";
import { PayloadHandler } from "../PayloadHandler/PayloadHandler";
import { Replayer } from "../Replayer/Replayer";
import { StepDetails } from "../StepDetails/StepDetails";
import { Tabs } from "../Tabs/Tabs";
import styles from "./Layout.module.scss";

export function Layout() {
  const { steps, setSteps, activeStep, activeStepObj, setActiveStep } =
    useCypressStepsContext();

  const { onBefore, onAfter, setReplayerData } = useReplayerContext();
  const { entries, setHttpArchiveLog } = useHttpArchiveContext();

  const leftSidebarTabs = [
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
  ];

  activeStepObj &&
    leftSidebarTabs.push({
      title: "Metadata",
      content: <Metadata step={activeStepObj} />,
    });

  return (
    <div className={styles.layout}>
      <div className={styles["layout_top-block"]}>
        <PayloadHandler
          setSteps={setSteps}
          setReplayerData={setReplayerData}
          setHttpArchiveLog={setHttpArchiveLog}
        />
      </div>
      {steps.length > 0 && (
        <div className={styles["layout_main-block"]}>
          <div className={styles["layout_left-sidebar"]}>
            <Tabs tabs={leftSidebarTabs} />
          </div>
          <div className={styles["layout_content"]}>
            <Tabs
              tabs={[
                {
                  title: "Action",
                  content: activeStepObj ? <Replayer /> : <div></div>,
                },
                {
                  title: "Network calls",
                  content: <div>TODO</div>,
                },
              ]}
            />
          </div>
          <div className={styles["layout_right-sidebar"]}>
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
          </div>
        </div>
      )}
    </div>
  );
}
