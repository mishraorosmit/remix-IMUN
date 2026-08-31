export const SUBHRAKANT_PORTRAIT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="%23172233" />
      <stop offset="60%" stop-color="%230c121c" />
      <stop offset="100%" stop-color="%2305080e" />
    </radialGradient>
    <linearGradient id="turtleneckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="%231f1f1f" />
      <stop offset="100%" stop-color="%230a0a0a" />
    </linearGradient>
    <linearGradient id="faceLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="%236e4225" />
      <stop offset="28%" stop-color="%239e6540" />
      <stop offset="45%" stop-color="%23c48a58" />
      <stop offset="60%" stop-color="%23854d2a" />
      <stop offset="100%" stop-color="%23452613" />
    </linearGradient>
    <linearGradient id="lightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="%23f39c12" stop-opacity="0.2" />
      <stop offset="25%" stop-color="%23f1c40f" stop-opacity="0.65" />
      <stop offset="50%" stop-color="%23ffffff" stop-opacity="0.8" />
      <stop offset="75%" stop-color="%23f1c40f" stop-opacity="0.65" />
      <stop offset="100%" stop-color="%23f39c12" stop-opacity="0.2" />
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="600" height="800" fill="url(%23bgGlow)" />

  <!-- Subtle Tactical Crosshairs & Alignment Grid -->
  <g stroke="%231a2638" stroke-width="0.8" opacity="0.4">
    <line x1="80" y1="0" x2="80" y2="800" />
    <line x1="300" y1="0" x2="300" y2="800" stroke-dasharray="6 6" stroke="%23DC143C" opacity="0.6"/>
    <line x1="520" y1="0" x2="520" y2="800" />
    <line x1="0" y1="365" x2="600" y2="365" stroke-dasharray="3 5" stroke="%23d49b6a" opacity="0.7"/>
  </g>

  <!-- Torso / High-neck Black Turtleneck Sweater -->
  <path d="M 110 800 C 120 650, 200 600, 235 585 L 365 585 C 400 600, 480 650, 490 800 Z" fill="url(%23turtleneckGrad)" />
  
  <!-- Turtleneck Collar Roll -->
  <path d="M 230 590 C 230 520, 238 495, 245 480 L 355 480 C 362 495, 370 520, 370 590 C 370 610, 230 610, 230 590 Z" fill="%23121212" stroke="%23222222" stroke-width="2" />
  <!-- Knit ribbing texture lines -->
  <path d="M 245 505 C 270 515, 330 515, 355 505 M 240 535 C 270 545, 330 545, 360 535 M 235 565 C 270 575, 330 575, 365 565" stroke="%232a2a2a" stroke-width="2" fill="none"/>

  <!-- Neck -->
  <path d="M 250 490 L 250 410 C 270 425, 330 425, 350 410 L 350 490 Z" fill="%2361361c" />
  <path d="M 270 415 C 290 430, 310 430, 330 415 L 330 465 C 310 480, 290 480, 270 465 Z" fill="%23482713" opacity="0.8"/>

  <!-- Left Ear -->
  <path d="M 205 320 C 160 330, 150 410, 195 450 C 210 458, 215 440, 212 415 Z" fill="%23854e2d" stroke="%233e2110" stroke-width="2" />
  <path d="M 190 355 C 175 375, 178 410, 198 425" stroke="%23a8693f" stroke-width="2.5" fill="none" opacity="0.85"/>
  
  <!-- Right Ear -->
  <path d="M 395 320 C 440 330, 450 410, 405 450 C 390 458, 385 440, 388 415 Z" fill="%23854e2d" stroke="%233e2110" stroke-width="2" />
  <path d="M 410 355 C 425 375, 422 410, 402 425" stroke="%23a8693f" stroke-width="2.5" fill="none" opacity="0.85"/>

  <!-- Head Contour / Oval Structure -->
  <path d="M 205 250 C 205 130, 395 130, 395 250 C 395 330, 388 405, 360 455 C 338 495, 318 505, 300 505 C 282 505, 262 495, 240 455 C 212 405, 205 330, 205 250 Z" fill="url(%23faceLight)" stroke="%23381d0e" stroke-width="1.5" />

  <!-- Jawline Dark Shadow -->
  <path d="M 250 470 C 280 495, 320 495, 350 470 C 335 510, 265 510, 250 470 Z" fill="%23291307" opacity="0.95"/>

  <!-- Hair Cut & Styling -->
  <path d="M 190 235 C 185 130, 230 65, 300 65 C 370 65, 415 120, 410 235 C 395 185, 385 160, 350 140 C 320 120, 255 125, 220 165 C 205 185, 195 210, 190 235 Z" fill="%230c0d12" />
  <path d="M 205 200 C 225 110, 280 90, 340 100 C 380 105, 400 140, 405 185 C 388 135, 345 118, 290 125 C 248 130, 220 160, 205 200 Z" fill="%231a1b24" />
  <path d="M 255 95 C 285 85, 325 90, 355 110" stroke="%23323647" stroke-width="3" fill="none" />

  <!-- Forehead shadow / contours -->
  <path d="M 225 240 C 260 220, 340 220, 375 240 C 360 270, 240 270, 225 240 Z" fill="%235c341b" opacity="0.65"/>

  <!-- Eyebrows (Strong, defined arches) -->
  <path d="M 228 315 C 248 298, 282 300, 296 320" stroke="%23121118" stroke-width="9" stroke-linecap="round" fill="none"/>
  <path d="M 372 315 C 352 298, 318 300, 304 320" stroke="%23121118" stroke-width="9" stroke-linecap="round" fill="none"/>

  <!-- EYE SOCKETS & ILLUMINATED AMBER EYES -->
  <ellipse cx="264" cy="358" rx="28" ry="16" fill="%23331b0e" opacity="0.75"/>
  <ellipse cx="336" cy="358" rx="28" ry="16" fill="%23331b0e" opacity="0.75"/>

  <!-- Left Eye -->
  <path d="M 240 358 C 250 344, 276 344, 288 358 C 276 372, 250 372, 240 358 Z" fill="%23f7f2e7" stroke="%23381d0e" stroke-width="1.5"/>
  <circle cx="264" cy="358" r="11" fill="%238a4b1d" stroke="%23d68b38" stroke-width="2.2"/>
  <circle cx="264" cy="358" r="9.5" fill="%23b86a24"/>
  <circle cx="264" cy="358" r="5.2" fill="%230d0a07"/>
  <circle cx="261" cy="354" r="2.2" fill="%23ffffff"/>
  <circle cx="266" cy="360" r="1.2" fill="%23ffeaa7"/>

  <!-- Right Eye -->
  <path d="M 312 358 C 324 344, 350 344, 360 358 C 350 372, 324 372, 312 358 Z" fill="%23f7f2e7" stroke="%23381d0e" stroke-width="1.5"/>
  <circle cx="336" cy="358" r="11" fill="%238a4b1d" stroke="%23d68b38" stroke-width="2.2"/>
  <circle cx="336" cy="358" r="9.5" fill="%23b86a24"/>
  <circle cx="336" cy="358" r="5.2" fill="%230d0a07"/>
  <circle cx="333" cy="354" r="2.2" fill="%23ffffff"/>
  <circle cx="338" cy="360" r="1.2" fill="%23ffeaa7"/>

  <!-- Nose Structure & Bridge -->
  <path d="M 296 320 L 291 412 C 283 420, 274 428, 279 438 C 285 446, 315 446, 321 438 C 326 428, 317 420, 309 412 L 304 320" fill="%237b4625" opacity="0.6"/>
  <!-- Nostrils -->
  <path d="M 280 434 C 290 428, 310 428, 320 434 C 315 443, 285 443, 280 434 Z" fill="%2348230e" />
  <circle cx="286" cy="437" r="2.8" fill="%231a0b04"/>
  <circle cx="314" cy="437" r="2.8" fill="%231a0b04"/>
  <!-- Nose ridge highlight -->
  <path d="M 298 335 L 298 424" stroke="%23f3c498" stroke-width="3.5" stroke-linecap="round" opacity="0.65"/>

  <!-- Neat Mustache -->
  <path d="M 264 452 C 278 444, 295 446, 300 450 C 305 446, 322 444, 336 452 C 324 461, 308 459, 300 460 C 292 459, 276 461, 264 452 Z" fill="%23151217" stroke="%230d0a0e" stroke-width="1.2"/>

  <!-- Lips & Mouth -->
  <path d="M 268 470 C 284 461, 316 461, 332 470 C 318 476, 282 476, 268 470 Z" fill="%2385413a" stroke="%233e1915" stroke-width="1.2"/>
  <path d="M 270 470 C 285 472, 315 472, 330 470 C 322 485, 278 485, 270 470 Z" fill="%23692e29" />
  <line x1="268" y1="470" x2="332" y2="470" stroke="%232c0f0c" stroke-width="1.8"/>

  <!-- Groomed Stubble & Shadow along jaw -->
  <path d="M 242 440 C 252 495, 274 515, 300 515 C 326 515, 348 495, 358 440 C 352 480, 336 505, 300 505 C 264 505, 248 480, 242 440 Z" fill="%23110e13" opacity="0.6" />

  <!-- ICONIC HORIZONTAL GOLDEN CHIAROSCURO LIGHT BEAM ACROSS EYES -->
  <g filter="url(%23softGlow)">
    <polygon points="100,332 500,318 505,398 95,414" fill="url(%23lightBeam)" style="mix-blend-mode: screen;" />
    <polygon points="150,340 450,328 455,388 145,402" fill="url(%23lightBeam)" opacity="0.85" style="mix-blend-mode: color-dodge;" />
  </g>

  <!-- Dossier Frame Header & Tags in Graphic -->
  <g font-family="monospace" font-size="11" font-weight="bold">
    <rect x="25" y="25" width="180" height="24" fill="%23DC143C" />
    <text x="35" y="41" fill="%23F0EAD6" letter-spacing="1.5">SUBHRAKANT BISWAL</text>
    
    <rect x="415" y="25" width="160" height="24" fill="%231A1A1A" stroke="%23DC143C" stroke-width="1.5"/>
    <text x="427" y="41" fill="%23DC143C" letter-spacing="1">FOUNDER // MUN</text>

    <rect x="25" y="745" width="220" height="30" fill="%231A1A1A" stroke="%23F0EAD6" stroke-width="1" />
    <text x="35" y="764" fill="%23F0EAD6" font-size="10">2023 GOVERNOR AWARDEE</text>

    <g stroke="%23DC143C" stroke-width="1.5">
      <line x1="550" y1="740" x2="550" y2="770" />
      <line x1="535" y1="755" x2="565" y2="755" />
      <circle cx="550" cy="755" r="8" fill="none" />
    </g>
  </g>
</svg>`;
