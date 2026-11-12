/**
 * ALWIN T R | Professional Embedded Systems & Robotics Portfolio Engine
 * Author: Alwin T R (alwintr2003@gmail.com)
 * Pure vanilla JavaScript - 0 external dependencies, high performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. Flagship Engineering Specifications & BOM Registry
  // ==========================================================================
  const PROJECTS_SPECS_DATA = {
    'biped': {
      id: 'biped',
      repo: 'ESP32-6-DOF-Bipedal-Walking-Robot-with-FreeRTOS-Kinematics',
      title: 'ESP32 6-DOF Bipedal Walking Robot with FreeRTOS Kinematics',
      badges: ['ESP32 Dual-Core', 'FreeRTOS Microkernel', 'PCA9685 I2C', 'Inverse Kinematics'],
      desc: 'Real-time multi-joint bipedal locomotion controller utilizing FreeRTOS dual-core task isolation, closed-form 2D inverse kinematics, and quintic polynomial zero-jerk trajectories.',
      diagram: 
`+---------------------------------------------------------------------------------+
|                                 ESP32 Dual-Core SoC                             |
|  +-------------------------------------+   +---------------------------------+  |
|  |           Core 0 (Networking)       |   |       Core 1 (Locomotion Engine)|  |
|  | * Async Web Telemetry Server        |   | * 50Hz Real-Time Control Loop   |  |
|  | * Wi-Fi AP & WebSocket Telemetry    |   | * Quintic Zero-Jerk Trajectory  |  |
|  | * NVS Flash Parameter Calibration   |   | * Closed-Form 2D/3D Kinematics  |  |
|  +-------------------------------------+   +---------------------------------+  |
+-----------------------------------------------------------+---------------------+
                                                            | Fast-Mode I2C (400kHz)
                                                            | SDA: GPIO 21 / SCL: GPIO 22
                                                            v
+---------------------------------------------------------------------------------+
|                       PCA9685 16-Channel 12-Bit PWM Driver                       |
+---------------------------------------------------------------------------------+
     |           |           |              |              |              |
     | Ch 0      | Ch 1      | Ch 2         | Ch 3         | Ch 4         | Ch 5
     v           v           v              v              v              v
[Left Hip]  [Left Knee] [Left Ankle]   [Right Hip]   [Right Knee]   [Right Ankle]
 (MG996R)    (MG996R)    (MG996R)       (MG996R)      (MG996R)       (MG996R)`,
      bom: [
        ['ESP32 NodeMCU (Xtensa LX6)', '5.0V / 3.3V Logic', 'Master dual-core microkernel controller'],
        ['PCA9685 16-Ch PWM Board', '5.0V Logic / 6V V+', '12-bit hardware servo PWM generator over I2C'],
        ['6x TowerPro MG996R Servos', '6.0V DC (11 kg-cm)', 'High-torque metal-gear joint actuators'],
        ['LM2596 DC-DC Buck Converter', '7.4V -> 6.0V / 5A', 'Dedicated high-current servo power rail'],
        ['2S LiPo Battery (7.4V 2200mAh)', '7.4V Nominal', 'High-discharge power source for dynamic locomotion']
      ],
      pinout: [
        ['ESP32 GPIO 21', 'PCA9685 SDA', 'Hardware I2C Data (400kHz Fast-Mode)'],
        ['ESP32 GPIO 22', 'PCA9685 SCL', 'Hardware I2C Clock (400kHz Fast-Mode)'],
        ['ESP32 GND', 'Common System Ground', 'Shared digital & analog reference rail'],
        ['PCA9685 Ch 0 - 2', 'Left Leg Joint Servos', 'Hip Roll, Knee Pitch, Ankle Roll (12-bit PWM)'],
        ['PCA9685 Ch 3 - 5', 'Right Leg Joint Servos', 'Hip Roll, Knee Pitch, Ankle Roll (12-bit PWM)']
      ],
      firmware: 'Dual-core task architecture: Core 1 executes a deterministic 50Hz (20ms) FreeRTOS locomotion task computing parametric quintic easing curves for smooth foot swing clearance, while Core 0 handles asynchronous HTTP/WebSocket telemetry and real-time gait parameter updates without inducing microsecond jitter into motor pulses.'
    },

    'radar-ld2410c': {
      id: 'radar-ld2410c',
      repo: '24GHz-mmWave-Human-Presence-and-Micro-Motion-Radar-Monitor',
      title: '24GHz mmWave Human Presence & Micro-Motion Radar Monitor',
      badges: ['24GHz FMCW Radar', 'ESP32', 'Non-Blocking UART', '8 Range Gates'],
      desc: 'Millimeter-wave FMCW radar monitoring station utilizing Hi-Link HLK-LD2410C to detect microscopic chest movements (breathing, sedentary presence) across 8 spatial range gates up to 6 meters with 99.2% reliability.',
      diagram:
`+---------------------------------------------------------------------------------+
|                       HLK-LD2410C 24GHz FMCW Radar Sensor                       |
|  * 24.00 - 24.25 GHz FMCW Swept Carrier Frequency Band                          |
|  * 8 Independent Spatial Range Gates (0.75m per gate, max 6.0m)                 |
|  * Sub-Millimeter Chest Respiration Displacement Extraction                     |
+---------------------------------------+-----------------------------------------+
                                        | Non-Blocking UART (115200 Baud 8N1)
                                        | Frame: [FD FC FB FA ... F4 F3 F2 F1]
                                        v
+---------------------------------------------------------------------------------+
|                             ESP32 Microcontroller Core                          |
|  +------------------------------------+    +---------------------------------+  |
|  |         UART State Machine         |    |        Telemetry & Alerts       |  |
|  | * Header Synchronization Sync      |    | * Multi-Gate Energy Parsing     |  |
|  | * Payload CRC Verification         |    | * Dynamic Presence Detection    |  |
|  | * Ring-Buffer Ring Storage         |    | * Local Web HUD Visualization   |  |
|  +------------------------------------+    +---------------------------------+  |
+---------------------------------------------------------------------------------+`,
      bom: [
        ['Hi-Link HLK-LD2410C Module', '5.0V DC Input (3.3V TTL)', '24GHz FMCW Radar Transceiver with built-in DSP'],
        ['ESP32 Development Board', '5.0V USB / 3.3V Rail', 'Master UART telemetry parser and web streaming node'],
        ['0.96" SSD1306 OLED Display', '3.3V DC (I2C)', 'Real-time target distance and gate energy HUD'],
        ['Active Buzzer Alarm', '3.3V Logic Trigger', 'Instant audible alert for perimeter security zone breach']
      ],
      pinout: [
        ['ESP32 GPIO 16 (RX2)', 'LD2410C TX Pin', 'High-Speed Non-Blocking Serial Frame Stream (115200 Baud)'],
        ['ESP32 GPIO 17 (TX2)', 'LD2410C RX Pin', 'Radar Configuration Commands (Gate Sensitivity Tuning)'],
        ['ESP32 GPIO 21 (SDA)', 'OLED SDA', 'Hardware I2C Data Line (400kHz)'],
        ['ESP32 GPIO 22 (SCL)', 'OLED SCL', 'Hardware I2C Clock Line (400kHz)'],
        ['ESP32 GPIO 25', 'Active Buzzer VCC', 'Digital GPIO Output for Threshold Proximity Warning']
      ],
      firmware: 'Features a deterministic, non-blocking finite state machine (FSM) reading raw UART byte streams. Parses radar frame headers (`0xFD 0xFC 0xFB 0xFA`), extracts moving target distance, stationary presence energy, and per-gate motion levels across all 8 range gates in real time.'
    },

    'rover': {
      id: 'rover',
      repo: 'Autonomous-Reconnaissance-Rover-with-Gas-and-Metal-Detection',
      title: 'Autonomous Reconnaissance Rover with Gas & Metal Detection',
      badges: ['ESP32-CAM', 'Arduino Uno', 'Hazard Telemetry', '4WD Chassis'],
      desc: 'All-terrain tele-operated surveillance rover featuring wireless video streaming over local Wi-Fi UDP stream. Integrates MQ-2 combustible gas sensing and inductive metal proximity detection with edge-triggered alert interrupts.',
      diagram:
`+--------------------+      Wi-Fi UDP Video Stream       +-----------------------+
|   ESP32-CAM / AP   | <===============================> |     Remote Web HUD    |
+---------+----------+                                   +-----------------------+
          |
          | UART Telemetry / Command Bus (115200 Baud)
          v
+--------------------+       PWM Drive Signals           +-----------------------+
|    Arduino Uno     | --------------------------------> |    Dual L298N Driver  | ===> 4WD Geared Motors
+---------+----------+                                   +-----------------------+
          |
          +---> [MQ-2 Gas Sensor]          (Analog ADC A0 / Threshold Warning)
          +---> [Inductive Metal Proximity] (Digital Pin 2 / Hardware Interrupt INT0)`,
      bom: [
        ['ESP32-CAM Module', '5.0V DC Input', 'Wi-Fi 802.11 b/g/n, OV2640 Camera Video Stream Server'],
        ['Arduino Uno R3 (ATmega328P)', '5.0V DC Input', 'Low-latency motor actuation and analog sensor acquisition'],
        ['Dual L298N H-Bridge Drivers', '12V DC Motor Power', '2A continuous per channel motor drive with reverse polarity'],
        ['MQ-2 Flammable Gas Sensor', '5.0V DC', 'Analog detection of LPG, propane, methane, and smoke concentrations'],
        ['LJ12A3-4-Z/BX Inductive Sensor', '6-36V (Opto-Isolated)', '4mm ferrous metal proximity detection']
      ],
      pinout: [
        ['ESP32 GPIO 1 / 3', 'Arduino Pin 0 / 1 (UART)', 'Bi-directional serial command & sensor telemetry bus'],
        ['Arduino Pin 5, 6, 9, 10', 'L298N IN1 - IN4', 'Hardware Timer PWM for differential steer speed control'],
        ['Arduino Pin A0', 'MQ-2 Analog Output', '10-bit ADC channel reading hazardous gas ppm level'],
        ['Arduino Pin 2 (INT0)', 'Inductive Sensor Out', 'Hardware external interrupt line for immediate metal trigger']
      ],
      firmware: 'Distributed dual-MCU architecture separating high-throughput Wi-Fi video streaming on the 32-bit ESP32 from real-time low-latency motor PWM and sensor interrupt handling on the 8-bit ATmega328P.'
    },

    'rfid': {
      id: 'rfid',
      repo: 'RFID-Secure-Access-Control-and-Authentication-System-PIC16F877A',
      title: 'RFID Secure Access Control System (PIC16F877A)',
      badges: ['PIC16F877A', 'Bare-Metal C (XC8)', 'Hardware SPI', 'EEPROM Security'],
      desc: 'Bare-metal security firmware implemented on a resource-constrained Microchip PIC16F877A MCU. Interfaces a 13.56MHz MFRC522 RFID reader over high-speed SPI with internal EEPROM whitelist authentication.',
      diagram:
`+---------------------------------------------------------------------------------+
|                       Microchip PIC16F877A Microcontroller                      |
|                               (Bare-Metal XC8 C)                                |
|  * 20MHz Crystal Oscillator (5 MIPS Instruction Throughput)                     |
|  * Hardware MSSP Module in SPI Master Mode 0,0                                  |
|  * Non-Volatile Internal EEPROM Authorized UID Database                         |
+-------------------+-----------------------------+-------------------------------+
                    | Hardware SPI                | 4-Bit Parallel Bus
                    v                             v
+-------------------------------+   +---------------------------------------------+
|    MFRC522 13.56MHz Reader    |   |           HD44780 16x2 Alpha LCD            |
| * ISO/IEC 14443 A/MIFARE      |   | * Real-Time User Authentication Prompts     |
| * 64-Byte FIFO Buffer         |   +---------------------------------------------+
| * Anti-Collision UID Reader   |
+-------------------------------+`,
      bom: [
        ['PIC16F877A Microcontroller', '5.0V DC (20MHz XTAL)', 'Resource-constrained 8-bit RISC core with hardware MSSP'],
        ['MFRC522 13.56MHz RFID Reader', '3.3V DC (Level Shifted)', 'SPI-based contactless RFID transponder reader'],
        ['16x2 HD44780 LCD Display', '5.0V DC', 'User interface display with 4-bit parallel data mode'],
        ['5V Single-Channel Relay', '5.0V DC (Opto-Isolated)', 'Solenoid door strike actuator with flyback diode protection'],
        ['24C04 External I2C EEPROM', '5.0V DC', 'Secondary persistent audit logging for access timestamps']
      ],
      pinout: [
        ['PIC16 RC3 (SCK)', 'MFRC522 SCK', 'Hardware SPI Master Serial Clock'],
        ['PIC16 RC4 (SDI)', 'MFRC522 MISO', 'Hardware SPI Master In Slave Out'],
        ['PIC16 RC5 (SDO)', 'MFRC522 MOSI', 'Hardware SPI Master Out Slave In'],
        ['PIC16 RB0 - RB5', 'LCD Data & Control', '4-Bit Parallel bus: RS, EN, D4-D7'],
        ['PIC16 RD0', 'Relay Optocoupler In', 'Active-high door strike unlatch trigger']
      ],
      firmware: 'Written in pure bare-metal C using Microchip XC8 compiler. Configures the MSSP hardware peripheral for SPI Mode 0, implements standard anti-collision sequences to read 4-byte MIFARE UIDs, and performs constant-time cryptographic verification against on-chip EEPROM.'
    },

    'waste-carousel': {
      id: 'waste-carousel',
      repo: 'Automated-Multi-Material-Waste-Classification-System',
      title: 'Automated Multi-Material Waste Classification System',
      badges: ['NEMA 17 Stepper', 'A4988 Driver', 'Arduino Uno', 'Closed-Loop Sort'],
      desc: 'Closed-loop industrial waste classification station utilizing precision NEMA 17 stepper carousel indexing, inductive metal detection, infrared drop verification, and high-speed servo diversion flaps.',
      diagram:
`[ Hopper Infeed ] ===> [ TCRT5000 IR Drop Beam ]
                             | (Drop Trigger Hardware Interrupt)
                             v
+---------------------------------------------------------------------------------+
|                              Arduino Uno (ATmega328P)                           |
|                       State Machine: IDLE -> SENSE -> INDEX -> FLAP             |
+-----------------------------+-------------------------------+-------------------+
                              |                               |
                              | Step / Dir Pulses (1/16)      | Fast PWM Angle
                              v                               v
+-------------------------------+   +---------------------------------------------+
|     A4988 Stepper Driver      |   |            SG90 Micro Servo Gate            |
+---------------+---------------+   +----------------------+----------------------+
                |                                          |
                v                                          v
    [ NEMA 17 Carousel 90 deg ]               [ Metallic / Organic Chambers ]
                ^
                |
    [ LJ12A3-4 Inductive Sensor ]`,
      bom: [
        ['Arduino Uno R3', '5.0V DC Input', 'Master state machine controller with hardware timers'],
        ['NEMA 17 Stepper Motor (42BYGH)', '12V / 1.5A Coil Rating', '200 steps/revolution, 1.8 deg precision indexer'],
        ['A4988 Stepper Motor Driver', '8-35V VMOT (1/16 Step)', 'Adjustable current limiting and microstepping carrier'],
        ['LJ12A3-4-Z/BX Inductive Proximity', '6-12V (Opto-Coupled)', 'High-speed eddy current metallic detection'],
        ['TowerPro SG90 Micro Servo', '5.0V DC (PWM Controlled)', 'Quick-divert chute flap actuator (<150ms response)']
      ],
      pinout: [
        ['Arduino Pin 8 (Step)', 'A4988 STEP Pin', 'Timer-driven step pulse generation for stepper indexing'],
        ['Arduino Pin 9 (Dir)', 'A4988 DIR Pin', 'Direction control logic level (CW / CCW)'],
        ['Arduino Pin 2 (INT0)', 'TCRT5000 IR Drop Out', 'Hardware interrupt triggered when item enters feed hopper'],
        ['Arduino Pin 3 (INT1)', 'Inductive Sensor Out', 'Hardware interrupt triggered upon metallic surface presence'],
        ['Arduino Pin 11 (PWM)', 'SG90 Signal Wire', 'Servo deflection pulse to route item into designated bin']
      ],
      firmware: 'Interrupt-driven state machine ensuring zero dropped objects. An item falling through the infeed triggers hardware interrupt INT0, initiating an inductive sensor read window. The stepper then indexes 90 degrees while the servo deflects to route the classified waste.'
    },

    'seismic': {
      id: 'seismic',
      repo: 'Real-Time-Seismic-Vibration-and-Earthquake-Early-Warning-System',
      title: 'Real-Time Seismic Vibration & Earthquake Early Warning',
      badges: ['ADXL335 3-Axis IMU', 'SSD1306 OLED', 'RMS Vector Filtering', 'Audible Alert'],
      desc: 'High-frequency 3D vector acceleration delta calculation with dynamic baseline calibration, emergency acoustic buzzer actuation, and live I2C OLED seismic waveform visualizer.',
      diagram:
`+---------------------------------------------------------------------------------+
|                       ADXL335 3-Axis Analog Accelerometer                       |
|                      (Capacitive Polysilicon Surface-Micromachined)             |
|                        Outputs: V_X (A0), V_Y (A1), V_Z (A2)                    |
+---------------------------------------+-----------------------------------------+
                                        | Multi-Channel 10-Bit ADC Sampling (100Hz)
                                        v
+---------------------------------------------------------------------------------+
|                              Microcontroller Firmware                           |
|  * Running Baseline Calibration: Baseline_Z = Rolling_Average(Z_raw, N=64)      |
|  * 3D Vector Magnitude: Vector_Delta = sqrt(dX^2 + dY^2 + dZ^2)                 |
|  * Fast RMS Waveform Buffer for On-Screen Oscilloscope Rendering                |
+-------------------+-----------------------------------------+-------------------+
                    | 400kHz I2C Bus                          | Digital Out (PWM)
                    v                                         v
+-------------------------------+   +---------------------------------------------+
|    0.96" SSD1306 OLED HUD     |   |             Active Acoustic Alarm           |
| * Real-Time Seismic Waveform  |   | * Emergency Pulsed Siren Trigger            |
| * Acceleration Delta (mg)     |   +---------------------------------------------+
+-------------------------------+`,
      bom: [
        ['ADXL335 3-Axis Accelerometer', '3.3V DC (Analog)', 'Low-power ±3g analog MEMS accelerometer'],
        ['Microcontroller Unit (Arduino/ESP)', '5.0V / 3.3V Input', '10-bit analog conversion and mathematical RMS computation'],
        ['0.96" I2C Monochrome OLED', '3.3V DC (Fast I2C)', '128x64 live graphical waveform and alert HUD'],
        ['High-Decibel Piezo Buzzer', '5.0V Logic Trigger', 'Emergency audio beacon during threshold seismic events'],
        ['Precision Linear 3.3V Regulator', '5.0V -> 3.3V Low-Noise', 'Provides ultra-clean analog reference rail for ADC stability']
      ],
      pinout: [
        ['MCU Analog Pin A0', 'ADXL335 X-Out', 'X-axis acceleration analog voltage input'],
        ['MCU Analog Pin A1', 'ADXL335 Y-Out', 'Y-axis acceleration analog voltage input'],
        ['MCU Analog Pin A2', 'ADXL335 Z-Out', 'Z-axis acceleration analog voltage input'],
        ['MCU SDA / SCL', 'SSD1306 OLED', 'Hardware I2C interface running live waveform oscilloscope'],
        ['MCU Digital Pin 8', 'Piezo Buzzer Gate', 'Emergency early warning alert trigger']
      ],
      firmware: 'Executes a high-frequency 100Hz analog sampling loop with a rolling baseline filter to reject ambient building drift. Computes Euclidean vector delta magnitude in real-time. If vibration exceeds critical millig gravity thresholds, emergency interrupt routines engage the acoustic siren.'
    }
  };

  // ==========================================================================
  // 2. Reading Progress Bar
  // ==========================================================================
  const readingProgressBar = document.getElementById('reading-progress');
  function updateReadingProgress() {
    if (!readingProgressBar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    readingProgressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
  }
  window.addEventListener('scroll', updateReadingProgress, { passive: true });

  // ==========================================================================
  // 3. Mobile Navigation Menu Toggle & Smooth Scroll
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll('section[id]');
  function highlightActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (link) link.classList.add('active');
      } else {
        if (link) link.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // ==========================================================================
  // 4. Projects Category Filter & Live Search
  // ==========================================================================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search-input');

  let currentCategory = 'all';
  let currentSearchQuery = '';

  function applyProjectFilters() {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardText = (card.textContent || '').toLowerCase();
      
      const matchesCategory = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesQuery = (!currentSearchQuery || cardText.includes(currentSearchQuery));

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.getAttribute('data-filter') || 'all';
      applyProjectFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = (e.target.value || '').trim().toLowerCase();
      applyProjectFilters();
    });
  }

  // ==========================================================================
  // 5. Interactive Specifications & BOM Modal Logic
  // ==========================================================================
  const modalOverlay = document.getElementById('specs-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalBadges = document.getElementById('modal-badges');
  const modalTitle = document.getElementById('modal-project-title');
  const modalDesc = document.getElementById('modal-project-desc');
  const modalDiagram = document.getElementById('modal-diagram-pre');
  const modalBomRows = document.getElementById('modal-bom-rows');
  const modalPinoutRows = document.getElementById('modal-pinout-rows');
  const modalFirmware = document.getElementById('modal-firmware-text');
  const modalCloneText = document.getElementById('modal-clone-text');
  const modalCopyCloneBtn = document.getElementById('modal-copy-clone');
  const modalRepoBtn = document.getElementById('modal-repo-btn');
  const modalReadmeBtn = document.getElementById('modal-readme-btn');

  function openSpecsModal(projectId) {
    const data = PROJECTS_SPECS_DATA[projectId];
    if (!data || !modalOverlay) return;

    // Badges
    if (modalBadges) {
      modalBadges.innerHTML = '';
      (data.badges || []).forEach(badge => {
        const badgeEl = document.createElement('span');
        badgeEl.className = 'card-badge primary';
        badgeEl.textContent = badge;
        modalBadges.appendChild(badgeEl);
      });
    }

    // Title & Description
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDesc) modalDesc.textContent = data.desc;

    // Diagram
    if (modalDiagram) modalDiagram.textContent = data.diagram;

    // BOM Rows
    if (modalBomRows) {
      modalBomRows.innerHTML = '';
      (data.bom || []).forEach(([comp, volt, func]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(comp)}</td><td>${escapeHtml(volt)}</td><td>${escapeHtml(func)}</td>`;
        modalBomRows.appendChild(tr);
      });
    }

    // Pinout Rows
    if (modalPinoutRows) {
      modalPinoutRows.innerHTML = '';
      (data.pinout || []).forEach(([pin, periph, sig]) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${escapeHtml(pin)}</td><td>${escapeHtml(periph)}</td><td>${escapeHtml(sig)}</td>`;
        modalPinoutRows.appendChild(tr);
      });
    }

    // Firmware
    if (modalFirmware) modalFirmware.textContent = data.firmware;

    // Clone Command & External Links
    const repoUrl = `https://github.com/ALWINTR/${data.repo}`;
    const cloneCmd = `git clone ${repoUrl}.git`;

    if (modalCloneText) modalCloneText.textContent = cloneCmd;
    if (modalCopyCloneBtn) modalCopyCloneBtn.setAttribute('data-copy-val', cloneCmd);

    if (modalRepoBtn) {
      modalRepoBtn.href = repoUrl;
    }
    if (modalReadmeBtn) {
      modalReadmeBtn.href = `${repoUrl}/blob/main/README.md`;
    }

    // Open Modal Dialog
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSpecsModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Trigger modal from any specs button
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-open-specs]');
    if (target) {
      e.preventDefault();
      const projectId = target.getAttribute('data-open-specs');
      openSpecsModal(projectId);
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeSpecsModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeSpecsModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeSpecsModal();
    }
  });

  // ==========================================================================
  // 6. Toast Notification & Clipboard Copy Utility
  // ==========================================================================
  const toastPopup = document.getElementById('toast-popup');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toastPopup || !toastMessage) return;
    toastMessage.textContent = message;
    toastPopup.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastPopup.classList.remove('show');
    }, 2600);
  }

  function copyToClipboard(text, successMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || 'Copied to clipboard!');
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  }

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || 'Copied to clipboard!');
    } catch (err) {
      showToast('Press Ctrl+C to copy');
    }
    document.body.removeChild(textArea);
  }

  // Copy Email Buttons
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy') || 'alwintr2003@gmail.com';
      copyToClipboard(val, `Email copied: ${val}`);
    });
  });

  // Copy Clone Command in Modal
  if (modalCopyCloneBtn) {
    modalCopyCloneBtn.addEventListener('click', () => {
      const cmd = modalCopyCloneBtn.getAttribute('data-copy-val') || (modalCloneText ? modalCloneText.textContent : '');
      if (cmd) {
        copyToClipboard(cmd, 'Clone command copied!');
      }
    });
  }

  // HTML Entity Escaper for safe string insertion
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Initialize
  updateReadingProgress();
  highlightActiveNav();
});
