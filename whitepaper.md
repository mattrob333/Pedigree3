Thread title: **Pedigree White Paper: The Agent Chain of Command**

# White Paper: Pedigree as the Enterprise Chain of Command for AI Agents

## Executive Summary

Enterprises are about to have two workforces: the human workforce and the agent workforce.

The human workforce already has structure. Every employee has a manager, department, role, access profile, HR lifecycle, approval path, and audit trail. The agent workforce does not. Agents are being created inside Copilot Studio, Microsoft Agent 365, LangGraph, custom workflows, coding tools, internal automations, and emerging agent-team systems like Paperclip. These agents may touch CRM, finance, HR, code, data warehouses, email, and customer systems, but most companies cannot answer a basic question:

> **Who owns this agent?**

Pedigree should become the system of record for that answer.

The best version of Pedigree is not just an org chart. It is the **enterprise chain of command for AI agents**. It connects every agent to a human owner, business purpose, permission boundary, app-owner approval, lifecycle event, risk finding, and audit artifact.

The recommended approach is:

1. Build **Pedigree** as the enterprise meta-layer.
2. Add a plugin system that can connect to multiple agent ecosystems.
3. Treat Paperclip as inspiration and possibly an integration target.
4. Build our own Paperclip-like module later, tentatively called **Pedigree Agent Teams** or **Pedigree Workspaces**.
5. Position Pedigree as the platform that governs agent teams across the company, regardless of where those agents run.

The simple market language:

> **Paperclip gives one person an AI team. Pedigree gives the enterprise a chain of command.**

Or sharper:

> **Every agent needs a manager. Pedigree proves who it is.**

---

# 1. The Core Thesis

## The problem

AI agents are becoming workers, not just tools.

A workflow that drafts a renewal email is not just software. A LangGraph agent that cleans Salesforce forecasts is not just a script. A Copilot Studio agent that processes HR onboarding is not just automation. These systems take actions, call tools, make decisions, consume budget, and touch enterprise data.

But enterprise governance still thinks in terms of:

* Humans
* Service accounts
* Applications
* APIs
* Groups
* Roles
* Tickets

That model breaks when agents become persistent actors.

The missing object is the **accountable agent**.

Pedigree should define and govern that object.

## The new enterprise question

Old question:

> Who has access to Salesforce?

New question:

> Which agents have access to Salesforce, which humans own them, who approved them, what can they do, and what happens when the human leaves?

That is Pedigree’s wedge.

---

# 2. Market Context

Microsoft is already moving in this direction. Microsoft describes Agent 365 as a control plane for managing AI agents, with capabilities for discovery, lifecycle management, guardrails, security, audit trails, and agent inventory. Microsoft also says agents registered through Microsoft 365 channels and Entra Agent ID appear in the Agent 365 inventory, while agents built outside those environments require additional steps. ([microsoft.com][1])

Microsoft Entra Agent ID is also relevant because Microsoft describes it as an identity and security framework for AI agents that extends Entra capabilities to nonhuman identities. The docs say it is designed for authentication, authorization, governance, compliance, lifecycle management, risk detection, and audit logging for agent identities. Microsoft also notes that Entra Agent ID is currently in preview, so the ecosystem is still forming. ([Microsoft Learn][2])

This validates Pedigree’s category, but it does not eliminate the opportunity. Microsoft will be strongest inside the Microsoft estate. Pedigree can win as the cross-ecosystem accountability layer that connects Microsoft Agent 365, Copilot Studio, Paperclip-like agent teams, LangGraph, custom agents, MCP servers, service accounts, and SaaS automations.

The governance market is also moving toward formal AI risk management. NIST’s AI Risk Management Framework is intended to help organizations manage risks associated with AI systems, and its core functions include Govern, Map, Measure, and Manage. ([NIST][3]) ISO/IEC 42001 defines requirements for establishing and improving an AI management system, including responsible development and use of AI systems, traceability, transparency, and reliability. ([ISO][4])

Pedigree should align with that language:

> Govern, map, measure, and manage the agent workforce.

---

# 3. Where Paperclip Fits

Paperclip is a useful reference point because it is trying to orchestrate agent teams. Its README describes it as a Node.js server and React UI for orchestrating a team of AI agents to run a business. It includes org charts, budgets, governance, goal alignment, agent coordination, heartbeats, cost control, ticketing, audit logging, and agent hierarchy concepts. ([GitHub][5])

