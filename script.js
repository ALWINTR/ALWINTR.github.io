// ==========================================================================
// ALWINTR Professional Robotics & Embedded Systems Interactive Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Web Audio API Cyber Synthesizer Sound Engine
  // ------------------------------------------------------------------------
  let sfxEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthSound(freq, type = 'sine', duration = 0.05, gainLevel = 0.06) {
    if (!sfxEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy handled
    }
  }

  const sfxToggle = document.getElementById('sfx-toggle');
  const sfxIcon = document.getElementById('sfx-icon');
  const sfxText = document.getElementById('sfx-text');

  if (sfxToggle) {
    sfxToggle.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) {
        initAudio();
        sfxIcon.className = 'fa-solid fa-volume-high';
        sfxText.textContent = 'SFX: ON';
        playSynthSound(600, 'sine', 0.08, 0.08);
        showToast('Synthesizer SFX Enabled');
      } else {
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        sfxText.textContent = 'SFX: OFF';
        showToast('Synthesizer SFX Muted');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. Custom Cyber Cursor (Desktop Only)
  // ------------------------------------------------------------------------
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const clickables = document.querySelectorAll('a, button, input, .project-card, .comp-card, .skill-category, .sim-card');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width = '48px';
          ring.style.height = '48px';
          ring.style.borderColor = 'rgba(255, 23, 68, 0.95)';
          ring.style.boxShadow = '0 0 20px rgba(255, 23, 68, 0.5)';
        }
        playSynthSound(750, 'sine', 0.03, 0.02);
      });
      el.addEventListener('mouseleave', () => {
        if (ring) {
          ring.style.width = '32px';
          ring.style.height = '32px';
          ring.style.borderColor = 'rgba(239, 68, 68, 0.7)';
          ring.style.boxShadow = 'none';
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 3. Interactive Background Particle Canvas (Cyber Red Nodes)
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 14000), 85);
    const redColors = ['#ff1744', '#ef4444', '#ff4d6d', '#ff5252', '#ff8a9b'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: redColors[Math.floor(Math.random() * redColors.length)]
      });
    }

    let canvasMouseX = -1000;
    let canvasMouseY = -1000;

    window.addEventListener('mousemove', (e) => {
      canvasMouseX = e.clientX;
      canvasMouseY = e.clientY;
    });

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.25 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mdx = p.x - canvasMouseX;
        const mdy = p.y - canvasMouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(canvasMouseX, canvasMouseY);
          ctx.strokeStyle = `rgba(255, 23, 68, ${0.45 * (1 - mdist / 140)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ------------------------------------------------------------------------
  // 4. Typewriter Title Rotation
  // ------------------------------------------------------------------------
  const typewriter = document.getElementById('typewriter');
  const phrases = [
    "Autonomous Mobile Robots (AMR)",
    "ESP32 & Real-Time Firmware (FreeRTOS)",
    "Multi-Axis Joint Kinematics",
    "ROS2 & Gazebo Simulation",
    "Multi-Sensor Industrial Automation",
    "Microcontroller Systems (PIC, STM32, AVR)"
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeLoop() {
    if (!typewriter) return;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typewriter.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      typewriter.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(typeLoop, typingSpeed);
  }
  typeLoop();

  // ------------------------------------------------------------------------
  // 5. Virtual Simulator 1: 2D PWM Servo Kinematics Canvas
  // ------------------------------------------------------------------------
  const servoCanvas = document.getElementById('servo-canvas');
  const servoSlider = document.getElementById('servo-slider');
  const sliderVal = document.getElementById('slider-val');
  const dispAngle = document.getElementById('disp-angle');
  const dispUs = document.getElementById('disp-us');
  const dispDuty = document.getElementById('disp-duty');
  const presetBtns = document.querySelectorAll('.preset-btn[data-angle]');
  const btnAutoSweep = document.getElementById('btn-auto-sweep');

  let currentAngle = 90;
  let targetAngle = 90;
  let isAutoSweep = false;
  let sweepDirection = 1;

  function drawServoArm(angle) {
    if (!servoCanvas) return;
    const ctx = servoCanvas.getContext('2d');
    const w = servoCanvas.width;
    const h = servoCanvas.height;
    const centerX = w / 2;
    const centerY = h - 35;

    ctx.clearRect(0, 0, w, h);

    // Grid arc & degree tick marks
    ctx.beginPath();
    ctx.arc(centerX, centerY, 110, Math.PI, 0, false);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Degree Ticks
    for (let deg = 0; deg <= 180; deg += 30) {
      const rad = Math.PI - (deg * Math.PI / 180);
      const x1 = centerX + Math.cos(rad) * 105;
      const y1 = centerY - Math.sin(rad) * 105;
      const x2 = centerX + Math.cos(rad) * 118;
      const y2 = centerY - Math.sin(rad) * 118;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = (deg === 0 || deg === 90 || deg === 180) ? '#ff1744' : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = (deg === 0 || deg === 90 || deg === 180) ? 2 : 1;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'center';
      const tx = centerX + Math.cos(rad) * 132;
      const ty = centerY - Math.sin(rad) * 132 + 3;
      ctx.fillText(`${deg}°`, tx, ty);
    }

    // Servo Base Enclosure
    ctx.fillStyle = '#16080e';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(centerX - 50, centerY - 15, 100, 40, [8, 8, 4, 4]);
    ctx.fill();
    ctx.stroke();

    // Pivot Circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = '#2a0a14';
    ctx.fill();
    ctx.strokeStyle = '#ff1744';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Rotating Servo Horn
    const radCurrent = Math.PI - (angle * Math.PI / 180);
    const armLen = 85;
    const endX = centerX + Math.cos(radCurrent) * armLen;
    const endY = centerY - Math.sin(radCurrent) * armLen;

    // Glowing Trail
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#ff1744';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.shadowColor = '#ff1744';
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Inner highlight
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Tip marker
    ctx.beginPath();
    ctx.arc(endX, endY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#ff1744';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function updateServoTelemetry(angle) {
    if (sliderVal) sliderVal.textContent = `${Math.round(angle)}°`;
    if (dispAngle) dispAngle.textContent = `${Math.round(angle)}°`;

    // 50Hz PWM: 0 deg = 500us (2.5%), 180 deg = 2500us (12.5%)
    const us = Math.round(500 + (angle / 180) * 2000);
    const duty = ((us / 20000) * 100).toFixed(1);

    if (dispUs) dispUs.textContent = `${us} µs`;
    if (dispDuty) dispDuty.textContent = `${duty}%`;
  }

  function animateServo() {
    if (isAutoSweep) {
      targetAngle += sweepDirection * 1.5;
      if (targetAngle >= 180) {
        targetAngle = 180;
        sweepDirection = -1;
      } else if (targetAngle <= 0) {
        targetAngle = 0;
        sweepDirection = 1;
      }
      if (servoSlider) servoSlider.value = Math.round(targetAngle);
    }

    currentAngle += (targetAngle - currentAngle) * 0.18;
    drawServoArm(currentAngle);
    updateServoTelemetry(currentAngle);
    requestAnimationFrame(animateServo);
  }
  animateServo();

  if (servoSlider) {
    servoSlider.addEventListener('input', (e) => {
      isAutoSweep = false;
      if (btnAutoSweep) btnAutoSweep.classList.remove('active');
      targetAngle = parseFloat(e.target.value);
      playSynthSound(400 + targetAngle * 3, 'sine', 0.02, 0.03);
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      isAutoSweep = false;
      if (btnAutoSweep) btnAutoSweep.classList.remove('active');
      const val = parseFloat(btn.getAttribute('data-angle'));
      targetAngle = val;
      if (servoSlider) servoSlider.value = val;
      playSynthSound(500 + val * 2, 'sine', 0.06, 0.06);
    });
  });

  if (btnAutoSweep) {
    btnAutoSweep.addEventListener('click', () => {
      isAutoSweep = !isAutoSweep;
      btnAutoSweep.classList.toggle('active', isAutoSweep);
      if (isAutoSweep) {
        playSynthSound(700, 'triangle', 0.1, 0.08);
        showToast('Auto Sweep Mode: ON');
      } else {
        showToast('Auto Sweep Mode: OFF');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Virtual Simulator 2: Waste Sorter Mechanism
  // ------------------------------------------------------------------------
  const dropButtons = document.querySelectorAll('.drop-btn');
  const indSensor = document.getElementById('ind-sensor');
  const indStatus = document.getElementById('ind-status');
  const stepperDisc = document.getElementById('stepper-disc');
  const flapGate = document.getElementById('flap-gate');
  const flapStatus = document.getElementById('flap-status');
  const sorterLog = document.getElementById('sorter-log');

  let isSortingBusy = false;
  let currentDiscDeg = 0;

  dropButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (isSortingBusy) {
        showToast('Classification in progress...');
        return;
      }
      const itemType = btn.getAttribute('data-type');
      runWasteSortingSequence(itemType);
    });
  });

  function runWasteSortingSequence(type) {
    isSortingBusy = true;
    playSynthSound(520, 'sine', 0.08, 0.08);

    if (sorterLog) {
      sorterLog.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-accent"></i> Analyzing object in intake chute...`;
    }

    // Step 1: Sensor Detection
    setTimeout(() => {
      if (type === 'metal') {
        if (indSensor) indSensor.classList.add('active');
        if (indStatus) indStatus.textContent = 'DETECTED (FERROUS METAL)';
        playSynthSound(900, 'square', 0.12, 0.09);
        if (sorterLog) sorterLog.innerHTML = `<i class="fa-solid fa-magnet text-accent"></i> <strong>Inductive Trigger</strong>: Metallic mass confirmed. Indexing carousel...`;
      } else {
        if (indSensor) indSensor.classList.remove('active');
        if (indStatus) indStatus.textContent = 'STANDBY (NON-METALLIC)';
        playSynthSound(450, 'sine', 0.06, 0.06);
        if (sorterLog) sorterLog.innerHTML = `<i class="fa-solid fa-box text-primary"></i> <strong>IR Optical Sensor</strong>: Non-metallic item (${type.toUpperCase()}). Indexing carousel...`;
      }

      // Step 2: NEMA 17 Stepper Rotation
      setTimeout(() => {
        let targetDiscRotation = 0;
        let flapDeg = 0;
        let flapText = 'CENTER (0°)';

        if (type === 'metal') {
          targetDiscRotation = 0;
          flapDeg = -45;
          flapText = 'LEFT FLAP (-45° -> METAL CHUTE)';
        } else if (type === 'dry') {
          targetDiscRotation = 120;
          flapDeg = 45;
          flapText = 'RIGHT FLAP (+45° -> DRY PLASTIC)';
        } else {
          targetDiscRotation = 240;
          flapDeg = 0;
          flapText = 'STRAIGHT (0° -> WET COMPOST)';
        }

        currentDiscDeg += 120;
        if (stepperDisc) {
          stepperDisc.style.transform = `rotate(${currentDiscDeg}deg)`;
        }
        playSynthSound(320, 'sawtooth', 0.25, 0.07);

        // Step 3: Servo Flap Deflection
        setTimeout(() => {
          if (flapGate) {
            flapGate.classList.add('active');
            const arm = flapGate.querySelector('.flap-arm');
            if (arm) arm.style.transform = `rotate(${flapDeg}deg)`;
          }
          if (flapStatus) flapStatus.textContent = flapText;
          playSynthSound(720, 'triangle', 0.09, 0.08);

          if (sorterLog) {
            sorterLog.innerHTML = `<i class="fa-solid fa-circle-check text-success"></i> <strong>Sorted Successfully</strong>: Routed into <strong>${type.toUpperCase()}</strong> partition.`;
          }

          // Step 4: Return to home
          setTimeout(() => {
            if (indSensor) indSensor.classList.remove('active');
            if (indStatus) indStatus.textContent = 'STANDBY';
            if (flapGate) {
              flapGate.classList.remove('active');
              const arm = flapGate.querySelector('.flap-arm');
              if (arm) arm.style.transform = `rotate(0deg)`;
            }
            if (flapStatus) flapStatus.textContent = 'CENTER (0°)';
            isSortingBusy = false;
          }, 1600);
        }, 800);
      }, 700);
    }, 400);
  }

  // ------------------------------------------------------------------------
  // 7. Virtual Simulator 3: Multi-Sensor & ADC Telemetry Matrix
  // ------------------------------------------------------------------------
  const rainSlider = document.getElementById('rain-adc-slider');
  const rainVal = document.getElementById('rain-adc-val');
  const rainFeedback = document.getElementById('rain-feedback');
  const vibSlider = document.getElementById('vib-slider');
  const vibVal = document.getElementById('vib-val');
  const vibFeedback = document.getElementById('vib-feedback');
  const btnTestRain = document.getElementById('btn-test-rain');
  const btnTestQuake = document.getElementById('btn-test-quake');
  const btnResetSensors = document.getElementById('btn-reset-sensors');

  function updateRainFeedback(adc) {
    if (!rainVal || !rainFeedback) return;
    if (adc > 800) {
      rainVal.textContent = `${adc} (Dry Condition)`;
      rainFeedback.innerHTML = `<span class="status-badge status-ok"><i class="fa-solid fa-sun"></i> Dry Condition - Shutter Idle (0°)</span>`;
    } else if (adc > 400) {
      rainVal.textContent = `${adc} (Moderate Drizzle)`;
      rainFeedback.innerHTML = `<span class="status-badge status-warn"><i class="fa-solid fa-cloud-rain"></i> Drizzle Detected - Deploying Servo Shutter (45°)</span>`;
    } else {
      rainVal.textContent = `${adc} (Heavy Rainfall)`;
      rainFeedback.innerHTML = `<span class="status-badge status-alert"><i class="fa-solid fa-cloud-showers-heavy"></i> Heavy Rain Alert - Fully Locked (90°)</span>`;
    }
  }

  function updateVibFeedback(val) {
    if (!vibVal || !vibFeedback) return;
    const g = (val / 100).toFixed(2);
    if (val < 50) {
      vibVal.textContent = `${g} G (Normal)`;
      vibFeedback.innerHTML = `<span class="status-badge status-ok"><i class="fa-solid fa-check"></i> Baseline Seismic Stability</span>`;
    } else if (val < 250) {
      vibVal.textContent = `${g} G (Minor Tremor)`;
      vibFeedback.innerHTML = `<span class="status-badge status-warn"><i class="fa-solid fa-triangle-exclamation"></i> Minor Tremor - Logging Telemetry</span>`;
    } else {
      vibVal.textContent = `${g} G (CRITICAL SEISMIC EVENT)`;
      vibFeedback.innerHTML = `<span class="status-badge status-alert"><i class="fa-solid fa-bell"></i> SEISMIC ALARM TRIGGERED (Buzzer & Relay Active)</span>`;
    }
  }

  if (rainSlider) {
    rainSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      updateRainFeedback(val);
      playSynthSound(300 + val * 0.5, 'sine', 0.02, 0.02);
    });
  }

  if (vibSlider) {
    vibSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      updateVibFeedback(val);
      playSynthSound(200 + val * 1.5, 'sawtooth', 0.03, 0.03);
    });
  }

  if (btnTestRain) {
    btnTestRain.addEventListener('click', () => {
      if (rainSlider) rainSlider.value = 180;
      updateRainFeedback(180);
      playSynthSound(450, 'sine', 0.1, 0.08);
      showToast('Rain Probe: 180 ADC (Heavy Rain Injected)');
    });
  }

  if (btnTestQuake) {
    btnTestQuake.addEventListener('click', () => {
      if (vibSlider) vibSlider.value = 520;
      updateVibFeedback(520);
      playSynthSound(850, 'square', 0.15, 0.1);
      showToast('MPU6050: 5.20G Seismic Event Triggered');
    });
  }

  if (btnResetSensors) {
    btnResetSensors.addEventListener('click', () => {
      if (rainSlider) rainSlider.value = 1023;
      if (vibSlider) vibSlider.value = 12;
      updateRainFeedback(1023);
      updateVibFeedback(12);
      playSynthSound(500, 'triangle', 0.08, 0.06);
      showToast('Sensor Matrix Reset to Calibrated Baseline');
    });
  }

  // ------------------------------------------------------------------------
  // 8. Circuit Pinout Modal & Complete Schematics Database
  // ------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const pinoutBtns = document.querySelectorAll('.btn-pinout');

  const PINOUT_DATABASE = {
    'spybot-robot': {
      title: 'SpyBot Surveillance Rover Wiring & Circuit Diagram',
      content: `
        <p class="modal-desc">Differential drive surveillance vehicle with real-time video, gas detection, and metal sensing.</p>
        <table class="pinout-table">
          <thead><tr><th>Component</th><th>Module Pin</th><th>Microcontroller Pin</th><th>Voltage / Notes</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">L298N Motor Driver</span></td><td>IN1, IN2, IN3, IN4</td><td>ESP32 GPIO 16, 17, 18, 19</td><td>PWM Motor Direction & Speed</td></tr>
            <tr><td><span class="wire-badge wire-red">MQ-2 Gas Sensor</span></td><td>Analog AO</td><td>ESP32 GPIO 34 (ADC1_CH6)</td><td>3.3V Analog Input (0-4095)</td></tr>
            <tr><td><span class="wire-badge wire-blue">Inductive Proximity</span></td><td>Signal Out</td><td>ESP32 GPIO 21</td><td>NPN Open-Collector with 10k Pull-up</td></tr>
            <tr><td><span class="wire-badge wire-yel">ESP32-CAM Video</span></td><td>UART0 / WiFi</td><td>Antenna / GPIO 1, 3</td><td>RTSP / HTTP MJPEG Video Stream</td></tr>
            <tr><td><span class="wire-badge wire-red">Power Bus</span></td><td>7.4V Li-Po (2S)</td><td>LM2596 Step-Down -> 5V</td><td>Dedicated 3A Clean Rail</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ Hardware Architecture Note:</strong> Power rails are decoupled using 470µF electrolytic capacitors across motor terminals to suppress inductive voltage spikes during rapid motor reversals.
        </div>
      `
    },
    'waste-segregation': {
      title: 'Smart Waste Segregation Classifier Circuit & Wiring',
      content: `
        <p class="modal-desc">Multi-sensor carousel sorting station with stepper indexing, inductive metal detection, and servo flap actuation.</p>
        <table class="pinout-table">
          <thead><tr><th>Component</th><th>Driver / Sensor Pin</th><th>Arduino Uno Pin</th><th>Function / Notes</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">A4988 Stepper Driver</span></td><td>STEP / DIR</td><td>Digital D3 / D4</td><td>NEMA 17 Disc Rotation (1/16 microstep)</td></tr>
            <tr><td><span class="wire-badge wire-red">Inductive Proximity</span></td><td>Signal DO</td><td>Digital D2 (INT0)</td><td>Hardware Interrupt on Metallic Mass</td></tr>
            <tr><td><span class="wire-badge wire-blue">IR Proximity Sensor</span></td><td>Signal DO</td><td>Digital D5</td><td>Drop Detection Intake Trigger</td></tr>
            <tr><td><span class="wire-badge wire-yel">Flap SG90 Servo</span></td><td>PWM Signal</td><td>Digital D9 (PWM)</td><td>Sorting Flap (-45° / 0° / +45°)</td></tr>
            <tr><td><span class="wire-badge wire-red">12V 2A Adapter</span></td><td>VMOT / GND</td><td>A4988 Power Rail</td><td>100µF 35V Capacitor across VMOT-GND</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ Safety Protocol:</strong> Never connect/disconnect the NEMA 17 stepper motor while the A4988 driver is energized to protect the driver FETs from flyback breakdown.
        </div>
      `
    },
    'esp32-robot': {
      title: 'ESP32 Bipedal Walking Robot Gait & Joint Pinout',
      content: `
        <p class="modal-desc">4-DOF bipedal robot with synchronized hip & ankle joint kinematics and live serial telemetry.</p>
        <table class="pinout-table">
          <thead><tr><th>Joint Actuator</th><th>Servo Model</th><th>ESP32 GPIO Pin</th><th>PWM Channel / Angle Range</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">Right Hip Joint</span></td><td>MG996R (Metal Gear)</td><td>GPIO 18</td><td>LEDC Channel 0 (0°–180°)</td></tr>
            <tr><td><span class="wire-badge wire-yel">Left Hip Joint</span></td><td>MG996R (Metal Gear)</td><td>GPIO 19</td><td>LEDC Channel 1 (0°–180°)</td></tr>
            <tr><td><span class="wire-badge wire-blue">Right Ankle Joint</span></td><td>SG90 / MG90S</td><td>GPIO 22</td><td>LEDC Channel 2 (0°–180°)</td></tr>
            <tr><td><span class="wire-badge wire-blue">Left Ankle Joint</span></td><td>SG90 / MG90S</td><td>GPIO 23</td><td>LEDC Channel 3 (0°–180°)</td></tr>
            <tr><td><span class="wire-badge wire-red">Power Rails</span></td><td>UBEC 5V 5A</td><td>VCC / GND</td><td>Independent High-Current Servo Bus</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ Kinematics Optimization:</strong> ESP32 hardware LEDC PWM timers operate at 50Hz (20ms period) with 16-bit resolution for sub-degree positioning accuracy during walking cycles.
        </div>
      `
    },
    'rfid-access': {
      title: 'PIC16F877A RFID Secure Access Control Wiring',
      content: `
        <p class="modal-desc">Secure access validation system with RC522 RFID, 16x2 LCD authentication, and servo lock.</p>
        <table class="pinout-table">
          <thead><tr><th>Module</th><th>Module Pin</th><th>PIC16F877A Pin</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">RC522 RFID (SPI)</span></td><td>SDA, SCK, MOSI, MISO</td><td>RC2, RC3, RC5, RC4</td><td>Hardware SPI Bus (Master Mode)</td></tr>
            <tr><td><span class="wire-badge wire-blue">16x2 Character LCD</span></td><td>RS, E, D4, D5, D6, D7</td><td>RB0, RB1, RB2, RB3, RB4, RB5</td><td>4-Bit High-Speed Bus</td></tr>
            <tr><td><span class="wire-badge wire-yel">Door Lock Servo</span></td><td>PWM Control</td><td>RC1 (CCP2 / PWM)</td><td>Locked (0°) / Unlocked (90°)</td></tr>
            <tr><td><span class="wire-badge wire-red">Crystal Oscillator</span></td><td>OSC1 / OSC2</td><td>Pin 13 / 14</td><td>20MHz Ceramic with 22pF caps</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ Simulation Verified:</strong> Proteus VSM verified with full firmware timings and EEPROM authorization records.
        </div>
      `
    },
    'earthquake-system': {
      title: 'Earthquake Monitoring & Seismic Alarm Circuit',
      content: `
        <p class="modal-desc">Seismic vibration detection system utilizing MPU6050 6-DOF accelerometer and buzzer alarm.</p>
        <table class="pinout-table">
          <thead><tr><th>Component</th><th>Module Pin</th><th>Arduino Uno Pin</th><th>Protocol / Description</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">MPU-6050 IMU</span></td><td>SDA / SCL</td><td>A4 (SDA) / A5 (SCL)</td><td>I2C Bus (Address 0x68)</td></tr>
            <tr><td><span class="wire-badge wire-blue">IMU Interrupt</span></td><td>INT</td><td>Digital D2</td><td>Hardware Motion Interrupt Trigger</td></tr>
            <tr><td><span class="wire-badge wire-red">Piezo Buzzer</span></td><td>Positive (+)</td><td>Digital D8</td><td>High-Decibel Frequency Alarm</td></tr>
            <tr><td><span class="wire-badge wire-yel">Status LED Alert</span></td><td>Anode (+)</td><td>Digital D13</td><td>Visual Warning Light</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ Calibration Algorithm:</strong> The firmware applies a 100-sample moving average filter on startup to zero-out baseline gravitational acceleration on Z-axis.
        </div>
      `
    },
    'blynk-servo': {
      title: 'Blynk 2.0 Cloud IoT Servo Controller Wiring',
      content: `
        <p class="modal-desc">Dual-microcontroller wireless servo control suite for NodeMCU ESP8266 & ESP32.</p>
        <table class="pinout-table">
          <thead><tr><th>Servo Signal Wire</th><th>ESP8266 (NodeMCU) Pin</th><th>ESP32 DevKit Pin</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">Signal (Orange / Yellow)</span></td><td>D4 (GPIO 2)</td><td>GPIO 18</td><td>50Hz PWM Waveform</td></tr>
            <tr><td><span class="wire-badge wire-red">VCC (Red)</span></td><td>VIN (5V)</td><td>5V / VIN</td><td>External 5V supply recommended</td></tr>
            <tr><td><span class="wire-badge wire-blue">Ground (Brown / Black)</span></td><td>GND</td><td>GND</td><td>Common Ground</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ Cloud Telemetry:</strong> Virtual Pin V0 handles slider degree inputs (0–180°) with instant state synchronization on reconnection.
        </div>
      `
    },
    'esp-webserver': {
      title: 'ESP Async WebServer Servo Angle Controller Pinout',
      content: `
        <p class="modal-desc">Zero-dependency web interface with REST API endpoints for real-time local network servo control.</p>
        <table class="pinout-table">
          <thead><tr><th>Signal</th><th>Microcontroller Pin</th><th>Voltage Level</th><th>Function</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">PWM Control</span></td><td>GPIO 18</td><td>3.3V Logic</td><td>Direct 50Hz Servo Waveform</td></tr>
            <tr><td><span class="wire-badge wire-red">Power VCC</span></td><td>5V / VIN</td><td>5.0V DC</td><td>Servo Motor Drive</td></tr>
            <tr><td><span class="wire-badge wire-blue">Ground</span></td><td>GND</td><td>0V</td><td>Ground Return</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ HTTP Endpoints:</strong> Endpoint <code>/servo?deg=90</code> accepts direct GET requests for automation scripts and web sliders.
        </div>
      `
    },
    'rain-sensor': {
      title: 'Arduino Rain Sensor Auto Shutter Pinout',
      content: `
        <p class="modal-desc">Precipitation comparator and servo mechanical cover deployment mechanism for weather protection.</p>
        <table class="pinout-table">
          <thead><tr><th>Sensor Board Pin</th><th>Arduino Pin</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">Analog AO</span></td><td>A0</td><td>Analog Input</td><td>Rain Intensity ADC (0–1023)</td></tr>
            <tr><td><span class="wire-badge wire-blue">Digital DO</span></td><td>D2</td><td>Digital Input</td><td>LM393 Comparator Threshold Trigger</td></tr>
            <tr><td><span class="wire-badge wire-red">Servo PWM</span></td><td>D9 (PWM)</td><td>PWM Output</td><td>Mechanical Shutter Deployment (0°/90°)</td></tr>
          </tbody>
        </table>
        <div class="pinout-notes">
          <strong>⚡ Corrosion Protection:</strong> The sensor plate excitation voltage is pulsed only during ADC readings to prevent electrolytic track erosion.
        </div>
      `
    }
  };

  pinoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = PINOUT_DATABASE[projKey];
      if (data && modalBackdrop && modalTitle && modalBody) {
        modalTitle.innerHTML = `<i class="fa-solid fa-microchip"></i> ${data.title}`;
        modalBody.innerHTML = data.content;
        modalBackdrop.classList.add('active');
        playSynthSound(650, 'sine', 0.1, 0.08);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 9. 3D Parallax Tilt on Cards
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ------------------------------------------------------------------------
  // 10. Scroll-Triggered Reveal Animations
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));

  // ------------------------------------------------------------------------
  // 11. Live Terminal HUD Feed & Interactive Commands
  // ------------------------------------------------------------------------
  const hudConsole = document.getElementById('hud-console');
  const btnPing = document.getElementById('btn-ping');
  const btnDiag = document.getElementById('btn-diag');
  const btnClear = document.getElementById('btn-clear');

  const liveTelemetryPool = [
    { type: 'info', tag: 'ESP32', msg: 'FreeRTOS Core 1 Gait Loop: 50Hz Stable | Ankle Angle: 92.4°' },
    { type: 'warning', tag: 'STEPPER', msg: 'NEMA 17 Microstep Indexing: 3200 steps/rev | Speed: 800 RPM' },
    { type: 'primary', tag: 'SENSOR', msg: 'Inductive Proximity: Ferrous item detected in intake chute' },
    { type: 'info', tag: 'BLYNK', msg: 'Heartbeat OK | Latency: 22ms | RSSI: -52 dBm' },
    { type: 'success', tag: 'WEB-UI', msg: 'Client connected: /servo/angle?deg=180 [HTTP 200 OK]' },
    { type: 'dim', tag: 'ADC', msg: 'Rain Sensor ADC Channel 0: 1023 (Calibrated Dry Baseline)' },
    { type: 'primary', tag: 'ROBOT', msg: 'SpyBot Cam Stream: 30 FPS MJPEG | Motor PWM 85% Active' }
  ];

  if (hudConsole) {
    let poolIndex = 0;
    setInterval(() => {
      const item = liveTelemetryPool[poolIndex % liveTelemetryPool.length];
      poolIndex++;
      const line = document.createElement('div');
      line.className = `hud-line ${item.type}`;
      line.innerHTML = `<span class="hud-prompt">[${item.tag}]</span> ${item.msg}`;
      hudConsole.appendChild(line);
      hudConsole.scrollTop = hudConsole.scrollHeight;

      while (hudConsole.children.length > 12) {
        hudConsole.removeChild(hudConsole.firstChild);
      }
    }, 3000);

    if (btnPing) {
      btnPing.addEventListener('click', () => {
        const line = document.createElement('div');
        line.className = 'hud-line info';
        line.innerHTML = `<span class="hud-prompt">[PING]</span> Bus Latency: 11ms | All 8 peripheral hardware nodes ONLINE`;
        hudConsole.appendChild(line);
        hudConsole.scrollTop = hudConsole.scrollHeight;
        playSynthSound(800, 'sine', 0.1, 0.08);
      });
    }

    if (btnDiag) {
      btnDiag.addEventListener('click', () => {
        const line = document.createElement('div');
        line.className = 'hud-line success';
        line.innerHTML = `<span class="hud-prompt">[DIAG]</span> PWM Timers: PASS | I2C Bus: 400kHz PASS | FreeRTOS Heap: 184 KB Free`;
        hudConsole.appendChild(line);
        hudConsole.scrollTop = hudConsole.scrollHeight;
        playSynthSound(950, 'triangle', 0.12, 0.08);
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        hudConsole.innerHTML = '<div class="hud-line dim"><span class="hud-prompt">[SYSTEM]</span> Telemetry buffer cleared. Streaming live bus events...</div>';
        playSynthSound(350, 'sine', 0.06, 0.06);
      });
    }
  }

  // ------------------------------------------------------------------------
  // 12. Project Filtering & Search
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      applyFilterAndSearch(filter, searchInput ? searchInput.value.toLowerCase() : '');
      playSynthSound(550, 'sine', 0.04, 0.04);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeBtn = document.querySelector('.filter-btn.active');
      const currentFilter = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      applyFilterAndSearch(currentFilter, e.target.value.toLowerCase());
    });
  }

  function applyFilterAndSearch(filter, searchTerm) {
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesFilter = (filter === 'all' || category === filter);
      const matchesSearch = !searchTerm || text.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 13. Copy Email to Clipboard
  // ------------------------------------------------------------------------
  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = 'alwintr2003@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
        playSynthSound(850, 'sine', 0.1, 0.08);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 14. Toast Notification Manager
  // ------------------------------------------------------------------------
  function showToast(msg) {
    const toast = document.getElementById('cyber-toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }
});
