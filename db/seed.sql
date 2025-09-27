-- Seed file for policies

INSERT INTO policies (id, name, type, description, status, priority, rules, created_at, updated_at, created_by)
VALUES
('sec-001', 'Admin Access Policy', 'security', 'Allows admin users to access restricted endpoints.', 'active', 'high', '[{"id":"r1","condition":"user.role === \'admin\'","action":"allow","enabled":true}]', now(), now(), 'system@cybersecurity'),
('fw-002', 'Default Firewall Rule', 'firewall', 'Block all inbound by default.', 'draft', 'medium', '[]', now(), now(), 'system@cybersecurity')
ON CONFLICT (id) DO NOTHING;