Paperclip’s V1 implementation spec says the product is built around a human board creating a company, defining goals, managing agents in an org tree, invoking agents through heartbeats, tracking work through tasks and comments, reporting costs, enforcing budget limits, and allowing the human board to pause or override agents. ([GitHub][6])

That is very close to a **single-human agent team runtime**.

But Pedigree is one abstraction higher.

Paperclip model:

```txt
One human/operator
→ one agent company/team
→ agents, goals, tickets, heartbeats, budgets
```

Pedigree model:

```txt
Enterprise
→ human org chart
→ each human may own one or more agent teams
→ agents across many runtimes
→ systems accessed
→ approvals
→ HR lifecycle
→ audit evidence
```

So we should not think, “Pedigree replaces Paperclip.”

We should think:

> **Pedigree governs the enterprise made up of humans who each may operate Paperclip-like agent teams.**

---

# 4. Product Definition

## Pedigree is the Agent Accountability Graph

Pedigree is a system of record and control layer for enterprise AI agents.

It should answer:

1. What agents exist?
2. Who owns each agent?
3. What business purpose does each agent serve?
4. What systems can the agent touch?
5. What actions can the agent take?
6. Who approved that access?
7. What runtime does the agent operate in?
8. What traces prove what the agent did?
9. What happens if the owning human changes roles or leaves?
10. What evidence can we show an auditor?

## Recommended category

**Agent Lineage and Accountability Platform**

Alternative category language:

* AI Agent Chain of Command
* Agent Workforce Governance
* Agent Accountability Graph
* Agent Identity and Lineage Layer
* Enterprise Agent Control Tower

My recommendation:

> **Pedigree is the Agent Lineage and Accountability Platform for the enterprise AI workforce.**

Shorter:

> **Pedigree gives every AI agent a chain of command.**

---

# 5. Who Pedigree Is For

## Primary buyers

### CISO

Needs to know:

* Which agents exist
* Which agents have risky access
* Which agents are orphaned
* Which agents can act without approval
* Which agents need containment

CISO language:

> “Show me every agent touching sensitive systems and who is accountable for it.”

### CIO / AI Platform Leader

Needs to scale AI adoption without chaos.

CIO language:

> “Let teams build agents without losing enterprise control.”

### IAM / Identity Governance Leader

Needs lifecycle, access reviews, ownership, and entitlement logic.

IAM language:

> “Treat agents like identities, not scripts.”

### GRC / Audit Leader

Needs evidence.

GRC language:

> “Prove every agent has an owner, purpose, approval trail, and review history.”

## Secondary users

### App Owners

Salesforce, ServiceNow, Snowflake, Workday, and finance system owners need to approve or deny agent access.

App owner language:

> “No agent should touch my system unless I know who owns it and why.”

### HR / IT Operations

HR and IT need agent lifecycle events tied to employee changes.

HR/IT language:

> “When Jane leaves, what agents become orphaned?”

### Business Managers

Managers need visibility into agents their teams are using.

Manager language:

> “Which agents are operating under my department?”

---

# 6. Problems Pedigree Solves

## Problem 1: Invisible agent sprawl

Agents are created in many places:

* Microsoft Agent 365
* Copilot Studio
* LangGraph
* CrewAI
* Claude Code
* Codex
* Zapier
* Make
* n8n
* GitHub Actions
* MCP servers
* internal notebooks
* custom Python services
* Paperclip-like agent teams

Each tool has its own runtime and metadata. There is no universal ownership layer.

Pedigree solves this by creating a normalized agent inventory.

## Problem 2: No human accountability

Most systems can show an app registration or service account. Fewer can show the actual accountable business owner.

Pedigree should require:

* Human sponsor
* Creator
* Technical owner
* App owner
* Manager
* Department
* Business purpose

## Problem 3: Permission ambiguity

Agents often inherit access from humans, service accounts, API keys, OAuth clients, or MCP tool scopes. The result is messy.

Pedigree should map:

```txt
Agent
→ identity
→ runtime
→ tool
→ system
→ permission
→ approval
→ human owner
```

## Problem 4: HR lifecycle gaps

When employees leave or transfer, their agents may remain active.

Pedigree should simulate and enforce lifecycle events:

```txt
Human status changes
→ owned agents identified
→ risky agents suspended or reassigned
→ app owners notified
→ audit evidence updated
```

## Problem 5: Audit evidence gaps

Agent governance needs proof, not just dashboards.

