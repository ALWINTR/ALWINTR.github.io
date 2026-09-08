// ==========================================================================
// ALWINTR High Performance Animation & Interactivity Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Smooth Cyber Cursor
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

    // Hover effect on interactive elements
    const clickables = document.querySelectorAll('a, button, input, .project-card, .stat-card');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width = '55px';
          ring.style.height = '55px';
          ring.style.borderColor = 'rgba(6, 182, 212, 0.9)';
          ring.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.4)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (ring) {
          ring.style.width = '32px';
          ring.style.height = '32px';
          ring.style.borderColor = 'rgba(99, 102, 241, 0.6)';
          ring.style.boxShadow = 'none';
        }
      });
    });
  }

  // 2. Interactive Background Particle / Constellation Canvas
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

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? '#6366f1' : '#06b6d4'
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

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce bounds
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse attraction
        const dxMouse = canvasMouseX - p1.x;
        const dyMouse = canvasMouseY - p1.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 140) {
          p1.x += dxMouse * 0.015;
          p1.y += dyMouse * 0.015;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p1.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 130) * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();
  }

  // 3. Dynamic Typewriter Animation
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
      typeSpeed = 1800; // Pause at end
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(typeLoop, typeSpeed);
  }
  if (typewriterEl) typeLoop();

  // 4. 3D Parallax Tilt on Cards
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

  // 5. Scroll-Triggered Reveal Animations
  const revealElements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => observer.observe(el));

  // 6. Number Counter Animation
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

  // 7. Interactive Live Terminal HUD Feed
  const hudConsole = document.getElementById('hud-console');
  const btnPing = document.getElementById('btn-ping');
  const btnClear = document.getElementById('btn-clear');

  const liveTelemetryPool = [
    { type: 'success', tag: 'ESP32', msg: 'Core 1 Gait Loop: 50Hz stable | Ankle angle: 92.4°' },
    { type: 'warning', tag: 'STEPPER', msg: 'NEMA 17 Microstep: 3200 steps/rev | Speed: 800 RPM' },
    { type: 'info', tag: 'SENSOR', msg: 'Inductive Proximity: Ferrous item detected in chute' },
    { type: 'primary', tag: 'BLYNK', msg: 'Heartbeat OK | Latency: 24ms | RSSI: -54 dBm' },
    { type: 'success', tag: 'WEB-UI', msg: 'Client connected: /servo/angle?deg=180 [HTTP 200]' },
    { type: 'dim', tag: 'RAIN', msg: 'Analog ADC Value: 1023 (Dry State)' },
    { type: 'warning', tag: 'ROBOT', msg: 'Right Hip Servo PWM: 1500us -> Center position locked' }
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

      // Keep only last 10 lines
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
      });
    }

    if (btnClear) {
      btnClear.addEventListener('click', () => {
        hudConsole.innerHTML = '<div class="hud-line dim"><span class="hud-prompt">[SYSTEM]</span> Console cleared. Telemetry streaming...</div>';
      });
    }
  }

  // 8. Project Filter Buttons & Real-Time Search
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      applyFilters(filterValue, searchInput ? searchInput.value.toLowerCase().trim() : '');
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

  // 9. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});
