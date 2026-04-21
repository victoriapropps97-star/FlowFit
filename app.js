// Data models were moved to JSON files under /data to improve modularity and reduce bundle size.
// This loader fetches them at runtime and exposes the data as globals on `window`.
async function loadData() {
  console.log('FlowFit: Starting loadData');
  const base = 'data';
  try {
    console.log('FlowFit: Fetching data files...');
    const [workoutDataRes, nutritionDataRes, ingredientsRes, cycleDataRes, symptomsRes] = await Promise.all([
      fetch(`${base}/workouts.json`).then(r => r.json()),
      fetch(`${base}/nutrition.json`).then(r => r.json()),
      fetch(`${base}/ingredients.json`).then(r => r.json()),
      fetch(`${base}/cycle.json`).then(r => r.json()),
      fetch(`${base}/symptoms.json`).then(r => r.json())
    ]);
    console.log('FlowFit: Fetched data, setting globals');
    window.workoutData = workoutDataRes;
    window.nutritionData = nutritionDataRes;
    window.commonIngredients = ingredientsRes;
    window.cycleData = cycleDataRes;
    window.symptomData = symptomsRes;
    console.log('FlowFit: Data loaded from /data', window.workoutData ? 'workouts ok' : 'workouts missing');
  } catch (err) {
    console.error('FlowFit: Failed to load data files', err);
  }
}
// loadData(); // moved inside DOMContentLoaded

const availableSymptoms = [
    { id: 'cramps', label: 'Cramps' },
    { id: 'bloating', label: 'Bloating' },
    { id: 'fatigue', label: 'Fatigue' },
    { id: 'headache', label: 'Headache' },
    { id: 'insomnia', label: 'Insomnia' },
    { id: 'abdominal-pain', label: 'Abdominal Pain' },
    { id: 'tender-breasts', label: 'Tender Breasts' },
    { id: 'backache', label: 'Backache' },
    { id: 'acne', label: 'Acne' }
];

const moodData = {
    'mentally-okay': "<strong>Mentally Okay:</strong> That's great! Keep up your solid routine and continue listening to your body.",
    'irritable': "<strong>Irritable:</strong> Take a deep breath. A tough workout can help burn off frustration, or a quiet walk can help you cool down.",
    'anxious': "<strong>Anxious:</strong> Grounding exercises today. Try a 10-minute meditation, or a slow, focused strength session.",
    'mood-swings': "<strong>Mood Swings:</strong> Give yourself grace today. Your hormones are shifting. Stick to comfortable, familiar routines.",
    'sad': "<strong>Sad:</strong> Be extremely gentle with yourself. Endorphins from a light, enjoyable movement like dancing or walking in the sun might help.",
    'happy': "<strong>Happy:</strong> Ride that wave! It's a great day to try a new class, hit a PR, or just enjoy your movement."
};

const availableMoods = [
    { id: 'mentally-okay', label: 'Mentally Okay' },
    { id: 'irritable', label: 'Irritable' },
    { id: 'anxious', label: 'Anxious' },
    { id: 'mood-swings', label: 'Mood Swings' },
    { id: 'sad', label: 'Sad' },
    { id: 'happy', label: 'Happy' }
];

const flowData = {
    'spotting': {
        movement: "Spotting shouldn't restrict you much. Keep your routine as planned, but hydrate well.",
        nutrition: "Standard phase nutrition applies. Ensure iron levels are stable."
    },
    'light': {
        movement: "Light flow is usually manageable. If cramps are low, keep pushing! Otherwise, dial back the intensity by 20%.",
        nutrition: "Increase water intake and start integrating iron-rich foods."
    },
    'medium': {
        movement: "Moderate your core work. Avoid max-effort deadlifts or squats to prevent excessive pelvic floor pressure.",
        nutrition: "Warm liquids and magnesium-heavy foods. Don't restrict calories today."
    },
    'heavy': {
        movement: "Heavy flow days require grace. Avoid heavy axial loading (squats/deadlifts) and inversions. Focus on upper body, mobility, and light cardio.",
        nutrition: "High iron focus! Red meat, spinach, lentils. Limit caffeine to avoid compounding cramps."
    }
};

const availableFlows = [
    { id: 'spotting', label: 'Spotting' },
    { id: 'light', label: 'Light' },
    { id: 'medium', label: 'Medium' },
    { id: 'heavy', label: 'Heavy' }
];

const mobilityAdvice = {
    'none': "<p>Glad to hear you are feeling great! Keep maintaining your current preventative stretching routine.</p>",
    'lower-back': "<p><strong>For Lower Back Tightness:</strong></p><p>1. Cat-Cow stretches (2-3 minutes).</p><p>2. Child's pose with deep breathing.</p><p>3. Do NOT round your back during heavy lifts today.</p>",
    'neck-shoulder': "<p><strong>For Neck & Shoulder Tension:</strong></p><p>1. Gentle neck circles.</p><p>2. Thread-the-needle stretch for thoracic rotation.</p><p>3. Focus on pulling your shoulder blades 'down and back' throughout the day.</p>",
    'hips': "<p><strong>For Tight Hips:</strong></p><p>1. 90/90 Hip stretches.</p><p>2. Deep goblet squat hold (use a light weight to counterbalance).</p><p>3. Pigeon pose at the end of your workout.</p>",
    'cramps': "<p><strong>Period Cramps:</strong></p><p>1. Gentle steady-state cardio (blood flow helps!).</p><p>2. Child's pose or laying with legs elevated.</p><p>3. Drink hot tea and stay immensely hydrated.</p>"
};

