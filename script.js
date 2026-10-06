// ==========================================================================
// ALWINTR Cosmic Milky Way & Interactive Robotics Portfolio Engine
// ==========================================================================

const PROJECTS_DATA = [
  {
    "id": "rover",
    "repo": "Autonomous-Reconnaissance-Rover-with-Gas-and-Metal-Detection",
    "title": "Autonomous Reconnaissance Rover with Gas and Metal Detection",
    "category": "robotics",
    "category_name": "Robotics",
    "icon": "fa-solid fa-shield-halved",
    "color": "cyan",
    "badge_primary": "ESP32 / Dual-Core",
    "badge_cat": "Robotics",
    "desc": "Long-range tele-operated reconnaissance vehicle featuring real-time wireless video transmission, hazardous combustible gas leak detection, and inductive metal proximity sensing for dangerous environments.",
    "diagram": "+----------------+      Wi-Fi UDP Video Stream      +--------------------+\n|  ESP32 Cam/AP  | <==============================> |  Remote Web HUD    |\n+-------+--------+                                  +--------------------+\n        |\n        | UART Telemetry / Command Bus\n        v\n+----------------+       PWM Drive Signals          +--------------------+\n|  Arduino Uno   | -------------------------------> |  Dual L298N Driver | ===> 4WD Chassis\n+-------+--------+                                  +--------------------+\n        |\n        +---> [MQ-2 Gas Sensor]       (Analog ADC / Interrupt Alert)\n        +---> [Inductive Metal Sensor] (Digital High-Speed Proximity)",
    "bom": [
      [
        "ESP32-CAM Module",
        "5V DC",
        "Wi-Fi 802.11 b/g/n, OV2640 Video Stream"
      ],
      [
        "Arduino Uno R3 (ATmega328P)",
        "5V DC",
        "Motor Coordination & Sensor ADC"
      ],
      [
        "Dual L298N Dual H-Bridge",
        "12V DC Input",
        "2A per channel motor driver"
      ],
      [
        "MQ-2 Gas Sensor",
        "5V DC",
        "Flammable gas & smoke detection"
      ],
      [
        "Inductive Proximity Sensor",
        "6-36V DC (Opto-Isolated)",
        "Ferrous metal sensing"
      ]
    ],
    "pinout": [
      [
        "ESP32 GPIO 1 / 3",
        "Arduino Pin 0 / 1",
        "Hardware Serial Telemetry Bus"
      ],
      [
        "Arduino Pin 5, 6, 9, 10",
        "L298N IN1..IN4",
        "Hardware PWM Speed Control"
      ],
      [
        "Arduino Analog A0",
        "MQ-2 Analog Out",
        "Gas Concentration ADC Input"
      ],
      [
        "Arduino Digital Pin 2",
        "Inductive Proximity Out",
        "External Hardware Interrupt INT0"
      ]
    ],
    "firmware": "Dual-microcontroller architecture separating high-speed Wi-Fi video streaming on ESP32 from real-time low-latency motor PWM and sensor interrupt handling on Arduino Uno."
  },
  {
    "id": "waste-carousel",
    "repo": "Automated-Multi-Material-Waste-Classification-System",
    "title": "Automated Multi Material Waste Classification System",
    "category": "automation",
    "category_name": "Industrial Automation",
    "icon": "fa-solid fa-recycle",
    "color": "blue",
    "badge_primary": "Arduino / Stepper",
    "badge_cat": "Industrial Automation",
    "desc": "Closed-loop industrial waste classification station utilizing precision NEMA 17 stepper carousel indexing, inductive metal detection, infrared drop verification, and high-speed servo diversion flaps.",
    "diagram": "[ Feed Hopper ] ===> [ TCRT5000 IR Drop Beam ]\n                             | (Drop Trigger Interrupt)\n                             v\n+--------------------------------------------------------------+\n|                     Arduino Uno ATmega328P                   |\n+--------------------------------------------------------------+\n        |                                        |\n        | Step/Dir Pulses (1/16)                 | Dynamic Angle PWM\n        v                                        v\n+-----------------------+              +-----------------------+\n|  A4988 Stepper Driver |              | SG90 Micro Servo Gate |\n+-----------+-----------+              +-----------+-----------+\n            |                                      |\n            v                                      v\n  [ NEMA 17 Carousel (90 deg) ]        [ Metal / Non-Metal Bins ]\n            ^\n            |\n  [ Inductive Proximity Sensor ]",
    "bom": [
      [
        "Arduino Uno R3",
        "5V DC",
        "Master state machine controller"
      ],
      [
        "NEMA 17 Stepper (42BYGHW)",
        "12V / 1.5A",
        "200 steps/rev, 1.8 deg step angle"
      ],
      [
        "A4988 Driver Carrier",
        "8-35V VMOT",
        "1/16 microstepping interpolation"
      ],
      [
        "LJ12A3-4-Z/BX Inductive Sensor",
        "6-12V (Opto-isolated)",
        "4mm detection range"
      ],
      [
        "TowerPro SG90 Servo",
        "5V DC",
        "180 deg diverter gate"
      ]
    ],
    "pinout": [
      [
        "Arduino Pin 3",
        "A4988 STEP Pin",
        "Timer PWM Pulse Train"
      ],
      [
        "Arduino Pin 4",
        "A4988 DIR Pin",
        "Carousel Rotation Direction"
      ],
      [
        "Arduino Pin 2",
        "TCRT5000 IR Out",
        "Drop Beam Interrupt INT0"
      ],
      [
        "Arduino Pin 7",
        "Inductive Sensor Signal",
        "Metal Verification Input"
      ],
      [
        "Arduino Pin 9",
        "SG90 Servo PWM",
        "Hardware Timer PWM Output"
      ]
    ],
    "firmware": "Deterministic state machine coordinating feed detection, 90-degree rotary indexing with trapezoidal acceleration, sensor settling delays, and servo deflection timing."
  },
  {
    "id": "biped",
    "repo": "ESP32-4-DOF-Bipedal-Walking-Robot-with-FreeRTOS-Kinematics",
    "title": "ESP32 4 DOF Bipedal Walking Robot with FreeRTOS Kinematics",
    "category": "robotics",
    "category_name": "Robotics",
    "icon": "fa-solid fa-robot",
    "color": "cyan",
    "badge_primary": "ESP32 / FreeRTOS",
    "badge_cat": "Kinematics",
    "desc": "Four-DOF bipedal walking robot featuring synchronized hip and ankle inverse kinematics, multi-channel 16-bit hardware PWM timers, and real-time serial telemetry running on FreeRTOS Core 1.",
    "diagram": "+--------------------------------------------------------------+\n|                ESP32 Dual-Core SoC (240MHz)                  |\n|  [Core 0: Telemetry & Comm]   |   [Core 1: FreeRTOS Gait Task]|\n+--------------------------------------------------------------+\n                                |\n                                v Sinusoidal Gait Trajectory Generator\n        +-----------------------+-----------------------+\n        |                       |                       |\n        v                       v                       v\n  [LEDC Channel 0]        [LEDC Channel 1]        [LEDC Channels 2,3]\n        |                       |                       |\n        v                       v                       v\n [Right Hip MG996R]      [Right Foot MG996R]     [Left Hip & Foot MG996R]",
    "bom": [
      [
        "ESP32-WROOM-32D",
        "3.3V / 5V",
        "Dual Xtensa 240MHz, FreeRTOS"
      ],
      [
        "4x TowerPro MG996R Servos",
        "6.0V / 2.5A peak",
        "Metal gear, 13 kg-cm torque"
      ],
      [
        "External UBEC 6V / 5A Buck",
        "7.4V 2S LiPo -> 6V",
        "Isolated actuator power"
      ],
      [
        "MPU-6050 6-Axis IMU",
        "3.3V I2C",
        "Real-time posture feedback"
      ]
    ],
    "pinout": [
      [
        "ESP32 GPIO 18",
        "Left Hip Servo PWM",
        "LEDC Timer 0, Channel 0"
      ],
      [
        "ESP32 GPIO 19",
        "Left Foot Servo PWM",
        "LEDC Timer 0, Channel 1"
      ],
      [
        "ESP32 GPIO 22",
        "Right Hip Servo PWM",
        "LEDC Timer 1, Channel 2"
      ],
      [
        "ESP32 GPIO 23",
        "Right Foot Servo PWM",
        "LEDC Timer 1, Channel 3"
      ],
      [
        "ESP32 GPIO 21 / 22",
        "MPU-6050 SDA / SCL",
        "I2C Bus at 400kHz"
      ]
    ],
    "firmware": "Dual-core FreeRTOS firmware dedicating Core 1 to high-priority sinusoidal inverse kinematics and gait trajectory generation, while Core 0 handles serial telemetry streaming."
  },
  {
    "id": "rfid",
    "repo": "RFID-Secure-Access-Control-and-Authentication-System-PIC16F877A",
    "title": "RFID Secure Access Control and Authentication System (PIC16F877A)",
    "category": "firmware",
    "category_name": "Embedded Firmware",
    "icon": "fa-solid fa-id-card",
    "color": "indigo",
    "badge_primary": "PIC16F877A",
    "badge_cat": "Embedded Security",
    "desc": "High-security embedded hardware access validator powered by Microchip PIC16F877A, featuring 125kHz RFID card reader, internal EEPROM credential whitelist, 16x2 LCD status, and electronic strike relay.",
    "diagram": "[ 125kHz RFID Card ] ===> [ EM-18 Reader Module ]\n                                 | 9600 Baud Serial Stream\n                                 v\n+--------------------------------------------------------------+\n|                Microchip PIC16F877A (20MHz)                  |\n|  - Hardware USART Rx ISR       - Internal EEPROM Whitelist   |\n|  - 3-Attempt Lockout Counter   - Multi-State Security Logic  |\n+--------------------------------------------------------------+\n        |                                        |\n        v                                        v\n+-----------------------+              +-----------------------+\n|  16x2 Alphanumeric    |              |  ULN2003 Driver Relay |\n|  HD44780 LCD (4-Bit)  |              |  ==> 12V Door Strike  |\n+-----------------------+              +-----------------------+",
    "bom": [
      [
        "PIC16F877A Microcontroller",
        "5V DC",
        "20MHz clock, 8KB Flash, 256B EEPROM"
      ],
      [
        "EM-18 RFID Reader Module",
        "5V DC",
        "125kHz RF receiver with UART output"
      ],
      [
        "16x2 HD44780 LCD Display",
        "5V DC",
        "Alphanumeric UI in 4-bit parallel mode"
      ],
      [
        "12V SPDT Relay Module",
        "5V Coil / 12V Contact",
        "Solenoid door strike driver"
      ],
      [
        "5V Piezo Buzzer & Dual LEDs",
        "5V DC",
        "Access granted / denied indicators"
      ]
    ],
    "pinout": [
      [
        "PIC Pin 26 (RC7/RX)",
        "EM-18 TX Out",
        "Hardware USART Rx Interrupt"
      ],
      [
        "PIC Pin 19..22 (RD4..RD7)",
        "LCD D4..D7",
        "Parallel Data 4-Bit Nibble"
      ],
      [
        "PIC Pin 15, 16 (RC0, RC1)",
        "LCD RS, EN",
        "Control Line Drivers"
      ],
      [
        "PIC Pin 33 (RB0/INT)",
        "Relay Driver Input",
        "Access Strike Output Gate"
      ],
      [
        "PIC Pin 34 (RB1)",
        "Piezo Buzzer Gate",
        "Audio Alert Pulse Frequency"
      ]
    ],
    "firmware": "Bare-metal Embedded C written with MPLAB XC8 compiler, utilizing USART receive interrupts, EEPROM tag memory validation, and timed lock disengagement."
  },
  {
    "id": "seismic",
    "repo": "Real-Time-Seismic-Vibration-and-Earthquake-Early-Warning-System",
    "title": "Real Time Seismic Vibration and Earthquake Early Warning System",
    "category": "sensors",
    "category_name": "Radar & Sensing",
    "icon": "fa-solid fa-volcano",
    "color": "blue",
    "badge_primary": "ADXL335 / AVR",
    "badge_cat": "Seismic Sensor",
    "desc": "Real-time tri-axial seismic acceleration detection system with analog noise filtering, dynamic baseline calibration, acoustic alarm triggering, and OLED vector magnitude telemetry.",
    "diagram": "[ Earth Motion / Vibration ] ===> [ ADXL335 3-Axis Accelerometer ]\n                                           | Analog X, Y, Z Signals\n                                           v\n+--------------------------------------------------------------+\n|                   Arduino Nano (ATmega328P)                  |\n|  - 10-Bit ADC Sampling (100Hz) - Rolling Baseline Filtering  |\n|  - Delta Vector: sqrt((x-x0)^2 + (y-y0)^2 + (z-z0)^2)        |\n+--------------------------------------------------------------+\n        |                                        |\n        v I2C Bus (400kHz)                       v Digital PWM\n+-----------------------+              +-----------------------+\n|  SSD1306 128x64 OLED  |              |  85dB Piezo Siren     |\n|  (Live Waveform Tele) |              |  & Emergency LED Ring |\n+-----------------------+              +-----------------------+",
    "bom": [
      [
        "Arduino Nano (ATmega328P)",
        "5V DC",
        "16MHz clock, 10-bit analog converter"
      ],
      [
        "Analog Devices ADXL335",
        "3.3V DC",
        "3-axis accelerometer, \u00b13g full scale"
      ],
      [
        "0.96\" SSD1306 I2C OLED",
        "3.3V/5V DC",
        "128x64 graphical vector display"
      ],
      [
        "Active Piezo Buzzer",
        "5V DC",
        "85dB acoustic resonance warning"
      ],
      [
        "Tri-Color Status LED",
        "5V DC",
        "Green (Normal), Yellow (Tremor), Red (Seismic)"
      ]
    ],
    "pinout": [
      [
        "Arduino A0, A1, A2",
        "ADXL335 X_OUT, Y_OUT, Z_OUT",
        "Analog Accelerometer Channels"
      ],
      [
        "Arduino A4 (SDA), A5 (SCL)",
        "SSD1306 OLED I2C",
        "Fast-Mode Display Bus"
      ],
      [
        "Arduino Digital Pin 9",
        "Piezo Siren Positive",
        "PWM Tone Generation Output"
      ],
      [
        "Arduino Digital Pin 6, 7, 8",
        "Status LEDs",
        "Tri-Color Threshold States"
      ]
    ],
    "firmware": "Continuous 100Hz sampling loop calculating Euclidean 3D acceleration vector deltas from a dynamic self-calibrating zero-g baseline, preventing false positives from tilt."
  },
  {
    "id": "rain-shutter",
    "repo": "Automated-Rain-Responsive-Shutter-and-Protection-Mechanism",
    "title": "Automated Rain Responsive Shutter and Protection Mechanism",
    "category": "automation",
    "category_name": "Industrial Automation",
    "icon": "fa-solid fa-cloud-showers-heavy",
    "color": "cyan",
    "badge_primary": "Arduino / Servo",
    "badge_cat": "Weather Automation",
    "desc": "Automated weather-responsive protective shutter system utilizing FC-37 precipitation sensor, software hysteresis debounce filter, and precision SG90 servo angle actuation.",
    "diagram": "[ Precipitation / Raindrops ] ===> [ FC-37 Nickel Sensor Plate ]\n                                             | Resistive Voltage Divider\n                                             v\n                                  [ LM393 Comparator Module ]\n                                             | Analog Voltage & Digital Trigger\n                                             v\n+--------------------------------------------------------------+\n|                     Arduino Uno ATmega328P                   |\n|  - Moving Average Noise Filter - 1500ms Hysteresis Debounce  |\n|  - State Machine: DRY -> PRECIPITATION_DETECTED -> SHUTTERED |\n+--------------------------------------------------------------+\n                                |\n                                v Timer PWM Signal\n                   +--------------------------+\n                   |  TowerPro SG90 Servo     |\n                   |  ==> Protective Cover    |\n                   +--------------------------+",
    "bom": [
      [
        "Arduino Uno R3",
        "5V DC",
        "Main controller"
      ],
      [
        "FC-37 Raindrop Board",
        "3.3V - 5V",
        "Nickel-plated interdigitated sensing grid"
      ],
      [
        "LM393 Comparator IC",
        "5V DC",
        "Onboard trimmer for threshold sensitivity"
      ],
      [
        "TowerPro SG90 Servo",
        "5V DC",
        "Micro servo motor (1.8 kg-cm)"
      ],
      [
        "Bicolor Status Indicator",
        "5V DC",
        "Green (Open/Clear), Amber (Deploying), Red (Closed)"
      ]
    ],
    "pinout": [
      [
        "Arduino Analog Pin A0",
        "LM393 Analog Out",
        "Precipitation Intensity ADC"
      ],
      [
        "Arduino Digital Pin 2",
        "LM393 Digital Out",
        "Hardware Comparator Interrupt"
      ],
      [
        "Arduino Digital Pin 9",
        "SG90 Servo Signal",
        "16-Bit PWM Angle Driver"
      ],
      [
        "Arduino Digital Pin 11, 12",
        "Status LEDs",
        "Operating State Indicators"
      ]
    ],
    "firmware": "Dual-threshold noise cancellation with rolling average window and 1500ms mechanical hysteresis debounce to prevent servo jitter during sporadic rainfall."
  },
  {
    "id": "webserver-servo",
    "repo": "ESP-Asynchronous-Web-Server-Real-Time-Servo-Controller",
    "title": "ESP Asynchronous Web Server Real Time Servo Controller",
    "category": "iot",
    "category_name": "IoT & Telemetry",
    "icon": "fa-solid fa-globe",
    "color": "indigo",
    "badge_primary": "ESP8266 / Async",
    "badge_cat": "Web Telemetry",
    "desc": "Embedded asynchronous HTTP web server hosted directly on ESP microcontrollers delivering an interactive browser slider UI for multi-angle servo motor telemetry and PWM calibration.",
    "diagram": "+--------------------------------------------------------------+\n|        Client Web Browser (Desktop / Mobile Device)          |\n|    - HTML5 Glassmorphism UI   - Real-Time Angle Slider HUD   |\n+--------------------------------------------------------------+\n        |\n        | Asynchronous HTTP GET / POST (/set-angle?val=X)\n        v\n+--------------------------------------------------------------+\n|                   ESP8266 / ESP32 Microcontroller            |\n|  - ESPAsyncWebServer Library  - Zero-Downtime Event Loop     |\n|  - SPIFFS Static File Hosting - Non-Blocking PWM Scheduler   |\n+--------------------------------------------------------------+\n                                |\n                                v Hardware PWM Pulse (500us - 2500us)\n                   +--------------------------+\n                   |   TowerPro SG90 Servo    |\n                   +--------------------------+",
    "bom": [
      [
        "NodeMCU ESP8266 / ESP32",
        "3.3V / 5V",
        "Wi-Fi 802.11 b/g/n SoC"
      ],
      [
        "TowerPro SG90 Servo",
        "5V DC",
        "180-degree angular actuator"
      ],
      [
        "AMS1117-3.3 Voltage Regulator",
        "5V -> 3.3V",
        "Microcontroller power rail"
      ],
      [
        "1000uF Electrolytic Capacitor",
        "6.3V",
        "Servo power rail decoupling"
      ]
    ],
    "pinout": [
      [
        "ESP8266 GPIO 4 (D2)",
        "SG90 Servo Signal",
        "Hardware PWM Output"
      ],
      [
        "ESP8266 5V (VIN)",
        "Servo VCC",
        "Decoupled with 1000uF capacitor"
      ],
      [
        "ESP8266 GND",
        "Servo Ground",
        "Common Ground Rail"
      ]
    ],
    "firmware": "Asynchronous event-driven HTTP request parser handling concurrent clients without blocking the main microcontroller execution loop or interrupting PWM timers."
  },
  {
    "id": "blynk-servo",
    "repo": "Blynk-Cloud-Connected-Real-Time-Servo-Actuation-Framework",
    "title": "Blynk Cloud Connected Real Time Servo Actuation Framework",
    "category": "iot",
    "category_name": "IoT & Telemetry",
    "icon": "fa-solid fa-cloud-arrow-up",
    "color": "blue",
    "badge_primary": "ESP32 / Blynk",
    "badge_cat": "Cloud IoT",
    "desc": "Cloud IoT actuator framework connecting ESP32 to Blynk 2.0 Cloud Platform, featuring bidirectional Virtual Pin telemetry, auto-reconnection state machines, and angle telemetry sync.",
    "diagram": "+--------------------------------------------------------------+\n|                 Blynk 2.0 Mobile / Web App                   |\n|    - Cloud Dashboard          - Virtual Pin V0 Slider Widget |\n+--------------------------------------------------------------+\n        |\n        | SSL / TLS Encrypted WebSocket Link\n        v\n+--------------------------------------------------------------+\n|                     Blynk IoT Cloud Server                   |\n+--------------------------------------------------------------+\n        |\n        | Bidirectional Virtual Pin Protocol\n        v\n+--------------------------------------------------------------+\n|                    ESP32 / ESP8266 Firmware                  |\n|  - BLYNK_WRITE(V0) Handler    - Non-Blocking State Loop      |\n|  - Wi-Fi Reconnect Watchdog   - Brownout Safety Protocol     |\n+--------------------------------------------------------------+\n                                |\n                                v Hardware LEDC PWM\n                   +--------------------------+\n                   |   Servo Actuator (MG996R)|\n                   +--------------------------+",
    "bom": [
      [
        "ESP32 DevKit V1",
        "5V DC",
        "240MHz Dual-Core Wi-Fi SoC"
      ],
      [
        "MG996R Metal Gear Servo",
        "5V - 6V DC",
        "High-torque industrial actuator"
      ],
      [
        "External 5V / 2A Power Supply",
        "5V DC",
        "Actuator power rail"
      ],
      [
        "Status Indicator LEDs",
        "5V DC",
        "Cloud Connection Status"
      ]
    ],
    "pinout": [
      [
        "ESP32 GPIO 18",
        "Servo Signal Line",
        "LEDC Hardware PWM Channel 0"
      ],
      [
        "ESP32 GPIO 2",
        "Onboard LED",
        "Wi-Fi & Cloud Connection Heartbeat"
      ],
      [
        "ESP32 VIN / GND",
        "5V Power Supply",
        "Common Ground"
      ]
    ],
    "firmware": "Blynk 2.0 Virtual Pin handlers with non-blocking reconnection algorithms, connection state fallback timers, and software brownout safety."
  },
  {
    "id": "people-counter",
    "repo": "Smart-Bidirectional-People-Counter-and-Room-Occupancy-Monitor",
    "title": "Smart Bidirectional People Counter and Room Occupancy Monitor",
    "category": "sensors",
    "category_name": "Radar & Sensing",
    "icon": "fa-solid fa-users",
    "color": "cyan",
    "badge_primary": "ESP32 / Dual-Sensor",
    "badge_cat": "Room Telemetry",
    "desc": "Directional room occupancy tracking station utilizing dual ultrasonic/infrared sensors, state-machine sequence discrimination for entry and exit events, and live OLED capacity telemetry.",
    "diagram": "[ Corridor / Entrance ] ===> [ Sensor A (Outer) ]  [ Sensor B (Inner) ]\n                                      |                     |\n                                      +----------+----------+\n                                                 | Hardware Timing Pulses\n                                                 v\n+--------------------------------------------------------------+\n|                ESP32 Dual-Core Microcontroller               |\n|  - Entry Sequence: A triggered -> B triggered -> Count++     |\n|  - Exit Sequence:  B triggered -> A triggered -> Count--     |\n|  - Debounce Window: 350ms False-Positive Suppression         |\n+--------------------------------------------------------------+\n        |                                        |\n        v I2C Bus (400kHz)                       v Digital Out\n+-----------------------+              +-----------------------+\n|  SSD1306 OLED Display |              |  Capacity Buzzer &    |\n|  (Live Headcount HUD) |              |  Max-Occupancy LEDs   |\n+-----------------------+              +-----------------------+",
    "bom": [
      [
        "ESP32-WROOM-32",
        "3.3V / 5V",
        "Microcontroller"
      ],
      [
        "2x HC-SR04 Ultrasonic Sensors",
        "5V DC",
        "2cm - 400cm acoustic ranging"
      ],
      [
        "0.96\" SSD1306 I2C OLED",
        "3.3V DC",
        "Real-time capacity counter display"
      ],
      [
        "Piezo Alarm Buzzer",
        "5V DC",
        "Room capacity warning"
      ],
      [
        "Dual LEDs",
        "5V DC",
        "Green (Available), Red (Full)"
      ]
    ],
    "pinout": [
      [
        "ESP32 GPIO 5 (Trig), GPIO 18 (Echo)",
        "Sensor A (Outer)",
        "Ultrasonic Gate A"
      ],
      [
        "ESP32 GPIO 19 (Trig), GPIO 23 (Echo)",
        "Sensor B (Inner)",
        "Ultrasonic Gate B"
      ],
      [
        "ESP32 GPIO 21 (SDA), GPIO 22 (SCL)",
        "SSD1306 OLED",
        "I2C Telemetry Bus"
      ],
      [
        "ESP32 GPIO 4",
        "Buzzer Alarm Driver",
        "Capacity Limit Alert"
      ]
    ],
    "firmware": "Deterministic sequence state machine parsing dual beam transitions with timing guard bands, preventing count oscillations caused by hesitating pedestrians."
  },
  {
    "id": "waste-segregation-dry-wet",
    "repo": "Automated-Wet-and-Dry-Waste-Classification-System",
    "title": "Automated Wet and Dry Waste Classification System",
    "category": "automation",
    "category_name": "Industrial Automation",
    "icon": "fa-solid fa-trash-can-arrow-up",
    "color": "blue",
    "badge_primary": "ESP32 / Moisture",
    "badge_cat": "Smart Sorting",
    "desc": "Automated municipal waste sorting station utilizing soil hygrometer conductivity sensing to classify organic wet waste versus recyclable dry waste, with ultrasonic bin capacity telemetry.",
    "diagram": "[ Waste Ingestion Chute ] ===> [ Soil Moisture Hygrometer Probe ]\n                                            | Analog Resistive Signal\n                                            v\n+--------------------------------------------------------------+\n|                Arduino / ESP32 Controller                    |\n|  - 10-Bit / 12-Bit ADC Moisture Measurement                  |\n|  - Threshold Classification: Wet (>35%) vs Dry (<=35%)       |\n|  - Ultrasonic Fill-Level Sensing (HC-SR04)                   |\n+--------------------------------------------------------------+\n        |                                        |\n        v PWM Angle Signal                       v I2C / Serial HUD\n+-----------------------+              +-----------------------+\n|  SG90 Diverter Servo  |              |  OLED & Bin Full LEDs |\n|  ==> Dual Compartments|              |  (Capacity Telemetry) |\n+-----------------------+              +-----------------------+",
    "bom": [
      [
        "Arduino Uno / ESP32",
        "5V DC",
        "Primary classification controller"
      ],
      [
        "Soil Moisture Hygrometer Sensor",
        "3.3V - 5V",
        "Nickel corrosion-resistant probe"
      ],
      [
        "HC-SR04 Ultrasonic Sensor",
        "5V DC",
        "Bin capacity monitor"
      ],
      [
        "TowerPro SG90 Servo",
        "5V DC",
        "Dual-chamber diverter flap"
      ]
    ],
    "pinout": [
      [
        "MCU Analog Pin A0",
        "Moisture Sensor Analog Out",
        "Moisture Level ADC"
      ],
      [
        "MCU GPIO 9",
        "SG90 Servo PWM Driver",
        "Diverter Flap Control"
      ],
      [
        "MCU GPIO 2, 3",
        "HC-SR04 Trigger / Echo Pins",
        "Bin Depth Measurement"
      ],
      [
        "MCU GPIO 12, 13",
        "Dry / Wet Indicator LEDs",
        "Status Outputs"
      ]
    ],
    "firmware": "Conductivity curve calibration distinguishing organic wet municipal waste from dry recyclables, driving a dual-compartment mechanical diverter flap."
  },
  {
    "id": "radar-ld2410c",
    "repo": "24GHz-mmWave-Human-Presence-and-Micro-Motion-Radar-Monitor",
    "title": "24GHz mmWave Human Presence and Micro Motion Radar Monitor",
    "category": "sensors",
    "category_name": "Radar & Sensing",
    "icon": "fa-solid fa-satellite-dish",
    "color": "cyan",
    "badge_primary": "24GHz FMCW / ESP32",
    "badge_cat": "Radar Sensing",
    "desc": "Advanced 24GHz FMCW millimeter-wave radar monitoring station utilizing Hi-Link HLK-LD2410C to detect microscopic chest movements (breathing, sedentary presence) across 8 range gates up to 6 meters.",
    "diagram": "[ 24GHz FMCW Radio Waves ] ===> [ Moving / Breathing Target ]\n                                           | Reflected Chirp Spectrum\n                                           v\n+--------------------------------------------------------------+\n|            Hi-Link HLK-LD2410C 24GHz mmWave Sensor           |\n|  - Integrated Baseband DSP     - 8 Range Gates (0.75m / gate)|\n|  - Motion Energy & Static Micro-Movement Energy Calculation  |\n+--------------------------------------------------------------+\n        |\n        | Hardware UART Stream (115200 Baud Frame Protocol)\n        v\n+--------------------------------------------------------------+\n|                  ESP32 Dual-Core Microcontroller             |\n|  - Frame Sync & Byte Parsing   - Per-Gate Energy Thresholding|\n|  - Target Distance & Velocity  - Occupancy Verification State|\n+--------------------------------------------------------------+\n        |\n        v I2C / Serial HUD\n+--------------------------------------------------------------+\n|         OLED Real-Time Radar Target & Distance HUD           |\n+--------------------------------------------------------------+",
    "bom": [
      [
        "ESP32-WROOM-32D",
        "3.3V / 5V",
        "Dual-Core 240MHz SoC"
      ],
      [
        "Hi-Link HLK-LD2410C 24GHz Radar",
        "5V DC / 80mA",
        "24GHz FMCW Transceiver"
      ],
      [
        "0.96\" SSD1306 I2C OLED",
        "3.3V DC",
        "Radar range & energy HUD"
      ],
      [
        "Status Indicator LEDs",
        "5V DC",
        "Stationary Presence & Motion LEDs"
      ]
    ],
    "pinout": [
      [
        "ESP32 GPIO 16 (RX2)",
        "HLK-LD2410C TX Out",
        "Hardware UART2 at 115200 Baud"
      ],
      [
        "ESP32 GPIO 17 (TX2)",
        "HLK-LD2410C RX In",
        "Configuration Command Bus"
      ],
      [
        "ESP32 GPIO 21 (SDA), GPIO 22 (SCL)",
        "SSD1306 OLED",
        "I2C Display Bus"
      ],
      [
        "ESP32 GPIO 4",
        "Micro-Motion Detected LED",
        "Logic High on Stationary Presence"
      ]
    ],
    "firmware": "Binary frame packet decoder parsing proprietary 0xFD 0xFC 0xFB 0xFA headers, extracting stationary and moving energy values across all 8 range gates in real-time."
  },
  {
    "id": "stepper-controller",
    "repo": "Precision-Stepper-Motor-Angle-Controller-with-Microstepping",
    "title": "Precision Stepper Motor Angle Controller with Microstepping",
    "category": "firmware",
    "category_name": "Embedded Firmware",
    "icon": "fa-solid fa-arrows-spin",
    "color": "indigo",
    "badge_primary": "A4988 / Microstepping",
    "badge_cat": "Motion Control",
    "desc": "High-precision stepper motor positioning firmware implementing sub-degree angle mapping, linear frequency acceleration ramps, and serial CLI angle commands with 1/16 microstepping.",
    "diagram": "+--------------------------------------------------------------+\n|            Serial Terminal CLI / Input Angle Target          |\n+--------------------------------------------------------------+\n        |\n        | ASCII Angle Command (\"MOVE 45.5\")\n        v\n+--------------------------------------------------------------+\n|                  Arduino Uno (ATmega328P)                    |\n|  - Degree to Step Conversion   - Trapezoidal Frequency Ramp  |\n|  - Microsecond Pulse Timers    - Backlash Compensation Engine|\n+--------------------------------------------------------------+\n        |\n        | STEP (Pulse Frequency) & DIR (Direction Logic)\n        v\n+--------------------------------------------------------------+\n|             A4988 Microstepping Bipolar Driver               |\n|  (Configured for 1/16 Microstepping: MS1=H, MS2=H, MS3=H)    |\n+--------------------------------------------------------------+\n        |\n        v 4-Phase Bipolar Current Control\n+--------------------------------------------------------------+\n|              NEMA 17 High-Torque Stepper Motor               |\n+--------------------------------------------------------------+",
    "bom": [
      [
        "Arduino Uno R3",
        "5V DC",
        "Step timing microcontroller"
      ],
      [
        "NEMA 17 Stepper Motor (17HS4401)",
        "12V / 1.7A",
        "1.8 deg per step"
      ],
      [
        "Allegro A4988 Driver Board",
        "12V VMOT / 5V VDD",
        "1/16 microstepping"
      ],
      [
        "100uF 35V Electrolytic Capacitor",
        "Decoupling",
        "Motor power rail filter"
      ]
    ],
    "pinout": [
      [
        "Arduino Pin 3",
        "A4988 STEP Pin",
        "Hardware Timer Step Pulse"
      ],
      [
        "Arduino Pin 4",
        "A4988 DIR Pin",
        "Direction Control Logic"
      ],
      [
        "Arduino Pin 5, 6, 7",
        "A4988 MS1, MS2, MS3",
        "Microstepping Selection"
      ],
      [
        "Arduino Pin 8",
        "A4988 ENABLE Pin",
        "Power Driver Enable Gate"
      ]
    ],
    "firmware": "Integer math degree-to-step resolution mapping with Bresenham-style linear acceleration ramps preventing motor stalls and eliminating step losses."
  },
  {
    "id": "water-tilt",
    "repo": "Pipeline-Water-Flow-Rate-and-Structural-Tilt-Monitor",
    "title": "Pipeline Water Flow Rate and Structural Tilt Monitor",
    "category": "sensors",
    "category_name": "Radar & Sensing",
    "icon": "fa-solid fa-faucet-drip",
    "color": "blue",
    "badge_primary": "ESP32 / Dual-Sensor",
    "badge_cat": "Hydrodynamic Sensing",
    "desc": "Industrial dual-parameter telemetry station measuring pipeline volumetric liquid flow rate and structural pipe angular deviation using hardware interrupt counters and tilt switches.",
    "diagram": "[ Liquid Flow Through Pipe ] ===> [ YF-S201 Hall-Effect Turbine ]\n                                            | Hall Pulse Frequency (7.5 Hz per L/min)\n                                            v\n[ Structural Pipe Tilt ]     ===> [ SW-520D Ball Tilt Switch ]\n                                            | Edge State Transition\n                                            v\n+--------------------------------------------------------------+\n|                ESP32 Dual-Core Microcontroller               |\n|  - ISR Flow Counter (GPIO 14)  - ISR Tilt Alarm (GPIO 27)    |\n|  - Q = Frequency / 7.5 (L/min) - Total Volume Integration    |\n+--------------------------------------------------------------+\n        |\n        v I2C Bus (400kHz)\n+--------------------------------------------------------------+\n|         OLED Real-Time Flow Rate & Tilt Safety HUD           |\n+--------------------------------------------------------------+",
    "bom": [
      [
        "ESP32 DevKit V1",
        "3.3V / 5V",
        "Dual-Core SoC"
      ],
      [
        "YF-S201 Water Flow Sensor",
        "5V DC",
        "1-30 L/min range, Hall turbine"
      ],
      [
        "SW-520D Dual-Ball Tilt Sensor",
        "3.3V DC",
        "Mechanical orientation detection"
      ],
      [
        "0.96\" I2C SSD1306 OLED",
        "3.3V DC",
        "Display"
      ]
    ],
    "pinout": [
      [
        "ESP32 GPIO 14",
        "YF-S201 Signal Out",
        "Hardware Interrupt RISING"
      ],
      [
        "ESP32 GPIO 27",
        "SW-520D Tilt Out",
        "External Interrupt CHANGE"
      ],
      [
        "ESP32 GPIO 21 (SDA), GPIO 22 (SCL)",
        "SSD1306 OLED",
        "I2C Bus Master"
      ],
      [
        "ESP32 GPIO 4",
        "Tilt Alarm Buzzer",
        "Deformation Warning Driver"
      ]
    ],
    "firmware": "Edge-triggered ISR pulse accumulator computing instantaneous liters per minute and cumulative throughput with structural angle anomaly detection."
  },
  {
    "id": "max30102-oximeter",
    "repo": "Biometric-Pulse-Oximeter-and-Heart-Rate-Telemetry-System",
    "title": "Biometric Pulse Oximeter and Heart Rate Telemetry System",
    "category": "sensors",
    "category_name": "Radar & Sensing",
    "icon": "fa-solid fa-heart-pulse",
    "color": "cyan",
    "badge_primary": "MAX30102 / PPG",
    "badge_cat": "Biomedical Instrumentation",
    "desc": "Optical photoplethysmography (PPG) pulse oximeter computing Heart Rate (BPM) and blood oxygen saturation (SpO2) using dual Red (660nm) and Infrared (880nm) LEDs with live OLED waveform display.",
    "diagram": "[ Human Finger Capillaries ] ===> [ MAX30102 Optical Sensor ]\n                                           | Red (660nm) & IR (880nm) Reflection\n                                           v\n+--------------------------------------------------------------+\n|                MAX30102 Integrated Analog Front-End          |\n|  - 18-Bit Optical ADC          - 400Hz Sampling Rate FIFO    |\n|  - Ambient Light Cancellation  - I2C Interface (400kHz)      |\n+--------------------------------------------------------------+\n        |\n        | Fast I2C Bus (400kHz)\n        v\n+--------------------------------------------------------------+\n|                  ESP32 Dual-Core Microcontroller             |\n|  - DC Baseline Subtraction     - Bandpass Filter (0.5-4Hz)   |\n|  - Peak-to-Peak BPM Extraction - SpO2 Empirical Ratio Curve  |\n+--------------------------------------------------------------+\n        |\n        v I2C Waveform Stream\n+--------------------------------------------------------------+\n|        SSD1306 OLED Display (Live Real-Time PPG Waveform)    |\n+--------------------------------------------------------------+",
    "bom": [
      [
        "ESP32-WROOM-32",
        "3.3V DC",
        "Dual-Core 240MHz SoC"
      ],
      [
        "MAX30102 Sensor Module",
        "3.3V / 1.8V",
        "Optical Biosensor"
      ],
      [
        "0.96\" SSD1306 I2C OLED",
        "3.3V DC",
        "Graphic display for live PPG trace"
      ],
      [
        "Piezo Clicker",
        "3.3V DC",
        "Heartbeat acoustic feedback"
      ]
    ],
    "pinout": [
      [
        "ESP32 GPIO 21 (SDA)",
        "MAX30102 SDA",
        "I2C Data Bus"
      ],
      [
        "ESP32 GPIO 22 (SCL)",
        "MAX30102 SCL",
        "I2C Clock Bus"
      ],
      [
        "ESP32 GPIO 19 (INT)",
        "MAX30102 INT",
        "Hardware Data-Ready Interrupt"
      ],
      [
        "ESP32 GPIO 25",
        "Piezo Clicker",
        "Heartbeat pulse tone"
      ]
    ],
    "firmware": "Dual-wavelength photoplethysmography digital signal processing extracting AC and DC light absorption ratios to calculate SpO2 percentages and heart rate peaks."
  },
  {
    "id": "servo-easing",
    "repo": "Dynamic-Angular-Velocity-Servo-Controller-with-Smooth-Easing",
    "title": "Dynamic Angular Velocity Servo Controller with Smooth Easing",
    "category": "robotics",
    "category_name": "Robotics",
    "icon": "fa-solid fa-bezier-curve",
    "color": "indigo",
    "badge_primary": "Arduino / Non-Blocking",
    "badge_cat": "Motion Planning",
    "desc": "Non-blocking servo angle interpolation firmware implementing adjustable angular velocity control and smooth cubic S-curve easing to prevent mechanical backlash and jitter in robotic joints.",
    "diagram": "+--------------------------------------------------------------+\n|          Trajectory Input (Target Angle: 0 deg to 180 deg)    |\n+--------------------------------------------------------------+\n        |\n        v\n+--------------------------------------------------------------+\n|                   Arduino Uno (ATmega328P)                   |\n|  - Non-Blocking millis() Tick  - Cubic S-Curve Easing        |\n|    theta(t) = 3*t^2 - 2*t^3    - Adjustable Angular Speed    |\n+--------------------------------------------------------------+\n        |\n        | Jitter-Free Microsecond Pulse Modulation\n        v\n+--------------------------------------------------------------+\n|              TowerPro SG90 / MG996R Servo Actuator           |\n|              (Smooth Vibrationless Joint Rotation)           |\n+--------------------------------------------------------------+",
    "bom": [
      [
        "Arduino Uno R3",
        "5V DC",
        "Non-blocking trajectory generator"
      ],
      [
        "TowerPro SG90 / MG996R Servo",
        "5V DC",
        "Servo motor"
      ],
      [
        "Potentiometer 10k",
        "5V DC",
        "Live angular velocity trimmer"
      ]
    ],
    "pinout": [
      [
        "Arduino Digital Pin 9",
        "Servo PWM Control Line",
        "16-Bit Timer PWM"
      ],
      [
        "Arduino Analog A0",
        "Velocity Potentiometer",
        "Speed Scaling ADC"
      ],
      [
        "Arduino Digital Pin 2",
        "Trigger Button",
        "Non-blocking Interrupt INT0"
      ]
    ],
    "firmware": "Non-blocking mathematical interpolation engine calculating continuous cubic velocity curves at 100Hz without blocking the processor execution pipeline."
  },
  {
    "id": "esp32-lab",
    "repo": "ESP32-Embedded-Systems-and-Firmware-Architecture-Laboratory",
    "title": "ESP32 Embedded Systems and Firmware Architecture Laboratory",
    "category": "firmware",
    "category_name": "Embedded Firmware",
    "icon": "fa-solid fa-cubes",
    "color": "cyan",
    "badge_primary": "ESP-IDF / FreeRTOS",
    "badge_cat": "Firmware Architecture",
    "desc": "Comprehensive firmware architecture laboratory containing production-ready low-level peripheral drivers, FreeRTOS queue pipelines, task pinning, and non-volatile storage (NVS) implementations on ESP32.",
    "diagram": "+--------------------------------------------------------------+\n|             ESP32 Dual-Core Xtensa LX6 (240MHz)              |\n+--------------------------------------------------------------+\n        |                                              |\n [Core 0: Network & Event Loop]             [Core 1: Real-Time Peripheral Task]\n        |                                              |\n        v                                              v\n+-----------------------+                    +-----------------------+\n|  FreeRTOS Queue IPC   | <================> |  FreeRTOS Mutex Queue |\n+-----------------------+                    +-----------------------+\n        |                                              |\n        +---> [Hardware Timer ISR]                     +---> [SPI Master Engine]\n        +---> [ADC with DMA Buffering]                 +---> [I2C Fast Mode Bus]\n        +---> [UART Ring Buffer ISR]                   +---> [NVS Storage Engine]",
    "bom": [
      [
        "ESP32-WROOM-32D Development Board",
        "3.3V / 5V",
        "Dual 240MHz cores, 520KB SRAM, 4MB Flash"
      ],
      [
        "Logic Analyzer Test Points",
        "Diagnostic",
        "Hardware protocol validation"
      ],
      [
        "Multiple SPI / I2C Sensor Test Rigs",
        "Sensors",
        "Hardware driver testing"
      ]
    ],
    "pinout": [
      [
        "GPIO 23 (MOSI), GPIO 19 (MISO), GPIO 18 (SCK)",
        "VSPI Master Bus",
        "High-Speed SPI"
      ],
      [
        "GPIO 21 (SDA), GPIO 22 (SCL)",
        "I2C Bus Master",
        "400kHz Two-Wire Bus"
      ],
      [
        "GPIO 16 (RX), GPIO 17 (TX)",
        "UART2 Telemetry Stream",
        "Ring-Buffered Serial"
      ],
      [
        "GPIO 36, 39",
        "ADC1 Analog Inputs",
        "Low-Noise ADC Channels"
      ]
    ],
    "firmware": "Modular, reusable firmware library featuring FreeRTOS ring-buffered UART drivers, multi-slave SPI bus masters, and robust power-failure-tolerant NVS storage."
  },
  {
    "id": "sync-tools",
    "repo": "Developer-Repository-and-Conversation-Synchronization-Suite",
    "title": "Developer Repository and Conversation Synchronization Suite",
    "category": "iot",
    "category_name": "IoT & Telemetry",
    "icon": "fa-solid fa-code-compare",
    "color": "blue",
    "badge_primary": "Python / GitHub CLI",
    "badge_cat": "Developer Automation",
    "desc": "Automated developer conversation synchronization engine maintaining version-controlled AI pair-programming repositories and session archives with automated JSONL parsing and Git synchronization.",
    "diagram": "+--------------------------------------------------------------+\n|             Conversation Logs & Transcripts (.jsonl)         |\n+--------------------------------------------------------------+\n        |\n        v\n+--------------------------------------------------------------+\n|               Python Synchronization Engine                  |\n|  - Regex Sanitization Engine   - Timestamp Session Parser    |\n|  - Automated Commit Creator    - Git Auto-Push to origin/main|\n+--------------------------------------------------------------+\n        |\n        v\n+--------------------------------------------------------------+\n|            GitHub Cloud Repositories & Archives              |\n+--------------------------------------------------------------+",
    "bom": [
      [
        "Python 3.10+ Environment",
        "Windows 11",
        "Runtime environment"
      ],
      [
        "GitHub CLI (gh)",
        "CLI",
        "OAuth2 authenticated session"
      ],
      [
        "MinGit Portable",
        "VCS",
        "Version control binary"
      ],
      [
        "Windows Task Scheduler",
        "OS Service",
        "15-minute cron-style daemon"
      ]
    ],
    "pinout": [
      [
        "Local JSONL Log Path",
        "Scratch Parser",
        "Input Stream"
      ],
      [
        "MinGit Executable",
        "Local Clones",
        "Git Automation"
      ],
      [
        "GitHub CLI gh.exe",
        "Remote API",
        "Cloud Synchronization"
      ]
    ],
    "firmware": "Robust Python 3 automation engine performing continuous regex scrubbing of metadata tags, formatting chronological markdown session transcripts, and auto-syncing to GitHub."
  }
];

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

    const interactables = document.querySelectorAll('a, button, input, .project-card, .matrix-card, .domain-card, .contact-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (ring) {
          ring.style.width = '54px';
          ring.style.height = '54px';
          ring.style.borderColor = '#00f0ff';
          ring.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.6)';
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
  // 2. Cosmic Milky Way Canvas Physics Engine
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('galaxy-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    let meteors = [];
    let backgroundParticles = [];
    let mouseXPos = -1000;
    let mouseYPos = -1000;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initMilkyWay();
    }
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
      mouseXPos = e.clientX;
      mouseYPos = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouseXPos = -1000;
      mouseYPos = -1000;
    });

    function initMilkyWay() {
      stars = [];
      backgroundParticles = [];
      const starCount = Math.floor((width * height) / 3800);

      // Star types
      const colors = ['#ffffff', '#38bdf8', '#00f0ff', '#818cf8', '#93c5fd', '#c7d2fe'];

      // Generate Twinkling Stars
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          baseAlpha: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12
        });
      }

      // Milky Way Galactic Band Dust Particles
      const bandParticles = Math.floor((width * height) / 4500);
      for (let i = 0; i < bandParticles; i++) {
        const spread = (Math.random() - 0.5) * (height * 0.45);
        backgroundParticles.push({
          dist: Math.random() * width,
          spread: spread,
          radius: Math.random() * 2.2 + 0.5,
          alpha: Math.random() * 0.25 + 0.05,
          color: Math.random() > 0.4 ? 'rgba(0, 240, 255,' : 'rgba(56, 189, 248,'
        });
      }
    }
    resizeCanvas();

    function spawnMeteor() {
      if (Math.random() < 0.015 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * height * 0.4,
          length: Math.random() * 90 + 50,
          speed: Math.random() * 7 + 8,
          angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2,
          alpha: 1
        });
      }
    }

    function drawMilkyWay() {
      ctx.clearRect(0, 0, width, height);

      // Render Galactic Dust Cloud
      backgroundParticles.forEach(bp => {
        bp.dist += 0.04;
        if (bp.dist > width) bp.dist = 0;

        const bx = bp.dist;
        const by = (height * 0.35) + (bp.dist * 0.35) + bp.spread;

        ctx.beginPath();
        ctx.arc(bx, by, bp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${bp.color} ${bp.alpha})`;
        ctx.fill();
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
  // 3. Scroll Progress Indicator
  // ------------------------------------------------------------------------
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (progressBar) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }
  });

  // ------------------------------------------------------------------------
  // 4. Typewriter Title Rotation
  // ------------------------------------------------------------------------
  const typewriter = document.getElementById('typewriter');
  const phrases = [
    "Autonomous Mobile Robots (AMR)",
    "ESP32 & Real-Time Firmware (FreeRTOS)",
    "Multi-Axis Joint Kinematics",
    "ROS2 & Gazebo Dynamic Simulation",
    "Multi-Sensor Industrial Automation",
    "Microcontroller Architecture (PIC, STM32, AVR)",
    "24GHz mmWave & Biomedical Telemetry"
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
  // 5. 3D Parallax Tilt on Cards
  // ------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ------------------------------------------------------------------------
  // 6. Scroll-Triggered Reveal Animations
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
  // 7. Project Filtering, Live Search & Count Update
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput = document.getElementById('project-search');
  const countDisplay = document.getElementById('project-count');

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
    let visibleCount = 0;
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const text = card.textContent.toLowerCase();

      const matchesFilter = (filter === 'all' || category === filter);
      const matchesSearch = !searchTerm || text.includes(searchTerm);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      }
    });

    if (countDisplay) {
      countDisplay.textContent = visibleCount;
    }
  }

  // ------------------------------------------------------------------------
  // 8. Interactive Architecture & Specs Modal Controller
  // ------------------------------------------------------------------------
  const modalBackdrop = document.getElementById('specs-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const modalIcon = document.getElementById('modal-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalBadges = document.getElementById('modal-badges');
  const modalDiagram = document.getElementById('modal-diagram');
  const modalBomTbody = document.getElementById('modal-bom-tbody');
  const modalPinoutTbody = document.getElementById('modal-pinout-tbody');
  const modalFirmware = document.getElementById('modal-firmware');
  const modalCloneCmd = document.getElementById('modal-clone-cmd');
  const modalRepoLink = document.getElementById('modal-repo-link');
  const modalReadmeLink = document.getElementById('modal-readme-link');
  const modalCopyCloneBtn = document.getElementById('modal-copy-clone-btn');

  function openSpecsModal(projectId) {
    const proj = PROJECTS_DATA.find(p => p.id === projectId);
    if (!proj) return;

    if (modalTitle) modalTitle.textContent = proj.title;
    if (modalDesc) modalDesc.textContent = proj.desc;
    if (modalIcon) modalIcon.className = proj.icon;

    if (modalBadges) {
      modalBadges.innerHTML = `
        <span class="badge badge-${proj.color}">${proj.badge_primary}</span>
        <span class="badge badge-cat">${proj.badge_cat}</span>
      `;
    }

    if (modalDiagram) modalDiagram.textContent = proj.diagram;

    if (modalBomTbody) {
      modalBomTbody.innerHTML = proj.bom.map(b => `
        <tr>
          <td><strong>${b[0]}</strong></td>
          <td><code>${b[1]}</code></td>
          <td>${b[2]}</td>
        </tr>
      `).join('');
    }

    if (modalPinoutTbody) {
      modalPinoutTbody.innerHTML = proj.pinout.map(p => `
        <tr>
          <td><code class="text-cyan">${p[0]}</code></td>
          <td><code>${p[1]}</code></td>
          <td>${p[2]}</td>
        </tr>
      `).join('');
    }

    if (modalFirmware) modalFirmware.textContent = proj.firmware;

    const cloneUrl = `git clone https://github.com/ALWINTR/${proj.repo}.git`;
    if (modalCloneCmd) modalCloneCmd.textContent = cloneUrl;
    if (modalRepoLink) modalRepoLink.href = `https://github.com/ALWINTR/${proj.repo}`;
    if (modalReadmeLink) modalReadmeLink.href = `https://github.com/ALWINTR/${proj.repo}/blob/main/README.md`;

    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      modalBackdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSpecsModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      modalBackdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  window.openSpecsModal = openSpecsModal;
  window.closeSpecsModal = closeSpecsModal;

  document.querySelectorAll('.open-specs-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openSpecsModal(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeSpecsModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeSpecsModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeSpecsModal();
    }
  });

  // ------------------------------------------------------------------------
  // 9. Toast Notifications & Copy to Clipboard
  // ------------------------------------------------------------------------
  const toast = document.getElementById('toast-notification');
  const toastText = document.getElementById('toast-text');

  function showToast(msg) {
    if (!toast) return;
    if (toastText) toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2600);
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-copy');
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`Copied "${val}" to clipboard!`);
        });
      }
    });
  });

  if (modalCopyCloneBtn) {
    modalCopyCloneBtn.addEventListener('click', () => {
      if (modalCloneCmd) {
        navigator.clipboard.writeText(modalCloneCmd.textContent).then(() => {
          showToast('Copied Git clone command!');
        });
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. Mobile Navigation Toggle
  // ------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('mobile-active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
});
