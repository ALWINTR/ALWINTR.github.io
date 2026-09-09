// ==========================================================================
// ALWINTR Mega High Performance Animation, SFX & Simulator Engine
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

  function playSynthSound(freq, type = 'sine', duration = 0.06, gainLevel = 0.08) {
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
      // Audio not permitted without interaction
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
        playSynthSound(600, 'sine', 0.08, 0.1);
        showToast('Cyber SFX Enabled');
      } else {
        sfxIcon.className = 'fa-solid fa-volume-xmark';
        sfxText.textContent = 'SFX: OFF';
        showToast('Cyber SFX Muted');
      }
    });
  }

  // ------------------------------------------------------------------------
  // 2. Custom Cyber Red Cursor
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

    const clickables = document.querySelectorAll('a, button, input, .project-card, .stat-card, .skill-category, .sim-card');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width = '55px';
          ring.style.height = '55px';
          ring.style.borderColor = 'rgba(255, 23, 68, 0.95)';
          ring.style.boxShadow = '0 0 25px rgba(255, 23, 68, 0.6)';
        }
        playSynthSound(750, 'sine', 0.03, 0.03);
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
    const count = Math.min(Math.floor((width * height) / 13000), 90);
    const redColors = ['#ff1744', '#ef4444', '#ff4d6d', '#ff5252', '#ff8a9b'];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 2.2 + 1,
        color: redColors[Math.floor(Math.random() * redColors.length)]
      });
    }

    let canvasMouseX = -1000;
    let canvasMouseY = -1000;
    window.addEventListener('mousemove', (e) => {
      canvasMouseX = e.clientX;
      canvasMouseY = e.clientY;
    });

    function animateCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const dxMouse = canvasMouseX - p1.x;
        const dyMouse = canvasMouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          p1.x += dxMouse * 0.018;
          p1.y += dyMouse * 0.018;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${(1 - dist / 135) * 0.32})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  // ------------------------------------------------------------------------
  // 4. Dynamic Typewriter Animation
  // ------------------------------------------------------------------------
  const typewriterEl = document.getElementById('typewriter');
  const roles = [
    'Embedded Systems & Robotics',
    'ESP32 & IoT Architecture',
    'Automated Sensor Systems',
    'Motor & Kinematics Control',
    'PIC & Arduino Firmware'
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function typeLoop() {
    const currentRole = roles[roleIdx];
    if (isDeleting) {
      typewriterEl.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }
  if (typewriterEl) typeLoop();

  // ------------------------------------------------------------------------
  // 5. Virtual Servo 2D Physics Simulator Canvas
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
  let autoSweepActive = false;
  let autoSweepDir = 1;

  if (servoCanvas) {
    const sCtx = servoCanvas.getContext('2d');

    function drawServo() {
      // Smooth interpolation
      currentAngle += (targetAngle - currentAngle) * 0.15;

      const w = servoCanvas.width;
      const h = servoCanvas.height;
      const centerX = w / 2;
      const centerY = h - 35;

      sCtx.clearRect(0, 0, w, h);

      // Draw Protractor Arc (0 to 180 deg)
      sCtx.beginPath();
      sCtx.arc(centerX, centerY, 120, Math.PI, 0, false);
      sCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      sCtx.lineWidth = 14;
      sCtx.stroke();

      // Active Arc Trail
      const radAngle = Math.PI - (currentAngle * Math.PI / 180);
      sCtx.beginPath();
      sCtx.arc(centerX, centerY, 120, Math.PI, radAngle, true);
      sCtx.strokeStyle = '#ef4444';
      sCtx.lineWidth = 14;
      sCtx.shadowBlur = 15;
      sCtx.shadowColor = '#ff1744';
      sCtx.stroke();
      sCtx.shadowBlur = 0;

      // Degree Tick Marks
      for (let a = 0; a <= 180; a += 30) {
        const tickRad = Math.PI - (a * Math.PI / 180);
        const x1 = centerX + Math.cos(tickRad) * 105;
        const y1 = centerY - Math.sin(tickRad) * 105;
        const x2 = centerX + Math.cos(tickRad) * 135;
        const y2 = centerY - Math.sin(tickRad) * 135;

        sCtx.beginPath();
        sCtx.moveTo(x1, y1);
        sCtx.lineTo(x2, y2);
        sCtx.strokeStyle = a === 90 ? '#ff1744' : 'rgba(255, 255, 255, 0.3)';
        sCtx.lineWidth = a === 90 ? 3 : 1.5;
        sCtx.stroke();
      }

      // Draw Servo Horn Arm
      const armLength = 110;
      const armX = centerX + Math.cos(radAngle) * armLength;
      const armY = centerY - Math.sin(radAngle) * armLength;

      sCtx.beginPath();
      sCtx.moveTo(centerX, centerY);
      sCtx.lineTo(armX, armY);
      sCtx.strokeStyle = '#f8fafc';
      sCtx.lineWidth = 6;
      sCtx.lineCap = 'round';
      sCtx.shadowBlur = 12;
      sCtx.shadowColor = '#ffffff';
      sCtx.stroke();
      sCtx.shadowBlur = 0;

      // Draw Horn Center Hub
      sCtx.beginPath();
      sCtx.arc(centerX, centerY, 18, 0, Math.PI * 2);
      sCtx.fillStyle = '#1e0c14';
      sCtx.fill();
      sCtx.lineWidth = 4;
      sCtx.strokeStyle = '#ff1744';
      sCtx.stroke();

      // Horn Tip Dot
      sCtx.beginPath();
      sCtx.arc(armX, armY, 7, 0, Math.PI * 2);
      sCtx.fillStyle = '#ff1744';
      sCtx.shadowBlur = 12;
      sCtx.shadowColor = '#ff1744';
      sCtx.fill();
      sCtx.shadowBlur = 0;

      // Update Telemetry Display
      const roundedAngle = Math.round(currentAngle);
      const pulseUs = Math.round(544 + (roundedAngle / 180) * (2400 - 544));
      const dutyPct = ((pulseUs / 20000) * 100).toFixed(1);

      if (dispAngle) dispAngle.textContent = `${roundedAngle}°`;
      if (dispUs) dispUs.textContent = `${pulseUs} µs`;
      if (dispDuty) dispDuty.textContent = `${dutyPct}%`;

      // Auto-Sweep Loop
      if (autoSweepActive) {
        targetAngle += autoSweepDir * 1.5;
        if (targetAngle >= 180) {
          targetAngle = 180;
          autoSweepDir = -1;
        } else if (targetAngle <= 0) {
          targetAngle = 0;
          autoSweepDir = 1;
        }
        if (servoSlider) servoSlider.value = targetAngle;
        if (sliderVal) sliderVal.textContent = `${Math.round(targetAngle)}°`;
      }

      requestAnimationFrame(drawServo);
    }
    drawServo();

    if (servoSlider) {
      servoSlider.addEventListener('input', (e) => {
        autoSweepActive = false;
        if (btnAutoSweep) btnAutoSweep.classList.remove('active');
        targetAngle = +e.target.value;
        if (sliderVal) sliderVal.textContent = `${targetAngle}°`;
        playSynthSound(300 + targetAngle * 4, 'sawtooth', 0.04, 0.04);
      });
    }

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        autoSweepActive = false;
        if (btnAutoSweep) btnAutoSweep.classList.remove('active');
        targetAngle = +btn.getAttribute('data-angle');
        if (servoSlider) servoSlider.value = targetAngle;
        if (sliderVal) sliderVal.textContent = `${targetAngle}°`;
        playSynthSound(500, 'sine', 0.08, 0.08);
      });
    });

    if (btnAutoSweep) {
      btnAutoSweep.addEventListener('click', () => {
        autoSweepActive = !autoSweepActive;
        btnAutoSweep.classList.toggle('active', autoSweepActive);
        playSynthSound(650, 'triangle', 0.1, 0.09);
      });
    }
  }

  // ------------------------------------------------------------------------
  // 6. Virtual Waste Sorting Simulator
  // ------------------------------------------------------------------------
  const dropButtons = document.querySelectorAll('.drop-btn');
  const indSensor = document.getElementById('ind-sensor');
  const indStatus = document.getElementById('ind-status');
  const stepperDisc = document.getElementById('stepper-disc');
  const flapGate = document.getElementById('flap-gate');
  const flapStatus = document.getElementById('flap-status');
  const sorterLog = document.getElementById('sorter-log');

  dropButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      playSynthSound(400, 'square', 0.06, 0.08);
      simulateSorting(type);
    });
  });

  function simulateSorting(itemType) {
    if (!indSensor || !stepperDisc) return;

    indSensor.classList.remove('triggered');
    indStatus.textContent = 'SCANNING...';

    if (itemType === 'metal') {
      setTimeout(() => {
        indSensor.classList.add('triggered');
        indStatus.textContent = 'METALLIC DETECTED (HIGH)';
        stepperDisc.style.transform = 'rotate(180deg)';
        flapStatus.textContent = 'CHUTE A (+45°)';
        sorterLog.innerHTML = '<i class="fa-solid fa-magnet"></i> Metal item detected! Stepper index -> Metal Bin.';
        playSynthSound(880, 'sine', 0.15, 0.12);
      }, 400);
    } else if (itemType === 'dry') {
      setTimeout(() => {
        indStatus.textContent = 'NON-METALLIC (LOW)';
        stepperDisc.style.transform = 'rotate(90deg)';
        flapStatus.textContent = 'CHUTE B (0°)';
        sorterLog.innerHTML = '<i class="fa-solid fa-box"></i> Dry recyclable detected! Stepper index -> Dry Bin.';
        playSynthSound(520, 'sine', 0.15, 0.1);
      }, 400);
    } else if (itemType === 'wet') {
      setTimeout(() => {
        indStatus.textContent = 'ORGANIC MOISTURE';
        stepperDisc.style.transform = 'rotate(270deg)';
        flapStatus.textContent = 'CHUTE C (-45°)';
        sorterLog.innerHTML = '<i class="fa-solid fa-apple-whole"></i> Wet organic waste detected! Stepper index -> Compost Bin.';
        playSynthSound(440, 'sine', 0.15, 0.1);
      }, 400);
    }
  }

  // ------------------------------------------------------------------------
  // 7. Circuit Pinout Guide Modal Drawer
  // ------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const pinoutBtns = document.querySelectorAll('.btn-pinout');

  const PINOUT_DATA = {
    'esp32-robot': {
      title: 'ESP32 Bipedal Robot Wiring Table',
      content: `
        <p style="color: #cbd5e1; margin-bottom: 1rem;">High-current servo control configuration using ESP32 DevKit V1 and external 5V 3A UBEC power supply.</p>
        <table class="pinout-table">
          <thead><tr><th>Component</th><th>Wire / Signal</th><th>ESP32 GPIO</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>Right Hip Servo</td><td><span class="wire-badge wire-yel">PWM Signal</span></td><td>GPIO 18</td><td>Left/Right Gait Trajectory</td></tr>
            <tr><td>Left Hip Servo</td><td><span class="wire-badge wire-yel">PWM Signal</span></td><td>GPIO 19</td><td>Synchronized 180° Motion</td></tr>
            <tr><td>Right Ankle Servo</td><td><span class="wire-badge wire-blue">PWM Signal</span></td><td>GPIO 21</td><td>Roll & Balance Correction</td></tr>
            <tr><td>Left Ankle Servo</td><td><span class="wire-badge wire-blue">PWM Signal</span></td><td>GPIO 22</td><td>Roll & Balance Correction</td></tr>
            <tr><td>Power Rails</td><td><span class="wire-badge wire-red">5V VCC</span></td><td>External UBEC</td><td>Servo Power (Prevents ESP32 Reset)</td></tr>
            <tr><td>Common Ground</td><td><span class="wire-badge wire-blk">GND</span></td><td>GND Pin</td><td>Common Ground Reference</td></tr>
          </tbody>
        </table>
      `
    },
    'waste-segregation': {
      title: 'Smart Waste Segregation Circuit Pinout',
      content: `
        <p style="color: #cbd5e1; margin-bottom: 1rem;">Microstepping driver & multi-sensor classification layout for Arduino Uno.</p>
        <table class="pinout-table">
          <thead><tr><th>Component</th><th>Driver / Sensor Pin</th><th>Arduino Pin</th><th>Function</th></tr></thead>
          <tbody>
            <tr><td>A4988 Stepper</td><td><span class="wire-badge wire-yel">STEP</span></td><td>Pin 3 (D3)</td><td>Step Pulse Clock</td></tr>
            <tr><td>A4988 Stepper</td><td><span class="wire-badge wire-blue">DIR</span></td><td>Pin 4 (D4)</td><td>Direction Control</td></tr>
            <tr><td>Inductive Sensor</td><td><span class="wire-badge wire-red">OUT (Opto-Isolated)</span></td><td>Pin 2 (Interrupt)</td><td>Metallic Object Trigger</td></tr>
            <tr><td>IR Proximity</td><td><span class="wire-badge wire-yel">Digital OUT</span></td><td>Pin 7 (D7)</td><td>Object Present in Chute</td></tr>
            <tr><td>Sorting Servo</td><td><span class="wire-badge wire-blue">PWM Signal</span></td><td>Pin 9 (PWM)</td><td>Flap Deflector Angle</td></tr>
          </tbody>
        </table>
      `
    },
    'blynk-servo': {
      title: 'Blynk 2.0 Servo Controller Circuit',
      content: `
        <p style="color: #cbd5e1; margin-bottom: 1rem;">Dual-board wiring reference for NodeMCU ESP8266 and ESP32 DevKit.</p>
        <table class="pinout-table">
          <thead><tr><th>Servo Wire</th><th>ESP8266 Pin</th><th>ESP32 Pin</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">Signal (Orange)</span></td><td>D4 (GPIO 2)</td><td>GPIO 18</td><td>PWM Timer Channel</td></tr>
            <tr><td><span class="wire-badge wire-red">VCC (Red)</span></td><td>VIN (5V)</td><td>5V / VIN</td><td>External 5V supply recommended</td></tr>
            <tr><td><span class="wire-badge wire-blk">GND (Brown)</span></td><td>GND</td><td>GND</td><td>Common Ground</td></tr>
          </tbody>
        </table>
      `
    },
    'esp-webserver': {
      title: 'ESP Webserver Servo Pinout',
      content: `
        <p style="color: #cbd5e1; margin-bottom: 1rem;">High-frequency hardware PWM timer pin configuration.</p>
        <table class="pinout-table">
          <thead><tr><th>Signal</th><th>Pin</th><th>Voltage</th><th>Function</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">PWM Control</span></td><td>GPIO 18</td><td>3.3V Logic</td><td>Direct 50Hz Servo Waveform</td></tr>
            <tr><td><span class="wire-badge wire-red">Power VCC</span></td><td>5V / VIN</td><td>5.0V DC</td><td>Servo Motor Drive</td></tr>
            <tr><td><span class="wire-badge wire-blk">Ground</span></td><td>GND</td><td>0V</td><td>Ground Return</td></tr>
          </tbody>
        </table>
      `
    },
    'rain-sensor': {
      title: 'Rain Sensor Auto Shutter Pinout',
      content: `
        <p style="color: #cbd5e1; margin-bottom: 1rem;">Raindrop analog comparator & servo mechanism wiring for Arduino Uno.</p>
        <table class="pinout-table">
          <thead><tr><th>Sensor Board</th><th>Arduino Pin</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><span class="wire-badge wire-yel">Analog AO</span></td><td>A0</td><td>Rain Intensity ADC (0–1023)</td></tr>
            <tr><td><span class="wire-badge wire-blue">Digital DO</span></td><td>D2</td><td>Adjustable Potentiometer Threshold</td></tr>
            <tr><td><span class="wire-badge wire-red">Servo PWM</span></td><td>D9 (PWM)</td><td>Mechanical Shutter Angle (0°/90°)</td></tr>
          </tbody>
        </table>
      `
    }
  };

  pinoutBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = PINOUT_DATA[projKey];
      if (data && modalBackdrop && modalTitle && modalBody) {
        modalTitle.innerHTML = `<i class="fa-solid fa-microchip"></i> ${data.title}`;
        modalBody.innerHTML = data.content;
        modalBackdrop.classList.add('active');
        playSynthSound(650, 'sine', 0.1, 0.1);
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
  // 8. 3D Parallax Tilt on Cards
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ------------------------------------------------------------------------
  // 9. Scroll-Triggered Reveal Animations & Counters
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

  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1500;
          const step = target / (duration / 25);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.ceil(current);
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-row');
  if (statsSection) counterObserver.observe(statsSection);

  // ------------------------------------------------------------------------
  // 10. Live Terminal HUD Feed
  // ------------------------------------------------------------------------
  const hudConsole = document.getElementById('hud-console');
  const btnPing = document.getElementById('btn-ping');
  const btnClear = document.getElementById('btn-clear');

  const liveTelemetryPool = [
    { type: 'info', tag: 'ESP32', msg: 'Core 1 Gait Loop: 50Hz stable | Ankle angle: 92.4°' },
    { type: 'warning', tag: 'STEPPER', msg: 'NEMA 17 Microstep: 3200 steps/rev | Speed: 800 RPM' },
    { type: 'primary', tag: 'SENSOR', msg: 'Inductive Proximity: Ferrous item detected in chute' },
    { type: 'info', tag: 'BLYNK', msg: 'Heartbeat OK | Latency: 24ms | RSSI: -54 dBm' },
    { type: 'success', tag: 'WEB-UI', msg: 'Client connected: /servo/angle?deg=180 [HTTP 200]' },
    { type: 'dim', tag: 'RAIN', msg: 'Analog ADC Value: 1023 (Dry State)' },
    { type: 'primary', tag: 'ROBOT', msg: 'Right Hip Servo PWM: 1500us -> Center position locked' }
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

      while (hudConsole.children.length > 10) {
        hudConsole.removeChild(hudConsole.firstChild);
      }
    }, 3200);

    if (btnPing) {
      btnPing.addEventListener('click', () => {
        const line = document.createElement('div');
        line.className = 'hud-line info';
        line.innerHTML = `<span class="hud-prompt">[PING]</span> Gateway response: 12ms | All 8 peripheral buses ACTIVE`;
        hudConsole.appendChild(line);
        hudConsole.scrollTop = hudConsole.scrollHeight;
        playSynthSound(800, 'sine', 0.12, 0.1);
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        hudConsole.innerHTML = '<div class="hud-line dim"><span class="hud-prompt">[SYSTEM]</span> Console cleared. Telemetry streaming...</div>';
        playSynthSound(350, 'triangle', 0.08, 0.08);
      });
    }
  }

  // ------------------------------------------------------------------------
  // 11. Project Filtering & Search
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      applyFilters(filterValue, searchInput ? searchInput.value.toLowerCase().trim() : '');
      playSynthSound(480, 'sine', 0.06, 0.08);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activeFilterBtn = document.querySelector('.filter-btn.active');
      const filterValue = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
      applyFilters(filterValue, e.target.value.toLowerCase().trim());
    });
  }

  function applyFilters(category, query) {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = card.textContent.toLowerCase();

      const matchesCategory = (category === 'all' || cardCategory === category);
      const matchesQuery = (!query || cardText.includes(query));

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 12. Toast Notification Helper
  // ------------------------------------------------------------------------
  function showToast(msg) {
    const toast = document.getElementById('cyber-toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toast && toastMsg) {
      toastMsg.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2500);
    }
  }

  // ------------------------------------------------------------------------
  // 13. Navbar Scroll Effect
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});
