export interface WorkflowTransition {
    id: number;
    currentStatusId: number;
    currentStatus?: any;
    action: number;
    nextStatusId: number;
    nextStatus?: any;
    allowedRoleId: string;
    allowedRole?: any;
    masterId: number;
}