Pedigree should generate evidence packets:

* Agent inventory
* Human ownership
* Approval history
* Access scope
* Review cadence
* HR simulation results
* Risk findings
* Remediation activity
* Trace summaries

## Problem 6: Cross-runtime fragmentation

Paperclip, Microsoft Agent 365, LangGraph, and custom agents will not have the same data model.

Pedigree should not require all agents to run in one system. It should normalize all agent teams into one accountability graph.

---

# 7. The Product Architecture

Pedigree should be built as a plugin-first platform.

## Architecture overview

```txt
External Agent Ecosystems
├── Microsoft Agent 365 / Entra Agent ID
├── Copilot Studio
├── Paperclip or Paperclip-like systems
├── LangGraph / LangSmith traces
├── MCP servers
├── custom agents
├── SaaS automations
└── CSV / manual import

        ↓

Pedigree Connector Layer

        ↓

Pedigree Normalization Layer

        ↓

Pedigree Accountability Graph

        ↓

Policy, Risk, Lifecycle, and Evidence Engine

        ↓

Pedigree UI and Audit Outputs
```

## Core platform layers

### 1. Connector Layer

This layer pulls or receives data from external agent ecosystems.

Connector types:

* API connector
* Webhook connector
* CSV connector
* Trace connector
* MCP connector
* Runtime plugin
* Manual import
* Browser/demo import

### 2. Identity Normalization Layer

This maps inconsistent identity types into one model.

Examples:

```txt
Human user
Agent identity
Service principal
OAuth client
API key
Bot user
MCP client
MCP server
Paperclip agent
LangGraph run actor
Copilot Studio agent
```

### 3. Agent Workspace Layer

This is the key abstraction.

An **Agent Workspace** represents a human’s agent team, regardless of runtime.

Examples:

```txt
Jane Smith
→ Sales Ops Agent Team
→ Paperclip-style workspace
→ 3 agents
→ Salesforce access
```

```txt
Nina Brooks
→ Finance Automation Workspace
→ LangGraph workflows
→ 5 agents
→ NetSuite and Snowflake access
```

```txt
Alex Moreno
→ HR Operations Agent Team
→ Copilot Studio
→ 4 agents
→ Workday and ServiceNow access
```

### 4. Accountability Graph

This is the heart of Pedigree.

Nodes:

* Organization
* Department
* Human
* Agent Workspace
* Agent
* Agent Identity
* Runtime
* Tool
* System
* Permission
* Approval
* App Owner
* Risk Finding
* HR Event
* Trace
* Audit Packet

Edges:

* Human manages Human
* Human owns Agent Workspace
* Agent Workspace contains Agent
* Agent uses Tool
* Agent accesses System
* System owned by App Owner
* Agent requires Approval
* Agent has Identity
* Agent triggered Trace
* HR Event affects Human
* Human lifecycle affects Agent
* Finding applies to Agent
* Evidence references Event

### 5. Policy Engine

Pedigree needs a simple but extensible policy layer.

Policy questions:

* Is this agent approved?
* Is this action allowed?
* Is this system sensitive?
* Is the owner active?
* Does the agent exceed owner access?
* Is app-owner approval required?
* Is the review stale?
* Is the agent orphaned?
* Does this tool call require human confirmation?

For MVP, this can be deterministic rules.

Later, it can use:

* Open Policy Agent
* Cedar
* custom policy DSL
* Microsoft Conditional Access signals
* enterprise IAM policies

### 6. Evidence Ledger

Pedigree needs durable evidence.

Every important action should produce an event:

* Agent registered
* Owner assigned
* Approval requested
* Approval granted
* Permission changed
* Tool call denied
* Agent suspended
* HR event simulated
* Audit packet exported

Paperclip’s own design emphasizes activity and events, with mutating actions, heartbeat changes, cost events, approvals, comments, and work products recorded as durable activity. That pattern is worth borrowing for Pedigree’s evidence ledger. ([GitHub][5])

### 7. UI Layer

The UI should have two modes:

1. **Executive governance mode**

   * dashboard
   * risk findings
   * audit readiness
   * HR lifecycle simulation

2. **Graph investigation mode**

   * human org chart
   * agent workspace drilldown
   * agent lineage
   * trace viewer
   * approval path
   * evidence packet

React Flow should be the core graph UI.

---

# 8. The Plugin System

Pedigree should be designed around plugins from the beginning.

## Why plugins matter

