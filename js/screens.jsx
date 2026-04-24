// Pedigree demo screens
const { useState: uS, useEffect: uE, useMemo: uM, useRef: uR } = React;

// ============ ORG CHART SCREEN ============
const OrgChartScreen = ({ revealed, setRevealed, onSelectHuman, onSelectAgent, selHuman, selAgent, suspendedAgents, dataVersion }) => {
  const RF = window.ReactFlow;
  const dagre = window.dagre;
  const humans = D.humans;
  const agents = D.agents;
  const humanMap = Object.fromEntries(humans.map(h => [h.id, h]));
  const appOwnerIds = new Set(Object.values(D.appOwners || {}));

  const buildGraph = React.useMemo(() => {
    if (!RF || !dagre) return { nodes: [], edges: [] };

    const HUMAN_W = 250;
    const HUMAN_H = 88;
    const AGENT_W = 245;
    const AGENT_H = 72;
    const GAP_X = 40;       // horizontal gap between human and its agent column
    const GAP_Y = 14;       // vertical gap between stacked agents
    const OFFSET_DOWN = 24; // how far below the human's top-edge the first agent starts

    // Pre-bucket agents so we can widen dagre slots for humans that own agents
    const ownedAgentsByHuman = {};
    const orphans = [];
    if (revealed) {
      agents.forEach((a) => {
        if (!a.parent || !humanMap[a.parent]) orphans.push(a);
        else {
          if (!ownedAgentsByHuman[a.parent]) ownedAgentsByHuman[a.parent] = [];
          ownedAgentsByHuman[a.parent].push(a);
        }
      });
    }

    // Compute the slot (layout) dimensions each human should occupy in dagre.
    // Humans with agents reserve space for an agent column to the right,
    // and enough height for the full column so the next rank doesn't collide.
    const slotSizeFor = (h) => {
      const agentCount = (ownedAgentsByHuman[h.id] || []).length;
      if (!agentCount) return { width: HUMAN_W, height: HUMAN_H };
      const columnHeight = OFFSET_DOWN + agentCount * AGENT_H + (agentCount - 1) * GAP_Y;
      const slotHeight = Math.max(HUMAN_H, HUMAN_H / 2 + columnHeight) + 20; // +20 breathing room
      const slotWidth = HUMAN_W + GAP_X + AGENT_W;
      return { width: slotWidth, height: slotHeight };
    };

    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'TB', nodesep: 40, ranksep: 60, marginx: 40, marginy: 30 });
    g.setDefaultEdgeLabel(() => ({}));

    const nodes = [];
    const edges = [];
    const slotByHuman = {};

    humans.forEach((h) => {
      const type = appOwnerIds.has(h.id) ? 'appOwner' : 'human';
      const n = {
        id: h.id,
        type,
        data: { ...h, kind: type, selected: selHuman === h.id },
        position: { x: 0, y: 0 },
        width: HUMAN_W,
        height: HUMAN_H,
        sourcePosition: RF.Position.Bottom,
        targetPosition: RF.Position.Top
      };
      nodes.push(n);
      const slot = slotSizeFor(h);
      slotByHuman[h.id] = slot;
      g.setNode(n.id, { width: slot.width, height: slot.height });
      if (h.manager && humanMap[h.manager]) {
        g.setEdge(h.manager, h.id);
        edges.push({
          id: `mgr-${h.manager}-${h.id}`,
          source: h.manager,
          target: h.id,
          type: 'smoothstep',
          style: { stroke: '#64748B', strokeWidth: 2 }
        });
      }
    });

    dagre.layout(g);
    const humanNodes = {};
    nodes.forEach((n) => {
      const p = g.node(n.id);
      const slot = slotByHuman[n.id] || { width: HUMAN_W, height: HUMAN_H };
      if (p) {
        // Anchor the human at the TOP-LEFT of its (possibly extra-wide) slot.
        // This leaves the right side of the slot free for the agent column.
        const slotLeft = p.x - slot.width / 2;
        const slotTop = p.y - slot.height / 2;
        n.position = { x: slotLeft, y: slotTop };
      }
      humanNodes[n.id] = n;
    });

    if (revealed) {
      // Place each human's agents in a vertical column to the RIGHT of the human,
      // starting slightly below the human's top edge.
      Object.entries(ownedAgentsByHuman).forEach(([ownerId, ownerAgents]) => {
        const ownerNode = humanNodes[ownerId];
        if (!ownerNode) return;
        const columnX = ownerNode.position.x + HUMAN_W + GAP_X;
        const columnStartY = ownerNode.position.y + OFFSET_DOWN;
        ownerAgents.forEach((a, i) => {
          const ay = columnStartY + i * (AGENT_H + GAP_Y);
          nodes.push({
            id: a.id,
            type: 'agent',
            data: { ...a, selected: selAgent === a.id, suspended: suspendedAgents.includes(a.id) },
            position: { x: columnX, y: ay },
            width: AGENT_W,
            height: AGENT_H,
            sourcePosition: RF.Position.Right,
            targetPosition: RF.Position.Left
          });
          edges.push({
            id: `own-${ownerId}-${a.id}`,
            source: ownerId,
            sourceHandle: 'r',
            target: a.id,
            targetHandle: 'l',
            type: 'smoothstep',
            style: { stroke: '#7C3AED', strokeDasharray: '6 4', strokeWidth: 2 }
          });

          // App-dependency edges only when a node is selected (keeps default view clean)
          const appOwnerId = (a.apps || []).map(app => D.appOwners?.[app]).find(Boolean);
          const shouldShowAppDependency = (selAgent === a.id) || (selHuman === ownerId) || (selHuman === appOwnerId);
          if (shouldShowAppDependency && appOwnerId && humanMap[appOwnerId]) {
            edges.push({
              id: `app-${a.id}-${appOwnerId}`,
              source: a.id,
              target: appOwnerId,
              type: 'bezier',
              animated: a.risk === 'critical' || a.risk === 'high',
              style: { stroke: '#EA580C', strokeDasharray: '3 5', strokeWidth: 1.5 }
            });
          }
        });
      });

      // Orphan lane: a labeled container, no fanout edges (those created the red crisscross)
      const maxY = Math.max(...nodes.map(n => n.position.y + (n.height || 0)), 0);
      const minX = Math.min(...nodes.map(n => n.position.x), 0);
      const orphanStartY = maxY + 80;
      const orphanCols = 4;
      const orphanRows = Math.max(1, Math.ceil(orphans.length / orphanCols));
      if (orphans.length) {
        nodes.push({
          id: 'orphan-lane',
          type: 'orphanLane',
          data: { count: orphans.length },
          position: { x: minX - 24, y: orphanStartY - 54 },
          width: (orphanCols * AGENT_W) + ((orphanCols - 1) * 16) + 48,
          height: (orphanRows * AGENT_H) + ((orphanRows - 1) * 16) + 86,
          draggable: false,
          selectable: false,
          zIndex: -1
        });
      }
      orphans.forEach((a, i) => {
        const row = Math.floor(i / orphanCols);
        const col = i % orphanCols;
        nodes.push({
          id: a.id,
          type: 'orphanAgent',
          data: { ...a, orphan: true, selected: selAgent === a.id },
          position: { x: minX + col * (AGENT_W + 16), y: orphanStartY + row * (AGENT_H + 16) },
          width: AGENT_W,
          height: AGENT_H,
          sourcePosition: RF.Position.Bottom,
          targetPosition: RF.Position.Top
        });
      });
    }
    return { nodes, edges };
  }, [revealed, selHuman, selAgent, suspendedAgents, dataVersion]);

  // Stateful nodes/edges so users can drag nodes and have them stay put
  const [rfNodes, setRfNodes, onNodesChange] = RF.useNodesState([]);
  const [rfEdges, setRfEdges, onEdgesChange] = RF.useEdgesState([]);
  React.useEffect(() => {
    setRfNodes(buildGraph.nodes);
    setRfEdges(buildGraph.edges);
  }, [buildGraph, setRfNodes, setRfEdges]);

  const nodeTypes = React.useMemo(() => ({
    human: ({ data }) => <div className={`rf-node human ${data.selected ? 'selected' : ''}`} onClick={() => onSelectHuman(data.id)}><RF.Handle type="target" position={RF.Position.Top} className="rf-handle" /><RF.Handle type="target" id="l" position={RF.Position.Left} className="rf-handle" /><div className="rf-title">{data.name}</div><div className="rf-sub">{data.role}</div><div className="rf-meta"><span>{data.dept}</span><span>{agents.filter(a => a.parent === data.id).length} agents</span></div><RF.Handle type="source" position={RF.Position.Bottom} className="rf-handle" /><RF.Handle type="source" id="r" position={RF.Position.Right} className="rf-handle" /></div>,
    appOwner: ({ data }) => <div className={`rf-node appowner ${data.selected ? 'selected' : ''}`} onClick={() => onSelectHuman(data.id)}><RF.Handle type="target" position={RF.Position.Top} className="rf-handle" /><RF.Handle type="target" id="l" position={RF.Position.Left} className="rf-handle" /><div className="rf-title">{data.name}</div><div className="rf-sub">{data.role}</div><div className="rf-meta"><span>App owner</span><span>{agents.filter(a => (a.apps || []).some(app => D.appOwners?.[app] === data.id)).length} approvals</span></div><RF.Handle type="source" position={RF.Position.Bottom} className="rf-handle" /><RF.Handle type="source" id="r" position={RF.Position.Right} className="rf-handle" /></div>,
    agent: ({ data }) => <div className={`rf-node agent risk-${data.risk} ${data.selected ? 'selected' : ''} ${data.suspended ? 'suspended' : ''}`} onClick={() => onSelectAgent(data.id)}><RF.Handle type="target" position={RF.Position.Top} className="rf-handle" /><RF.Handle type="target" id="l" position={RF.Position.Left} className="rf-handle" /><div className="rf-title">{data.name}</div><div className="rf-sub">{data.platform} · {(data.apps || []).join(', ') || 'No app'}</div><div className="rf-meta"><span>{data.approval}</span><span className={`chip risk-${data.risk}`}>{data.risk}</span></div><RF.Handle type="source" position={RF.Position.Bottom} className="rf-handle" /><RF.Handle type="source" id="r" position={RF.Position.Right} className="rf-handle" /></div>,
    orphanAgent: ({ data }) => <div className={`rf-node orphan risk-${data.risk} ${data.selected ? 'selected' : ''}`} onClick={() => onSelectAgent(data.id)}><RF.Handle type="target" position={RF.Position.Top} className="rf-handle" /><div className="rf-title">{data.name}</div><div className="rf-sub">{data.platform} · {(data.apps || []).join(', ') || 'Unknown system'}</div><div className="rf-meta"><span>No sponsor</span><span className={`chip risk-${data.risk}`}>{data.risk}</span></div><RF.Handle type="source" position={RF.Position.Bottom} className="rf-handle" /></div>,
    orphanLane: ({ data }) => <div className="orphan-lane-node"><div className="lane-title">Orphaned Agent Lane</div><div className="lane-sub">{data.count} agents with no sponsor</div><RF.Handle type="source" position={RF.Position.Bottom} className="rf-handle" /></div>,
  }), [onSelectHuman, onSelectAgent, selHuman, selAgent, suspendedAgents, dataVersion]);

  if (!RF) return <div className="page"><div className="card" style={{padding:20}}>React Flow failed to load.</div></div>;

  return (
    <div className="orgchart-wrap scroll">
      <div className="reveal-banner">
        <div className="stat"><strong>{D.stats.mapped}</strong><span>agents mapped</span></div>
        <div className="divider"/><div className="stat"><strong style={{color:'var(--risk-critical)'}}>{D.stats.highRisk}</strong><span>high-risk agents</span></div>
        <div className="divider"/><div className="stat"><strong>{D.stats.orphaned}</strong><span>orphaned agents</span></div>
        <button className={`btn reveal-btn ${revealed ? 'btn-ghost' : 'btn-accent'}`} onClick={() => setRevealed(!revealed)}>{revealed ? 'Hide Agent Workforce' : 'Reveal Agent Workforce'} →</button>
      </div>
      <div className="orgchart rf-wrapper">
        <div className="org-title">Tiered lineage map · humans, agents, app approvals, orphan lane</div>
        <RF.ReactFlow
          nodes={rfNodes}
          edges={rfEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={true}
          nodesConnectable={false}
          minZoom={0.2}
          maxZoom={2}
        >
          <RF.Background gap={24} size={1} color="#e2e8f0" />
          <RF.Controls position="bottom-left" showInteractive={false} />
          <RF.MiniMap pannable zoomable nodeColor={(n) => n.type === 'orphanAgent' ? '#dc2626' : n.type === 'agent' ? '#7c3aed' : n.type === 'orphanLane' ? 'transparent' : '#334155'} />
          <RF.Panel position="top-right" className="chart-legend">
            <div className="legend-title">Legend</div>
            <div className="legend-row"><span className="legend-line" style={{ background: '#64748B' }} />Reports to (manager)</div>
            <div className="legend-row"><span className="legend-line dashed" style={{ color: '#7C3AED' }} />Owns agent</div>
            <div className="legend-row"><span className="legend-line dashed" style={{ color: '#EA580C' }} />App dependency <em>(click a node)</em></div>
            <div className="legend-row"><span className="legend-swatch" style={{ background: 'rgba(254,242,242,0.55)', borderColor: 'rgba(220,38,38,.45)' }} />Orphan lane</div>
          </RF.Panel>
        </RF.ReactFlow>
      </div>
    </div>
  );
};

