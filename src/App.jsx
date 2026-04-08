import { useState } from 'react';
import { WeddingProvider, useWedding } from './context/WeddingContext';
import { ThemeProvider } from './context/ThemeContext';
import useDocumentTitle from './hooks/useDocumentTitle';
import Navigation from './components/Navigation';
import Invitation from './components/Invitation';
import Hero from './components/Hero';
import Couple from './components/Couple';
import HelloToIDo from './components/HelloToIDo';
import TokenOfLove from './components/TokenOfLove';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Footer from './components/Footer';
import Confetti from './components/Confetti';
import AudioPlayer from './components/AudioPlayer';
import AdminPanel from './components/AdminPanel';
import AdminToggle from './components/AdminToggle';
import ThemeToggle from './components/ThemeToggle';
import LiveStreaming from './components/LiveStreaming';
import './styles/main.scss';

function AppContent() {
  useDocumentTitle();
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { config } = useWedding();

  const handleOpenInvitation = () => {
    setShowConfetti(true);
    setShowContent(true);
  };

  return (
    <>
      <Confetti isActive={showConfetti} />
      <AudioPlayer />
      {!showContent && <Invitation onOpen={handleOpenInvitation} />}
      <div style={{ display: showContent ? 'block' : 'none' }}>
        <Navigation />
        <main>
          <Hero />
          <Couple />
          <HelloToIDo />
          <TokenOfLove />
          <Countdown />
          <EventDetails />
          <Gallery />
          <RSVP />
        </main>
        <Footer />
      </div>
      <LiveStreaming isActive={config.liveStreaming?.enableLiveStreaming || false} />
      <AdminPanel />
      <AdminToggle />
      <ThemeToggle />
    </>
  );
}

function App() {
  return (
    <WeddingProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </WeddingProvider>
  );
}

export default App;