The agent ecosystem will not consolidate quickly. Microsoft will own some agents. LangGraph will own some. Custom frameworks will own some. People will create their own private agent teams. Developers will run agents from coding tools. Business users will create agents in low-code environments.

Pedigree wins if it becomes the layer that connects to all of them.

## Plugin types

### 1. Runtime plugins

Used for agent systems that run agents directly.

Examples:

* Pedigree Agent Teams
* Paperclip connector
* LangGraph runtime connector
* custom runtime connector

### 2. Identity plugins

Used for identity and auth systems.

Examples:

* Microsoft Entra Agent ID
* Okta
* Google Workspace
* service principal discovery
* OAuth client discovery

### 3. Trace plugins

Used for observability and lineage.

Examples:

* LangSmith
* OpenTelemetry
* custom trace ingest
* MCP event logs

LangSmith is important because its docs describe tracing as end-to-end visibility into every step that ran during an LLM request, including inputs, outputs, nested spans, and tool calls. LangSmith also integrates with LangGraph for tracing Python and JavaScript agents. ([LangChain Docs][7])

OpenTelemetry is important because its GenAI semantic conventions define signals for events, metrics, model spans, and agent spans, although those conventions are still marked as development status. ([OpenTelemetry][8])

### 4. Tool and MCP plugins

Used to govern tools agents can call.

MCP matters because it is becoming a common tool interface for agents. The MCP authorization specification describes protected MCP servers as OAuth 2.1 resource servers, MCP clients as OAuth 2.1 clients, and authorization servers as the issuers of access tokens. It also requires OAuth 2.1 security measures, protected resource metadata, discovery, HTTPS, exact redirect URI validation, and PKCE protections. ([Model Context Protocol][9])

### 5. Evidence plugins

Used to export artifacts.

Examples:

* SOC 2 packet
* ISO 42001 packet
* internal audit packet
* app-owner review packet
* HR offboarding packet

### 6. UI plugins

Used to add screens or panels.

Examples:

* Microsoft Agent 365 inventory panel
* Paperclip workspace panel
* LangGraph trace panel
* MCP tool authorization panel
* Salesforce approval queue

## Plugin contract

Each plugin should implement some subset of:

```ts
type PedigreePlugin = {
  id: string;
  name: string;
  category: "runtime" | "identity" | "trace" | "tool" | "evidence" | "ui";

  connect?: () => Promise<ConnectionStatus>;
  discover?: () => Promise<DiscoveryResult>;
  normalize?: (raw: unknown) => Promise<NormalizedRecords>;
  ingestEvent?: (event: ExternalEvent) => Promise<void>;
  ingestTrace?: (trace: ExternalTrace) => Promise<void>;
  authorizeAction?: (request: AuthorizationRequest) => Promise<AuthorizationDecision>;
  exportEvidence?: (scope: EvidenceScope) => Promise<EvidenceArtifact>;
};
```

## Plugin output should normalize into this graph

```ts
type NormalizedAgentRecord = {
  externalId: string;
  runtime: string;
  workspaceId?: string;
  displayName: string;
  ownerHumanId?: string;
  creatorHumanId?: string;
  systemAccessed?: string[];
  tools?: string[];
  permissions?: string[];
  riskSignals?: RiskSignal[];
  lastSeenAt?: string;
};
```

---

# 9. Should We Build Our Own Paperclip-Like Module?

Yes, but not first as the whole product.

The right move is:

> Build Pedigree as the meta-layer first. Then build a first-party agent workspace module inside Pedigree.

Possible names:

* Pedigree Agent Teams
* Pedigree Workspaces
* Pedigree Crew
* Pedigree Runtime
* Pedigree Operators
* Pedigree Agent Desk

Avoid “Paperclip” as a name. If any code is reused from an MIT-licensed project, attribution and dependency diligence are required, and trademarks or brand identity should not be copied. The Paperclip GitHub page identifies the project as MIT licensed, but any real fork should still go through legal and dependency review. ([GitHub][5])

## What to borrow conceptually from Paperclip

Borrow patterns, not necessarily code.

Strong patterns:

* Agent org chart
* Agent roles
* Task assignment
* Goals
* Heartbeats
* Cost budgets
* Human override
* Approval gates
* Audit log
* Multi-company separation
* “Bring your own agent”
* Runtime adapters
* Portable templates