const TreeSVG = () => null;


// ============ HUMAN DRAWER ============
const HumanDrawer = ({ human, onClose, goScreen }) => {
  const [tab, setTab] = uS('agents');
  const toast = useToast();
  if (!human) return null;
  const children = D.agents.filter(a => a.parent === human.id);
  const apps = [...new Set(children.flatMap(a => a.apps))];
  const manager = human.manager ? getHuman(human.manager) : null;
  const subtreeRisk = children.some(a => a.risk === 'critical') ? 'critical'
    : children.some(a => a.risk === 'high') ? 'high'
    : children.some(a => a.risk === 'medium') ? 'medium' : 'low';

  return (
    <div className="drawer open">
      <div className="drawer-head">
        <div className="avatar" style={{width: 44, height: 44, borderRadius: '50%', background: 'var(--navy-900)', color: 'white', fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, display: 'grid', placeItems: 'center', flexShrink: 0}}>{human.initials}</div>
        <div style={{flex: 1, minWidth: 0}}>
          <h2 className="name">{human.name}</h2>
          <div className="subrow">{human.role} · {human.dept}</div>
        </div>
        <button className="close" onClick={onClose}>×</button>
      </div>
      <div className="drawer-body scroll">
        <div className="d-section" style={{marginTop: 0}}>
          <div className="d-row"><span className="k">Manager</span><span className="v">{manager ? manager.name : '—'}</span></div>
          <div className="d-row"><span className="k">Status</span><span className="v">{human.status}</span></div>
          <div className="d-row"><span className="k">Child agents</span><span className="v">{children.length}</span></div>
          <div className="d-row"><span className="k">Apps touched</span><span className="v">{apps.length ? apps.join(', ') : '—'}</span></div>
          <div className="d-row"><span className="k">Subtree risk</span><span className="v"><RiskChip risk={subtreeRisk}/></span></div>
        </div>

        <div className="tabs">
          <div className={`tab ${tab === 'agents' ? 'active' : ''}`} onClick={() => setTab('agents')}>Child Agents</div>
          <div className={`tab ${tab === 'perms' ? 'active' : ''}`} onClick={() => setTab('perms')}>Permissions</div>
          <div className={`tab ${tab === 'hr' ? 'active' : ''}`} onClick={() => setTab('hr')}>HR Lifecycle</div>
          <div className={`tab ${tab === 'audit' ? 'active' : ''}`} onClick={() => setTab('audit')}>Audit</div>
        </div>

        <div className="d-section">
          {tab === 'agents' && (
            <div>
              {children.length === 0 ? <div style={{fontSize: 13, color: 'var(--text-muted)'}}>No agents owned.</div> :
                children.map(a => (
                  <div key={a.id} style={{padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 10, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12}}>
                    <div className="bot" style={{width: 26, height: 26, borderRadius: '50%', background: 'var(--lineage-violet-soft)', display: 'grid', placeItems: 'center', color: 'var(--lineage-violet)'}}>
                      <Icon name="bot" size={14}/>
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{fontSize: 13, fontWeight: 600}}>{a.name}</div>
                      <div style={{fontSize: 11.5, color: 'var(--text-muted)'}}>{a.platform} · {a.approval.substring(0, 30)}{a.approval.length > 30 ? '…' : ''}</div>
                    </div>
                    <RiskChip risk={a.risk}/>
                  </div>
                ))
              }
            </div>
          )}
          {tab === 'perms' && human.id === 'h5' && (
            <table className="perm-table">
              <thead><tr><th>Permission</th><th>Jane</th><th>Agent</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td className="scope">SF: read opportunities</td><td><span className="v-yes-icon">✓</span></td><td>Renewal</td><td style={{color: 'var(--risk-low)'}}>Allowed</td></tr>
                <tr className="perm-violation"><td className="scope">SF: export opportunities</td><td><span className="v-no-icon">✕</span></td><td>Forecast</td><td><strong>Violation</strong></td></tr>
                <tr className="perm-violation"><td className="scope">Snowflake: customer rev.</td><td><span className="v-no-icon">✕</span></td><td>Forecast</td><td><strong>Violation</strong></td></tr>
                <tr><td className="scope">CPQ: read discount policy</td><td><span className="v-yes-icon">✓</span></td><td>Quote Rev.</td><td style={{color: 'var(--risk-low)'}}>Allowed</td></tr>
              </tbody>
            </table>
          )}
          {tab === 'perms' && human.id !== 'h5' && (
            <div style={{fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5}}>Permission comparison available when agent children are present. Drill into individual agents for scope details.</div>
          )}
          {tab === 'hr' && (
            <div>
              <div style={{background: 'var(--surface-2)', padding: 16, borderRadius: 10, fontSize: 13.5, lineHeight: 1.55, color: 'var(--text-2)'}}>
                {human.id === 'h5' ? (
                  <>If <strong>Jane Smith</strong> leaves, Pedigree will evaluate <strong>3 child agents</strong>, disable <strong>1</strong>, transfer <strong>2</strong> for sponsor review, and require Salesforce app-owner approval for <strong>1</strong>.</>
                ) : children.length ? (
                  <>If {human.name} leaves, Pedigree will evaluate {children.length} child agent{children.length === 1 ? '' : 's'} and recommend sponsor reassignment and access review.</>
                ) : (
                  <>No child agents. No lifecycle cascade required.</>
                )}
              </div>
              <button className="btn btn-accent" style={{marginTop: 16}} onClick={() => goScreen('hr')}>Run HR Event Simulation →</button>
            </div>
          )}
          {tab === 'audit' && (
            <div style={{fontSize: 13, color: 'var(--text-2)', lineHeight: 1.55}}>
              <div style={{padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between'}}>
                <span>Created in Pedigree</span><span className="font-mono" style={{fontSize: 12}}>Mar 08, 2026</span>
              </div>
              <div style={{padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between'}}>
                <span>Last attestation</span><span className="font-mono" style={{fontSize: 12}}>Apr 14, 2026</span>
              </div>
              <div style={{padding: '10px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between'}}>
                <span>Sponsor of</span><span className="font-mono" style={{fontSize: 12}}>{children.length} agent(s)</span>
              </div>
              <div style={{padding: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                <span>Open findings</span><span className="font-mono" style={{fontSize: 12, color: 'var(--risk-critical)'}}>{D.findings.filter(f => children.some(c => c.id === f.agentId)).length}</span>
              </div>
            </div>
          )}
        </div>

        <div className="action-row">
          <button className="btn btn-primary" onClick={() => goScreen('audit')}>Open Audit Evidence</button>
          <button className="btn btn-ghost" onClick={() => { toast.add('Attestation request sent.'); }}>Request attestation</button>
        </div>
      </div>
    </div>
  );
};

// ============ AGENT DRAWER ============
const AgentDrawer = ({ agent, onClose, goScreen, onSuspend, suspended }) => {
  const toast = useToast();
  if (!agent) return null;
  const parent = agent.parent ? getHuman(agent.parent) : null;
  const sponsor = agent.sponsor ? getHuman(agent.sponsor) : null;
  const techOwner = agent.techOwner ? getHuman(agent.techOwner) : null;
  const appOwnerId = agent.apps.map(app => D.appOwners[app]).find(x => x);
  const appOwner = appOwnerId ? getHuman(appOwnerId) : null;
  const hasViolation = agent.permissions.some(p => !p.ok);
  const alertSeverity = agent.risk === 'critical' ? 'critical' : 'high';

  return (
    <div className="drawer open">
      <div className="drawer-head">
        <div className="bot" style={{width: 44, height: 44, borderRadius: '50%', background: 'var(--lineage-violet-soft)', display: 'grid', placeItems: 'center', color: 'var(--lineage-violet)', flexShrink: 0}}>
          <Icon name="bot" size={22}/>
        </div>
        <div style={{flex: 1, minWidth: 0}}>
          <div className="title-row">
            <h2 className="name">{agent.name}</h2>
          </div>
          <div className="subrow" style={{display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginTop: 4}}>
            <RiskChip risk={agent.risk}/>
            <PlatformChip platform={agent.platform}/>
            <span style={{fontSize: 12}}>· {agent.lastActive}</span>
          </div>
        </div>
        <button className="close" onClick={onClose}>×</button>
      </div>
      <div className="drawer-body scroll">
        {agent.findings.length > 0 && (
          <div className={`alert-box ${alertSeverity}`}>
            <strong>{agent.findings[0].type}</strong>
            {agent.findings[0].evidence}
          </div>
        )}

        <div className="d-section">
          <h4>Lineage</h4>
          <div className="d-row"><span className="k">Created by</span><span className="v">{parent?.name || <span style={{color: 'var(--risk-critical)'}}>Unknown</span>}</span></div>
          <div className="d-row"><span className="k">Sponsor</span><span className="v">{sponsor?.name || <span style={{color: 'var(--risk-critical)'}}>Missing</span>}</span></div>
          <div className="d-row"><span className="k">Technical owner</span><span className="v">{techOwner?.name || <span style={{color: 'var(--text-muted)'}}>—</span>}</span></div>
          <div className="d-row"><span className="k">App owner required</span><span className="v">{appOwner?.name || <span style={{color: 'var(--text-muted)'}}>Data Platform</span>}</span></div>
          <div className="d-row"><span className="k">Approval status</span><span className="v" style={{color: agent.approval.toLowerCase().includes('missing') ? 'var(--risk-critical)' : 'var(--text)'}}>{agent.approval}</span></div>
        </div>

        <div className="d-section">
          <h4>Purpose</h4>
          <div style={{fontSize: 13.5, lineHeight: 1.5, color: 'var(--text-2)'}}>{agent.purpose}</div>
        </div>

        <div className="d-section">
          <h4>Connected tools &amp; scopes</h4>
          <table className="perm-table">
            <thead><tr><th>Scope</th><th>Status</th></tr></thead>
            <tbody>
              {agent.permissions.map((p, i) => (
                <tr key={i} className={!p.ok ? 'perm-violation' : ''}>
                  <td className="scope">{p.scope}</td>
                  <td>{p.ok ? <span className="v-yes-icon">✓ Allowed</span> : <span className="v-no-icon">✕ {p.reason || 'Violation'}</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {agent.findings.length > 0 && (
          <div className="d-section">
            <h4>Findings</h4>
            {agent.findings.map((f, i) => (
              <div key={i} className={`finding-card severity-${f.severity}`}>
                <div className="finding-card-head">
                  <RiskChip risk={f.severity === 'critical' ? 'critical' : f.severity === 'high' ? 'high' : 'medium'}/>
                </div>
                <h5>{f.type}</h5>
                <div className="ev">{f.evidence}</div>
                <div className="rec"><strong>Recommended:</strong> {f.action}</div>
              </div>
            ))}
          </div>
        )}

        <div className="action-row">
          {agent.findings.some(f => f.type.toLowerCase().includes('approval') || f.type.toLowerCase().includes('exceed')) && (
            <button className="btn btn-accent" onClick={() => { toast.add(`Approval routed to ${appOwner?.name || 'app owner'}.`); goScreen('approvals'); }}>Request Approval</button>
          )}
          <button
            className={`btn ${suspended ? 'btn-ghost' : 'btn-danger'}`}
            onClick={() => { onSuspend(agent.id); toast.add(`${agent.name} ${suspended ? 'resumed' : 'suspended'} in demo state.`); }}
          >
            {suspended ? 'Resume Agent' : 'Suspend Agent'}
          </button>
          <button className="btn btn-ghost" onClick={() => goScreen('audit')}>Open Audit Evidence</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { OrgChartScreen, HumanDrawer, AgentDrawer });
