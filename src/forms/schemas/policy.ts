import { z } from "zod";

export const policyTypeSchema = z.enum([
  "security",
  "firewall",
  "access",
  "backup",
  "compliance",
]);

export const policyStatusSchema = z.enum(["active", "inactive", "draft"]);

export const policyPrioritySchema = z.enum([
  "low",
  "medium",
  "high",
  "critical",
]);

export const policyRuleActionSchema = z.enum([
  "allow",
  "deny",
  "enforce",
  "require_mfa",
  "backup",
  "archive",
  "delete",
  "encrypt",
  "retain",
]);

export const policyRuleSchema = z.object({
  id: z.string().min(1),
  condition: z.string().min(3),
  action: policyRuleActionSchema,
  enabled: z.boolean(),
});

export const policyFormSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(100)
    .regex(/^[a-zA-Z0-9\s\-_]+$/),
  type: policyTypeSchema,
  description: z.string().min(10).max(500),
  status: policyStatusSchema,
  priority: policyPrioritySchema,
  enabled: z.boolean(),
  rules: z.array(policyRuleSchema).min(1).max(20),
});

export const createPolicySchema = policyFormSchema
  .omit({ enabled: true })
  .extend({
    createdBy: z.string().email(),
  });

export const updatePolicySchema = policyFormSchema.partial().extend({
  id: z.string().min(1),
});

export type PolicyFormData = z.infer<typeof policyFormSchema>;
export type CreatePolicyData = z.infer<typeof createPolicySchema>;
export type UpdatePolicyData = z.infer<typeof updatePolicySchema>;
export type PolicyRule = z.infer<typeof policyRuleSchema>;
export type PolicyType = z.infer<typeof policyTypeSchema>;
export type PolicyStatus = z.infer<typeof policyStatusSchema>;
export type PolicyPriority = z.infer<typeof policyPrioritySchema>;
export type PolicyRuleAction = z.infer<typeof policyRuleActionSchema>;
