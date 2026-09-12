// ==========================================================================
// ALWINTR Cosmic Milky Way & Interactive Robotics Portfolio Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Custom Cosmic Cyan Cursor (Desktop Only)
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

    const clickables = document.querySelectorAll('a, button, input, .project-card, .domain-card, .matrix-card, .holo-card');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width = '48px';
          ring.style.height = '48px';
          ring.style.borderColor = 'rgba(0, 240, 255, 0.95)';
          ring.style.boxShadow = '0 0 22px rgba(0, 240, 255, 0.6)';
        }
      });
      el.addEventListener('mouseleave', () => {
        if (ring) {
          ring.style.width = '32px';
          ring.style.height = '32px';
          ring.style.borderColor = 'rgba(0, 240, 255, 0.7)';
          ring.style.boxShadow = 'none';
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Realistic Milky Way Galaxy Canvas & Shooting Stars Engine
  // ------------------------------------------------------------------------
  const galaxyCanvas = document.getElementById('galaxy-canvas');
  if (galaxyCanvas) {
    const ctx = galaxyCanvas.getContext('2d');
    let width = galaxyCanvas.width = window.innerWidth;
    let height = galaxyCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = galaxyCanvas.width = window.innerWidth;
      height = galaxyCanvas.height = window.innerHeight;
    });

    // Generate Milky Way Stars
    const stars = [];
    const starColors = ['#ffffff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#00f0ff', '#818cf8'];
    const starCount = Math.min(Math.floor((width * height) / 3800), 320);

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18
      });
    }

    // Generate Milky Way Cosmic Band Particles
    const bandParticles = [];
    const bandCount = 120;
    for (let i = 0; i < bandCount; i++) {
      bandParticles.push({
        dist: Math.random() * width * 1.2 - width * 0.1,
        spread: (Math.random() - 0.5) * 220,
        radius: Math.random() * 3.5 + 1.2,
        color: Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(99, 102, 241,',
        alpha: Math.random() * 0.45 + 0.15,
        speed: Math.random() * 0.2 + 0.05
      });
    }

    // Shooting Stars (Meteors)
    const meteors = [];
    function spawnMeteor() {
      if (meteors.length < 2 && Math.random() < 0.02) {
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 7 + 9,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
          alpha: 1
        });
      }
    }

    let mouseXPos = -1000;
    let mouseYPos = -1000;

    window.addEventListener('mousemove', (e) => {
      mouseXPos = e.clientX;
      mouseYPos = e.clientY;
    });

    function drawMilkyWay() {
      ctx.clearRect(0, 0, width, height);

      // Draw Milky Way Central Diagonal Glow Band
      const angle = -Math.PI / 6;
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(angle);

      const grad = ctx.createLinearGradient(0, -180, 0, 180);
      grad.addColorStop(0, 'rgba(0, 240, 255, 0)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.04)');
      grad.addColorStop(0.5, 'rgba(0, 240, 255, 0.09)');
      grad.addColorStop(0.7, 'rgba(99, 102, 241, 0.04)');
      grad.addColorStop(1, 'rgba(99, 102, 241, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(-width, -180, width * 2, 360);
      ctx.restore();

      // Render Milky Way Dust
      bandParticles.forEach(bp => {
        bp.dist += bp.speed;
        if (bp.dist > width * 1.2) bp.dist = -width * 0.1;

        const bx = bp.dist;
        const by = (height * 0.35) + (bp.dist * 0.35) + bp.spread;

        ctx.beginPath();
        ctx.arc(bx, by, bp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${bp.color} ${bp.alpha})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Twinkling Stars
      stars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.twinklePhase += s.twinkleSpeed;

        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        const currentAlpha = Math.max(0.1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.4);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Mouse Starlight Magnet
        const dx = s.x - mouseXPos;
        const dy = s.y - mouseYPos;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(mouseXPos, mouseYPos);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Render Meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const meteorGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        meteorGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
        meteorGrad.addColorStop(0.3, `rgba(0, 240, 255, ${m.alpha * 0.8})`);
        meteorGrad.addColorStop(1, `rgba(99, 102, 241, 0)`);

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(drawMilkyWay);
    }
    drawMilkyWay();
  }

  // ------------------------------------------------------------------------
  // 3. Typewriter Title Rotation
  // ------------------------------------------------------------------------
  const typewriter = document.getElementById('typewriter');
  const phrases = [
    "Autonomous Mobile Robots (AMR)",
    "ESP32 & Real-Time Firmware (FreeRTOS)",
    "Multi-Axis Joint Kinematics",
    "ROS2 & Gazebo Physical Simulation",
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
  // 4. 3D Parallax Tilt on Cards
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
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ------------------------------------------------------------------------
  // 5. Scroll-Triggered Reveal Animations
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
  // 6. Project Filtering & Search
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
  // 7. Copy Email to Clipboard
  // ------------------------------------------------------------------------
  const btnCopyEmail = document.getElementById('btn-copy-email');
  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
      const email = 'alwintr2003@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. Toast Notification Manager
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
