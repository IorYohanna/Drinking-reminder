export const SketchyDefs = () => (
  <svg width="0" height="0" className="absolute pointer-events-none">
    <defs>
      <filter id="sk" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={5} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={2.5} xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="sk2" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves={4} result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale={4} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);