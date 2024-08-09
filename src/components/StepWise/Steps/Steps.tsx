import React from "react";
import { SessionContext } from "../stores/sessionContext";
import { useStore } from "zustand";

import type { Step as StepType } from "../stores/solution";
import CorrectStep from "./CorrectStep";
import IncorrectStep from "./IncorrectStep";
import VictoryStep from "./VictoryStep";
import HintStep from "./HintStep";
import ShowMeStep from "./ShowMeStep";
import {
  Table,
  TableBody,
  TableCaption,
  TableHeader,
} from "../components/Table";

const Steps = () => {
  const session = React.useContext(SessionContext);
  if (!session) throw new Error("No SessionContext.Provider in the tree");

  const steps: StepType[] = useStore(session, (s) => s.steps);
  const lastAction = useStore(session, (s) => s.lastAction);

  const renderStepSwitch = (step: StepType) => {
    switch (step.type) {
      case "correct":
        return (
          <CorrectStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        );
      case "incorrect":
        return (
          <IncorrectStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        );
      case "hint":
        return (
          <HintStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type="hint"
            hintText={step.hintText}
            status={step.status}
            hintObject={step.hintObject}
          />
        );
      case "showMe":
        // render only if the showMe is the last action
        if (lastAction !== step.timestamp) return null;
        return (
          <ShowMeStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type="showMe"
            status={step.status}
            showMe={step.showMe}
          />
        );
      case "victory":
        return (
          <VictoryStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        );
      case "mathComplete":
        return (
          <VictoryStep
            key={step.timestamp}
            timestamp={step.timestamp}
            type={step.type}
            latex={step.latex}
            message={step.message}
            status={step.status}
            stepStatus={step.stepStatus}
            rawResponse={step.rawResponse}
            hintObject={step.hintObject}
          />
        );
      default:
        // TODO: Finish exhaustive union as shown here: https://www.youtube.com/watch?v=CG3_Y9T03J4
        return <div>Step type not implemented: {JSON.stringify(step)}</div>;
    }
  };

  return (
    <Table className="h-full">
      <TableCaption className="caption-top text-left mt-0 text-slate-900 dark:text-white text-base font-medium tracking-tight">
        Your solution
      </TableCaption>
      <TableBody className="">
        {steps.map((step) => renderStepSwitch(step))}
      </TableBody>
    </Table>
  );
};

export default Steps;
