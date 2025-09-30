import type { Policy } from "../../types";

export { type Policy };

export const mockPolicies: Policy[] = [
  {
    id: "sec-001",
    name: "Password Policy",
    type: "security",
    description:
      "Enforces strong password requirements across all systems mock",
    status: "active",
    priority: "high",
    createdAt: "2025-09-01T10:00:00Z",
    updatedAt: "2025-09-14T15:30:00Z",
    createdBy: "admin@cybero.com",
    rules: [
      {
        id: "rule-001",
        condition: "password.length >= 12",
        action: "enforce",
        enabled: true,
      },
      {
        id: "rule-002",
        condition: "password.complexity >= 3",
        action: "enforce",
        enabled: true,
      },
    ],
  },
  {
    id: "sec-002",
    name: "Multi-Factor Authentication",
    type: "security",
    description: "Requires MFA for all administrative accounts",
    status: "active",
    priority: "critical",
    createdAt: "2025-08-15T09:00:00Z",
    updatedAt: "2025-09-10T11:20:00Z",
    createdBy: "security@cybero.com",
    rules: [
      {
        id: "rule-003",
        condition: 'user.role === "admin"',
        action: "require_mfa",
        enabled: true,
      },
    ],
  },

  {
    id: "fw-001",
    name: "Web Traffic Filter",
    type: "firewall",
    description: "Controls incoming web traffic and blocks suspicious requests",
    status: "active",
    priority: "high",
    createdAt: "2025-09-05T14:00:00Z",
    updatedAt: "2025-09-12T16:45:00Z",
    createdBy: "network@cybero.com",
    rules: [
      {
        id: "rule-004",
        condition: "port === 80 || port === 443",
        action: "allow",
        enabled: true,
      },
      {
        id: "rule-005",
        condition: 'source.country === "blacklisted"',
        action: "deny",
        enabled: true,
      },
    ],
  },
  {
    id: "fw-002",
    name: "Internal Network Access",
    type: "firewall",
    description: "Manages access between internal network segments",
    status: "active",
    priority: "medium",
    createdAt: "2025-08-20T12:30:00Z",
    updatedAt: "2025-09-08T10:15:00Z",
    createdBy: "network@cybero.com",
    rules: [
      {
        id: "rule-006",
        condition: 'source.subnet === "192.168.1.0/24"',
        action: "allow",
        enabled: true,
      },
    ],
  },

  {
    id: "acc-001",
    name: "Database Access Control",
    type: "access",
    description: "Controls access to production databases",
    status: "active",
    priority: "critical",
    createdAt: "2025-09-02T08:00:00Z",
    updatedAt: "2025-09-13T14:20:00Z",
    createdBy: "dba@cybero.com",
    rules: [
      {
        id: "rule-007",
        condition: 'user.department === "engineering"',
        action: "allow",
        enabled: true,
      },
      {
        id: "rule-008",
        condition: 'user.role === "dba"',
        action: "allow",
        enabled: true,
      },
    ],
  },
  {
    id: "acc-002",
    name: "File Share Permissions",
    type: "access",
    description: "Manages access to shared file systems",
    status: "draft",
    priority: "medium",
    createdAt: "2025-09-10T16:00:00Z",
    updatedAt: "2025-09-14T12:00:00Z",
    createdBy: "it@cybero.com",
    rules: [
      {
        id: "rule-009",
        condition: 'user.team === "project-alpha"',
        action: "allow",
        enabled: false,
      },
    ],
  },

  {
    id: "bak-001",
    name: "Daily Database Backup",
    type: "backup",
    description: "Automated daily backup of all production databases",
    status: "active",
    priority: "high",
    createdAt: "2025-08-25T07:00:00Z",
    updatedAt: "2025-09-11T09:30:00Z",
    createdBy: "backup@cybero.com",
    rules: [
      {
        id: "rule-010",
        condition: 'time === "02:00"',
        action: "backup",
        enabled: true,
      },
      {
        id: "rule-011",
        condition: "retention > 30_days",
        action: "archive",
        enabled: true,
      },
    ],
  },

  {
    id: "comp-001",
    name: "Data Retention Policy",
    type: "compliance",
    description: "Ensures compliance with data retention regulations",
    status: "active",
    priority: "high",
    createdAt: "2025-08-30T13:00:00Z",
    updatedAt: "2025-09-09T11:45:00Z",
    createdBy: "compliance@cybero.com",
    rules: [
      {
        id: "rule-012",
        condition: 'data.type === "personal"',
        action: "encrypt",
        enabled: true,
      },
      {
        id: "rule-013",
        condition: "data.age > 7_years",
        action: "delete",
        enabled: true,
      },
    ],
  },
  {
    id: "comp-002",
    name: "Audit Log Retention",
    type: "compliance",
    description: "Maintains audit logs for regulatory compliance",
    status: "inactive",
    priority: "medium",
    createdAt: "2025-09-03T11:00:00Z",
    updatedAt: "2025-09-14T08:15:00Z",
    createdBy: "audit@cybero.com",
    rules: [
      {
        id: "rule-014",
        condition: 'log.type === "security_event"',
        action: "retain",
        enabled: false,
      },
    ],
  },
];