Paperclip explicitly frames itself as not being an agent framework, chatbot, workflow builder, prompt manager, or single-agent tool. It models companies with org charts, goals, budgets, and governance. That framing is close to what a Pedigree-owned agent workspace module could do for one human or one department. ([GitHub][5])

## What Pedigree’s version must add

A Pedigree-native version needs enterprise controls Paperclip is not currently optimized for:

* SSO
* RBAC
* human org hierarchy
* HRIS lifecycle sync
* app-owner approval
* system-of-record mapping
* Entra Agent ID linking
* least-privilege policy
* audit evidence packets
* cross-workspace risk
* compliance mapping
* data classification
* enterprise secrets governance

## Product structure

Pedigree should have:

```txt
Pedigree Core
→ accountability graph
→ policies
→ audit ledger
→ approvals
→ lifecycle
→ connectors

Pedigree Agent Teams
→ optional first-party runtime for human-owned agent teams
→ goals, tasks, heartbeats, budgets, approvals
→ fully wired into Pedigree Core
```

This keeps the platform bigger than the runtime.

---

# 10. How the System Should Work

## Step 1: Discover

Pedigree discovers agents from multiple sources.

Example sources:

* Microsoft Agent 365
* Entra Agent ID
* Copilot Studio
* Paperclip connector
* LangGraph traces
* LangSmith
* MCP server registry
* GitHub Actions
* Zapier / Make / n8n
* internal APIs
* CSV import

Output:

```txt
42 agents discovered
31 mapped to human owners
11 orphaned
7 high-risk
3 pending app-owner approvals
```

## Step 2: Normalize

Pedigree maps raw data into standard objects.

Example:

```txt
Raw LangGraph trace
→ agent run
→ tool call
→ Salesforce action
→ owner Jane Smith
→ workspace Sales Ops Agent Team
→ risk finding: export scope exceeds approved access
```

## Step 3: Assign ownership

Every agent must have:

* human sponsor
* creator
* technical owner
* app owner if touching a business system
* department
* business purpose

## Step 4: Map permissions

For every agent, Pedigree records:

* systems accessed
* tools used
* scopes
* secrets
* service accounts
* OAuth clients
* API keys
* app registrations
* MCP servers
* data classification

## Step 5: Score risk

Pedigree scores:

* orphaned agents
* over-permissioned agents
* stale reviews
* missing approvals
* active agents owned by inactive humans
* agents touching sensitive systems
* agents using risky skills or tools

OWASP’s Agentic Skills Top 10 project highlights that agentic skills are the execution layer that gives agents real-world impact, and its quick checklist includes maintaining inventory, approval workflows, audit logging, isolation, network restrictions, and monitoring. That maps directly to Pedigree’s risk model. ([OWASP][10])

## Step 6: Route approval

Example:

```txt
Forecast Cleanup Agent wants Salesforce export access
→ owner: Jane Smith
→ system: Salesforce
→ app owner: Omar Patel
→ risk: high
→ action: route approval
```

## Step 7: Monitor traces

Pedigree ingests traces from LangGraph, LangSmith, OpenTelemetry, MCP logs, or first-party runtime events.

It should not store every raw trace forever by default. It should store:

* trace summary
* tool call metadata
* actor identity
* system touched
* decision
* policy result
* evidence pointer
* sensitive payload redaction status

## Step 8: Simulate HR lifecycle

Example:

```txt
Jane Smith is terminating
→ owns Sales Ops Agent Team
→ 3 active agents impacted
→ 1 high-risk agent needs suspension
→ 2 agents need reassignment
→ Salesforce app owner notified
→ audit packet updated
```

## Step 9: Export evidence

The output is an audit packet.

Sections:

* executive summary
* agent inventory
* human ownership map
* agent workspace map
* system access map
* approval history
* HR lifecycle simulation
* high-risk findings
* remediation actions
* trace evidence
* policy decisions

---

# 11. Example Scenario

## Scenario: Jane Smith and her Sales Ops Agent Team

Jane Smith is a Sales Operations Manager.

She runs a Paperclip-like agent workspace called:

```txt
Sales Ops Agent Team
```

Her agents:

1. Renewal Email Agent
2. Forecast Cleanup Agent
3. Quote Review Agent

The Forecast Cleanup Agent runs in LangGraph and touches Salesforce.

Pedigree sees:

```txt
Human: Jane Smith
Department: Revenue
Manager: Marcus Reed
Workspace: Sales Ops Agent Team
Runtime: LangGraph
Agent: Forecast Cleanup Agent
System: Salesforce
Action: export forecast data
Risk: high
App owner: Omar Patel
Approval: pending
```

