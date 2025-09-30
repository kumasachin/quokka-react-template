import { policyHandlers } from "./policies";
import { systemHandlers } from "./system";

export const handlers = [...policyHandlers, ...systemHandlers];
