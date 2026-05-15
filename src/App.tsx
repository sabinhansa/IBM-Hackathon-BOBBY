import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import RepoOnboarding from './pages/RepoOnboarding';
import ArchitectureMap from './pages/ArchitectureMap';
import DocGapFinder from './pages/DocGapFinder';
import TestPlanGenerator from './pages/TestPlanGenerator';
import RiskReview from './pages/RiskReview';
import PRPackGenerator from './pages/PRPackGenerator';
import BobEvidence from './pages/BobEvidence';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/repo-onboarding" element={<RepoOnboarding />} />
          <Route path="/architecture-map" element={<ArchitectureMap />} />
          <Route path="/doc-gap-finder" element={<DocGapFinder />} />
          <Route path="/test-plan-generator" element={<TestPlanGenerator />} />
          <Route path="/risk-review" element={<RiskReview />} />
          <Route path="/pr-pack-generator" element={<PRPackGenerator />} />
          <Route path="/bob-evidence" element={<BobEvidence />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

// Made with Bob
