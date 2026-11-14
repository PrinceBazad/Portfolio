import React, { useCallback, useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import ParticleCursor from './components/ParticleCursor';
import ExperienceHub from './components/ExperienceHub';
import './App.css';

const JourneyGuide = ({ journey, stepIndex, onAdvance, onDismiss }) => {
  if (!journey) return null;
  const nextStep = journey.steps[stepIndex + 1];
  const currentStep = journey.steps[stepIndex];

  return (
    <aside className="journey-guide" aria-live="polite">
      <div>
        <span>{journey.label.toUpperCase()} PATH / {stepIndex + 1} OF {journey.steps.length}</span>
        <strong>{currentStep.label}</strong>
      </div>
      <button type="button" onClick={onAdvance}>{nextStep ? `Next: ${nextStep.label}` : 'Finish path'}</button>
      <button type="button" className="journey-dismiss" onClick={onDismiss} aria-label="Close visitor path">×</button>
    </aside>
  );
};

function App() {
  const cursorGlowRef = useRef(null);
  const audioContextRef = useRef(null);
  const achievementTimerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [chaosMode, setChaosMode] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [secretTheme, setSecretTheme] = useState(false);
  const [achievement, setAchievement] = useState('');
  const [journey, setJourney] = useState(null);

  const openCommandPalette = useCallback(() => setCommandOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandOpen(false), []);
  const toggleChaosMode = useCallback(() => {
    setChaosMode((enabled) => !enabled);
  }, []);
  const openExperienceHub = useCallback(() => setExperienceOpen(true), []);
  const closeExperienceHub = useCallback(() => setExperienceOpen(false), []);
  const unlockSecretTheme = useCallback(() => setSecretTheme(true), []);
  const showAchievement = useCallback((message) => {
    window.clearTimeout(achievementTimerRef.current);
    setAchievement(message);
    achievementTimerRef.current = window.setTimeout(() => setAchievement(''), 3600);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(achievementTimerRef.current);
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
  }, []);

  const advanceJourney = useCallback(() => {
    if (!journey) return;
    const nextIndex = journey.stepIndex + 1;
    if (nextIndex >= journey.steps.length) {
      setJourney(null);
      return;
    }

    setJourney({ ...journey, stepIndex: nextIndex });
    const nextSection = document.getElementById(journey.steps[nextIndex].section);
    if (nextSection) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      nextSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [journey]);

  const startJourney = useCallback((selectedJourney) => {
    setJourney({ ...selectedJourney, steps: [...selectedJourney.steps], stepIndex: 0 });
    const firstSection = document.getElementById(selectedJourney.steps[0].section);
    if (firstSection) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      firstSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('main section:not(#hero)');
    const revealObserver = new window.IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    sections.forEach((section) => {
      section.classList.add('scroll-reveal');
      revealObserver.observe(section);
    });

    let progressFrame = 0;
    const updateScrollProgress = () => {
      window.cancelAnimationFrame(progressFrame);
      progressFrame = window.requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      });
    };

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let pointerFrame = 0;
    const updateCursorGlow = (event) => {
      if (!finePointer || event.pointerType !== 'mouse' || !cursorGlowRef.current) return;
      window.cancelAnimationFrame(pointerFrame);
      const { clientX, clientY } = event;
      pointerFrame = window.requestAnimationFrame(() => {
        if (cursorGlowRef.current) {
          cursorGlowRef.current.style.transform =
            `translate3d(${clientX - 180}px, ${clientY - 180}px, 0)`;
          cursorGlowRef.current.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    window.addEventListener('pointermove', updateCursorGlow, { passive: true });
    updateScrollProgress();

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      window.removeEventListener('pointermove', updateCursorGlow);
      window.cancelAnimationFrame(progressFrame);
      window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('chaos-mode', chaosMode);
    return () => document.body.classList.remove('chaos-mode');
  }, [chaosMode]);

  useEffect(() => {
    document.body.classList.toggle('secret-theme', secretTheme);
    return () => document.body.classList.remove('secret-theme');
  }, [secretTheme]);

  useEffect(() => {
    if (!soundEnabled) return undefined;

    const playInterfaceTone = (event) => {
      if (!(event.target instanceof Element) || !event.target.closest('button, a')) return;
      if (event.target.closest('.sound-toggle')) return;
      const AudioContext = window.AudioContext;
      if (!AudioContext) return;

      const context = audioContextRef.current || new AudioContext();
      audioContextRef.current = context;
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 640;
      volume.gain.setValueAtTime(0.035, context.currentTime);
      volume.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.075);
      oscillator.connect(volume);
      volume.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.075);
    };

    window.addEventListener('click', playInterfaceTone);
    return () => {
      window.removeEventListener('click', playInterfaceTone);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, [soundEnabled]);

  useEffect(() => {
    const secretSequence = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a',
    ];
    let sequence = [];

    const handleSecretSequence = (event) => {
      if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select, [contenteditable="true"]')) {
        sequence = [];
        return;
      }

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      sequence = [...sequence, key].slice(-secretSequence.length);
      if (
        sequence.length === secretSequence.length
        && sequence.every((pressedKey, index) => pressedKey === secretSequence[index])
      ) {
        toggleChaosMode();
        sequence = [];
      }
    };

    window.addEventListener('keydown', handleSecretSequence);
    return () => window.removeEventListener('keydown', handleSecretSequence);
  }, [toggleChaosMode]);

  return (
    <div className="App" style={{ '--scroll-progress': scrollProgress }}>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <div ref={cursorGlowRef} className="cursor-glow" aria-hidden="true" />
      <ParticleCursor />
      <Navbar
        onOpenCommands={openCommandPalette}
        onOpenExperiences={openExperienceHub}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((enabled) => !enabled)}
      />
      <main>
        <Hero scrollProgress={scrollProgress} onChooseJourney={startJourney} />
        <div className="signal-marquee" aria-hidden="true">
          <div className="signal-marquee-track">
            {[0, 1].map((group) => (
              <span className="signal-marquee-group" key={group}>
                <span>MAKING THE WEB FEEL ALIVE</span><b>✳</b>
                <span>INTERACTION OVER STATIC</span><b>✳</b>
                <span>CLEAN CODE / LOUD IDEAS</span><b>✳</b>
                <span>PIXELS WITH PURPOSE</span><b>✳</b>
              </span>
            ))}
          </div>
        </div>
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      {chaosMode && (
        <div className="chaos-indicator" role="status">
          <span><i /> CHAOS MODE</span>
          <button type="button" onClick={toggleChaosMode}>EXIT <b aria-hidden="true">×</b></button>
        </div>
      )}
      <CommandPalette
        open={commandOpen}
        onClose={closeCommandPalette}
        onOpen={openCommandPalette}
        onToggleChaos={toggleChaosMode}
        onOpenExperiences={openExperienceHub}
      />
      {experienceOpen && (
        <ExperienceHub
          onClose={closeExperienceHub}
          onAchievement={showAchievement}
          onSecretUnlock={unlockSecretTheme}
        />
      )}
      <JourneyGuide
        journey={journey}
        stepIndex={journey ? journey.stepIndex : 0}
        onAdvance={advanceJourney}
        onDismiss={() => setJourney(null)}
      />
      {achievement && <div className="achievement-toast" role="status">✦ {achievement}</div>}
    </div>
  );
}

export default App;