Pedigree generates a finding:

```txt
High risk: Forecast Cleanup Agent exceeds Jane Smith’s approved Salesforce export scope.
Recommended action: suspend export scope and route approval to Omar Patel.
```

Then HR marks Jane as leaving.

Pedigree simulates:

```txt
3 active agents affected
1 high-risk agent requires suspension
2 agents require reassignment
1 app-owner approval still pending
```

The audit packet shows:

```txt
Who owned it
What it touched
Who approved it
What risk was found
What remediation happened
What traces prove the agent’s activity
```

That is the product.

---

# 12. Technical Architecture for MVP and Beyond

## MVP version

The MVP should be frontend-heavy but structured correctly.

Core stack:

* React
* TypeScript
* Vite or Next.js
* React Flow
* Tailwind
* local demo data
* CSV upload
* localStorage
* fake connectors
* fake audit export

MVP screens:

1. Risk Dashboard
2. Agent Org Chart
3. Human Detail View
4. Agent Workspace View
5. Risk Findings
6. HR Simulation
7. App Owner Approvals
8. Audit Packet
9. Integrations
10. CSV Import

MVP data sources:

* demo JSON
* CSV upload
* fake Microsoft Agent 365 connector
* fake Paperclip connector
* fake LangGraph trace connector

## Beta version

Move to backend.

Suggested stack:

* Next.js or React frontend
* Node/TypeScript backend
* Postgres
* Prisma or Drizzle
* Auth.js, Clerk, WorkOS, or enterprise SSO path
* durable audit event table
* graph stored in relational model first
* optional graph DB later
* background jobs for sync
* connector framework

## Enterprise version

Add:

* tenant isolation
* RBAC
* SSO/SAML/OIDC
* SCIM
* SIEM export
* audit logs
* access reviews
* policy engine
* runtime authorization gateway
* Microsoft Graph integration
* Entra Agent ID integration
* MCP authorization gateway
* LangSmith/OpenTelemetry trace ingest
* Paperclip connector
* Pedigree Agent Teams runtime

---

# 13. Runtime Authorization Layer

This is the long-term moat.

Pedigree should eventually move from:

```txt
observe and report
```

to:

```txt
authorize and enforce
```

## Runtime flow

```txt
Agent wants to perform action
→ agent calls tool through Pedigree Gateway
→ Pedigree identifies agent
→ Pedigree checks owner, approval, policy, system, data class
→ decision: allow, deny, require approval, log only
→ evidence stored
```

Example API:

```http
POST /v1/authorize-action
```

Request:

```json
{
  "agentId": "agent_forecast_cleanup",
  "workspaceId": "workspace_sales_ops",
  "ownerHumanId": "human_jane_smith",
  "targetSystem": "salesforce",
  "action": "export",
  "dataClass": "confidential",
  "purpose": "forecast_cleanup"
}
```

Response:

```json
{
  "decision": "require_approval",
  "reason": "Salesforce export scope requires app-owner approval.",
  "requiredApprover": {
    "humanId": "human_omar_patel",
    "role": "Salesforce App Owner"
  }
}
```

This makes Pedigree much more than a dashboard.

---

# 14. Positioning and Marketing

## Core positioning

> **Pedigree is the chain of command for enterprise AI agents.**

Expanded:

> Pedigree maps every AI agent to a human owner, business purpose, permission boundary, app-owner approval, lifecycle event, and audit trail, across every agent runtime in the enterprise.

## Simple tagline options

1. **Every agent needs a manager.**
2. **The org chart for your AI workforce.**
3. **The chain of command for AI agents.**
4. **See who owns every agent.**
5. **From agent sprawl to audit-ready accountability.**
6. **Govern the agent workforce before it governs you.**
7. **Agent runtime is the cockpit. Pedigree is air traffic control.**
8. **See, assign, approve, and prove every AI agent.**

## Best one-liner

> **Pedigree gives every enterprise AI agent a human chain of command.**

## Microsoft positioning

Do not compete head-on with Microsoft Agent 365.

Say:

> **Agent 365 gives Microsoft-native agents identity. Pedigree gives every agent, Microsoft or not, business accountability.**

Or:

> **Pedigree connects Agent 365, Paperclip-like workspaces, LangGraph traces, and custom agents into one accountable lineage graph.**

## Paperclip positioning

