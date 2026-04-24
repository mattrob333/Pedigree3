// Pedigree demo app root
const App = () => {
  const [entryOpen, setEntryOpen] = React.useState(true);
  const [screen, setScreen] = React.useState('dashboard');
  const [scenario, setScenario] = React.useState('pre-audit');
  const [revealed, setRevealed] = React.useState(false);
  const [selHuman, setSelHuman] = React.useState(null);
  const [selAgent, setSelAgent] = React.useState(null);
  const [riskFilter, setRiskFilter] = React.useState('all');
  const [suspended, setSuspended] = React.useState([]);
  const [walkStep, setWalkStep] = React.useState(null);
  const [dataVersion, setDataVersion] = React.useState(0);
  const [importOpen, setImportOpen] = React.useState(false);

  const selectHuman = (id) => { setSelAgent(null); setSelHuman(id); };
  const selectAgent = (id) => { setSelHuman(null); setSelAgent(id); };
  const closeDrawer = () => { setSelHuman(null); setSelAgent(null); };
  const toggleSuspend = (id) => setSuspended(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const goScreen = (s) => {
    setScreen(s);
    if (s !== 'org') closeDrawer();
  };

  React.useEffect(() => {
    if (scenario === 'termination') { setScreen('hr'); }
    else if (scenario === 'approvals') { setScreen('approvals'); }
    else { setScreen('dashboard'); }
  }, [scenario]);

  const startWalkthrough = () => { setWalkStep(0); setEntryOpen(false); };
  const refreshData = () => setDataVersion(v => v + 1);
  const drawerOpen = !!(selHuman || selAgent);

  return (
    <ToastProvider>
      <div className="shell">
        <TopBar scenario={scenario} setScenario={setScenario} goScreen={goScreen} onImport={() => setImportOpen(true)} onReset={() => { window.resetToDemoData(); refreshData(); }} />
        <Sidebar screen={screen} setScreen={goScreen} startWalkthrough={startWalkthrough} dataVersion={dataVersion} />
        <div className={`main ${drawerOpen ? 'with-drawer' : ''}`}>
          {screen === 'dashboard' && <DashboardScreen goScreen={goScreen} dataVersion={dataVersion}/>}
          {screen === 'org' && (
            <OrgChartScreen revealed={revealed} setRevealed={setRevealed} onSelectHuman={selectHuman} onSelectAgent={selectAgent} selHuman={selHuman} selAgent={selAgent} goScreen={goScreen} suspendedAgents={suspended} dataVersion={dataVersion}/>
          )}
          {screen === 'risk' && (
            <RiskFindingsScreen goScreen={goScreen} onSelectAgent={(id) => { goScreen('org'); setRevealed(true); selectAgent(id); }} filter={riskFilter} setFilter={setRiskFilter} dataVersion={dataVersion}/>
          )}
          {screen === 'hr' && <HRSimScreen goScreen={goScreen} onSuspend={toggleSuspend} dataVersion={dataVersion} />}
          {screen === 'approvals' && <ApprovalsScreen dataVersion={dataVersion} />}
          {screen === 'audit' && <AuditPacketScreen dataVersion={dataVersion} />}
          {screen === 'integrations' && <IntegrationsScreen dataVersion={dataVersion} />}
          {screen === 'settings' && <SettingsScreen />}

          {selHuman && <HumanDrawer human={getHuman(selHuman)} onClose={closeDrawer} goScreen={goScreen}/>}
          {selAgent && <AgentDrawer agent={getAgent(selAgent)} onClose={closeDrawer} goScreen={goScreen} onSuspend={toggleSuspend} suspended={suspended.includes(selAgent)}/>}
        </div>

        {entryOpen && <EntryScreen scenario={scenario} setScenario={setScenario} onStart={() => { setEntryOpen(false); }} onWalkthrough={startWalkthrough} />}
        {walkStep !== null && <Walkthrough step={walkStep} setStep={setWalkStep} onClose={() => setWalkStep(null)} goScreen={goScreen} setRevealed={setRevealed} selectAgent={selectAgent}/>}
        {importOpen && <CsvImportModal onClose={() => setImportOpen(false)} onImported={() => { refreshData(); setImportOpen(false); setScreen('org'); setRevealed(true); }} />}
      </div>
    </ToastProvider>
  );
};

const EntryScreen = ({ scenario, setScenario, onStart, onWalkthrough }) => {
  const scenarios = [
    { id: 'pre-audit', num: '01', title: 'Pre-Audit Agent Review', desc: 'Walk the graph, surface 11 orphaned and 7 high-risk agents, produce evidence.' },
    { id: 'termination', num: '02', title: 'Employee Termination', desc: 'Jane Smith leaves. See the lifecycle cascade across 3 child agents.' },
    { id: 'approvals', num: '03', title: 'App Owner Approvals', desc: 'Salesforce export, NetSuite payments, orphaned Snowflake write access.' },
  ];
  return (
    <div className="entry-screen">
      <div className="entry-inner">
        <div className="entry-kicker">Demo Workspace · Apex Industrial Group · 42 agents discovered</div>
        <h1>Your AI agents need <em>managers too</em>.</h1>
        <p className="sub">Pedigree maps every agent to a human owner, permission boundary, approval trail, and HR lifecycle event — so security teams can govern the agent workforce before it becomes the next audit problem.</p>
        <div className="scenarios">
          {scenarios.map(s => (
            <div key={s.id} className={`scenario-card ${scenario === s.id ? 'selected' : ''}`} onClick={() => setScenario(s.id)}>
              <div className="sc-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center'}}>
          <button className="btn btn-white" style={{padding: '14px 28px', fontSize: 15}} onClick={onWalkthrough}>▶ Start 3-Minute Risk Walkthrough</button>
          <button onClick={onStart} style={{padding: '14px 22px', background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, fontSize: 14, cursor: 'pointer'}}>Or explore freely</button>
          <a href="index.html" style={{color: 'rgba(255,255,255,0.5)', fontSize: 13, marginLeft: 12}}>← Website</a>
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
