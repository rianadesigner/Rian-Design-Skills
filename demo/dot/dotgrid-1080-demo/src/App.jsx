import DotGrid from './components/DotGrid.jsx';
import GsapButton from './components/GsapButton.jsx';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: 1080,
          height: 1080,
          position: 'relative',
          maxWidth: '100%',
          aspectRatio: '1 / 1',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 36,
            bottom: 36,
            zIndex: 10,
          }}
        >
          <GsapButton label="GSAP 按钮动效" />
        </div>
        <DotGrid
          dotSize={6}
          gap={18}
          baseColor="#ffffff"
          activeColor="#5227FF"
          proximity={130}
          speedTrigger={70}
          shockRadius={340}
          shockStrength={5}
          maxSpeed={5500}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
    </div>
  );
}