Do not say Pedigree is Paperclip.

Say:

> **Paperclip helps one person run an agent team. Pedigree helps the enterprise govern every person’s agent team.**

Or:

> **Paperclip is the agent cockpit. Pedigree is enterprise air traffic control.**

## Compliance positioning

> **Pedigree helps companies operationalize AI governance by mapping agent ownership, risk, lifecycle, and evidence.**

This maps well to NIST and ISO language without pretending Pedigree alone makes a company compliant.

---

# 15. Product Packaging

## Package 1: Agent Lineage Assessment

This is the wedge.

Duration:

```txt
2 weeks
```

Deliverables:

* agent inventory
* owner map
* orphaned agent report
* high-risk access report
* HR lifecycle simulation
* app-owner approval map
* audit evidence packet
* executive risk summary

Target buyers:

* CISO
* CIO
* IAM
* AI Platform
* GRC

## Package 2: Pedigree Core

Core platform:

* agent inventory
* human org chart
* agent workspace map
* risk dashboard
* approvals
* lifecycle simulation
* audit packet

## Package 3: Pedigree Connectors

Paid connectors:

* Microsoft Agent 365
* Entra Agent ID
* Copilot Studio
* LangSmith
* OpenTelemetry
* MCP
* Paperclip
* Salesforce
* ServiceNow
* Workday
* Snowflake

## Package 4: Pedigree Gateway

Runtime authorization:

* policy checks
* action approval
* tool-call enforcement
* audit event logging
* temporary access grants
* agent suspension

## Package 5: Pedigree Agent Teams

First-party Paperclip-like module:

* agent teams
* tasks
* goals
* heartbeats
* budgets
* approvals
* runtime events
* fully wired into Pedigree Core

---

# 16. Competitive Differentiation

## Versus IAM

IAM governs identity and access.

Pedigree governs agent accountability.

IAM asks:

```txt
Who can access this?
```

Pedigree asks:

```txt
Which agent can access this, why, under whose authority, and with what evidence?
```

## Versus Microsoft Agent 365

Microsoft governs Microsoft-connected agents extremely well.

Pedigree governs cross-ecosystem accountability.

Microsoft-native agents are one source. Pedigree’s job is to normalize the whole enterprise.

## Versus observability tools

Observability tools show what happened.

Pedigree shows:

```txt
who owned it
who approved it
whether it was allowed
what risk it created
what evidence proves it
```

## Versus Paperclip

Paperclip organizes agent work.

Pedigree governs agent accountability across the company.

## Versus GRC tools

GRC tools manage controls.

Pedigree generates the operational evidence behind those controls.

---

# 17. MVP Build Priorities

## Priority 1: Nail the story

The demo should show:

```txt
We found agents.
Some have no owner.
Some touch sensitive systems.
Some belong to employees who are leaving.
Pedigree maps them, routes approvals, and exports evidence.
```

## Priority 2: React Flow graph

The graph must be beautiful and understandable.

Show:

```txt
Human org chart
→ agent workspace
→ agents
→ systems
→ approvals
→ orphaned lane
```

## Priority 3: CSV upload

This lets you demo live.

Upload:

```csv
type,id,name,role,department,managerId,workspaceId,ownerId,platform,systemAccessed,riskLevel,approvalStatus,status
human,h_001,Evelyn Carter,CIO,Technology,,,,,,,active
human,h_002,Marcus Reed,VP Revenue Operations,Revenue,h_001,,,,,,active
human,h_003,Jane Smith,Sales Operations Manager,Revenue,h_002,,,,,,terminating
workspace,w_001,Sales Ops Agent Team,,Revenue,,h_003,,,,active
agent,a_001,Forecast Cleanup Agent,,Revenue,,w_001,h_003,LangGraph,Salesforce,high,pending,active
agent,a_002,Renewal Email Agent,,Revenue,,w_001,h_003,Copilot Studio,Salesforce,medium,approved,active
agent,a_003,Legacy Data Cleanup,,Data,,,,Internal Builder,Snowflake,critical,missing,active
```

## Priority 4: Fake connectors

Show these as demo-connected:

* Microsoft Agent 365
* Entra Agent ID
* LangGraph traces
* Paperclip workspace
* MCP servers
* CSV import

## Priority 5: Audit packet

The audit packet is the buyer artifact.

It should look like something a CISO can send to an auditor.

---

# 18. The Big Strategic Choice

There are two paths:

## Path A: Build Pedigree as a Paperclip fork

Pros:

* Faster runtime start
* Existing patterns
* existing task/agent/governance concepts

Cons:

* You inherit another architecture
* You may get trapped in the “agent company” metaphor
* You may become a runtime product instead of an enterprise governance product
* You will need major changes for SSO, RBAC, HRIS, app-owner approvals, identity lifecycle, and compliance evidence

## Path B: Build Pedigree as the platform, then add a Paperclip-like module

Pros:

* Cleaner enterprise positioning
* Better long-term category
* Easier to support multiple ecosystems
* Avoids runtime lock-in
* Lets Pedigree govern Microsoft, LangGraph, Paperclip, custom agents, and first-party workspaces

Cons:

* More upfront architecture thinking
* Need to build more yourself
* Runtime module comes later

## Recommendation

Choose Path B.

Build Pedigree as the meta-layer. Then build a first-party agent workspace module that borrows the best Paperclip ideas.

The platform should be bigger than any one runtime.

---

# 19. Suggested Product Language

## Homepage headline

> **Every AI agent needs a manager.**

## Subheadline

> Pedigree maps every enterprise AI agent to a human owner, business purpose, permission boundary, approval path, lifecycle event, and audit trail.

## Category statement

> **The Agent Lineage and Accountability Platform for the enterprise AI workforce.**

## Problem statement

> Your company has an org chart for humans. It does not have one for agents.

## Value proposition

> Pedigree shows who owns every agent, what it can touch, who approved it, and what happens when the owner leaves.

## CTA

> Run an Agent Lineage Assessment

## Enterprise positioning

> Built for security, identity, AI platform, and audit teams that need to govern agents across Microsoft Agent 365, LangGraph, Paperclip-like workspaces, MCP servers, and custom automations.

---

# 20. Final Recommendation

Pedigree should become the **enterprise meta-system for agent accountability**.

Do not make it a clone of Paperclip. Do not make it only a Microsoft Agent 365 add-on. Do not make it only an observability tool. Do not make it only an org chart.

Make it this:

> **The system that connects humans, agents, tools, permissions, approvals, lifecycle events, and audit evidence into one chain of command.**

The winning architecture:

```txt
Pedigree Core
→ accountability graph
→ policy engine
→ approval engine
→ lifecycle engine
→ evidence ledger
→ plugin system

Pedigree Connectors
→ Microsoft Agent 365
→ Entra Agent ID
→ LangGraph / LangSmith
→ OpenTelemetry
→ MCP
→ Paperclip
→ custom agents
→ CSV

Pedigree Agent Teams
→ optional first-party agent workspace
→ goals
→ tasks
→ heartbeats
→ budgets
→ approvals
→ fully governed by Pedigree Core
```

The winning language:

> **Paperclip gives one person an AI staff. Pedigree gives the company a chain of command.**

The winning wedge:

> **Two-week Agent Lineage Assessment. Find the agents, map the owners, flag the risk, export the evidence.**

Key takeaway: **build Pedigree as the platform first, then build your own Paperclip-like workspace as one governed runtime inside it.**

[1]: https://www.microsoft.com/en-us/microsoft-agent-365 "Microsoft Agent 365: The Control Plane for Agents"
[2]: https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id "What is Microsoft Entra Agent ID? - Microsoft Entra Agent ID | Microsoft Learn"
[3]: https://www.nist.gov/itl/ai-risk-management-framework "AI Risk Management Framework | NIST"
[4]: https://www.iso.org/standard/42001 "ISO/IEC 42001:2023 - AI management systems"
[5]: https://github.com/paperclipai/paperclip "GitHub - paperclipai/paperclip: Open-source orchestration for zero-human companies · GitHub"
[6]: https://github.com/paperclipai/paperclip/blob/master/doc/SPEC-implementation.md "paperclip/doc/SPEC-implementation.md at master · paperclipai/paperclip · GitHub"
[7]: https://docs.langchain.com/langsmith/observability-quickstart "Tracing quickstart - Docs by LangChain"
[8]: https://opentelemetry.io/docs/specs/semconv/gen-ai/ "Semantic conventions for generative AI systems | OpenTelemetry"
[9]: https://modelcontextprotocol.io/specification/draft/basic/authorization "Authorization - Model Context Protocol"
[10]: https://owasp.org/www-project-agentic-skills-top-10/ "OWASP Agentic Skills Top 10 | OWASP Foundation"
