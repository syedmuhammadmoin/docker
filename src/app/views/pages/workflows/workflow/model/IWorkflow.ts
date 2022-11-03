import { WorkflowTransition } from "./IWorkflowTransition";

export interface IWorkflow {
  id: number;
  name: string;
  docType: number;
  isActive: boolean;
  workflowTransitions: WorkflowTransition[];
}