// Event Listeners on DOM Load
document.addEventListener('DOMContentLoaded', async () => {
    await loadData(); // load data first

    // --- State Management ---
    const defaultState = {
        streak: 0,
        completedExercises: 0,
        lastWorkoutDate: null,
        workoutHistory: [],
        lastPeriodStart: null,
        cycleSetupDone: false,
        cycleRegularity: null,
        irregularCycles: false,
        periodHistory: [],
        allergies: [],
        ickFoods: [],
        showMacros: false,
        likes: [],
        dislikes: [],
        buddyXP: 0,
        buddyLevel: 1,
        customWorkouts: [],
        displayName: '',
        units: 'lbs',
        fitnessLevel: 'intermediate',
        waterGoal: 8,
        defaultRestTimer: 60,
        reduceMotion: false,
        dayPlans: {},
        userPresets: {},
        workoutPreference: {
            requireModified: false,
            lowImpact: false,
            noEquipment: false
        },
        weeklySchedule: {},
        cycleLength: 28,
        conditions: {
            pcos: false,
            endometriosis: false,
            'hormonal-bc': false,
            perimenopause: false,
            hysterectomy: false,
            pregnancy: false,
            postpartum: false
        },
        quoteFrequency: 3,
        lockEnabled: false,
        pin: null,
        voiceGuidance: true,
        onboardingDone: false,
        accountCreated: false
    };

    window.partnerState = { active: false, name: '' };

    let appState = JSON.parse(localStorage.getItem('flowfit_state')) || defaultState;
    
    // Ensure new keys exist if loading from an older state version
    appState = { ...defaultState, ...appState };
    const weeklyGoal = 20;

    const saveState = () => {
        localStorage.setItem('flowfit_state', JSON.stringify(appState));
    };

const inspirationalQuotes = [
    "Strength does not come from physical capacity. It comes from an indomitable will.",
    "The only bad workout is the one that didn't happen.",
    "Your body can do it. It's your mind you have to convince.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "Push yourself, because no one else is going to do it for you.",
    "The hardest lift of all is lifting your butt off the couch.",
    "Sweat is just fat crying.",
    "You don't have to be great to start, but you have to start to be great.",
    "Believe you can and you're halfway there.",
    "The pain you feel today will be the strength you feel tomorrow."
];

    const updateDashboard = () => {
        const streakDisplay = document.getElementById('streak-display');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const progressText = document.getElementById('progress-text');
        const dailyQuote = document.getElementById('daily-quote');
        const welcomeHeading = document.getElementById('welcome-heading');
        const mojoXpBar = document.getElementById('mojo-xp-bar');
        const mojoXpFill = document.getElementById('mojo-xp-fill');
        const mojoLvl = document.getElementById('mojo-lvl');
        const xpNumbers = document.getElementById('xp-numbers');

        if (welcomeHeading) {
            welcomeHeading.innerText = appState.displayName
                ? `Welcome Back, ${appState.displayName}!`
                : 'Welcome Back!';
        }
        if (streakDisplay) streakDisplay.innerText = `🔥 ${appState.streak || 0} Days`;
        
        const xpPct = (appState.buddyXP % 500) / 5;
        if (mojoXpBar) mojoXpBar.style.width = `${xpPct}%`;
        if (mojoXpFill) mojoXpFill.style.width = `${xpPct}%`;
        if (mojoLvl) mojoLvl.innerText = Math.floor(appState.buddyXP / 500) + 1;
        if (xpNumbers) xpNumbers.innerText = `${appState.buddyXP % 500} / 500`;

        // Volume Highlight (Invisible Insight)
        const lastWorkout = appState.workoutHistory[appState.workoutHistory.length - 1];
        if (lastWorkout && progressText) {
            const todayVol = (lastWorkout.volume || 0).toLocaleString();
            progressText.innerHTML = `Last session: <strong>${todayVol}</strong> ${appState.units || 'lbs'} volume. <br>Great consistency!`;
            if (progressBarFill) progressBarFill.style.width = '75%'; // Symbolic
        }

        // Partner Accountability Status
        const pName = document.getElementById('partner-name-display');
        const pStatus = document.getElementById('partner-status-text');
        const pPulse = document.getElementById('partner-pulse');

        if (pName && pStatus && pPulse) {
            if (window.partnerState && window.partnerState.active) {
                pPulse.classList.remove('hidden');
                pName.innerText = window.partnerState.name;
                pStatus.innerText = "Active now — you got this!";
            } else {
                pPulse.classList.add('hidden');
                pName.innerText = "Mojo (Solo)";
                pStatus.innerText = "Mojo is watching your back!";
                // Randomly activate "simulated partner" for demo
                if (Math.random() > 0.8) {
                    window.partnerState.active = true;
                    window.partnerState.name = "Coach Sarah"; // Mock partner
                    updateDashboard();
                }
            }
        }
        
        // Rotate quote based on frequency
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        const quoteIndex = Math.floor(dayOfYear / appState.quoteFrequency) % inspirationalQuotes.length;
        if (dailyQuote) dailyQuote.innerText = `"${inspirationalQuotes[quoteIndex]}"`;
        
        updateMojoUI();
    };

    // --- Mojo Mascot Logic ---
    const mojoLevels = [
        { name: "The Newbie", xpReq: 50, img: "assets/buddy1.png" },
        { name: "The Athlete", xpReq: 150, img: "assets/buddy2.png" },
        { name: "The Powerhouse", xpReq: 500, img: "assets/buddy3.png" },
        { name: "The Legend", xpReq: 1000, img: "assets/buddy3.png" }
    ];

    const addXP = (amount, silent = false) => {
        appState.buddyXP += amount;
        
        // Check level up
        const currentLvlIdx = appState.buddyLevel - 1;
        const nextLvl = mojoLevels[currentLvlIdx];
        if (nextLvl && appState.buddyXP >= nextLvl.xpReq) {
            appState.buddyLevel++;
            showMojoMessage("LEVEL UP!", `Mojo is now ${mojoLevels[appState.buddyLevel-1].name}!`);
        }
        
        saveState();
        updateMojoUI();
        if (!silent && amount > 0) showMojoVator();
    };

    const updateMojoUI = () => {
        const miniImg = document.getElementById('mojo-img-mini');
        const largeImg = document.getElementById('mojo-img-large');
        const lvlSpan = document.getElementById('mojo-lvl');
        const xpBar = document.getElementById('mojo-xp-bar');
        const xpFill = document.getElementById('mojo-xp-fill');
        const xpNumbers = document.getElementById('xp-numbers');
        const lvlText = document.getElementById('mojo-level-text');

        const currentLvl = mojoLevels[Math.min(appState.buddyLevel - 1, mojoLevels.length - 1)];
        const nextLvl = mojoLevels[Math.min(appState.buddyLevel, mojoLevels.length - 1)];
        
        if (miniImg) miniImg.src = currentLvl.img;
        if (largeImg) largeImg.src = currentLvl.img;
        if (lvlSpan) lvlSpan.innerText = appState.buddyLevel;
        if (lvlText) lvlText.innerText = `Stage ${appState.buddyLevel}: ${currentLvl.name}`;

        const xpPercent = Math.min((appState.buddyXP / (nextLvl.xpReq || appState.buddyXP)) * 100, 100);
        if (xpBar) xpBar.style.width = `${xpPercent}%`;
        if (xpFill) xpFill.style.width = `${xpPercent}%`;
        if (xpNumbers) xpNumbers.innerText = `${appState.buddyXP} / ${nextLvl.xpReq || 'MAX'}`;
    };

    const showMojoMessage = (title, body) => {
        const toast = document.getElementById('mojo-vator');
        const tTitle = document.getElementById('mojo-msg-title');
        const tBody = document.getElementById('mojo-msg-body');
        
        tTitle.innerText = title;
        tBody.innerText = body;
        
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 4000);
    };

    const mojoCheers = [
        "Light weight! Baby!",
        "You're making this look easy!",
        "One set closer to your goals!",
        "Keep that intensity up!",
        "Mojo is impressed!",
        "Solid reps. Keep it going!",
        "Focus and breathe."
    ];

    const showMojoVator = () => {
        const cheer = mojoCheers[Math.floor(Math.random() * mojoCheers.length)];
        showMojoMessage("Mojo says:", cheer);
    };

    // --- Privacy Lock Logic ---
    const lockScreen = document.getElementById('lock-screen');
    const pinDots = document.querySelectorAll('.pin-dot');
    const lockError = document.getElementById('lock-error');
    let enteredPin = "";

    const initPrivacyLock = () => {
        if (!appState.lockEnabled || !appState.pin) {
            if (lockScreen) lockScreen.classList.add('hidden');
            return;
        }
        
        if (lockScreen) {
            lockScreen.classList.remove('hidden');
            enteredPin = "";
            updatePinDots();
        }
    };

    const updatePinDots = () => {
        pinDots.forEach((dot, i) => {
            dot.classList.toggle('filled', i < enteredPin.length);
        });
    };

    document.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            const val = key.dataset.val;
            if (val === 'back') {
                enteredPin = enteredPin.slice(0, -1);
            } else if (enteredPin.length < 4) {
                enteredPin += val;
            }

            updatePinDots();

            if (enteredPin.length === 4) {
                if (enteredPin === appState.pin) {
                    lockScreen.classList.add('hidden');
                    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
                    showMojoMessage("Unlocked", "Welcome back!");
                } else {
                    if (lockError) lockError.classList.remove('hidden');
                    if (navigator.vibrate) navigator.vibrate(200);
                    setTimeout(() => {
                        enteredPin = "";
                        updatePinDots();
                    }, 500);
                }
            }
        });
    });

    initPrivacyLock();

    saveState();
    console.log("FlowFit: Core state initialized.");
    updateDashboard();
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');

    const navigateTo = (target) => {
        console.log('FlowFit: Navigating to', target);
        if (!target) return;
        console.log(`FlowFit: Navigating to ${target}`);
        // Update active nav
        navItems.forEach(nav => nav.classList.remove('active'));
        const navItem = document.querySelector(`[data-target="${target}"]`);
        if (navItem) navItem.classList.add('active');
        // Update active view
        views.forEach(view => {
            if (view.id === target) {
                view.classList.add('active');
                if (target === 'insights') renderInsights();
            } else {
                view.classList.remove('active');
            }
        });
    };

    window.navigateTo = navigateTo; // make global for onclick

    if (navItems.length > 0) {
        navItems.forEach(item => {
            // Keyboard support
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const target = item.getAttribute('data-target');
                    navigateTo(target);
                }
            });
        });
        console.log("FlowFit: Navigation initialized.");
    }

    // Fix broken buttons
    const openWellnessBtn = document.getElementById('open-wellness-btn');
    const startWorkoutsBtn = document.getElementById('start-workouts-btn');
    if (openWellnessBtn) openWellnessBtn.addEventListener('click', () => navigateTo('wellness'));
    if (startWorkoutsBtn) startWorkoutsBtn.addEventListener('click', () => navigateTo('workouts'));

    // --- Accessible Modal + Settings Handling ---
    // Focus trap helpers
    let lastFocusTrapRemover = null;
    let lastActiveElementBeforeModal = null;

    const enableFocusTrap = (modal) => {
        if (!modal) return () => {};
        const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusables = Array.from(modal.querySelectorAll(focusableSelector)).filter(el => el.offsetParent !== null);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        const keyHandler = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeModalGeneric(modal);
                return;
            }
            if (e.key === 'Tab') {
                if (focusables.length === 0) {
                    e.preventDefault();
                    return;
                }
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    };

    const openModalGeneric = (modal) => {
        if (!modal) return;
        lastActiveElementBeforeModal = document.activeElement;
        modal.setAttribute('aria-hidden', 'false');
        modal.classList.remove('hidden');
        // focus first focusable
        const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const focusables = Array.from(modal.querySelectorAll(focusableSelector)).filter(el => el.offsetParent !== null);
        if (focusables.length > 0) focusables[0].focus();
        if (lastFocusTrapRemover) lastFocusTrapRemover();
        lastFocusTrapRemover = enableFocusTrap(modal);
    };

    const closeModalGeneric = (modal) => {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.add('hidden');
        if (lastFocusTrapRemover) {
            lastFocusTrapRemover();
            lastFocusTrapRemover = null;
        }
        if (lastActiveElementBeforeModal && typeof lastActiveElementBeforeModal.focus === 'function') {
            lastActiveElementBeforeModal.focus();
        }
    };

    const settingsToggleBtn = document.getElementById('settings-toggle-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const prefModifiedEl = document.getElementById('pref-modified');
    const prefLowImpactEl = document.getElementById('pref-lowimpact');
    const prefNoEquipmentEl = document.getElementById('pref-noequipment');
    const quoteFrequencyEl = document.getElementById('quote-frequency-select');
    const prefVoiceGuidanceEl = document.getElementById('pref-voice-guidance');
    const prefDisplayNameEl = document.getElementById('pref-display-name');
    const prefFitnessLevelEl = document.getElementById('pref-fitness-level');
    const prefWaterGoalEl = document.getElementById('pref-water-goal');
    const prefWaterGoalDisplay = document.getElementById('pref-water-goal-display');
    const prefReduceMotionEl = document.getElementById('pref-reduce-motion');
    const prefLockEnabledEl = document.getElementById('pref-lock-enabled');
    const pinSetupWrap = document.getElementById('pin-setup-wrap');
    const prefPinInput = document.getElementById('pref-pin-input');
    const savePinBtn = document.getElementById('save-pin-btn');
    const resetAllDataBtn = document.getElementById('reset-all-data-btn');

    // Track temporary selections for unit and rest buttons in the modal
    let tempUnits = appState.units || 'lbs';
    let tempRestTimer = appState.defaultRestTimer || 60;

    // Water goal slider live preview
    if (prefWaterGoalEl) {
        prefWaterGoalEl.addEventListener('input', () => {
            if (prefWaterGoalDisplay) prefWaterGoalDisplay.textContent = prefWaterGoalEl.value;
        });
    }

    // Unit toggle buttons in settings
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tempUnits = btn.dataset.unit;
        });
    });

    // Rest timer preference buttons in settings
    document.querySelectorAll('.rest-pref-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.rest-pref-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            tempRestTimer = parseInt(btn.dataset.secs);
        });
    });

    const openSettings = () => {
        if (!settingsModal) return;
        const prefs = appState.workoutPreference || {};

        // Profile
        if (prefDisplayNameEl) prefDisplayNameEl.value = appState.displayName || '';
        if (prefFitnessLevelEl) prefFitnessLevelEl.value = appState.fitnessLevel || 'intermediate';

        // Workout
        tempUnits = appState.units || 'lbs';
        document.querySelectorAll('.unit-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.unit === tempUnits);
        });
        tempRestTimer = appState.defaultRestTimer || 60;
        document.querySelectorAll('.rest-pref-btn').forEach(b => {
            b.classList.toggle('active', parseInt(b.dataset.secs) === tempRestTimer);
        });
        if (prefModifiedEl) prefModifiedEl.checked = !!prefs.requireModified;
        if (prefLowImpactEl) prefLowImpactEl.checked = !!prefs.lowImpact;
        if (prefNoEquipmentEl) prefNoEquipmentEl.checked = !!prefs.noEquipment;

        // Nutrition & Hydration
        if (prefWaterGoalEl) {
            prefWaterGoalEl.value = appState.waterGoal || 8;
            if (prefWaterGoalDisplay) prefWaterGoalDisplay.textContent = appState.waterGoal || 8;
        }

        // General
        if (quoteFrequencyEl) quoteFrequencyEl.value = appState.quoteFrequency || 3;
        if (prefVoiceGuidanceEl) prefVoiceGuidanceEl.checked = appState.voiceGuidance !== false;

        // Accessibility
        if (prefReduceMotionEl) prefReduceMotionEl.checked = !!appState.reduceMotion;

        // Security
        if (prefLockEnabledEl) {
            prefLockEnabledEl.checked = !!appState.lockEnabled;
            if (pinSetupWrap) pinSetupWrap.classList.toggle('hidden', !prefLockEnabledEl.checked);
        }

        openModalGeneric(settingsModal);
    };

    if (prefLockEnabledEl) {
        prefLockEnabledEl.addEventListener('change', () => {
            if (pinSetupWrap) pinSetupWrap.classList.toggle('hidden', !prefLockEnabledEl.checked);
        });
    }

    if (savePinBtn) {
        savePinBtn.addEventListener('click', () => {
            const val = prefPinInput.value.trim();
            if (val.length === 4 && /^\d+$/.test(val)) {
                appState.pin = val;
                appState.lockEnabled = true;
                saveState();
                showMojoMessage("PIN Saved", "App will lock on next restart.");
            } else {
                alert("Please enter a 4-digit numeric PIN.");
            }
        });
    }

    const closeSettings = () => closeModalGeneric(settingsModal);

    if (settingsToggleBtn) settingsToggleBtn.addEventListener('click', openSettings);
    if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', () => {
            // Profile
            appState.displayName = (prefDisplayNameEl?.value || '').trim();
            appState.fitnessLevel = prefFitnessLevelEl?.value || 'intermediate';

            // Workout
            appState.units = tempUnits;
            appState.defaultRestTimer = tempRestTimer;
            restDuration = tempRestTimer;
            appState.workoutPreference = {
                requireModified: !!(prefModifiedEl && prefModifiedEl.checked),
                lowImpact: !!(prefLowImpactEl && prefLowImpactEl.checked),
                noEquipment: !!(prefNoEquipmentEl && prefNoEquipmentEl.checked)
            };

            // Nutrition & Hydration
            appState.waterGoal = parseInt(prefWaterGoalEl?.value) || 8;

            // General
            appState.quoteFrequency = parseInt(quoteFrequencyEl?.value) || 3;
            appState.voiceGuidance = !!(prefVoiceGuidanceEl && prefVoiceGuidanceEl.checked);

            // Security
            appState.lockEnabled = !!(prefLockEnabledEl && prefLockEnabledEl.checked);

            // Accessibility
            appState.reduceMotion = !!(prefReduceMotionEl && prefReduceMotionEl.checked);
            applyReduceMotion();

            saveState();
            closeSettings();
            updateDashboard();
            initWaterTracker();
            showMojoMessage('Preferences saved', 'All settings updated.');
        });
    }

    // Reset all data
    if (resetAllDataBtn) {
        resetAllDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete ALL your FlowFit data? This cannot be undone.')) {
                localStorage.removeItem('flowfit_state');
                location.reload();
            }
        });
    }

    // Export Data
    const exportDataBtn = document.getElementById('export-data-btn');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
            const dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", `mojofit_backup_${new Date().toISOString().split('T')[0]}.json`);
            dlAnchorElem.click();
            showMojoMessage('Backup Exported', 'Keep this file safe!');
        });
    }

    // Import Data
    const importDataBtn = document.getElementById('import-data-btn');
    const importFileInput = document.getElementById('import-file-input');
    if (importDataBtn && importFileInput) {
        importDataBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to overwrite your current data with a backup?")) {
                importFileInput.click();
            }
        });
        importFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const importedState = JSON.parse(ev.target.result);
                    if (importedState && typeof importedState === 'object') {
                        localStorage.setItem('flowfit_state', JSON.stringify(importedState));
                        alert('Backup successfully imported! The app will now reload.');
                        location.reload();
                    }
                } catch (err) {
                    alert('Invalid backup file. Please ensure it is a valid MojoFit JSON file.');
                }
            };
            reader.readAsText(file);
        });
    }

    // Reduce motion helper
    const applyReduceMotion = () => {
        document.body.classList.toggle('reduce-motion', !!appState.reduceMotion);
    };
    applyReduceMotion();

    // --- Workout Tracker Logic ---
    const startWorkoutBtn = document.getElementById('start-workout-btn');
    const finishWorkoutBtn = document.getElementById('finish-workout-btn');
    const workoutControls = document.getElementById('workout-controls');
    const activeWorkoutContainer = document.getElementById('active-workout-container');
    const trackerContainer = document.getElementById('tracker-exercises-container');
    const workoutStatus = document.getElementById('workout-status');

    let activeWorkout = [];

    // Start a new workout
    if (startWorkoutBtn) {
        startWorkoutBtn.addEventListener('click', () => {
            activeWorkout = [];
            if (trackerContainer) trackerContainer.innerHTML = '';
            if (workoutControls) workoutControls.classList.add('hidden');
            if (activeWorkoutContainer) activeWorkoutContainer.classList.remove('hidden');
            const searchInput = document.getElementById('exercise-search-input');
            if (searchInput) { searchInput.value = ''; searchInput.focus(); }
            updateWorkoutControls();
        });
    }

    const useDayPlanBtn = document.getElementById('use-day-plan-btn');
    if (useDayPlanBtn) {
        useDayPlanBtn.addEventListener('click', () => {
            if (viewingDayIdx === null) return;
            const plan = (appState.dayPlans || {})[viewingDayIdx] || [];
            if (plan.length === 0) {
                showMojoMessage('Empty Plan', 'Add some exercises first!');
                return;
            }

            // Copy plan to active workout
            activeWorkout = plan.map(ex => ({
                name: ex.name,
                target: ex.sets,
                sets: []
            }));

            // Switch UI
            if (dayPlanViewer) dayPlanViewer.classList.add('hidden');
            if (workoutControls) workoutControls.classList.add('hidden');
            if (activeWorkoutContainer) {
                activeWorkoutContainer.classList.remove('hidden');
                activeWorkoutContainer.scrollIntoView({ behavior: 'smooth' });
            }
            
            renderTracker();
            showMojoMessage('Session Started!', `Let's crush this ${days[viewingDayIdx]} workout!`);
        });
    }

    // --- Copy Workout Summary ---
    const copyWorkoutBtn = document.getElementById('copy-workout-btn');
    if (copyWorkoutBtn) {
        copyWorkoutBtn.addEventListener('click', () => {
            let summary = '';
            const units = appState.units || 'lbs';

            // Use active workout if in session, otherwise last history entry
            const source = activeWorkout.length > 0
                ? activeWorkout
                : (appState.workoutHistory || []).slice(-1)[0]?.exercises;

            if (!source || source.length === 0) {
                showMojoMessage('Nothing yet', 'Start a workout first!');
                return;
            }

            const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
            summary += `FlowFit Workout — ${dateStr}\n`;
            summary += '─'.repeat(30) + '\n';

            let totalVolume = 0;
            source.forEach(ex => {
                const completedSets = ex.sets.filter(s => s.completed);
                if (completedSets.length === 0) {
                    summary += `${ex.name} (no sets logged)\n`;
                    return;
                }
                summary += `${ex.name}\n`;
                completedSets.forEach((s, i) => {
                    const w = parseFloat(s.weight) || 0;
                    const r = parseInt(s.reps) || 0;
                    summary += `  Set ${i + 1}: ${w} ${units} × ${r} reps\n`;
                    totalVolume += w * r;
                });
            });

            summary += '─'.repeat(30) + '\n';
            summary += `Total Volume: ${totalVolume.toLocaleString()} ${units}\n`;

            navigator.clipboard.writeText(summary).then(() => {
                showMojoMessage('Copied!', 'Workout summary copied to clipboard.');
            }).catch(() => {
                showMojoMessage('Oops', 'Could not copy — try again.');
            });
        });
    }

    // --- Exercise Search & Autocomplete ---
    const exerciseSearchInput = document.getElementById('exercise-search-input');
    const exerciseSearchResults = document.getElementById('exercise-search-results');

    // Build a flat list of all exercises for searching
    const getAllExercises = () => {
        if (!window.workoutData) return [];
        const prefs = appState.workoutPreference || {};
        const results = [];
        Object.entries(window.workoutData).forEach(([group, exercises]) => {
            exercises.forEach(ex => {
                // Apply workout preference variants
                let name = ex.name, desc = ex.desc;
                if (ex.modifications) {
                    if (prefs.lowImpact && ex.modifications.lowImpact) {
                        name = ex.modifications.lowImpact.name;
                        desc = ex.modifications.lowImpact.desc;
                    } else if (prefs.noEquipment && ex.modifications.noEquipment) {
                        name = ex.modifications.noEquipment.name;
                        desc = ex.modifications.noEquipment.desc;
                    }
                }
                results.push({ name, desc, group, sets: ex.sets });
            });
        });
        return results;
    };

    const searchExercises = (query) => {
        const q = query.toLowerCase().trim();
        if (!q) return [];
        const all = getAllExercises();
        return all.filter(ex =>
            ex.name.toLowerCase().includes(q) || ex.group.toLowerCase().includes(q) || (q === 'mobility' && ex.group === 'mobility')
        ).slice(0, 10);
    };

    const addExerciseToWorkout = (name) => {
        // Find category for mobility tag
        const all = getAllExercises();
        const match = all.find(ex => ex.name === name);
        const group = match ? match.group : 'custom';
        const target = match ? match.sets : '';
        activeWorkout.push({ name, sets: [], group, target });
        renderTracker();
        if (exerciseSearchInput) { exerciseSearchInput.value = ''; }
        if (exerciseSearchResults) exerciseSearchResults.classList.add('hidden');
    };

    if (exerciseSearchInput) {
        exerciseSearchInput.addEventListener('input', () => {
            const q = exerciseSearchInput.value.trim();
            if (!q) {
                exerciseSearchResults.classList.add('hidden');
                return;
            }
            const matches = searchExercises(q);
            exerciseSearchResults.innerHTML = '';

            if (matches.length === 0) {
                // Offer to create custom
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `<strong>+ Add "${q}" as custom exercise</strong>`;
                item.addEventListener('click', () => addExerciseToWorkout(q));
                exerciseSearchResults.appendChild(item);
            } else {
                matches.forEach(ex => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    const mobilityTag = ex.group === 'mobility' ? '<span class="mobility-tag">Mobility</span>' : '';
                    item.innerHTML = `<strong>${ex.name} ${mobilityTag}</strong><small class="text-dim">${ex.desc}</small>`;
                    item.addEventListener('click', () => addExerciseToWorkout(ex.name));
                    exerciseSearchResults.appendChild(item);
                });
                // Also offer custom at bottom
                const customItem = document.createElement('div');
                customItem.className = 'search-result-item search-result-custom';
                customItem.innerHTML = `<strong>+ Add "${q}" as custom</strong>`;
                customItem.addEventListener('click', () => addExerciseToWorkout(q));
                exerciseSearchResults.appendChild(customItem);
            }

            exerciseSearchResults.classList.remove('hidden');
        });

        // Hide results on blur (with delay so clicks register)
        exerciseSearchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (exerciseSearchResults) exerciseSearchResults.classList.add('hidden');
            }, 200);
        });

        // Re-show on focus if there's text
        exerciseSearchInput.addEventListener('focus', () => {
            if (exerciseSearchInput.value.trim()) {
                exerciseSearchInput.dispatchEvent(new Event('input'));
            }
        });
    }

    // ===== EXERCISE LIBRARY MODAL =====
    const libraryModal = document.getElementById('library-modal');
    const openLibraryBtn = document.getElementById('open-library-btn');
    const closeLibraryModalBtn = document.getElementById('close-library-modal-btn');
    const libraryCategories = document.getElementById('library-categories');
    const libraryExerciseList = document.getElementById('library-exercise-list');

    let currentLibraryCat = 'chest';

    const renderLibraryCategories = () => {
        if (!libraryCategories) return;
        const cats = Object.keys(workoutData);
        libraryCategories.innerHTML = '';
        cats.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = `library-cat-btn ${cat === currentLibraryCat ? 'active' : ''}`;
            const label = cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', '/');
            btn.innerText = label;
            btn.addEventListener('click', () => {
                currentLibraryCat = cat;
                renderLibraryCategories();
                renderLibraryExercises();
            });
            libraryCategories.appendChild(btn);
        });
    };

    const renderLibraryExercises = () => {
        if (!libraryExerciseList) return;
        const exercises = workoutData[currentLibraryCat] || [];
        libraryExerciseList.innerHTML = '';
        
        exercises.forEach(ex => {
            const item = document.createElement('div');
            item.className = 'library-ex-item';
            
            // Handle variants or display modifications
            const name = ex.name;
            item.innerHTML = `<span>${name}</span>`;
            
            item.addEventListener('click', () => {
                addExerciseToWorkout(name);
                if (libraryModal) closeModalGeneric(libraryModal);
            });
            libraryExerciseList.appendChild(item);
        });
    };

    if (openLibraryBtn) {
        openLibraryBtn.addEventListener('click', () => {
            if (libraryModal) {
                renderLibraryCategories();
                renderLibraryExercises();
                openModalGeneric(libraryModal);
            }
        });
    }

    if (closeLibraryModalBtn) {
        closeLibraryModalBtn.addEventListener('click', () => {
            if (libraryModal) closeModalGeneric(libraryModal);
        });
    }


    // --- Compact Tracker Rendering ---
    const getPastExercisePerformance = (exName) => {
        if (!appState.workoutHistory) return null;
        for (let i = appState.workoutHistory.length - 1; i >= 0; i--) {
            const h = appState.workoutHistory[i];
            if (h.exercises) {
                const pastEx = h.exercises.find(e => e.name === exName);
                if (pastEx && pastEx.sets && pastEx.sets.length > 0) {
                    const bestSet = [...pastEx.sets].sort((a,b) => (b.weight*b.reps) - (a.weight*a.reps))[0];
                    return { date: h.date, set: bestSet };
                }
            }
        }
        return null;
    };

    const renderTracker = () => {
        trackerContainer.innerHTML = '';
        const units = appState.units || 'lbs';

        activeWorkout.forEach((exercise, exIndex) => {
            const card = document.createElement('div');
            card.className = 'glass-card compact-exercise-card';

            // Exercise header
            const header = document.createElement('div');
            header.className = 'compact-ex-header';
            header.innerHTML = `
                <div class="flex-between" style="align-items: flex-start;">
                    <div>
                        <h4 class="compact-ex-name">${exercise.name}</h4>
                        ${exercise.target ? `<div class="text-xs text-dim mt-1" style="font-weight: 500;">${exercise.target}</div>` : ''}
                    </div>
                    <div class="flex gap-2 align-center">
                        <button class="ask-mojo-btn-sm" data-exname="${exercise.name}" title="Form tips">🐒</button>
                        <button class="remove-ex-btn" data-ex="${exIndex}" title="Remove exercise">×</button>
                    </div>
                </div>
            `;
            card.appendChild(header);

            const pastPerf = getPastExercisePerformance(exercise.name);
            if (pastPerf && pastPerf.set && pastPerf.set.weight > 0) {
                const pastDiv = document.createElement('div');
                const pDate = new Date(pastPerf.date).toLocaleDateString(undefined, {month:'short', day:'numeric'});
                pastDiv.className = 'text-xs text-dim mb-3';
                pastDiv.innerHTML = `<strong>Prior Best (${pDate}):</strong> ${pastPerf.set.weight}${units} × ${pastPerf.set.reps} reps`;
                card.appendChild(pastDiv);
            }

            // Logged sets as compact pills
            if (exercise.sets.length > 0) {
                const pillsWrap = document.createElement('div');
                pillsWrap.className = 'set-pills';
                exercise.sets.forEach((set, setIdx) => {
                    const pill = document.createElement('span');
                    pill.className = 'set-pill';
                    pill.innerHTML = `<strong>${set.weight}</strong>${units} × <strong>${set.reps}</strong>`;
                    pill.title = `Set ${setIdx + 1} — tap to remove`;
                    pill.addEventListener('click', () => {
                        exercise.sets.splice(setIdx, 1);
                        renderTracker();
                    });
                    pillsWrap.appendChild(pill);
                });
                card.appendChild(pillsWrap);
            }

            // Quick-log input row
            const logRow = document.createElement('div');
            logRow.className = 'quick-log-row';
            const lastSet = exercise.sets[exercise.sets.length - 1];
            const mobilityTag = exercise.group === 'mobility' ? '<span class="mobility-tag">Mobility</span>' : '';
            if (header.querySelector('.compact-ex-name')) {
                header.querySelector('.compact-ex-name').innerHTML += mobilityTag;
            }

            logRow.innerHTML = `
                <input type="number" class="quick-input weight-quick" placeholder="${units}" value="${lastSet ? lastSet.weight : ''}" inputmode="decimal">
                <span class="quick-log-x">×</span>
                <input type="number" class="quick-input reps-quick" placeholder="reps" value="${lastSet ? lastSet.reps : ''}" inputmode="numeric">
                <button class="log-set-btn" data-ex="${exIndex}">Log</button>
            `;
            card.appendChild(logRow);

            trackerContainer.appendChild(card);
        });

        const handleSetLog = (exIdx, weightVal, repsVal) => {
            if (!weightVal || !repsVal) return;
            const weight = parseFloat(weightVal);
            const reps = parseInt(repsVal);

            const setData = { weight: weightVal, reps: repsVal, completed: true };
            activeWorkout[exIdx].sets.push(setData);

            // Track stats
            appState.completedExercises++;
            const todayStr = new Date().toDateString();
            if (appState.lastWorkoutDate !== todayStr) {
                appState.streak++;
                appState.lastWorkoutDate = todayStr;
            }

            const exName = activeWorkout[exIdx].name;
            if (weight > 0) {
                if (!appState.personalRecords) appState.personalRecords = {};
                if (!appState.personalRecords[exName] || weight > appState.personalRecords[exName]) {
                    const isNewPR = !!appState.personalRecords[exName];
                    appState.personalRecords[exName] = weight;
                    if (isNewPR) {
                        showMojoMessage('🏆 NEW PR!', `${exName}: ${weight} ${appState.units || 'lbs'} — crushing it!`);
                    }
                    renderPRs();
                }
            }

            // Haptic success
            if (navigator.vibrate) navigator.vibrate(50);

            addXP(10);
            saveState();
            updateDashboard();
            renderTracker();
            startRestTimer(restDuration);

            // Occasional Partner Nudge simulation
            if (Math.random() > 0.7) setTimeout(triggerPartnerNudge, 2000);
        };

        // Attach event listeners
        document.querySelectorAll('.log-set-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const exIdx = parseInt(btn.dataset.ex);
                const card = btn.closest('.compact-exercise-card');
                const weightVal = card.querySelector('.weight-quick').value.trim();
                const repsVal = card.querySelector('.reps-quick').value.trim();
                handleSetLog(exIdx, weightVal, repsVal);
            });
        });

        // Remove exercise
        document.querySelectorAll('.remove-ex-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const exIdx = parseInt(btn.dataset.ex);
                activeWorkout.splice(exIdx, 1);
                renderTracker();
            });
        });

        // Mojo form tips
        document.querySelectorAll('.ask-mojo-btn-sm').forEach(btn => {
            btn.addEventListener('click', () => {
                openMojoFormGuide(btn.getAttribute('data-exname'));
            });
        });

        // Auto-focus the reps input after typing weight (on Enter)
        document.querySelectorAll('.weight-quick').forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const repsInput = input.closest('.quick-log-row').querySelector('.reps-quick');
                    if (repsInput) repsInput.focus();
                }
            });
        });

        // Log on Enter from reps field
        document.querySelectorAll('.reps-quick').forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const logBtn = input.closest('.quick-log-row').querySelector('.log-set-btn');
                    if (logBtn) logBtn.click();
                }
            });
        });
    };

    // --- Estimated 1RM Helper (Epley Formula) ---
    const estimate1RM = (weight, reps) => {
        const w = parseFloat(weight);
        const r = parseInt(reps);
        if (!w || w <= 0 || !r || r <= 0) return 0;
        if (r === 1) return w;
        return Math.round(w * (1 + r / 30));
    };

    // --- Muscle Group Lookup ---
    const getExerciseMuscleGroup = (exName) => {
        if (!window.workoutData) return 'Other';
        for (const [group, exercises] of Object.entries(window.workoutData)) {
            if (exercises.some(ex => ex.name === exName)) {
                return group.replace(/-/g, ' & ').replace(/\b\w/g, c => c.toUpperCase());
            }
        }
        return 'Other';
    };

    // Finish Workout
    if (finishWorkoutBtn) {
        finishWorkoutBtn.addEventListener('click', () => {
            let totalVolume = 0;
            let setsCompleted = 0;
            const muscleGroupVolume = {};
            
            activeWorkout.forEach(ex => {
                const group = getExerciseMuscleGroup(ex.name);
                ex.sets.forEach(set => {
                    if (set.completed && set.weight && set.reps) {
                        const vol = parseFloat(set.weight) * parseInt(set.reps);
                        totalVolume += vol;
                        setsCompleted++;
                        muscleGroupVolume[group] = (muscleGroupVolume[group] || 0) + vol;
                    }
                });
            });

            stopRestTimer();

            if (setsCompleted > 0) {
                appState.workoutHistory.push({
                    date: new Date().toISOString(),
                    volume: totalVolume,
                    exercises: activeWorkout,
                    muscleGroupVolume
                });
                addXP(50);
                saveState();

                // Build volume chart UI
                let chartHtml = '<div class="volume-chart">';
                Object.entries(muscleGroupVolume)
                    .sort((a, b) => b[1] - a[1])
                    .forEach(([g, v]) => {
                        const pct = Math.min(100, Math.round((v / totalVolume) * 100));
                        chartHtml += `
                            <div class="chart-row">
                                <div class="chart-label-row">
                                    <span>${g}</span>
                                    <span>${v.toLocaleString()} ${appState.units || 'lbs'} (${pct}%)</span>
                                </div>
                                <div class="chart-bar-bg">
                                    <div class="chart-bar-fill" style="width: ${pct}%"></div>
                                </div>
                            </div>
                        `;
                    });
                chartHtml += '</div>';

                if (workoutStatus) workoutStatus.innerText = `Amazing work! ${totalVolume.toLocaleString()} ${appState.units || 'lbs'} total!`;
                const workoutStatusSub = document.getElementById('workout-status-sub');
                if (workoutStatusSub) workoutStatusSub.innerHTML = `<strong>Volume Breakdown:</strong>` + chartHtml;
                
                // Final Mojo message
                showMojoMessage("Workout Complete!", `You did ${setsCompleted} sets today! Mojo is proud.`);
                if (Math.random() > 0.5) setTimeout(triggerPartnerNudge, 3000);
            } else {
                if (workoutStatus) workoutStatus.innerText = "Session finished (no volume logged).";
            }

            if (activeWorkoutContainer) activeWorkoutContainer.classList.add('hidden');
            if (workoutControls) workoutControls.classList.remove('hidden');
            if (startWorkoutBtn) startWorkoutBtn.innerText = "Start Another";
            renderHistory();
        });
    }

    // ===== REST TIMER MODULE =====
    let restDuration = appState.defaultRestTimer || 60;
    let restInterval = null;
    let restRemaining = restDuration;
    const restOverlay = document.getElementById('rest-timer-overlay');
    const restDisplay = document.getElementById('rest-timer-display');
    const skipRestBtn = document.getElementById('skip-rest-btn');
    const restDurationBtns = document.querySelectorAll('.rest-duration-btn');

    const beepSound = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g);
            g.connect(ctx.destination);
            o.type = 'sine';
            o.frequency.value = 880;
            g.gain.setValueAtTime(0.3, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            o.start(ctx.currentTime);
            o.stop(ctx.currentTime + 0.5);
            // Mojo encouragement sound - high beep
            setTimeout(() => {
                const o2 = ctx.createOscillator();
                o2.connect(g);
                o2.type = 'sine';
                o2.frequency.value = 1100;
                o2.start(ctx.currentTime);
                o2.stop(ctx.currentTime + 0.4);
            }, 300);
        } catch(e) { console.log('Audio not available'); }
    };

    // Add partner reactions to the timer overlay
    if (restOverlay) {
        const reactionsDiv = document.createElement('div');
        reactionsDiv.className = 'flex gap-4 justify-center mt-6 pt-4';
        reactionsDiv.style.borderTop = '1px solid var(--glass-border)';
        reactionsDiv.innerHTML = `
            <button class="icon-btn nudge-btn" data-type="fire" title="Send Fire!">🔥</button>
            <button class="icon-btn nudge-btn" data-type="highfive" title="Send High Five!">✋</button>
            <button class="icon-btn nudge-btn" data-type="flex" title="Send Flex!">💪</button>
        `;
        restOverlay.querySelector('.rest-timer-card').appendChild(reactionsDiv);

        reactionsDiv.querySelectorAll('.nudge-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-type');
                const emojiMap = { fire: "🔥", highfive: "✋", flex: "💪" };
                showNudge(emojiMap[type], "You", `Sent a ${type} reaction!`);
                if (navigator.vibrate) navigator.vibrate(100);
                // Mock partner response
                setTimeout(() => {
                    showNudge(emojiMap[type], window.partnerState.name, "Reacted back!");
                }, 1500);
            });
        });
    }

    const speakText = (text) => {
        if (!appState.voiceGuidance) return;
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.05;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
    };

    const startRestTimer = (secs) => {
        stopRestTimer();
        restRemaining = secs;
        if (restDisplay) restDisplay.innerText = restRemaining;
        if (restOverlay) restOverlay.classList.remove('hidden');

        restInterval = setInterval(() => {
            restRemaining--;
            if (restDisplay) {
                restDisplay.innerText = restRemaining;
                if (restRemaining <= 10) {
                    restDisplay.classList.add('urgent');
                    if (restRemaining <= 3 && restRemaining > 0) {
                        speakText(restRemaining.toString());
                    }
                } else {
                    restDisplay.classList.remove('urgent');
                }
            }
            if (restRemaining <= 0) {
                stopRestTimer();
                beepSound();
                speakText("Let's go!");
                showMojoMessage("Time!", "Rest over — next set GO! 🔥");
            }
        }, 1000);
    };

    const stopRestTimer = () => {
        clearInterval(restInterval);
        restInterval = null;
        if (restOverlay) restOverlay.classList.add('hidden');
        if (restDisplay) restDisplay.classList.remove('urgent');
    };

    if (skipRestBtn) skipRestBtn.addEventListener('click', stopRestTimer);

    if (restDurationBtns.length > 0) {
        // Highlight the saved default rest duration button
        restDurationBtns.forEach(btn => {
            if (parseInt(btn.getAttribute('data-secs')) === restDuration) {
                btn.classList.add('active');
            }
            btn.addEventListener('click', () => {
                restDurationBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                restDuration = parseInt(btn.getAttribute('data-secs'));
                if (restInterval) startRestTimer(restDuration);
            });
        });
    }

    // ===== WEEKLY SCHEDULE MODULE =====
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const muscleGroups = [
        { id: 'rest', label: 'Rest Day', emoji: '😴' },
        { id: 'back-shoulders', label: 'Back & Shoulders', emoji: '💪', map: ['back', 'shoulders'] },
        { id: 'legs-glutes', label: 'Legs & Glutes', emoji: '🦵', map: ['legs'] },
        { id: 'chest-triceps', label: 'Chest & Triceps', emoji: '🏋️', map: ['chest'] },
        { id: 'core-cardio', label: 'Core & Cardio', emoji: '🔥', map: ['core', 'cardio'] },
        { id: 'full-body', label: 'Full Body', emoji: '⚡', map: ['full-body'] },
        { id: 'biceps', label: 'Biceps', emoji: '💪', map: ['arms'] },
        { id: 'triceps', label: 'Triceps', emoji: '💪', map: ['arms'] },
        { id: 'quads', label: 'Quads', emoji: '🦵', map: ['legs'] },
        { id: 'glutes-hams', label: 'Glutes & Hams', emoji: '🍑', map: ['legs'] },
        { id: 'mobility', label: 'Mobility', emoji: '🧘', map: ['mobility'] },
        { id: 'cardio', label: 'Cardio', emoji: '🏃', map: ['cardio'] }
    ];

    const renderWeekSchedule = () => {
        const grid = document.getElementById('weekly-schedule-grid');
        if (!grid) return;
        const schedule = appState.weekSchedule || {};
        const todayIdx = (new Date().getDay() + 6) % 7;

        // Calculate current week start (Monday)
        const now = new Date();
        const currentDay = (now.getDay() + 6) % 7;
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - currentDay);
        startOfWeek.setHours(0,0,0,0);

        grid.innerHTML = '';
        days.forEach((day, i) => {
            const assignment = schedule[i];
            const group = muscleGroups.find(m => m.id === assignment);
            const plan = (appState.dayPlans || {})[i] || [];
            
            // Check if this day of this week is completed
            const targetDate = new Date(startOfWeek);
            targetDate.setDate(startOfWeek.getDate() + i);
            const targetDateStr = targetDate.toDateString();
            
            const isCompleted = (appState.workoutHistory || []).some(h => new Date(h.date).toDateString() === targetDateStr);

            const card = document.createElement('div');
            card.className = `day-card ${i === todayIdx ? 'today' : ''} ${assignment === 'rest' ? 'rest-day' : ''} ${isCompleted ? 'completed' : ''}`;
            card.innerHTML = `
                <span class="day-label">${day}</span>
                <span class="day-emoji">${group ? group.emoji : '＋'}</span>
                <span class="day-muscles">${group ? (group.id === 'rest' ? 'Rest' : group.label) : 'Tap to plan'}</span>
                ${plan.length > 0 ? `<span class="day-plan-count">${plan.length} ex</span>` : ''}
            `;
            card.addEventListener('click', () => {
                if (assignment && assignment !== 'rest') {
                    openDayPlanViewer(i);
                } else {
                    openSchedulePicker(i);
                }
            });
            card.addEventListener('dblclick', () => openSchedulePicker(i));
            grid.appendChild(card);
        });
    };

    // Schedule Picker Modal
    const schedulePickerModal = document.getElementById('schedule-picker-modal');
    const schedulePickerTitle = document.getElementById('schedule-picker-title');
    const schedulePickerOptions = document.getElementById('schedule-picker-options');
    const closeSchedulePickerBtn = document.getElementById('close-schedule-picker-btn');

    // --- Auto-generate a day plan from the exercise library ---
    const generateDayPlan = (groupId) => {
        const group = muscleGroups.find(m => m.id === groupId);
        if (!group || groupId === 'rest' || !window.workoutData) return [];
        
        const mapKeys = group.map || [groupId];
        let allPossible = [];
        mapKeys.forEach(k => {
            if (window.workoutData[k]) allPossible = allPossible.concat(window.workoutData[k]);
        });

        if (allPossible.length === 0) return [];

        const prefs = appState.workoutPreference || {};
        const isBeginner = appState.fitnessLevel === 'beginner';
        
        // Strategy: 2 heavy compound (first half of list), 3 accessories (second half)
        const compounds = allPossible.slice(0, Math.floor(allPossible.length / 2));
        const accessories = allPossible.slice(Math.floor(allPossible.length / 2));

        const shuffle = (array) => array.sort(() => Math.random() - 0.5);
        
        const selected = [
            ...shuffle(compounds).slice(0, isBeginner ? 1 : 2),
            ...shuffle(accessories).slice(0, isBeginner ? 2 : 3)
        ];

        return selected.map(ex => {
            let name = ex.name, sets = ex.sets;
            // Adjust sets for beginners
            if (isBeginner && sets && sets.includes('3')) {
                sets = sets.replace('3', '2');
            }
            if (ex.modifications) {
                if (prefs.lowImpact && ex.modifications.lowImpact) name = ex.modifications.lowImpact.name;
                else if (prefs.noEquipment && ex.modifications.noEquipment) name = ex.modifications.noEquipment.name;
            }
            return { name, sets };
        });
    };

    const openSchedulePicker = (dayIdx) => {
        if (schedulePickerTitle) schedulePickerTitle.textContent = `Assign ${days[dayIdx]}`;
        if (!schedulePickerOptions) return;

        schedulePickerOptions.innerHTML = '';
        muscleGroups.forEach(group => {
            const currentAssignment = (appState.weekSchedule || {})[dayIdx];
            const option = document.createElement('div');
            option.className = `schedule-picker-option${currentAssignment === group.id ? ' active' : ''}`;
            option.innerHTML = `<span style="font-size:1.3rem">${group.emoji}</span><span>${group.label}</span>`;
            option.addEventListener('click', () => {
                if (!appState.weekSchedule) appState.weekSchedule = {};
                if (!appState.dayPlans) appState.dayPlans = {};
                appState.weekSchedule[dayIdx] = group.id;
                // Auto-generate the plan for this day
                appState.dayPlans[dayIdx] = generateDayPlan(group.id);
                saveState();
                renderWeekSchedule();
                closeModalGeneric(schedulePickerModal);
                // Open the plan viewer for this day so user can customize
                if (group.id !== 'rest') {
                    openDayPlanViewer(dayIdx);
                } else {
                    closeDayPlanViewer();
                    addXP(5, false);
                    showMojoMessage("Rest Day Scheduled!", "Recovery is where the growth happens. Great choice!");
                }
                updateWorkoutControls();
            });
            schedulePickerOptions.appendChild(option);
        });

        openModalGeneric(schedulePickerModal);
    };

    if (closeSchedulePickerBtn) {
        closeSchedulePickerBtn.addEventListener('click', () => closeModalGeneric(schedulePickerModal));
    }

    // --- Day Plan Viewer ---
    const dayPlanViewer = document.getElementById('day-plan-viewer');
    const dayPlanTitle = document.getElementById('day-plan-title');
    const dayPlanSubtitle = document.getElementById('day-plan-subtitle');
    const dayPlanExercises = document.getElementById('day-plan-exercises');
    const closeDayPlanBtn = document.getElementById('close-day-plan-btn');
    const dayPlanSearchInput = document.getElementById('day-plan-search');
    const dayPlanSearchResults = document.getElementById('day-plan-search-results');
    let viewingDayIdx = null;

    const openDayPlanViewer = (dayIdx) => {
        console.log(`Opening day plan viewer for dayIdx: ${dayIdx} (${days[dayIdx]})`);
        viewingDayIdx = dayIdx;
        const groupId = (appState.weekSchedule || {})[dayIdx];
        const group = muscleGroups.find(m => m.id === groupId);
        
        if (!group || groupId === 'rest') {
            closeDayPlanViewer();
            return;
        }

        // Ensure a plan exists
        if (!appState.dayPlans) appState.dayPlans = {};
        if (!appState.dayPlans[dayIdx] || appState.dayPlans[dayIdx].length === 0) {
            appState.dayPlans[dayIdx] = generateDayPlan(groupId);
            saveState();
        }

        if (dayPlanTitle) dayPlanTitle.textContent = `${days[dayIdx]}'s Plan`;
        
        // --- Unified Plan: Nutrition & Wellness ---
        const fuelContent = document.getElementById('day-fuel-content');
        const insightContent = document.getElementById('day-insight-content');
        const fuelCard = document.getElementById('day-fuel-card');
        
        if (fuelContent && window.nutritionData) {
            const all = [...window.nutritionData.snack, ...window.nutritionData.meal];
            const recipe = all[dayIdx % all.length];
            fuelContent.innerHTML = `
                <p class="text-sm font-bold truncate">${recipe.name}</p>
                <p class="text-xs opacity-60">${recipe.macros ? `${recipe.macros.protein} protein · ` : ''}${recipe.prepTime}</p>
            `;
            fuelCard.onclick = () => openRecipeModal(recipe);
        }

        if (insightContent) {
            const insights = [
                "Focus on explosive movement today for peak power.",
                "Magnesium might help if you feeling any muscle tightness.",
                "Hydration is key today—aim for an extra 16oz of water.",
                "Your cycle phase suggests prioritizing recovery tonight.",
                "Great day for a PR if you're feeling energetic!",
                "Try 5 minutes of mindful breathing before you lift.",
                "Listen to your joints; swap for low-impact if needed."
            ];
            insightContent.innerHTML = `<p class="text-xs italic">"${insights[dayIdx % insights.length]}"</p>`;
        }

        // Show/Hide load preset button
        const loadRoutineBtn = document.getElementById('load-routine-btn');
        if (loadRoutineBtn) {
            const hasPreset = appState.userPresets && appState.userPresets[groupId];
            loadRoutineBtn.classList.toggle('hidden', !hasPreset);
        }

        renderDayPlan(dayIdx);
        
        if (dayPlanViewer) {
            dayPlanViewer.classList.remove('hidden');
            setTimeout(() => {
                dayPlanViewer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const closeDayPlanViewer = () => {
        viewingDayIdx = null;
        if (dayPlanViewer) dayPlanViewer.classList.add('hidden');
    };

    const renderDayPlan = (dayIdx) => {
        if (!dayPlanExercises) return;
        const plan = (appState.dayPlans || {})[dayIdx] || [];
        const groupId = (appState.weekSchedule || {})[dayIdx];
        const group = muscleGroups.find(m => m.id === groupId);

        if (dayPlanSubtitle) dayPlanSubtitle.textContent = `${group ? group.label : ''} — ${plan.length} exercise${plan.length !== 1 ? 's' : ''}`;

        dayPlanExercises.innerHTML = '';
        plan.forEach((ex, idx) => {
            const item = document.createElement('div');
            item.className = 'day-plan-item';
            
            // Look up exercise metadata for labels
            const allEx = getAllExercises();
            const meta = allEx.find(a => a.name === ex.name);
            const muscleLabel = meta ? `<span class="muscle-tag-sm">${meta.group || ''}</span>` : '';

            item.innerHTML = `
                <div class="day-plan-item-info">
                    <span class="day-plan-item-num">${idx + 1}</span>
                    <div>
                        <div class="flex align-center">
                            ${muscleLabel}
                            <strong>${ex.name}</strong>
                        </div>
                        <small class="text-dim">${ex.sets || ''}</small>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="view-technique-btn btn-icon-sm" data-ex="${ex.name}" title="View Technique">💡</button>
                    <button class="remove-plan-ex-btn" data-idx="${idx}" title="Remove">&times;</button>
                </div>
            `;
            dayPlanExercises.appendChild(item);
        });

        // Event Listeners for plan items
        document.querySelectorAll('.view-technique-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const exName = btn.dataset.ex;
                showTechniqueVisual(exName);
            });
        });

        document.querySelectorAll('.remove-plan-ex-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = parseInt(btn.dataset.idx);
                appState.dayPlans[dayIdx].splice(idx, 1);
                saveState();
                renderDayPlan(dayIdx);
                updateWorkoutControls();
                renderWeekSchedule();
            });
        });
    };

    const visualContainer = document.getElementById('technique-visual-container');
    const visualContent = document.getElementById('technique-visual-content');
    const closeVisualBtn = document.getElementById('close-visual-btn');

    const showTechniqueVisual = (exName) => {
        if (!visualContainer || !visualContent) return;
        
        const allEx = getAllExercises();
        const ex = allEx.find(e => e.name === exName);
        
        visualContent.innerHTML = `
            <div class="video-overlay"><div class="play-btn-realistic"></div></div>
            <div style="padding: 1.5rem; padding-top: 100px; background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, transparent 100%); position: relative; z-index: 2;">
                <h4 class="mb-1 text-white">${exName}</h4>
                <p class="text-xs opacity-70 mb-3">${ex ? ex.desc : 'Personal training guidance loading...'}</p>
                <div class="flex gap-2">
                    <span class="badge-mini">Realistic 3D</span>
                    <span class="badge-mini">Expert Cue</span>
                </div>
            </div>
        `;
        
        visualContainer.classList.remove('hidden');
        visualContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    if (closeVisualBtn) {
        closeVisualBtn.addEventListener('click', () => {
            visualContainer.classList.add('hidden');
        });
    }

    // --- Shuffle, Save, Load Logic ---
    const shuffleBtn = document.getElementById('shuffle-day-plan-btn');
    const saveRoutineBtn = document.getElementById('save-routine-btn');
    const loadRoutineBtn = document.getElementById('load-routine-btn');

    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', () => {
            if (viewingDayIdx === null) return;
            const groupId = appState.weekSchedule[viewingDayIdx];
            appState.dayPlans[viewingDayIdx] = generateDayPlan(groupId);
            saveState();
            renderDayPlan(viewingDayIdx);
            renderWeekSchedule();
        });
    }

    if (saveRoutineBtn) {
        saveRoutineBtn.addEventListener('click', () => {
            if (viewingDayIdx === null) return;
            const groupId = appState.weekSchedule[viewingDayIdx];
            if (!appState.userPresets) appState.userPresets = {};
            appState.userPresets[groupId] = JSON.parse(JSON.stringify(appState.dayPlans[viewingDayIdx]));
            saveState();
            showMojoMessage('Routine Saved!', `Your custom ${groupId} routine is locked in.`);
            if (loadRoutineBtn) loadRoutineBtn.classList.remove('hidden');
        });
    }

    if (loadRoutineBtn) {
        loadRoutineBtn.addEventListener('click', () => {
            if (viewingDayIdx === null) return;
            const groupId = appState.weekSchedule[viewingDayIdx];
            if (appState.userPresets && appState.userPresets[groupId]) {
                appState.dayPlans[viewingDayIdx] = JSON.parse(JSON.stringify(appState.userPresets[groupId]));
                saveState();
                renderDayPlan(viewingDayIdx);
                renderWeekSchedule();
                showMojoMessage('Routine Loaded', 'Your saved routine has been applied.');
            }
        });
    }

    if (closeDayPlanBtn) {
        closeDayPlanBtn.addEventListener('click', closeDayPlanViewer);
    }

    // Day plan search — add exercises to the plan
    if (dayPlanSearchInput) {
        dayPlanSearchInput.addEventListener('input', () => {
            const q = dayPlanSearchInput.value.trim();
            if (!q || viewingDayIdx === null) {
                dayPlanSearchResults.classList.add('hidden');
                return;
            }

            const allEx = getAllExercises();
            const matches = allEx.filter(ex =>
                ex.name.toLowerCase().includes(q.toLowerCase())
            ).slice(0, 6);

            dayPlanSearchResults.innerHTML = '';

            if (matches.length === 0) {
                const item = document.createElement('div');
                item.className = 'search-result-item';
                item.innerHTML = `<strong>+ Add "${q}" as custom</strong>`;
                item.addEventListener('click', () => {
                    appState.dayPlans[viewingDayIdx].push({ name: q, sets: '' });
                    saveState();
                    renderDayPlan(viewingDayIdx);
                    updateWorkoutControls();
                    dayPlanSearchInput.value = '';
                    dayPlanSearchResults.classList.add('hidden');
                });
                dayPlanSearchResults.appendChild(item);
            } else {
                matches.forEach(ex => {
                    const item = document.createElement('div');
                    item.className = 'search-result-item';
                    item.innerHTML = `<strong>${ex.name}</strong><small class="text-dim">${ex.desc}</small>`;
                    item.addEventListener('click', () => {
                        appState.dayPlans[viewingDayIdx].push({ name: ex.name, sets: ex.sets || '' });
                        saveState();
                        renderDayPlan(viewingDayIdx);
                        updateWorkoutControls();
                        dayPlanSearchInput.value = '';
                        dayPlanSearchResults.classList.add('hidden');
                    });
                    dayPlanSearchResults.appendChild(item);
                });
            }
            dayPlanSearchResults.classList.remove('hidden');
        });

        dayPlanSearchInput.addEventListener('blur', () => {
    // --- Workout Controls: Show today's plan context ---
    const startPlanBtn = document.getElementById('start-plan-btn');
    const workoutStatusSub = document.getElementById('workout-status-sub');

    const updateWorkoutControls = () => {
        const todayIdx = (new Date().getDay() + 6) % 7;
        const groupId = (appState.weekSchedule || {})[todayIdx];
        const group = muscleGroups.find(m => m.id === groupId);
        const plan = (appState.dayPlans || {})[todayIdx] || [];

        if (group && groupId !== 'rest' && plan.length > 0) {
            if (workoutStatus) workoutStatus.textContent = `${group.label} Day`;
            if (workoutStatusSub) workoutStatusSub.textContent = `${plan.length} exercises ready — tap Start Plan to begin.`;
            if (startPlanBtn) startPlanBtn.classList.remove('hidden');
        } else if (group && groupId === 'rest') {
            if (workoutStatus) workoutStatus.textContent = 'Rest Day 😴';
            if (workoutStatusSub) workoutStatusSub.textContent = 'Recovery is part of the process.';
            if (startPlanBtn) startPlanBtn.classList.add('hidden');
        } else {
            if (workoutStatus) workoutStatus.textContent = 'Ready to Lift?';
            if (workoutStatusSub) workoutStatusSub.textContent = 'Plan your week below, or start an empty session.';
            if (startPlanBtn) startPlanBtn.classList.add('hidden');
        }
    };

    // Start Plan button — pre-load today's plan into the active workout
    if (startPlanBtn) {
        startPlanBtn.addEventListener('click', () => {
            const todayIdx = (new Date().getDay() + 6) % 7;
            const plan = (appState.dayPlans || {})[todayIdx] || [];
            activeWorkout = plan.map(ex => ({ name: ex.name, sets: [], target: ex.sets }));
            if (trackerContainer) trackerContainer.innerHTML = '';
            if (workoutControls) workoutControls.classList.add('hidden');
            if (activeWorkoutContainer) activeWorkoutContainer.classList.remove('hidden');
            closeDayPlanViewer();
            renderTracker();
        });
    }

    updateWorkoutControls();

    // ===== PERSONAL RECORDS MODULE =====
    const renderPRs = () => {
        const container = document.getElementById('pr-list-container');
        const badge = document.getElementById('pr-count-badge');
        if (!container) return;

        const prs = appState.personalRecords || {};
        const prKeys = Object.keys(prs);

        if (badge) badge.innerText = `${prKeys.length} PR${prKeys.length !== 1 ? 's' : ''}`;

        if (prKeys.length === 0) {
            container.innerHTML = '<p class="text-sm text-dim">Log your first set to start tracking PRs!</p>';
            return;
        }

        container.innerHTML = '';
        prKeys.forEach(name => {
            const prWeight = prs[name];
            // Find the best reps logged at this PR weight for 1RM estimate
            let bestRepsAtPR = 1;
            (appState.workoutHistory || []).forEach(session => {
                (session.exercises || []).forEach(ex => {
                    if (ex.name === name) {
                        ex.sets.forEach(s => {
                            if (parseFloat(s.weight) === prWeight && parseInt(s.reps) > bestRepsAtPR) {
                                bestRepsAtPR = parseInt(s.reps);
                            }
                        });
                    }
                });
            });
            const est1rm = estimate1RM(prWeight, bestRepsAtPR);
            const item = document.createElement('div');
            item.className = 'pr-item';
            item.innerHTML = `
                <div>
                    <span>${name}</span>
                    ${est1rm > prWeight ? `<span class="est-1rm">Est. 1RM: ${est1rm} ${appState.units || 'lbs'}</span>` : ''}
                </div>
                <span class="pr-weight">🏆 ${prWeight} ${appState.units || 'lbs'}</span>
            `;
            container.appendChild(item);
        });
    };

    renderPRs();

    // ===== WORKOUT HISTORY MODULE =====
    const renderHistory = () => {
        const container = document.getElementById('history-list-container');
        const badge = document.getElementById('history-count-badge');
        if (!container) return;

        const history = appState.workoutHistory || [];
        if (badge) badge.innerText = `${history.length} session${history.length !== 1 ? 's' : ''}`;

        if (history.length === 0) {
            container.innerHTML = '<p class="text-sm text-dim">Complete your first workout to see history here!</p>';
            return;
        }

        container.innerHTML = '';
        const units = appState.units || 'lbs';
        history.slice().reverse().slice(0, 20).forEach(session => {
            const date = new Date(session.date);
            const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const exerciseNames = session.exercises.map(e => e.name).join(', ');
            const totalSets = session.exercises.reduce((sum, e) => sum + e.sets.filter(s => s.completed).length, 0);

            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-date">${dateStr}</div>
                <div class="history-details">
                    <span class="history-exercises">${exerciseNames}</span>
                    <span class="history-stats">${totalSets} sets · ${session.volume.toLocaleString()} ${units}</span>
                </div>
            `;
            container.appendChild(item);
        });
    };

    renderHistory();

    // ===== MOJO FORM GUIDE MODULE =====
    const formGuides = {};
    // Build form guides from all exercises
    Object.values(workoutData).flat().forEach(ex => {
        formGuides[ex.name] = [
            { icon: '👁️', step: 'Setup', text: ex.desc, warning: null },
            { icon: '🔽', step: 'Start Position', text: `Begin ${ex.sets}. Get your starting position solid before adding weight.`, warning: 'Never sacrifice form for heavier weight!' },
            { icon: '💪', step: 'The Movement', text: `Execute with control. ${ex.desc}`, warning: null },
            { icon: '⬆️', step: 'The Return', text: 'Return to start slowly — the eccentric phase builds muscle too! Count 2-3 seconds on the way back.', warning: null },
            { icon: '🌬️', step: 'Breathing', text: 'Exhale on the effort (the hard part). Inhale on the return. Never hold your breath!', warning: 'Holding breath can cause dizziness or injury.' }
        ];
    });

    let currentFormStep = 0;
    let currentFormGuide = [];

    const openMojoFormGuide = (exName) => {
        const modal = document.getElementById('mojo-form-modal');
        const title = document.getElementById('form-modal-title');
        const stepsContainer = document.getElementById('form-guide-steps');
        if (!modal || !stepsContainer) return;

        currentFormGuide = formGuides[exName] || [{
            icon: '🐒', step: 'General Tip', text: 'Focus on full range of motion, control the weight both ways, and keep your core braced!', warning: null
        }];
        currentFormStep = 0;

        if (title) title.innerText = `Form Guide: ${exName}`;
        renderFormStep(stepsContainer);
        modal.classList.remove('hidden');
    };

    const renderFormStep = (container) => {
        const step = currentFormGuide[currentFormStep];
        const counter = document.getElementById('form-step-counter');
        if (counter) counter.innerText = `Step ${currentFormStep + 1} of ${currentFormGuide.length}`;

        container.innerHTML = `
            <div class="form-step-card">
                <div class="step-number">${step.step}</div>
                <div class="step-icon">${step.icon}</div>
                <div class="step-text">${step.text}</div>
                ${step.warning ? `<div class="step-warning">⚠️ ${step.warning}</div>` : ''}
            </div>
        `;
        speakText(`${step.step}. ${step.text} ${step.warning ? 'Warning: ' + step.warning : ''}`);
    };

    const closeFormBtn = document.getElementById('close-form-modal-btn');
    const prevBtn = document.getElementById('form-prev-btn');
    const nextBtn = document.getElementById('form-next-btn');

    if (closeFormBtn) closeFormBtn.addEventListener('click', () => {
        const m = document.getElementById('mojo-form-modal');
        if (m) m.classList.add('hidden');
        if (window.speechSynthesis) window.speechSynthesis.cancel();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
        const c = document.getElementById('form-guide-steps');
        if (currentFormStep > 0) { currentFormStep--; renderFormStep(c); }
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        const c = document.getElementById('form-guide-steps');
        if (currentFormStep < currentFormGuide.length - 1) { currentFormStep++; renderFormStep(c); }
    });

    console.log('FlowFit: Phase 1 modules loaded (Rest Timer, Schedule, PRs, Form Guide).');

    // ===== WATER TRACKER MODULE (Phase 2) =====
    const getWaterGoal = () => appState.waterGoal || 8;
    const getWaterMessage = (count) => {
        const goal = getWaterGoal();
        if (count === 0) return '';
        if (count >= goal) return `ALL ${goal} GLASSES! Mojo is doing a happy dance! 🎉🐒💧`;
        if (count === goal - 1) return "SO close! One more to go... almost there! 🔥";
        const pct = count / goal;
        if (pct <= 0.15) return "One down! Keep sippin' 💧";
        if (pct <= 0.3) return "You're on a roll 🌊";
        if (pct <= 0.45) return "Keep it flowing! 🥤";
        if (pct <= 0.55) return `${count} glasses! Mojo is impressed 🐒`;
        if (pct <= 0.7) return "More than halfway there! 💪";
        if (pct <= 0.85) return "You're glowing 🌟";
        return "Almost at your goal! 🔥";
    };

    const initWaterTracker = () => {
        const row = document.getElementById('water-glasses-row');
        if (!row) return;

        // Reset at midnight — compare saved date vs today
        const today = new Date().toDateString();
        if (appState.waterDate !== today) {
            appState.waterCount = 0;
            appState.waterDate = today;
            saveState();
        }

        row.innerHTML = '';
        for (let i = 1; i <= getWaterGoal(); i++) {
            const btn = document.createElement('button');
            btn.className = `water-glass-btn ${i <= (appState.waterCount || 0) ? 'filled' : ''}`;
            btn.setAttribute('data-glass', i);
            btn.setAttribute('aria-label', `Glass ${i}`);
            btn.innerHTML = `
                <div class="glass-rim"></div>
                <div class="glass-cup"></div>
                <span class="glass-number">${i}</span>
            `;
            btn.addEventListener('click', () => drinkGlass(i));
            row.appendChild(btn);
        }

        updateWaterUI();
    };

    const drinkGlass = (glassNum) => {
        const current = appState.waterCount || 0;

        // Toggle: clicking a filled glass unfills it and everything above
        if (glassNum <= current) {
            appState.waterCount = glassNum - 1;
        } else {
            appState.waterCount = glassNum;
        }

        // Mojo cheers at 8!
        if (appState.waterCount === getWaterGoal()) {
            addXP(15);
            showMojoMessage('💧 Fully Hydrated!', `All ${getWaterGoal()} glasses done! Mojo is so proud of you!`);
        }

        saveState();
        initWaterTracker();
    };

    const updateWaterUI = () => {
        const count = appState.waterCount || 0;
        const label = document.getElementById('water-count-label');
        const bar = document.getElementById('water-progress-bar');
        const msg = document.getElementById('water-mojo-msg');

        if (label) label.innerText = `${count} / ${getWaterGoal()} glasses`;
        if (bar) bar.style.width = `${(count / getWaterGoal()) * 100}%`;
        if (msg) msg.innerText = getWaterMessage(count);
    };

    const waterResetBtn = document.getElementById('water-reset-btn');
    if (waterResetBtn) {
        waterResetBtn.addEventListener('click', () => {
            appState.waterCount = 0;
            saveState();
            initWaterTracker();
        });
    }

    initWaterTracker();
    console.log('FlowFit: Phase 2 Water Tracker loaded.');

    // ===== GOAL TRACKER MODULE (Phase 3) =====
    const GOAL_TYPE_ICONS = { fitness: '💪', body: '⚖️', habit: '🔄' };
    let activeGoalFilter = 'all';
    let selectedGoalType = 'fitness';

    // --- Ensure goals array exists in state ---
    if (!appState.goals) appState.goals = [];

    const renderGoals = () => {
        const container = document.getElementById('goals-container');
        const completedContainer = document.getElementById('completed-goals-container');
        const emptyState = document.getElementById('goals-empty-state');
        const completedSection = document.getElementById('completed-goals-section');
        if (!container) return;

        const filtered = appState.goals.filter(g =>
            !g.completed && (activeGoalFilter === 'all' || g.type === activeGoalFilter)
        );
        const completed = appState.goals.filter(g => g.completed);

        container.innerHTML = '';
        if (filtered.length === 0) {
            if (emptyState) emptyState.classList.remove('hidden');
        } else {
            if (emptyState) emptyState.classList.add('hidden');
            filtered.forEach(goal => container.appendChild(buildGoalCard(goal, false)));
        }

        if (completedContainer) completedContainer.innerHTML = '';
        if (completed.length > 0) {
            if (completedSection) completedSection.classList.remove('hidden');
            completed.forEach(goal => completedContainer && completedContainer.appendChild(buildGoalCard(goal, true)));
        } else {
            if (completedSection) completedSection.classList.add('hidden');
        }
    };

    const buildGoalCard = (goal, isCompleted) => {
        const pct = Math.min(Math.round((goal.current / goal.target) * 100), 100);
        const card = document.createElement('div');
        card.className = `goal-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="goal-card-header">
                <span class="goal-type-tag ${goal.type}">${GOAL_TYPE_ICONS[goal.type] || ''} ${goal.type}</span>
                ${isCompleted ? '<span style="color:#22c55e; font-size:1.2rem;">✅</span>' : ''}
            </div>
            <div class="goal-title">${goal.title}</div>
            <div class="goal-progress-label">${goal.current} / ${goal.target} ${goal.unit}</div>
            <div class="goal-progress-bar-wrap">
                <div class="goal-progress-fill" style="width:${pct}%"></div>
            </div>
            ${!isCompleted ? `
            <div class="goal-card-actions">
                <button class="goal-log-btn" data-id="${goal.id}">+ Log Progress</button>
                <button class="goal-delete-btn" data-id="${goal.id}">🗑</button>
            </div>` : `
            <div class="goal-card-actions">
                <button class="goal-delete-btn" data-id="${goal.id}" style="flex:1">Remove</button>
            </div>`}
        `;

        const logBtn = card.querySelector('.goal-log-btn');
        if (logBtn) {
            logBtn.addEventListener('click', () => logGoalProgress(goal.id));
        }
        card.querySelectorAll('.goal-delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteGoal(goal.id));
        });

        return card;
    };

    const logGoalProgress = (id) => {
        const goal = appState.goals.find(g => g.id === id);
        if (!goal) return;
        const amount = parseFloat(prompt(`Log progress for "${goal.title}"\nCurrent: ${goal.current} ${goal.unit}\nEnter new total (or amount to add):`));
        if (isNaN(amount)) return;
        goal.current = amount;
        if (goal.current >= goal.target && !goal.completed) {
            goal.completed = true;
            goal.current = goal.target;
            addXP(50);
            showGoalCelebration(goal.title);
        }
        saveState();
        renderGoals();
    };

    const deleteGoal = (id) => {
        appState.goals = appState.goals.filter(g => g.id !== id);
        saveState();
        renderGoals();
    };

    const showGoalCelebration = (title) => {
        const overlay = document.getElementById('goal-celebrate-overlay');
        const nameEl = document.getElementById('celebrate-goal-name');
        if (overlay) {
            if (nameEl) nameEl.innerText = `"${title}"`;
            overlay.classList.remove('hidden');
            showMojoMessage('🏆 GOAL CRUSHED!', `You hit your goal: ${title}!`);
        }
    };

    const closeCelebrateBtn = document.getElementById('close-celebrate-btn');
    if (closeCelebrateBtn) {
        closeCelebrateBtn.addEventListener('click', () => {
            const overlay = document.getElementById('goal-celebrate-overlay');
            if (overlay) overlay.classList.add('hidden');
        });
    }

    // --- Add Goal Modal ---
    const addGoalBtn = document.getElementById('add-goal-btn');
    const addGoalModal = document.getElementById('add-goal-modal');
    const closeGoalModalBtn = document.getElementById('close-goal-modal-btn');
    const saveGoalBtn = document.getElementById('save-goal-btn');
    const goalTypeBtns = document.querySelectorAll('.goal-type-btn');

    if (addGoalBtn) addGoalBtn.addEventListener('click', () => {
        if (addGoalModal) addGoalModal.classList.remove('hidden');
    });
    if (closeGoalModalBtn) closeGoalModalBtn.addEventListener('click', () => {
        if (addGoalModal) addGoalModal.classList.add('hidden');
    });

    if (goalTypeBtns.length > 0) {
        goalTypeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                goalTypeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedGoalType = btn.getAttribute('data-type');
            });
        });
    }

    if (saveGoalBtn) {
        saveGoalBtn.addEventListener('click', () => {
            const title = document.getElementById('goal-title-input')?.value.trim();
            const current = parseFloat(document.getElementById('goal-current-input')?.value) || 0;
            const target = parseFloat(document.getElementById('goal-target-input')?.value);
            const unit = document.getElementById('goal-unit-input')?.value.trim() || '';

            if (!title || !target || target <= 0) {
                alert('Please fill in the goal description and target!');
                return;
            }

            const newGoal = {
                id: Date.now().toString(),
                type: selectedGoalType,
                title,
                current,
                target,
                unit,
                completed: false,
                createdAt: new Date().toISOString()
            };

            appState.goals.push(newGoal);
            saveState();
            renderGoals();
            if (addGoalModal) addGoalModal.classList.add('hidden');

            // Clear inputs
            ['goal-title-input','goal-current-input','goal-target-input','goal-unit-input'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });

            showMojoMessage('🎯 New Goal Set!', `"${title}" — Mojo believes in you!`);
        });
    }

    // --- Goal Filter Tabs ---
    const goalFilterTabs = document.querySelectorAll('[data-goal-filter]');
    if (goalFilterTabs.length > 0) {
        goalFilterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                goalFilterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeGoalFilter = tab.getAttribute('data-goal-filter');
                renderGoals();
            });
        });
    }

    renderGoals();
    console.log('FlowFit: Phase 3 Goal Tracker loaded.');

    // --- Nutrition Logic ---


    const nutriTabs = document.querySelectorAll('.nutri-tab');
    const nutritionContainer = document.getElementById('nutrition-container');
    const dailyPicksSection = document.getElementById('daily-picks-section');
    const dailyPicksContainer = document.getElementById('daily-picks-container');
    const hiddenRecipesBtn = document.getElementById('view-hidden-recipes-btn');

    // Recommendation Engine Helper
    const isRecommended = (item) => {
        if (appState.likes.length === 0) return false;
        // Check for ingredient overlap with liked recipes
        const likedIngredients = new Set();
        const allRecipes = [...nutritionData.snack, ...nutritionData.meal, ...nutritionData.recovery];
        
        appState.likes.forEach(name => {
            const liked = allRecipes.find(r => r.name === name);
            if (liked) liked.ingredients.forEach(ing => likedIngredients.add(ing));
        });

        return item.ingredients.some(ing => likedIngredients.has(ing));
    };

    const toggleLike = (name, e) => {
        e.stopPropagation();
        if (appState.likes.includes(name)) {
            appState.likes = appState.likes.filter(n => n !== name);
        } else {
            appState.likes.push(name);
            // If we like it, we definitely don't dislike it
            appState.dislikes = appState.dislikes.filter(n => n !== name);
        }
        saveState();
        refreshNutritionViews();
    };

    const toggleDislike = (name, e) => {
        e.stopPropagation();
        if (!appState.dislikes.includes(name)) {
            appState.dislikes.push(name);
            // If we dislike it, we don't like it anymore
            appState.likes = appState.likes.filter(n => n !== name);
        }
        saveState();
        refreshNutritionViews();
    };

    const refreshNutritionViews = () => {
        const activeTab = document.querySelector('.nutri-tab.active');
        const type = activeTab ? activeTab.getAttribute('data-type') : 'snack';
        renderNutrition(type);
        renderDailyPicks();
        updateHiddenBtn();
    };

    const updateHiddenBtn = () => {
        if (hiddenRecipesBtn) {
            hiddenRecipesBtn.innerText = `Manage Hidden (${appState.dislikes.length})`;
        }
    };

    const renderCard = (item, container, isDaily = false) => {
        const card = document.createElement('div');
        const isLiked = appState.likes.includes(item.name);
        const recommend = isRecommended(item);

        card.className = `glass-card nutrition-item clickable ${isDaily ? 'daily-pick' : ''}`;
        card.style.animation = 'fadeIn 0.4s ease forwards';
        card.innerHTML = `
            <div class="flex-between mb-1">
                <div class="flex align-center gap-2">
                    <h4 class="mb-0">${item.name}</h4>
                    ${recommend && !isLiked ? '<span class="badge-mini">🌟</span>' : ''}
                </div>
                <div class="feedback-btns">
                    <button class="feedback-btn like-btn ${isLiked ? 'active' : ''}" title="I like this">❤️</button>
                    <button class="feedback-btn dislike-btn" title="Show less of this">✕</button>
                </div>
            </div>
            <p class="text-xs text-dim mb-2 line-clamp-2">${item.desc}</p>
            <div class="flex-wrap flex gap-1">
                ${item.ingredients.slice(0, 2).map(ing => `<span class="tag text-xs">${ing}</span>`).join('')}
                ${item.ingredients.length > 2 ? `<span class="tag text-xs">+${item.ingredients.length - 2}</span>` : ''}
            </div>
        `;

        card.addEventListener('click', () => openRecipeModal(item));
        card.querySelector('.like-btn').addEventListener('click', (e) => toggleLike(item.name, e));
        card.querySelector('.dislike-btn').addEventListener('click', (e) => toggleDislike(item.name, e));
        container.appendChild(card);
    };

    const renderNutrition = (type) => {
        if (!window.nutritionData) return;
        const items = window.nutritionData[type];
        const allergies = appState.allergies || [];
        const ickFoods = appState.ickFoods || [];
        const avoidList = [...(Array.isArray(allergies) ? allergies : []), ...(Array.isArray(ickFoods) ? ickFoods : [])];

        nutritionContainer.innerHTML = '';
        
        let visibleCount = 0;
        if (items) {
            items.forEach((item) => {
                const isDisliked = appState.dislikes.includes(item.name);
                const hasAvoidedIngredient = item.ingredients.some(ing => avoidList.includes(ing));
                
                if (!hasAvoidedIngredient && !isDisliked) {
                    renderCard(item, nutritionContainer);
                    visibleCount++;
                }
            });
        }

        if (visibleCount === 0) {
            nutritionContainer.innerHTML = '<div class="glass-card full-width text-center text-dim">No recipes found. Check your filters or hidden recipes!</div>';
        }
    };

    const renderDailyPicks = () => {
        if (!window.nutritionData) return;
        const today = new Date().toDateString();
        // Seeded random pick
        const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const allRecipes = [...window.nutritionData.snack, ...window.nutritionData.meal, ...window.nutritionData.recovery]
            .filter(r => !appState.dislikes.includes(r.name));

        if (allRecipes.length < 5) {
            dailyPicksSection.classList.add('hidden');
            return;
        }

        dailyPicksSection.classList.remove('hidden');
        dailyPicksContainer.innerHTML = '';
        
        // Select 3 based on hash
        for(let i = 0; i < 3; i++) {
            const index = (hash + (i * 13)) % allRecipes.length;
            renderCard(allRecipes[index], dailyPicksContainer, true);
        }
    };

    if (nutriTabs.length > 0) {
        nutriTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                nutriTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderNutrition(tab.getAttribute('data-type'));
            });
        });
        console.log("FlowFit: Nutrition tabs initialized.");
    }

    // --- Dietary Preferences Logic ---
    const togglePrefBtn = document.getElementById('toggle-pref-btn');
    const preferencesExpanded = document.getElementById('preferences-expanded');
    const allergySearch = document.getElementById('allergy-search');
    const ickSearch = document.getElementById('ick-search');
    const allergySuggestions = document.getElementById('allergy-suggestions');
    const ickSuggestions = document.getElementById('ick-suggestions');
    const allergyChips = document.getElementById('allergy-chips');
    const ickChips = document.getElementById('ick-chips');

    togglePrefBtn.addEventListener('click', () => {
        const isHidden = preferencesExpanded.classList.toggle('hidden');
        togglePrefBtn.innerText = isHidden ? 'Show Filters' : 'Hide Filters';
    });

    const setupSearch = (input, suggestionBox, listKey, chipContainer, chipClass) => {
        const updateChips = () => {
            chipContainer.innerHTML = '';
            appState[listKey].forEach(item => {
                const chip = document.createElement('span');
                chip.className = `symptom-chip selected ${chipClass}`;
                chip.innerHTML = `${item} <span class="ml-1 cursor-pointer" data-val="${item}">×</span>`;
                chip.querySelector('span').addEventListener('click', (e) => {
                    const val = e.target.getAttribute('data-val');
                    appState[listKey] = appState[listKey].filter(i => i !== val);
                    saveState();
                    updateChips();
                    const activeTabType = document.querySelector('.nutri-tab.active').getAttribute('data-type');
                    renderNutrition(activeTabType);
                });
                chipContainer.appendChild(chip);
            });
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = input.value.toLowerCase().trim();
                const currentList = appState[listKey] || [];
                if (val.length > 0 && !currentList.includes(val)) {
                    currentList.push(val);
                    appState[listKey] = currentList;
                    saveState();
                    updateChips();
                    input.value = '';
                    suggestionBox.classList.add('hidden');
                    const activeTab = document.querySelector('.nutri-tab.active');
                    const type = activeTab ? activeTab.getAttribute('data-type') : 'snack';
                    renderNutrition(type);
                }
            }
        });

        input.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            if (val.length < 1) {
                suggestionBox.classList.add('hidden');
                return;
            }

            const activeItems = appState[listKey] || [];
            const matches = commonIngredients.filter(ing => 
                ing.includes(val) && !activeItems.includes(ing)
            ).slice(0, 8);

            suggestionBox.innerHTML = '';
            
            // Add custom option first
            if (!activeItems.includes(val)) {
                const addDiv = document.createElement('div');
                addDiv.className = 'suggestion-item';
                addDiv.style.borderBottom = '1px solid var(--glass-border)';
                addDiv.innerHTML = `<strong>Add "${val}"</strong>`;
                addDiv.addEventListener('click', () => {
                    if (!activeItems.includes(val)) {
                        activeItems.push(val);
                        appState[listKey] = activeItems;
                        saveState();
                        updateChips();
                        input.value = '';
                        suggestionBox.classList.add('hidden');
                        const activeTab = document.querySelector('.nutri-tab.active');
                        const type = activeTab ? activeTab.getAttribute('data-type') : 'snack';
                        renderNutrition(type);
                    }
                });
                suggestionBox.appendChild(addDiv);
            }

            if (matches.length > 0) {
                matches.forEach(match => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.innerHTML = `<span>${match}</span>`;
                    div.addEventListener('click', () => {
                        const currentList = appState[listKey] || [];
                        if (!currentList.includes(match)) {
                            currentList.push(match);
                            appState[listKey] = currentList;
                            saveState();
                            updateChips();
                            input.value = '';
                            suggestionBox.classList.add('hidden');
                            
                            const activeTab = document.querySelector('.nutri-tab.active');
                            const type = activeTab ? activeTab.getAttribute('data-type') : 'snack';
                            renderNutrition(type);
                        }
                    });
                    suggestionBox.appendChild(div);
                });
            }
            suggestionBox.classList.remove('hidden');
        });

        // Close suggestion box when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !suggestionBox.contains(e.target)) {
                suggestionBox.classList.add('hidden');
            }
        });

        updateChips();
    };

    setupSearch(allergySearch, allergySuggestions, 'allergies', allergyChips, 'chip-allergy');
    setupSearch(ickSearch, ickSuggestions, 'ickFoods', ickChips, 'chip-ick');

    // --- Recipe Modal Logic ---
    const recipeModal = document.getElementById('recipe-modal');
    const closeRecipeBtn = document.getElementById('close-recipe-btn');
    const modalRecipeName = document.getElementById('modal-recipe-name');
    const modalRecipeDesc = document.getElementById('modal-recipe-desc');
    const modalMacroSection = document.getElementById('modal-macro-section');
    const modalIngredientsList = document.getElementById('modal-ingredients-list');
    const modalInstructionsList = document.getElementById('modal-instructions-list');

    const openRecipeModal = (recipe) => {
        modalRecipeName.innerText = recipe.name;
        modalRecipeDesc.innerText = recipe.desc;

        // Populate Macros (Hidden by default based on setting)
        if (appState.showMacros && recipe.macros) {
            modalMacroSection.classList.remove('hidden');
            document.getElementById('macro-cal').innerText = recipe.macros.calories;
            document.getElementById('macro-p').innerText = recipe.macros.protein;
            document.getElementById('macro-c').innerText = recipe.macros.carbs;
            document.getElementById('macro-f').innerText = recipe.macros.fat;
        } else {
            modalMacroSection.classList.add('hidden');
        }

        // Populate Ingredients
        modalIngredientsList.innerHTML = '';
        recipe.ingredients.forEach(ing => {
            const li = document.createElement('li');
            li.innerText = ing;
            modalIngredientsList.appendChild(li);
        });

        // Populate Instructions
        modalInstructionsList.innerHTML = '';
        recipe.instructions.forEach(step => {
            const li = document.createElement('li');
            li.innerText = step;
            modalInstructionsList.appendChild(li);
        });

        recipeModal.classList.remove('hidden');
    };

    closeRecipeBtn.addEventListener('click', () => recipeModal.classList.add('hidden'));

    // --- Hidden Recipes Modal Logic ---
    const hiddenModal = document.getElementById('hidden-recipes-modal');
    const closeHiddenBtn = document.getElementById('close-hidden-modal-btn');
    const closeHiddenDoneBtn = document.getElementById('close-hidden-done-btn');
    const hiddenListContainer = document.getElementById('hidden-recipes-list');

    const openHiddenModal = () => {
        hiddenListContainer.innerHTML = '';
        if (appState.dislikes.length === 0) {
            hiddenListContainer.innerHTML = '<p class="text-center text-dim p-4">No hidden recipes.</p>';
        } else {
            appState.dislikes.forEach(name => {
                const row = document.createElement('div');
                row.className = 'flex-between p-2 glass-hover round-sm';
                row.innerHTML = `
                    <span class="text-sm">${name}</span>
                    <button class="btn-close text-sm" data-name="${name}">×</button>
                `;
                row.querySelector('button').addEventListener('click', (e) => {
                    const n = e.target.getAttribute('data-name');
                    appState.dislikes = appState.dislikes.filter(item => item !== n);
                    saveState();
                    openHiddenModal();
                    refreshNutritionViews();
                });
                hiddenListContainer.appendChild(row);
            });
        }
        hiddenModal.classList.remove('hidden');
    };

    if (hiddenRecipesBtn) {
        hiddenRecipesBtn.addEventListener('click', openHiddenModal);
    }
    if (closeHiddenBtn) {
        closeHiddenBtn.addEventListener('click', () => { if (hiddenModal) hiddenModal.classList.add('hidden'); });
    }
    if (closeHiddenDoneBtn) {
        closeHiddenDoneBtn.addEventListener('click', () => { if (hiddenModal) hiddenModal.classList.add('hidden'); });
    }

    // Close modals on background click
    window.addEventListener('click', (e) => {
        if (e.target === settingsModal) settingsModal.classList.add('hidden');
        if (e.target === recipeModal) recipeModal.classList.add('hidden');
        if (e.target === hiddenModal) hiddenModal.classList.add('hidden');
    });

    // Init nutrition defaults
    refreshNutritionViews();

    // --- Wellness / Recovery Logic ---
    const bodyCheckBtns = document.querySelectorAll('.check-in-btn');
    const recoverySection = document.getElementById('recovery-guide-section');
    const recoveryTitle = document.getElementById('recovery-title');
    const stretchContainer = document.getElementById('recovery-stretches-container');
    const finishRecoveryBtn = document.getElementById('finish-recovery-btn');

    const recoveryDatabase = {
        'neck': [
            { name: "Neck Tilts", desc: "10 per side", icon: "🧘" },
            { name: "Shoulder Rolls", desc: "15 slow rotations", icon: "🔄" },
            { name: "Thread the Needle", desc: "45s per side", icon: "🪡" }
        ],
        'back': [
            { name: "Cat-Cow", desc: "2 mins continuous", icon: "🐈" },
            { name: "Child's Pose", desc: "1 min hold", icon: "👶" },
            { name: "Sphinx Pose", desc: "1 min hold", icon: "🦁" }
        ],
        'hips': [
            { name: "90/90 Stretch", desc: "1 min per side", icon: "📐" },
            { name: "Pigeon Pose", desc: "1 min per side", icon: "🐦" },
            { name: "Happy Baby", desc: "45s hold", icon: "👶" }
        ],
        'legs': [
            { name: "Hamstring Reach", desc: "1 min hold", icon: "🦵" },
            { name: "Couch Stretch", desc: "45s per leg", icon: "🛋️" },
            { name: "Calf Stretch", desc: "1 min per leg", icon: "📐" }
        ],
        'chest': [
            { name: "Doorway Stretch", desc: "1 min hold", icon: "🚪" },
            { name: "Tricep Overhead", desc: "30s per arm", icon: "💪" },
            { name: "Cross-Body Arm", desc: "30s per arm", icon: "🙅" }
        ]
    };

    if (bodyCheckBtns.length > 0) {
        bodyCheckBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const area = btn.getAttribute('data-area');
                if (recoveryTitle) recoveryTitle.innerText = `Custom stretches for your ${area.charAt(0).toUpperCase() + area.slice(1)}`;
                
                if (stretchContainer) {
                    stretchContainer.innerHTML = '';
                    const stretches = recoveryDatabase[area] || [];
                    stretches.forEach(s => {
                        const card = document.createElement('div');
                        card.className = 'glass-card text-center';
                        card.innerHTML = `
                            <div class="text-3xl mb-2">${s.icon}</div>
                            <strong>${s.name}</strong>
                            <p class="text-xs text-dim">${s.desc}</p>
                        `;
                        stretchContainer.appendChild(card);
                    });
                }
                
                if (recoverySection) {
                    recoverySection.classList.remove('hidden');
                    recoverySection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        console.log("FlowFit: Body check-in initialized.");
    }

    finishRecoveryBtn.addEventListener('click', () => {
        addXP(20);
        recoverySection.classList.add('hidden');
        showMojoMessage("Great Recovery!", "Mojo loves to see you taking care of yourself.");
    });
    const phaseMood = document.getElementById('phase-mood');
    const phaseMovement = document.getElementById('phase-movement');
    const phaseNutrition = document.getElementById('phase-nutrition');
    const symptomChipsContainer = document.getElementById('symptom-chips-container');
    const moodChipsContainer = document.getElementById('mood-chips-container');
    const moodAdviceContainer = document.getElementById('mood-advice-container');
    
    // --- Cycle Setup & Tracking ---
    const cycleSetupCard = document.getElementById('cycle-setup-card');
    const cycleTrackerSection = document.getElementById('cycle-tracker-section');
    const flowIntensityContainer = document.getElementById('flow-intensity-container');
    const flowChipsWrapper = document.getElementById('flow-chips-wrapper');
    const periodStartDateInput = document.getElementById('period-start-date');
    const cycleDayReadout = document.getElementById('cycle-day-readout');
    const cycleLengthReadout = document.getElementById('cycle-length-readout');
    const cycleRadios = document.querySelectorAll('input[name="cycle"]');
    const conditionNotice = document.getElementById('condition-notice');
    const conditionNoticeText = document.getElementById('condition-notice-text');

    let activeSymptoms = [];
    let activeMoodId = null;
    let activeFlowId = null;
    let partnerState = { name: "Mojo (Solo)", active: false };

    // --- Utility: Nudges & Accountability ---
    const showNudge = (icon, user, message) => {
        const container = document.getElementById('nudge-container');
        if (!container) return;

        // Vibrate if mobile
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        const toast = document.createElement('div');
        toast.className = 'nudge-toast';
        toast.innerHTML = `
            <div class="nudge-icon">${icon}</div>
            <div>
                <span class="nudge-user">${user}</span>
                <span class="nudge-text">${message}</span>
            </div>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            setTimeout(() => toast.remove(), 400);
        }, 5000);
    };

    const triggerPartnerNudge = () => {
        const nudges = [
            { icon: "🔥", msg: "Just crushed their first set!" },
            { icon: "🙌", msg: "Keep pushing, nearly there!" },
            { icon: "💪", msg: "New Personal Record!" },
            { icon: "🐒", msg: "Mojo is nodding in approval." }
        ];
        const n = nudges[Math.floor(Math.random() * nudges.length)];
        showNudge(n.icon, window.partnerState.name, n.msg);
    };
    const setupStep1 = document.getElementById('setup-step-1');
    const setupStep2 = document.getElementById('setup-step-2');
    const setupStep3 = document.getElementById('setup-step-3');
    const setupCycleLengthSlider = document.getElementById('setup-cycle-length');
    const setupCycleLengthDisplay = document.getElementById('setup-cycle-length-display');
    const setupPeriodStart = document.getElementById('setup-period-start');
    const setupFinishBtn = document.getElementById('setup-finish-btn');
    const setupStep2Next = document.getElementById('setup-step-2-next');
    const cycleEditSetupBtn = document.getElementById('cycle-edit-setup-btn');

    let setupSelectedConditions = new Set();

    const showSetupOrTracker = () => {
        if (appState.cycleSetupDone) {
            cycleSetupCard.classList.add('hidden');
            cycleTrackerSection.classList.remove('hidden');
        } else {
            cycleSetupCard.classList.remove('hidden');
            cycleTrackerSection.classList.add('hidden');
        }
    };

    // --- Onboarding Flow Logic ---
    const onboardingModal = document.getElementById('onboarding-modal');
    const onboardNameInput = document.getElementById('onboard-name-input');
    const onboardDots = document.querySelectorAll('.onboard-dots .dot');

    window.openOnboarding = () => {
        if (onboardingModal) onboardingModal.classList.remove('hidden');
    };

    window.onboardNext = (currentStep) => {
        if (currentStep === 1) {
            const name = onboardNameInput.value.trim();
            if (!name) {
                onboardNameInput.classList.add('error-shake');
                setTimeout(() => onboardNameInput.classList.remove('error-shake'), 500);
                return;
            }
            appState.displayName = name;
            appState.accountCreated = true;
        }

        const currentSlide = document.getElementById(`onboard-slide-${currentStep}`);
        const nextSlide = document.getElementById(`onboard-slide-${currentStep + 1}`);

        if (currentSlide && nextSlide) {
            currentSlide.classList.add('hidden');
            nextSlide.classList.remove('hidden');
            
            // Update dots
            onboardDots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === currentStep);
            });
        }
    };

    window.finishOnboarding = () => {
        appState.onboardingDone = true;
        saveState();
        if (onboardingModal) onboardingModal.classList.add('hidden');
        
        // Final handoff to main app initialization
        updateDashboard();
        renderWeekSchedule();
        renderNutrition('snack');
        renderDailyPicks();
        
        // Show cycle setup card if that's still needed (onboarding Slide 5 transitions here)
        showSetupOrTracker();
        showMojoMessage(`Nice to meet you, ${appState.displayName}!`, "I've personalized your dashboard. Let's start with your weekly schedule!");
    };

    // Fitness Level Selector in Onboarding
    document.querySelectorAll('.onboard-level-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.onboard-level-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            appState.fitnessLevel = card.dataset.level;
        });
    });

    // Step 1: regularity buttons
    document.querySelectorAll('.setup-regularity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.setup-regularity-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const answer = btn.dataset.answer;
            appState.cycleRegularity = answer;
            appState.irregularCycles = (answer !== 'yes');

            if (answer === 'yes') {
                setupStep2.classList.add('hidden');
                setupStep3.classList.remove('hidden');
            } else {
                setupStep2.classList.remove('hidden');
                setupStep3.classList.add('hidden');
            }
        });
    });

    // Step 2: condition chips
    document.querySelectorAll('.setup-condition-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cond = btn.dataset.condition;
            if (cond === 'none') {
                setupSelectedConditions.clear();
                document.querySelectorAll('.setup-condition-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            } else {
                document.querySelector('.setup-condition-btn[data-condition="none"]')?.classList.remove('selected');
                setupSelectedConditions.delete('none');
                if (setupSelectedConditions.has(cond)) {
                    setupSelectedConditions.delete(cond);
                    btn.classList.remove('selected');
                } else {
                    setupSelectedConditions.add(cond);
                    btn.classList.add('selected');
                }
            }
        });
    });

    if (setupStep2Next) {
        setupStep2Next.addEventListener('click', () => {
            setupStep3.classList.remove('hidden');
        });
    }

    // Step 3: cycle length slider
    if (setupCycleLengthSlider) {
        setupCycleLengthSlider.addEventListener('input', () => {
            setupCycleLengthDisplay.textContent = setupCycleLengthSlider.value;
        });
    }

    // Finish setup
    // --- Hysterectomy-aware UI toggling ---
    const periodDateBox = document.getElementById('period-date-box');
    const cycleStatusBar = document.querySelector('.cycle-status-bar');

    const applyHysterectomyMode = () => {
        const isHyst = !!(appState.conditions && appState.conditions.hysterectomy);
        if (periodDateBox) periodDateBox.classList.toggle('hidden', isHyst);
        if (cycleStatusBar) cycleStatusBar.classList.toggle('hidden', isHyst);
        if (cycleDayReadout) cycleDayReadout.classList.toggle('hidden', isHyst);
        if (cycleLengthReadout) cycleLengthReadout.classList.toggle('hidden', isHyst);
    };

    if (setupFinishBtn) {
        setupFinishBtn.addEventListener('click', () => {
            appState.cycleLength = parseInt(setupCycleLengthSlider.value) || 28;
            if (setupPeriodStart.value) {
                appState.lastPeriodStart = setupPeriodStart.value;
            }
            // Save conditions
            const conds = {};
            ['pcos', 'endometriosis', 'hormonal-bc', 'perimenopause', 'hysterectomy', 'pregnancy', 'postpartum'].forEach(c => {
                conds[c] = setupSelectedConditions.has(c);
            });
            appState.conditions = conds;
            appState.cycleSetupDone = true;
            saveState();
            showSetupOrTracker();
            applyHysterectomyMode();
            if (!conds.hysterectomy) {
                calculatePhase();
            }
            updateCycleBox();
            showMojoMessage('Cycle Tracking Set Up!', 'Mojo will tailor your advice to your cycle.');
        });
    }

    // Edit setup button — re-show the setup card
    if (cycleEditSetupBtn) {
        cycleEditSetupBtn.addEventListener('click', () => {
            appState.cycleSetupDone = false;
            saveState();
            // Pre-fill the setup card with existing values
            setupCycleLengthSlider.value = appState.cycleLength || 28;
            setupCycleLengthDisplay.textContent = appState.cycleLength || 28;
            if (appState.lastPeriodStart) setupPeriodStart.value = appState.lastPeriodStart;
            // Pre-select regularity
            const regAnswer = appState.cycleRegularity || 'yes';
            document.querySelectorAll('.setup-regularity-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.answer === regAnswer);
            });
            // Pre-select conditions
            setupSelectedConditions.clear();
            const conds = appState.conditions || {};
            document.querySelectorAll('.setup-condition-btn').forEach(b => {
                const hasCond = !!conds[b.dataset.condition];
                b.classList.toggle('selected', hasCond);
                if (hasCond) setupSelectedConditions.add(b.dataset.condition);
            });
            // Show appropriate steps
            setupStep1.classList.remove('hidden');
            if (regAnswer !== 'yes') {
                setupStep2.classList.remove('hidden');
            } else {
                setupStep2.classList.add('hidden');
            }
            setupStep3.classList.remove('hidden');
            showSetupOrTracker();
        });
    }

    // Load initial period date into tracker
    if (appState.lastPeriodStart && periodStartDateInput) {
        periodStartDateInput.value = appState.lastPeriodStart;
    }

    // --- Proportional Phase Calculation ---
    const getPhaseBreakpoints = (cycleLen) => {
        // Phases scale proportionally to cycle length
        // Menstrual: ~18% (period itself), Follicular: ~28%, Ovulatory: ~7%, Luteal: ~47% (but luteal is fairly fixed ~12-16 days)
        // The luteal phase is the most biologically consistent (~14 days), so we anchor on that.
        const lutealDays = Math.min(Math.round(cycleLen * 0.47), cycleLen - 7); // cap so other phases have room
        const menstrualDays = Math.round(cycleLen * 0.18);
        const ovulatoryDays = Math.max(2, Math.round(cycleLen * 0.07));
        const follicularDays = cycleLen - menstrualDays - ovulatoryDays - lutealDays;

        return {
            menstrual: { start: 1, end: menstrualDays },
            follicular: { start: menstrualDays + 1, end: menstrualDays + follicularDays },
            ovulatory: { start: menstrualDays + follicularDays + 1, end: menstrualDays + follicularDays + ovulatoryDays },
            luteal: { start: menstrualDays + follicularDays + ovulatoryDays + 1, end: cycleLen },
            lengths: { menstrual: menstrualDays, follicular: follicularDays, ovulatory: ovulatoryDays, luteal: lutealDays }
        };
    };

    const getCycleLength = () => {
        if (appState.periodHistory && appState.periodHistory.length >= 2) {
            const dates = appState.periodHistory.slice(-4).map(d => new Date(d)).sort((a, b) => a - b);
            let total = 0, count = 0;
            for (let i = 1; i < dates.length; i++) {
                const diff = Math.floor((dates[i] - dates[i-1]) / (1000 * 60 * 60 * 24));
                if (diff > 0 && diff < 60) { total += diff; count++; }
            }
            if (count > 0) return Math.round(total / count);
        }
        return appState.cycleLength || 28;
    };

    const calculatePhase = () => {
        if (!appState.lastPeriodStart) {
            if (cycleDayReadout) cycleDayReadout.innerText = 'Log your period start date below.';
            return;
        }

        const start = new Date(appState.lastPeriodStart);
        const today = new Date();
        const diffDays = Math.floor(Math.abs(today - start) / (1000 * 60 * 60 * 24)) + 1;
        const cycleLength = getCycleLength();
        const cycleDay = diffDays % cycleLength || cycleLength;
        const bp = getPhaseBreakpoints(cycleLength);

        if (cycleDayReadout) cycleDayReadout.innerText = `Day ${cycleDay} of ${cycleLength}`;
        if (cycleLengthReadout) cycleLengthReadout.innerText = `${cycleLength}-day cycle`;

        let projectedPhase = 'luteal';
        if (cycleDay <= bp.menstrual.end) projectedPhase = 'menstrual';
        else if (cycleDay <= bp.follicular.end) projectedPhase = 'follicular';
        else if (cycleDay <= bp.ovulatory.end) projectedPhase = 'ovulatory';

        cycleRadios.forEach(radio => {
            if (radio.value === projectedPhase) radio.checked = true;
        });

        // Update phase bar visualization
        updatePhaseBar(cycleDay, cycleLength, bp);
    };

    const updatePhaseBar = (cycleDay, cycleLength, bp) => {
        const segMenstrual = document.getElementById('seg-menstrual');
        const segFollicular = document.getElementById('seg-follicular');
        const segOvulatory = document.getElementById('seg-ovulatory');
        const segLuteal = document.getElementById('seg-luteal');
        const marker = document.getElementById('cycle-day-marker');

        if (!segMenstrual) return;

        const pct = (days) => ((days / cycleLength) * 100).toFixed(1) + '%';
        segMenstrual.style.width = pct(bp.lengths.menstrual);
        segFollicular.style.width = pct(bp.lengths.follicular);
        segOvulatory.style.width = pct(bp.lengths.ovulatory);
        segLuteal.style.width = pct(bp.lengths.luteal);

        if (marker && cycleDay) {
            marker.style.left = `calc(${((cycleDay - 0.5) / cycleLength * 100).toFixed(1)}% - 2px)`;
        }
    };

    // --- Condition-aware notice ---
    const updateConditionNotice = () => {
        const conds = appState.conditions || {};
        const active = Object.entries(conds).filter(([_, v]) => v).map(([k]) => k);
        const isIrregular = appState.irregularCycles;

        if (active.length === 0 && !isIrregular) {
            conditionNotice.classList.add('hidden');
            return;
        }

        conditionNotice.classList.remove('hidden');
        let messages = [];

        if (isIrregular) {
            messages.push('Your cycle may not follow standard phase timing.');
        }
        if (conds.pcos) messages.push('PCOS can cause longer or unpredictable cycles — phase estimates are approximate.');
        if (conds.endometriosis) messages.push('Endometriosis may affect symptoms beyond typical phase patterns.');
        if (conds['hormonal-bc']) messages.push('Hormonal birth control can suppress or alter natural cycle phases.');
        if (conds.perimenopause) messages.push('Perimenopause brings cycle length changes — trust your symptoms over the calendar.');
        if (conds.hysterectomy) messages.push('Without a period to track, your hormonal cycle still happens — select your phase manually based on how you feel, and let symptoms guide you.');
        if (conds.pregnancy) messages.push('Cycle tracking is paused during pregnancy. Focus on symptoms and how you feel.');
        if (conds.postpartum) messages.push('Postpartum cycles can take months to normalize. Be patient with yourself.');

        if (messages.length > 0) {
            messages.push('We\'ll prioritize your symptoms and mood to guide recommendations.');
        }

        conditionNoticeText.innerHTML = messages.join('<br>');
    };

    // --- Render chips (mood, symptom, flow) ---
    const renderMoodChips = () => {
        if (!moodChipsContainer) return;
        moodChipsContainer.innerHTML = '';
        availableMoods.forEach(mood => {
            const btn = document.createElement('button');
            btn.className = `symptom-chip ${activeMoodId === mood.id ? 'selected' : ''}`;
            btn.innerText = mood.label;
            btn.addEventListener('click', () => {
                activeMoodId = activeMoodId === mood.id ? null : mood.id;
                renderMoodChips();
                updateCycleBox();
            });
            moodChipsContainer.appendChild(btn);
        });
    };

    const renderSymptomChips = () => {
        if (!symptomChipsContainer) return;
        symptomChipsContainer.innerHTML = '';
        availableSymptoms.forEach(sym => {
            const btn = document.createElement('button');
            btn.className = `symptom-chip ${activeSymptoms.has(sym.id) ? 'selected' : ''}`;
            btn.innerText = sym.label;
            btn.addEventListener('click', () => {
                activeSymptoms.has(sym.id) ? activeSymptoms.delete(sym.id) : activeSymptoms.add(sym.id);
                renderSymptomChips();
                updateCycleBox();
            });
            symptomChipsContainer.appendChild(btn);
        });
    };

    const renderFlowChips = () => {
        if (!flowChipsWrapper) return;
        flowChipsWrapper.innerHTML = '';
        availableFlows.forEach(flow => {
            const btn = document.createElement('button');
            btn.className = `symptom-chip ${activeFlowId === flow.id ? 'selected' : ''}`;
            btn.innerText = flow.label;
            btn.addEventListener('click', () => {
                activeFlowId = activeFlowId === flow.id ? null : flow.id;
                renderFlowChips();
                updateCycleBox();
            });
            flowChipsWrapper.appendChild(btn);
        });
    };

    // --- Main update function ---
    const updateCycleBox = () => {
        const selectedPhase = document.querySelector('input[name="cycle"]:checked')?.value || "follicular";
        const symData = window.cycleData?.[selectedPhase];
        if (!symData) return;

        const isIrregular = appState.irregularCycles;
        const hasConditions = Object.values(appState.conditions || {}).some(v => v);

        // Dashboard Quick View
        const dashPhaseName = document.getElementById('dash-phase-name');
        const dashCycleDay = document.getElementById('dash-cycle-day');
        if (dashPhaseName) dashPhaseName.innerText = selectedPhase.charAt(0).toUpperCase() + selectedPhase.slice(1);
        if (dashCycleDay && appState.lastPeriodStart) {
            const diff = Math.floor((new Date() - new Date(appState.lastPeriodStart)) / (1000 * 60 * 60 * 24)) + 1;
            dashCycleDay.innerText = `Day ${diff > 0 ? diff : '--'}`;
        }

        // Show/hide flow intensity based on Menstrual phase
        if (selectedPhase === 'menstrual') {
            flowIntensityContainer.classList.remove('hidden');
        } else {
            flowIntensityContainer.classList.add('hidden');
            activeFlowId = null;
            renderFlowChips();
        }

        // Phase mood text — always show it, but add a caveat for irregular/conditions
        phaseMood.innerText = symData.mood;
        if (isIrregular || hasConditions) {
            phaseMood.innerHTML += `<br><em class="text-xs" style="opacity:0.7;">Phase timing is approximate for your cycle. Your logged symptoms below will refine these recommendations.</em>`;
        }

        // Mood advice
        if (activeMoodId) {
            moodAdviceContainer.innerHTML = `<div class="advice-box" style="border-left-color: var(--primary); background: rgba(79, 70, 229, 0.1);"><p>${moodData[activeMoodId]}</p></div>`;
        } else {
            moodAdviceContainer.innerHTML = '';
        }

        let movementText = `<p><strong>Phase Focus:</strong> ${symData.movement || symData.baseMovement}</p>`;
        let nutritionText = `<p><strong>Phase Focus:</strong> ${symData.nutrition || symData.baseNutrition}</p>`;

        // Flow-specific adjustments
        if (selectedPhase === 'menstrual' && activeFlowId) {
            const fData = flowData[activeFlowId];
            if (fData) {
                movementText += `<p class="mt-2 text-sm">💡 <em>For ${activeFlowId} flow:</em> ${fData.movement}</p>`;
                nutritionText += `<p class="mt-2 text-sm">💡 <em>For ${activeFlowId} flow:</em> ${fData.nutrition}</p>`;
            }
        }

        // Symptom-specific adjustments
        activeSymptoms.forEach(id => {
            const sData = window.symptomData?.[id];
            if (sData) {
                movementText += `<p class="mt-2 text-sm">💡 <em>For ${id}:</em> ${sData.movement}</p>`;
                nutritionText += `<p class="mt-2 text-sm">💡 <em>For ${id}:</em> ${sData.nutrition}</p>`;
            }
        });

        if (phaseMovement) phaseMovement.innerHTML = movementText;
        if (phaseNutrition) phaseNutrition.innerHTML = nutritionText;

        updateConditionNotice();
    };

    // Event listeners for tracker
    cycleRadios.forEach(radio => radio.addEventListener('change', updateCycleBox));

    if (periodStartDateInput) {
        periodStartDateInput.addEventListener('change', () => {
            appState.lastPeriodStart = periodStartDateInput.value;
            saveState();
            calculatePhase();
            updateCycleBox();
        });
    }

    // Initialize
    showSetupOrTracker();
    applyHysterectomyMode();
    renderMoodChips();
    renderSymptomChips();
    renderFlowChips();
    if (!(appState.conditions && appState.conditions.hysterectomy)) {
        calculatePhase();
    }
    updateCycleBox();

    // ===== INSIGHTS & STATS =====
    window.renderInsights = () => {
        const volumeChart = document.getElementById('volume-chart-container');
        const muscleChart = document.getElementById('muscle-chart-container');
        const calendar = document.getElementById('consistency-calendar');
        if (!volumeChart || !muscleChart || !calendar) return;

        const history = appState.workoutHistory || [];
        
        // 1. Volume Chart (Last 8 sessions)
        volumeChart.innerHTML = '';
        const recentHistory = history.slice(-8).reverse();
        let maxVol = 100;
        const vols = recentHistory.map(h => {
            let v = 0;
            if (h.exercises) {
                h.exercises.forEach(ex => {
                    if (ex.sets) {
                        ex.sets.forEach(s => {
                            if (s.weight && s.reps) v += (parseFloat(s.weight) * parseInt(s.reps));
                        });
                    }
                });
            }
            if (v > maxVol) maxVol = v;
            return { date: h.date, vol: v };
        });
        
        vols.forEach(item => {
            const hPct = maxVol > 0 ? Math.max((item.vol / maxVol) * 100, 5) : 5;
            const shortDate = new Date(item.date).toLocaleDateString(undefined, {month:'numeric', day:'numeric'});
            volumeChart.innerHTML += `
                <div class="insight-bar-wrapper">
                    <div class="insight-tooltip">${item.vol} ${appState.units}</div>
                    <div class="insight-bar" style="height: ${hPct}%"></div>
                    <div class="insight-label">${shortDate}</div>
                </div>
            `;
        });
        if (vols.length === 0) {
            volumeChart.innerHTML = '<p class="text-dim text-sm text-center full-width">No workout data yet.</p>';
        }

        // 2. Muscle Distribution
        muscleChart.innerHTML = '';
        const muscleCounts = {};
        let totalEx = 0;
        history.forEach(h => {
             if (h.exercises) {
                 h.exercises.forEach(ex => {
                     const g = ex.group || 'other';
                     muscleCounts[g] = (muscleCounts[g] || 0) + 1;
                     totalEx++;
                 });
             }
        });
        if (totalEx === 0) {
            muscleChart.innerHTML = '<p class="text-dim text-sm text-center mt-4">Start working out to see your distribution.</p>';
        } else {
            const mgLabels = {
                'back-shoulders': 'Back/Shoulder',
                'legs-glutes': 'Legs/Glutes',
                'chest-triceps': 'Chest/Tri',
                'core-cardio': 'Core/Cardio',
                'full-body': 'Full Body',
                'biceps': 'Biceps',
                'mobility': 'Mobility'
            };
            Object.keys(muscleCounts).sort((a,b)=>muscleCounts[b]-muscleCounts[a]).slice(0,5).forEach(m => {
                const pct = Math.round((muscleCounts[m]/totalEx)*100);
                muscleChart.innerHTML += `
                    <div class="muscle-bar-row">
                        <div class="muscle-bar-label">${mgLabels[m] || 'Other'}</div>
                        <div class="muscle-bar-track">
                            <div class="muscle-bar-fill" style="width: ${pct}%"></div>
                        </div>
                        <div class="muscle-bar-pct">${pct}%</div>
                    </div>
                `;
            });
        }

        // 3. Consistency Heatmap (Last 28 days)
        calendar.innerHTML = '';
        const today = new Date();
        today.setHours(0,0,0,0);
        const dayBoxes = [];
        const historyDates = new Set(history.map(h => new Date(h.date).toDateString()));
        
        for (let i = 27; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const isLogged = historyDates.has(d.toDateString());
            let activeClass = '';
            if (isLogged) {
                // Determine intensity? For now just static 2
                activeClass = 'active-2';
            }
            dayBoxes.push(`<div class="heatmap-box ${activeClass}" title="${d.toDateString()}"></div>`);
        }
        calendar.innerHTML = dayBoxes.join('');
    };

    // ===== PWA INSTALL PROMPT =====
    let deferredPrompt;
    const installPromptCard = document.getElementById('install-prompt-card');
    const installBtn = document.getElementById('install-btn');
    const installDismissBtn = document.getElementById('install-dismiss-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installPromptCard) installPromptCard.classList.remove('hidden');
    });

    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (installPromptCard) installPromptCard.classList.add('hidden');
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt = null;
            }
        });
    }
    if (installDismissBtn) {
        installDismissBtn.addEventListener('click', () => {
            if (installPromptCard) installPromptCard.classList.add('hidden');
        });
    }

    // --- Final Initialization Call ---
    console.log("FlowFit: Initializing UI...");
    if (!appState.onboardingDone) {
        openOnboarding();
    } else {
        updateDashboard();
        renderWeekSchedule();
        renderNutrition('snack');
        renderDailyPicks();
        if (typeof updateInsights === 'function') updateInsights();
        if (typeof renderHistory === 'function') renderHistory();
    }

});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('SW Registered', reg.scope))
            .catch(err => console.log('SW Failed', err));
    });
}

