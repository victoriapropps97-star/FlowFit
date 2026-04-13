// Data Models
const workoutData = {
    'back-shoulders': [
        { name: "Dumbbell Rows", sets: "3 sets of 10-12 reps", desc: "Keep that back straight and pull to your hips!" },
        { name: "Lateral Raises", sets: "4 sets of 15 reps", desc: "Control the weight on the way down." },
        { name: "Pull-ups (or Assisted)", sets: "3 sets to failure", desc: "Focus on pulling with your lats, not your arms." },
        { name: "Overhead Press", sets: "4 sets of 8-10 reps", desc: "Core tight, press overhead without arching your back too much." },
        { name: "Face Pulls", sets: "3 sets of 15 reps", desc: "Great for shoulder health and posture." },
        { name: "Rear Delt Flyes", sets: "3 sets of 12-15 reps", desc: "Squeeze at the top of the movement." },
        { name: "Lat Pulldown", sets: "3 sets of 10-12 reps", desc: "Bring the bar to your upper chest." }
    ],
    'legs-glutes': [
        { name: "Goblet Squats", sets: "4 sets of 10 reps", desc: "Chest up, sink deep into the hips." },
        { name: "Romanian Deadlifts (RDL)", sets: "3 sets of 12 reps", desc: "Hinge at the hips, feel the stretch in your hamstrings." },
        { name: "Bulgarian Split Squats", sets: "3 sets of 8-10 reps per leg", desc: "The burn means it's working." },
        { name: "Glute Bridges", sets: "3 sets of 15 reps", desc: "Squeeze your glutes hard at the top." },
        { name: "Leg Press", sets: "4 sets of 12 reps", desc: "Don't lock your knees out!" },
        { name: "Walking Lunges", sets: "3 sets of 20 steps", desc: "Keep your balance and stay low." },
        { name: "Calf Raises", sets: "4 sets of 20 reps", desc: "Full stretch at the bottom." }
    ],
    'chest-triceps': [
        { name: "Push-ups", sets: "3 sets to failure", desc: "Keep your elbows tucked at a 45-degree angle." },
        { name: "Dumbbell Bench Press", sets: "4 sets of 8-10 reps", desc: "Squeeze the chest at the top." },
        { name: "Tricep Dips", sets: "3 sets of 10-12 reps", desc: "Keep your torso upright for more triceps focus." },
        { name: "Incline Chest Press", sets: "3 sets of 10 reps", desc: "Targeting the upper chest." },
        { name: "Overhead Tricep Extension", sets: "3 sets of 12-15 reps", desc: "Keep your elbows pointing towards the ceiling." },
        { name: "Cable Crossovers", sets: "3 sets of 15 reps", desc: "Imagine hugging a large tree." },
        { name: "Skull Crushers", sets: "3 sets of 10-12 reps", desc: "Control the weight!" }
    ],
    'core-cardio': [
        { name: "Plank", sets: "3 sets, hold for 45-60s", desc: "Squeeze your glutes and brace your core." },
        { name: "Russian Twists", sets: "3 sets of 20 reps", desc: "Control the twist, don't rush." },
        { name: "Mountain Climbers", sets: "3 sets of 45 seconds", desc: "Keep a steady pace." },
        { name: "Jump Rope", sets: "5 sets of 2 minutes", desc: "Light on your feet!" },
        { name: "Bicycle Crunches", sets: "3 sets of 20 reps per side", desc: "Elbow to opposite knee." },
        { name: "High Knees", sets: "4 sets of 30 seconds", desc: "Pump your arms!" },
        { name: "Burpees", sets: "3 sets of 10 reps", desc: "Love them or hate them, they work." }
    ],
    'full-body': [
        { name: "Kettlebell Swings", sets: "4 sets of 15 reps", desc: "It's a hip hinge, not a squat." },
        { name: "Thrusters", sets: "3 sets of 12 reps", desc: "Seamless movement from squat to press." },
        { name: "Renegade Rows", sets: "3 sets of 10 reps per side", desc: "Keep your hips completely still." },
        { name: "Wall Balls", sets: "3 sets of 15 reps", desc: "Explosive power from the squat." },
        { name: "Bear Crawls", sets: "3 sets of 20 meters", desc: "Keep your hips low and shoulders engaged." }
    ],
    'biceps': [
        { name: "Dumbbell Curls", sets: "3 sets of 12 reps", desc: "Full range of motion, squeeze at the top." },
        { name: "Hammer Curls", sets: "3 sets of 12 reps", desc: "Target the brachialis and forearms." },
        { name: "Preacher Curls", sets: "3 sets of 10 reps", desc: "Isolate those biceps, no swinging!" },
        { name: "Concentration Curls", sets: "3 sets of 12 reps per arm", desc: "Focus on the peak contraction." }
    ],
    'triceps': [
        { name: "Tricep Pushdowns", sets: "4 sets of 12 reps", desc: "Lock out your elbows at the bottom." },
        { name: "Overhead Extension", sets: "3 sets of 12 reps", desc: "Keep elbows close to your ears." },
        { name: "Dips", sets: "3 sets of 15 reps", desc: "Leaning forward hits more chest, stay upright for triceps." },
        { name: "Close Grip Press", sets: "3 sets of 10 reps", desc: "Keep elbows tucked in tight." }
    ],
    'quads': [
        { name: "Leg Press", sets: "4 sets of 12 reps", desc: "Push through your heels." },
        { name: "Leg Extensions", sets: "3 sets of 15 reps", desc: "Pause at the top for maximum tension." },
        { name: "Hack Squat", sets: "3 sets of 10 reps", desc: "Great for quad isolation." },
        { name: "Step Ups", sets: "3 sets of 12 reps per leg", desc: "Control the movement on the way down." }
    ],
    'glutes-hams': [
        { name: "Hip Thrusts", sets: "4 sets of 10 reps", desc: "The king of glute exercises. Squeeze hard!" },
        { name: "Leg Curls", sets: "3 sets of 12 reps", desc: "Don't let your hips lift off the pad." },
        { name: "Sumo Deadlifts", sets: "3 sets of 8 reps", desc: "Wide stance, focus on the glute drive." },
        { name: "Bulgarian Split Squats", sets: "3 sets of 10 reps", desc: "Elevate your back foot, stay upright." }
    ]
};

const nutritionData = {
    'snack': [
        { 
            name: "Greek Yogurt & Berries", 
            desc: "High protein, antioxidants. Great pre-workout!", 
            ingredients: ["yogurt", "dairy", "blueberries", "strawberries", "raspberries"],
            instructions: ["Scoop 1 cup Greek yogurt.", "Top with fresh berries.", "Add a drizzle of honey if desired."],
            macros: { calories: 180, protein: "18g", carbs: "22g", fat: "2g" },
            prepTime: "2 min"
        },
        { 
            name: "Apple & Almond Butter", 
            desc: "Healthy fats and simple carbs for energy.", 
            ingredients: ["apple", "almonds", "nuts"],
            instructions: ["Slice one medium apple.", "Serve with 2 tablespoons of almond butter."],
            macros: { calories: 250, protein: "5g", carbs: "25g", fat: "16g" },
            prepTime: "3 min"
        },
        { 
            name: "Rice Cakes & Cottage Cheese", 
            desc: "Low calorie, high protein snack.", 
            ingredients: ["rice", "cottage cheese", "dairy"],
            instructions: ["Top 2 rice cakes with 1/2 cup cottage cheese.", "Season with salt and pepper."],
            macros: { calories: 150, protein: "14g", carbs: "18g", fat: "3g" },
            prepTime: "3 min"
        },
        { 
            name: "Roasted Edamame", 
            desc: "Crunchy, plant-based protein snack.", 
            ingredients: ["edamame", "soy", "salt"],
            instructions: ["Dry frozen edamame thoroughly.", "Coat with 1 tsp olive oil and salt.", "Roast at 400°F for 15 minutes."],
            macros: { calories: 120, protein: "11g", carbs: "9g", fat: "5g" },
            prepTime: "20 min"
        },
        { 
            name: "Celery & Almond Butter", 
            desc: "Low carb, high fiber snack with healthy fats.", 
            ingredients: ["celery", "almonds", "nuts"],
            instructions: ["Clean and cut celery stalks.", "Fill with 1-2 tbsp almond butter."],
            macros: { calories: 200, protein: "4g", carbs: "7g", fat: "16g" },
            prepTime: "5 min"
        },
        { 
            name: "Chia Pudding", 
            desc: "Creamy, fiber-rich snack.", 
            ingredients: ["chia seeds", "almond milk", "vanilla"],
            instructions: ["Mix 3 tbsp chia seeds with 1 cup almond milk.", "Let sit in fridge for at least 4 hours."],
            macros: { calories: 190, protein: "6g", carbs: "14g", fat: "11g" },
            prepTime: "4 hours"
        },
        { 
            name: "Protein Shake", 
            desc: "Quick and easy post-workout fuel.", 
            ingredients: ["whey", "milk", "dairy", "banana"],
            instructions: ["Blend 1 scoop whey, 1 cup milk, and 1/2 banana until smooth."],
            macros: { calories: 220, protein: "26g", carbs: "21g", fat: "4g" },
            prepTime: "2 min"
        },
        { 
            name: "Hummus & Carrots", 
            desc: "A fiber-filled snack for steady energy.", 
            ingredients: ["hummus", "chickpeas", "carrots", "garlic"],
            instructions: ["Serve 1/4 cup hummus with 1 cup baby carrots."],
            macros: { calories: 150, protein: "5g", carbs: "18g", fat: "9g" },
            prepTime: "2 min"
        },
        { 
            name: "Hard Boiled Egg & Sriracha", 
            desc: "Simple high-protein snack with a kick.", 
            ingredients: ["eggs", "sriracha"],
            instructions: ["Boil egg for 9 mins.", "Peel and top with a dash of sriracha."],
            macros: { calories: 75, protein: "6g", carbs: "1g", fat: "5g" },
            prepTime: "10 min"
        },
        { 
            name: "String Cheese & Apple", 
            desc: "Convenient snack for balanced energy on the go.", 
            ingredients: ["cheese", "dairy", "apple"],
            instructions: ["Pair 1 string cheese with 1 small apple."],
            macros: { calories: 160, protein: "7g", carbs: "20g", fat: "6g" },
            prepTime: "1 min"
        }
    ],
    'meal': [
        { 
            name: "Chicken & Sweet Potato Bowl", 
            desc: "A balanced fitness staple.", 
            ingredients: ["chicken", "poultry", "sweet potato", "broccoli"],
            instructions: ["Roast sweet potato cubes.", "Pan-sear chicken breast.", "Steam broccoli and combine."],
            macros: { calories: 450, protein: "40g", carbs: "38g", fat: "12g" },
            prepTime: "25 min"
        },
        { 
            name: "Salmon Quinoa Salad", 
            desc: "Omega-3 rich meal for heart and muscle health.", 
            ingredients: ["salmon", "fish", "quinoa", "spinach", "tomatoes"],
            instructions: ["Cook quinoa.", "Pan-sear salmon filleted.", "Mix with spinach and tomatoes."],
            macros: { calories: 510, protein: "32g", carbs: "35g", fat: "22g" },
            prepTime: "20 min"
        },
        { 
            name: "Turkey Taco Salad", 
            desc: "High protein, low carb taco alternative.", 
            ingredients: ["turkey", "poultry", "lettuce", "tomatoes", "corn", "black beans"],
            instructions: ["Cook lean world turkey with seasoning.", "Layer with lettuce, corn, and beans.", "Top with salsa."],
            macros: { calories: 380, protein: "34g", carbs: "28g", fat: "14g" },
            prepTime: "15 min"
        },
        { 
            name: "Tofu Stir Fry", 
            desc: "Plant-based energy with plenty of fiber.", 
            ingredients: ["tofu", "soy", "peppers", "rice", "onions"],
            instructions: ["Sauté tofu until golden.", "Add peppers and onions.", "Serve over brown rice."],
            macros: { calories: 410, protein: "22g", carbs: "52g", fat: "10g" },
            prepTime: "20 min"
        },
        { 
            name: "Beef & Broccoli", 
            desc: "Lean protein with a classic flavor.", 
            ingredients: ["beef", "broccoli", "rice", "garlic", "ginger"],
            instructions: ["Sauté lean beef strips.", "Add broccoli and ginger sauce.", "Serve with rice."],
            macros: { calories: 470, protein: "38g", carbs: "44g", fat: "15g" },
            prepTime: "15 min"
        },
        { 
            name: "Shrimp & Garlic Pasta", 
            desc: "Light and flavorful seafood meal.", 
            ingredients: ["shrimp", "seafood", "pasta", "wheat", "garlic"],
            instructions: ["Boil wheat pasta.", "Sauté shrimp with garlic.", "Combine with olive oil."],
            macros: { calories: 430, protein: "32g", carbs: "50g", fat: "12g" },
            prepTime: "15 min"
        },
        { 
            name: "Lentil Soup", 
            desc: "Warm and filling plant protein source.", 
            ingredients: ["lentils", "carrots", "onions", "garlic"],
            instructions: ["Boil lentils with vegetable broth.", "Add carrots, onions, and herbs.", "Simmer for 30 minutes."],
            macros: { calories: 320, protein: "18g", carbs: "48g", fat: "4g" },
            prepTime: "40 min"
        },
        { 
            name: "Cod with Lemon & Herbs", 
            desc: "Lean white fish for low-calorie high protein.", 
            ingredients: ["cod", "fish", "parsley", "lemon", "rice"],
            instructions: ["Bake cod at 400°F with lemon and herbs.", "Serve alongside light white rice."],
            macros: { calories: 350, protein: "30g", carbs: "38g", fat: "5g" },
            prepTime: "15 min"
        },
        { 
            name: "Stuffed Bell Peppers", 
            desc: "Rich in vitamins with lean turkey filling.", 
            ingredients: ["peppers", "turkey", "poultry", "rice", "onions"],
            instructions: ["Clean peppers and hollow out.", "Fill with mixture of cooked turkey and rice.", "Bake at 375°F for 30 minutes."],
            macros: { calories: 400, protein: "28g", carbs: "45g", fat: "12g" },
            prepTime: "45 min"
        },
        { 
            name: "Zucchini Boats", 
            desc: "Low carb, high nutrients.", 
            ingredients: ["zucchini", "beef", "cheese", "dairy"],
            instructions: ["Hollow zucchini.", "Fill with lean ground beef.", "Top with cheese and bake until tender."],
            macros: { calories: 360, protein: "32g", carbs: "12g", fat: "22g" },
            prepTime: "30 min"
        },
        { 
            name: "Lamb & Rice Salad", 
            desc: "A hearty Mediterranean inspired bowl.", 
            ingredients: ["lamb", "rice", "cucumber", "lemon"],
            instructions: ["Grill lamb strips.", "Toss with rice and diced cucumbers.", "Dress with lemon and oil."],
            macros: { calories: 530, protein: "35g", carbs: "42g", fat: "26g" },
            prepTime: "25 min"
        },
        { 
            name: "Quinoa Power Bowl", 
            desc: "The ultimate fuel for busy days.", 
            ingredients: ["quinoa", "chicken", "poultry", "zucchini", "peppers"],
            instructions: ["Roast zucchini and peppers.", "Combine with cooked quinoa and grilled chicken strips."],
            macros: { calories: 440, protein: "36g", carbs: "45g", fat: "12g" },
            prepTime: "20 min"
        }
    ],
    'recovery': [
        { 
            name: "Choco-Banana Recovery Shake", 
            desc: "Fast absorbing protein for muscle repair.", 
            ingredients: ["whey", "milk", "dairy", "banana", "cocoa"],
            instructions: ["Blend whey, milk, 1 banana, and 1 tsp cocoa."],
            macros: { calories: 290, protein: "28g", carbs: "38g", fat: "5g" },
            prepTime: "2 min"
        },
        { 
            name: "Tuna & Whole Grain Crackers", 
            desc: "Simple, easy, high protein recovery.", 
            ingredients: ["tuna", "fish", "crackers", "wheat"],
            instructions: ["Mix tuna with a little yogurt.", "Serve on 8 whole wheat crackers."],
            macros: { calories: 260, protein: "25g", carbs: "22g", fat: "6g" },
            prepTime: "5 min"
        },
        { 
            name: "Cottage Cheese & Honey", 
            desc: "Slow digesting protein to fuel recovery while you rest.", 
            ingredients: ["cottage cheese", "dairy", "honey"],
            instructions: ["Serve 1 cup cottage cheese with 1 tsp honey."],
            macros: { calories: 190, protein: "24g", carbs: "12g", fat: "4g" },
            prepTime: "1 min"
        },
        { 
            name: "Turkey & Avocado Slices", 
            desc: "Healthy fats and clean protein.", 
            ingredients: ["turkey", "poultry", "avocado"],
            instructions: ["Wrap avocado slices in 4 slices of deli turkey."],
            macros: { calories: 220, protein: "20g", carbs: "8g", fat: "12g" },
            prepTime: "3 min"
        },
        { 
            name: "Hard Boiled Eggs & Spinach", 
            desc: "A clean, simple complete protein source.", 
            ingredients: ["eggs", "spinach"],
            instructions: ["Boil eggs.", "Slice and serve on a fresh bed of spinach."],
            macros: { calories: 160, protein: "13g", carbs: "2g", fat: "11g" },
            prepTime: "10 min"
        },
        { 
            name: "Oatmeal & Protein Powder", 
            desc: "The classic 'proats' for glycogen replenishment.", 
            ingredients: ["oats", "whey", "milk", "dairy"],
            instructions: ["Cook oats as directed.", "Stir in 1 scoop protein powder once cooked."],
            macros: { calories: 340, protein: "30g", carbs: "42g", fat: "6g" },
            prepTime: "5 min"
        },
        { 
            name: "Skillet Egg Scramble", 
            desc: "Delicious high protein recovery meal.", 
            ingredients: ["eggs", "spinach", "bell peppers"],
            instructions: ["Sauté peppers and spinach.", "Scramble in 3 eggs and cook through."],
            macros: { calories: 280, protein: "21g", carbs: "6g", fat: "18g" },
            prepTime: "8 min"
        },
        { 
            name: "Bacon & Egg Protein Cup", 
            desc: "A savory reward for a hard workout session.", 
            ingredients: ["bacon", "pork", "eggs"],
            instructions: ["Line muffin tin with bacon.", "Crack an egg into each and bake at 375°F for 15 minutes."],
            macros: { calories: 190, protein: "14g", carbs: "1g", fat: "14g" },
            prepTime: "20 min"
        },
        { 
            name: "Banana & PB Smoothie", 
            desc: "Tasty, high energy recovery fuel.", 
            ingredients: ["banana", "peanuts", "nuts", "milk", "dairy"],
            instructions: ["Blend 1 banana, 2 tbsp peanut butter, and 1 cup milk."],
            macros: { calories: 380, protein: "14g", carbs: "42g", fat: "18g" },
            prepTime: "2 min"
        },
        { 
            name: "Smoothie Bowl with Seeds", 
            desc: "Nutrient-dense recovery with crunch.", 
            ingredients: ["banana", "blueberries", "yogurt", "sunflower seeds", "pumpkin seeds"],
            instructions: ["Blend banana, berries and yogurt.", "Top with sunflower and pumpkin seeds."],
            macros: { calories: 310, protein: "12g", carbs: "44g", fat: "10g" },
            prepTime: "5 min"
        }
    ]
};

const commonIngredients = [
    // --- Major & Common Allergies ---
    "milk", "dairy", "eggs", "peanuts", "almonds", "walnuts", "cashews", "pistachios", "pecans", "hazelnuts", "tree nuts", 
    "wheat", "gluten", "soy", "tofu", "tempeh", "edamame", "fish", "salmon", "tuna", "cod", "bass", "shellfish", "shrimp", 
    "crab", "lobster", "mussels", "sesame", "mustard", "celery", "lupin", "sulfites", "corn", "gelatin", "beef", "pork", 

    // --- The "Ick" Foods (Common Dislikes) ---
    "mushrooms", "cilantro", "onions", "raw onions", "garlic", "olives", "pickles", "anchovies", "sardines", "beets", 
    "brussels sprouts", "liver", "capers", "blue cheese", "cottage cheese", "mayonnaise", "eggplant", "okra", "raisins", 
    "asparagus", "kale", "cauliflower", "squid", "oysters", "caviar", "licorice", "peas", "raw tomatoes", "mayo", 
    "artichokes", "tofu", "radishes", "cabbage", "vinegar", "spicy peppers", "jalapenos", "cilantro", "goat cheese",

    // --- General Cooking Ingredients (For Filtering) ---
    "chicken", "poultry", "turkey", "lamb", "bacon", "honey", "banana", "apple", "blueberries", "strawberries", 
    "raspberries", "broccoli", "spinach", "carrots", "bell peppers", "zucchini", "cucumber", "avocado", "sweet potato", 
    "white potato", "rice", "brown rice", "pasta", "quinoa", "lentils", "chickpeas", "hummus", "black beans", "kidney beans", 
    "oats", "chia seeds", "flax seeds", "sunflower seeds", "pumpkin seeds", "cinnamon", "ginger", "lemon", "lime", 
    "coconut", "almond milk", "oat milk", "greek yogurt", "butter", "olive oil", "maple syrup", "stevia"
];

const cycleData = {
    'menstrual': {
        mood: "You might feel inward, sensitive, or seeking rest. It's perfectly okay to take a break and focus on self-care.",
        baseMovement: "Low intensity (Walking, Stretching, Yoga). Focus on decongesting the pelvic floor. Avoid heavy core work.",
        baseNutrition: "Iron-rich foods (Red meat, Spinach, Lentils). Warm soothing liquids. Magnesium (Dark chocolate, Almonds) to reduce cramps."
    },
    'follicular': {
        mood: "Estrogen is rising! You may feel more confident, creative, and ready to socialize or try new things.",
        baseMovement: "High intensity (Powerlifting, HIIT, Boxing). You are most resilient to stress right now. Push for those PRs!",
        baseNutrition: "Fermented foods for gut health. Sprouts, leafy greens, and protein-packed grains like Quinoa to fuel your energy."
    },
    'ovulatory': {
        mood: "Confidence and energy usually peak. You might feel more sociable, attractive, and physically capable.",
        baseMovement: "Explosive movement (Sprinting, Heavy lifting). Your strength is likely at its absolute highest this week.",
        baseNutrition: "Anti-inflammatory foods (Berries, Turmeric). Plenty of water and fiber to help the body process estrogen effectively."
    },
    'luteal': {
        mood: "Progesterone is high. You might feel more introverted, prone to PMS symptoms, or craving comfort and slower paces.",
        baseMovement: "Moderate to Low intensity. Focus on strength maintenance and mobility. Listen to your body's energy signals.",
        baseNutrition: "Complex carbs (sweet potatoes, brown rice) stabilize blood sugar. Magnesium-rich foods help combat symptoms."
    }
};

const symptomData = {
    'cramps': {
        movement: "Try lying on your back with legs up the wall, or a gentle child's pose to relieve pelvic pressure.",
        nutrition: "Warm liquids like chamomile or raspberry leaf tea. Magnesium supplements or pumpkin seeds can reduce muscle spasms."
    },
    'bloating': {
        movement: "Gentle twists (like seated spinal twists) can aid digestion. Avoid heavy core workouts.",
        nutrition: "Stay extremely hydrated. Drink peppermint or dandelion root tea. Avoid excessive salt and highly processed carbs."
    },
    'fatigue': {
        movement: "Scale back your planned workout. Focus on mobility and breathing. It's okay to just walk today.",
        nutrition: "Small, frequent meals with protein and complex carbs to avoid blood sugar crashes. Avoid heavy sugar."
    },
    'headache': {
        movement: "Avoid jumping or inversions (keeping head below heart). Stick to steady, upright movements.",
        nutrition: "Hydrate immediately with electrolytes. Limit caffeine if it triggers you, or have a small amount if it helps."
    },
    'low-mood': {
        movement: "Endorphins help! A brisk walk outside in the sun or your favorite upbeat dance workout.",
        nutrition: "Omega-3s (salmon, chia seeds) and dark chocolate can help boost serotonin."
    },
    'insomnia': {
        movement: "Gentle, repetitive stretches like slow yoga or a relaxing evening walk to prepare the body for sleep.",
        nutrition: "Tart cherry juice or a small handful of walnuts before bed. Magnesium can also promote better sleep."
    },
    'abdominal-pain': {
        movement: "Deep belly breathing and supported child's pose. Avoid high-impact jumping or heavy lifting.",
        nutrition: "Ginger tea or warm broth to soothe the stomach. Avoid highly spicy or acidic foods."
    },
    'tender-breasts': {
        movement: "Low-impact cardio and lower-body focus. Avoid heavy chest presses or exercises requiring bouncing.",
        nutrition: "Reduce caffeine and salt intake. Vitamin E rich foods like almonds and spinach may help."
    },
    'backache': {
        movement: "Cat-cow stretches, gentle pelvic tilts, and avoiding heavy axial loading (like heavy barbell squats).",
        nutrition: "Turmeric or ginger tea for anti-inflammatory benefits. Drink plenty of water."
    },
    'acne': {
        movement: "Ensure you shower and cleanse your face immediately after a workout. Sweating is good, just don't let it sit!",
        nutrition: "Focus on zinc-rich foods (pumpkin seeds), probiotics, and avoid excess dairy or high-glycemic foods if they trigger you."
    }
};

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
document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    const defaultState = {
        streak: 0,
        completedExercises: 0,
        lastWorkoutDate: null,
        workoutHistory: [],
        lastPeriodStart: null,
        irregularCycles: false,
        allergies: [],
        ickFoods: [],
        showMacros: false,
        likes: [],
        dislikes: [],
        buddyXP: 0,
        buddyLevel: 1,
        customWorkouts: []
    };

    let appState = JSON.parse(localStorage.getItem('flowfit_state')) || defaultState;
    
    // Ensure new keys exist if loading from an older state version
    appState = { ...defaultState, ...appState };
    const weeklyGoal = 20;

    const saveState = () => {
        localStorage.setItem('flowfit_state', JSON.stringify(appState));
    };

    const updateDashboard = () => {
        const streakDisplay = document.getElementById('streak-display');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const progressText = document.getElementById('progress-text');

        if (streakDisplay) streakDisplay.innerText = `🔥 ${appState.streak} Days`;
        
        let progressPercent = Math.min((appState.completedExercises / weeklyGoal) * 100, 100);
        if (progressBarFill) progressBarFill.style.width = `${progressPercent}%`;
        if (progressText) progressText.innerText = `${Math.round(progressPercent)}% towards your weekly goal.`;
        
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

    // Check streak reset logic on load
    const today = new Date().toDateString();
    if (appState.lastWorkoutDate && appState.lastWorkoutDate !== today) {
        const lastDate = new Date(appState.lastWorkoutDate);
        const diffTime = Math.abs(new Date() - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if (diffDays > 1) {
            appState.streak = 0; // Lost streak
        }
    }
    saveState();
    console.log("FlowFit: Core state initialized.");
    updateDashboard();
    
    // --- Navigation Logic ---
    const navItems = document.querySelectorAll('.nav-links li');
    const views = document.querySelectorAll('.view');

    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.getAttribute('data-target');
                if (!target) return;
                
                console.log(`FlowFit: Navigating to ${target}`);
                
                // Update active nav
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');

                // Update active view
                views.forEach(view => {
                    if (view.id === target) {
                        view.classList.add('active');
                    } else {
                        view.classList.remove('active');
                    }
                });
            });
        });
        console.log("FlowFit: Navigation initialized.");
    }

    // --- Workout Tracker Logic ---
    const startWorkoutBtn = document.getElementById('start-workout-btn');
    const finishWorkoutBtn = document.getElementById('finish-workout-btn');
    const workoutControls = document.getElementById('workout-controls');
    const activeWorkoutContainer = document.getElementById('active-workout-container');
    const trackerContainer = document.getElementById('tracker-exercises-container');
    const workoutStatus = document.getElementById('workout-status');

    // Modal elements
    const exerciseModal = document.getElementById('exercise-modal');
    const addExerciseBtn = document.getElementById('add-exercise-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalMuscleGroup = document.getElementById('modal-muscle-group');
    const modalExerciseList = document.getElementById('modal-exercise-list');

    let activeWorkout = [];

    // Start a new workout
    if (startWorkoutBtn) {
        startWorkoutBtn.addEventListener('click', () => {
            activeWorkout = [];
            if (trackerContainer) trackerContainer.innerHTML = '';
            if (workoutControls) workoutControls.classList.add('hidden');
            if (activeWorkoutContainer) activeWorkoutContainer.classList.remove('hidden');
        });
    }

    // Open/Close Modal
    if (addExerciseBtn) {
        addExerciseBtn.addEventListener('click', () => {
            if (exerciseModal) exerciseModal.classList.remove('hidden');
            renderModalExercises(modalMuscleGroup ? modalMuscleGroup.value : 'back-shoulders');
        });
    }
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (exerciseModal) exerciseModal.classList.add('hidden');
        });
    }

    // Populate Modal list
    if (modalMuscleGroup) {
        modalMuscleGroup.addEventListener('change', (e) => renderModalExercises(e.target.value));
    }

    // --- Session Sharing Logic ---
    const shareBtn = document.getElementById('share-session-btn');
    const joinBtn = document.getElementById('join-session-btn');

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            if (activeWorkout.length === 0) {
                alert("Start a workout first to share a code!");
                return;
            }
            const sessionData = btoa(JSON.stringify(activeWorkout));
            prompt("Copy this Session Code and send it to your partner:", sessionData);
        });
    }

    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            const code = prompt("Paste your partner's Session Code here:");
            if (code) {
                try {
                    const decoded = JSON.parse(atob(code));
                    activeWorkout = decoded;
                    if (workoutControls) workoutControls.classList.add('hidden');
                    if (activeWorkoutContainer) activeWorkoutContainer.classList.remove('hidden');
                    renderTracker();
                    showMojoMessage("Partner Joined!", "Success! You are now synced with your gym buddy.");
                } catch (err) {
                    alert("Invalid Session Code. Please try again.");
                }
            }
        });
    }

    // --- Workout Customization helpers ---
    const renderModalExercises = (group) => {
        modalExerciseList.innerHTML = '';
        
        // Show pre-built ones
        const exercises = workoutData[group] || [];
        exercises.forEach((ex, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="flex-between w-full">
                    <div>
                        <strong id="ex-name-${group}-${idx}">${ex.name}</strong><br>
                        <small class="text-dim" id="ex-desc-${group}-${idx}">${ex.desc}</small>
                    </div>
                    <button class="icon-btn btn-small edit-ex-btn" data-group="${group}" data-idx="${idx}">✏️</button>
                </div>
            `;
            
            // Selecting the exercise
            li.addEventListener('click', (e) => {
                if (e.target.classList.contains('edit-ex-btn')) {
                    e.stopPropagation();
                    const newName = prompt("Rename exercise:", ex.name);
                    const newDesc = prompt("New description:", ex.desc);
                    if (newName) {
                        ex.name = newName;
                        ex.desc = newDesc || ex.desc;
                        renderModalExercises(group);
                    }
                    return;
                }
                
                activeWorkout.push({
                    name: ex.name,
                    sets: [ { weight: '', reps: '', completed: false } ]
                });
                exerciseModal.classList.add('hidden');
                renderTracker();
            });
            modalExerciseList.appendChild(li);
        });

        // Add "Create Custom" option at bottom
        const customLi = document.createElement('li');
        customLi.className = 'glass-hover p-4 text-center border-t-1 border-glass';
        customLi.innerHTML = `<strong>+ Create Custom Exercise</strong>`;
        customLi.addEventListener('click', () => {
            const name = prompt("Enter Exercise Name:");
            if (name) {
                activeWorkout.push({
                    name: name,
                    sets: [ { weight: '', reps: '', completed: false } ]
                });
                exerciseModal.classList.add('hidden');
                renderTracker();
            }
        });
        modalExerciseList.appendChild(customLi);
    };

    const renderTracker = () => {
        trackerContainer.innerHTML = '';
        activeWorkout.forEach((exercise, exIndex) => {
            const card = document.createElement('div');
            card.className = 'glass-card tracker-item';
            
            let html = `<h4>${exercise.name}</h4>`;
            
            // Render sets
            exercise.sets.forEach((set, setIndex) => {
                const isCompletedRow = set.completed ? 'completed' : '';
                const disabledStr = set.completed ? 'disabled' : '';
                html += `
                    <div class="set-row ${isCompletedRow}">
                        <span class="text-dim text-sm">Set ${setIndex + 1}</span>
                        <input type="number" class="tracker-input weight-input" placeholder="lbs" value="${set.weight}" data-ex="${exIndex}" data-set="${setIndex}" ${disabledStr}>
                        <input type="number" class="tracker-input rep-input" placeholder="reps" value="${set.reps}" data-ex="${exIndex}" data-set="${setIndex}" ${disabledStr}>
                        <button class="check-btn ${set.completed ? 'checked' : ''}" data-ex="${exIndex}" data-set="${setIndex}">✓</button>
                    </div>
                `;
            });

            html += `<button class="btn btn-secondary btn-small mt-2 add-set-btn" data-ex="${exIndex}"></button>`;
            html += `
                <div class="flex-between mt-3">
                    <button class="btn btn-secondary btn-small add-set-btn" data-ex="${exIndex}">+ Add Set</button>
                    <button class="ask-mojo-btn" data-exname="${exercise.name}">🐒 Ask Mojo Form Tips</button>
                </div>
            `;
            card.innerHTML = html;
            trackerContainer.appendChild(card);
        });

        // Add event listeners for dynamic inputs
        document.querySelectorAll('.weight-input, .rep-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const exIdx = e.target.getAttribute('data-ex');
                const setIdx = e.target.getAttribute('data-set');
                if (e.target.classList.contains('weight-input')) {
                    activeWorkout[exIdx].sets[setIdx].weight = e.target.value;
                } else {
                    activeWorkout[exIdx].sets[setIdx].reps = e.target.value;
                }
            });
        });

        document.querySelectorAll('.add-set-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exIdx = e.target.getAttribute('data-ex');
                // copy previous set's weight if exists
                const previousSet = activeWorkout[exIdx].sets[activeWorkout[exIdx].sets.length - 1];
                activeWorkout[exIdx].sets.push({ weight: previousSet ? previousSet.weight : '', reps: '', completed: false });
                renderTracker();
            });
        });

        document.querySelectorAll('.check-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const exIdx = parseInt(e.target.getAttribute('data-ex'));
                const setIdx = parseInt(e.target.getAttribute('data-set'));
                if (!activeWorkout[exIdx].sets[setIdx].completed) {
                    const weight = parseFloat(activeWorkout[exIdx].sets[setIdx].weight) || 0;
                    activeWorkout[exIdx].sets[setIdx].completed = true;
                    appState.completedExercises++;
                    const todayStr = new Date().toDateString();
                    if (appState.lastWorkoutDate !== todayStr) {
                        appState.streak++;
                        appState.lastWorkoutDate = todayStr;
                    }
                    
                    // Check for Personal Record!
                    const exName = activeWorkout[exIdx].name;
                    if (weight > 0) {
                        if (!appState.personalRecords) appState.personalRecords = {};
                        if (!appState.personalRecords[exName] || weight > appState.personalRecords[exName]) {
                            const isNewPR = !!appState.personalRecords[exName];
                            appState.personalRecords[exName] = weight;
                            if (isNewPR) {
                                showMojoMessage('🏆 NEW PR!', `${exName}: ${weight} lbs — crushing it!`);
                            }
                            renderPRs();
                        }
                    }

                    addXP(10);
                    saveState();
                    updateDashboard();
                    renderTracker();

                    // Start rest timer
                    startRestTimer(restDuration);
                }
            });
        });

        // Ask Mojo form guide
        document.querySelectorAll('.ask-mojo-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                openMojoFormGuide(btn.getAttribute('data-exname'));
            });
        });
    };

    // Finish Workout
    if (finishWorkoutBtn) {
        finishWorkoutBtn.addEventListener('click', () => {
            let totalVolume = 0;
            let setsCompleted = 0;
            
            activeWorkout.forEach(ex => {
                ex.sets.forEach(set => {
                    if (set.completed && set.weight && set.reps) {
                        totalVolume += (parseFloat(set.weight) * parseInt(set.reps));
                        setsCompleted++;
                    }
                });
            });

            // Stop rest timer if still going
            stopRestTimer();

            if (setsCompleted > 0) {
                appState.workoutHistory.push({
                    date: new Date().toISOString(),
                    volume: totalVolume,
                    exercises: activeWorkout
                });
                addXP(50);
                saveState();
                if (workoutStatus) workoutStatus.innerText = `Amazing work! You moved ${totalVolume.toLocaleString()} lbs today!`;
            } else {
                if (workoutStatus) workoutStatus.innerText = "Session finished (no volume logged).";
            }

            if (activeWorkoutContainer) activeWorkoutContainer.classList.add('hidden');
            if (workoutControls) workoutControls.classList.remove('hidden');
            if (startWorkoutBtn) startWorkoutBtn.innerText = "Start Another";
        });
    }

    // ===== REST TIMER MODULE =====
    let restDuration = 60; // default seconds
    let restInterval = null;
    let restRemaining = 60;
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
            // Triple beep
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
                } else {
                    restDisplay.classList.remove('urgent');
                }
            }
            if (restRemaining <= 0) {
                stopRestTimer();
                beepSound();
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
        restDurationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                restDurationBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                restDuration = parseInt(btn.getAttribute('data-secs'));
                // Restart with new duration if timer is running
                if (restInterval) startRestTimer(restDuration);
            });
        });
    }

    // ===== WEEKLY SCHEDULE MODULE =====
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const muscleGroups = [
        { id: 'rest', label: '😴 Rest Day', emoji: '😴' },
        { id: 'back-shoulders', label: 'Back & Shoulders', emoji: '💪' },
        { id: 'legs-glutes', label: 'Legs & Glutes', emoji: '🦵' },
        { id: 'chest-triceps', label: 'Chest & Triceps', emoji: '🏋️' },
        { id: 'core-cardio', label: 'Core & Cardio', emoji: '🔥' },
        { id: 'full-body', label: 'Full Body', emoji: '⚡' },
        { id: 'biceps', label: 'Biceps', emoji: '💪' },
        { id: 'glutes-hams', label: 'Glutes & Hams', emoji: '🍑' }
    ];

    const renderWeekSchedule = () => {
        const grid = document.getElementById('weekly-schedule-grid');
        if (!grid) return;
        const schedule = appState.weekSchedule || {};
        const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0

        grid.innerHTML = '';
        days.forEach((day, i) => {
            const assignment = schedule[i];
            const group = muscleGroups.find(m => m.id === assignment);
            const card = document.createElement('div');
            card.className = `day-card ${i === todayIdx ? 'today' : ''} ${assignment === 'rest' ? 'rest-day' : ''}`;
            card.innerHTML = `
                <span class="day-label">${day}</span>
                <span class="day-emoji">${group ? group.emoji : '＋'}</span>
                <span class="day-muscles">${group ? (group.id === 'rest' ? 'Rest' : group.label) : 'Tap to plan'}</span>
            `;
            card.addEventListener('click', () => assignDay(i));
            grid.appendChild(card);
        });
    };

    const assignDay = (dayIdx) => {
        const options = muscleGroups.map((m, i) => `${i}: ${m.label}`).join('\n');
        const input = prompt(`Assign ${days[dayIdx]}:\n${options}\n\nEnter number:`);
        if (input !== null) {
            const idx = parseInt(input);
            if (!isNaN(idx) && muscleGroups[idx]) {
                if (!appState.weekSchedule) appState.weekSchedule = {};
                appState.weekSchedule[dayIdx] = muscleGroups[idx].id;
                saveState();
                renderWeekSchedule();
            }
        }
    };

    const editScheduleBtn = document.getElementById('edit-schedule-btn');
    if (editScheduleBtn) {
        editScheduleBtn.addEventListener('click', () => {
            const todayIdx = (new Date().getDay() + 6) % 7;
            assignDay(todayIdx);
        });
    }

    renderWeekSchedule();

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
            const item = document.createElement('div');
            item.className = 'pr-item';
            item.innerHTML = `<span>${name}</span><span class="pr-weight">🏆 ${prs[name]} lbs</span>`;
            container.appendChild(item);
        });
    };

    renderPRs();

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
    };

    const closeFormBtn = document.getElementById('close-form-modal-btn');
    const prevBtn = document.getElementById('form-prev-btn');
    const nextBtn = document.getElementById('form-next-btn');

    if (closeFormBtn) closeFormBtn.addEventListener('click', () => {
        const m = document.getElementById('mojo-form-modal');
        if (m) m.classList.add('hidden');
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
    const WATER_GOAL = 8;
    const waterMojoMessages = [
        '', // 0
        "One down! Keep sippin' 💧",
        "Two glasses! You're on a roll 🌊",
        "Halfway to three! Don't stop now 🥤",
        "Four glasses! Mojo is impressed 🐒",
        "More than halfway there! 💪",
        "Six glasses! You're glowing 🌟",
        "SO close! One more to go... almost there! 🔥",
        "ALL 8 GLASSES! Mojo is doing a happy dance! 🎉🐒💧"
    ];

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
        for (let i = 1; i <= WATER_GOAL; i++) {
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
        if (appState.waterCount === WATER_GOAL) {
            addXP(15);
            showMojoMessage('💧 Fully Hydrated!', 'All 8 glasses done! Mojo is so proud of you!');
        }

        saveState();
        initWaterTracker();
    };

    const updateWaterUI = () => {
        const count = appState.waterCount || 0;
        const label = document.getElementById('water-count-label');
        const bar = document.getElementById('water-progress-bar');
        const msg = document.getElementById('water-mojo-msg');

        if (label) label.innerText = `${count} / ${WATER_GOAL} glasses`;
        if (bar) bar.style.width = `${(count / WATER_GOAL) * 100}%`;
        if (msg) msg.innerText = waterMojoMessages[count] || '';
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
        renderNutrition(activeTab ? activeTab.getAttribute('data-type') : 'snack');
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
        const items = nutritionData[type];
        const allergies = appState.allergies || [];
        const ickFoods = appState.ickFoods || [];
        const avoidList = [...allergies, ...ickFoods];

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
        const today = new Date().toDateString();
        // Seeded random pick
        const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const allRecipes = [...nutritionData.snack, ...nutritionData.meal, ...nutritionData.recovery]
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

    // --- Settings & Preferences Logic ---
    const settingsToggleBtn = document.getElementById('settings-toggle-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsBtn = document.getElementById('close-settings-btn');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const macroToggle = document.getElementById('macro-toggle');

    // Initialize toggle state
    macroToggle.checked = appState.showMacros || false;

    settingsToggleBtn.addEventListener('click', () => settingsModal.classList.remove('hidden'));
    closeSettingsBtn.addEventListener('click', () => settingsModal.classList.add('hidden'));
    saveSettingsBtn.addEventListener('click', () => {
        appState.showMacros = macroToggle.checked;
        saveState();
        settingsModal.classList.add('hidden');
        // Refresh nutrition view to update macro visibility in modal if open
        const activeTab = document.querySelector('.nutri-tab.active');
        renderNutrition(activeTab ? activeTab.getAttribute('data-type') : 'snack');
    });

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
    
    const irregularToggle = document.getElementById('irregular-cycle-toggle');
    const cyclePhasesWrapper = document.getElementById('cycle-phases-wrapper');
    const flowIntensityContainer = document.getElementById('flow-intensity-container');
    const flowChipsWrapper = document.getElementById('flow-chips-wrapper');
    const periodStartDateInput = document.getElementById('period-start-date');
    const cycleDayReadout = document.getElementById('cycle-day-readout');
    const cycleRadios = document.querySelectorAll('input[name="cycle"]');

    let activeSymptoms = new Set();
    let activeMoodId = null;
    let activeFlowId = null;

    // Load initial state for toggle and date
    if (appState.lastPeriodStart) {
        periodStartDateInput.value = appState.lastPeriodStart;
    }
    irregularToggle.checked = appState.irregularCycles || false;

    // Render Mood chips
    const renderMoodChips = () => {
        if (!moodChipsContainer) return;
        moodChipsContainer.innerHTML = '';
        availableMoods.forEach(mood => {
            const btn = document.createElement('button');
            btn.className = `symptom-chip ${activeMoodId === mood.id ? 'selected' : ''}`;
            btn.innerText = mood.label;
            btn.addEventListener('click', () => {
                if (activeMoodId === mood.id) {
                    activeMoodId = null;
                } else {
                    activeMoodId = mood.id;
                }
                renderMoodChips();
                updateCycleBox();
            });
            moodChipsContainer.appendChild(btn);
        });
    };

    // Render Symptom chips
    const renderSymptomChips = () => {
        if (!symptomChipsContainer) return;
        symptomChipsContainer.innerHTML = '';
        availableSymptoms.forEach(sym => {
            const btn = document.createElement('button');
            btn.className = `symptom-chip ${activeSymptoms.has(sym.id) ? 'selected' : ''}`;
            btn.innerText = sym.label;
            btn.addEventListener('click', () => {
                if (activeSymptoms.has(sym.id)) {
                    activeSymptoms.delete(sym.id);
                } else {
                    activeSymptoms.add(sym.id);
                }
                renderSymptomChips();
                updateCycleBox();
            });
            symptomChipsContainer.appendChild(btn);
        });
    };

    // Render Flow chips
    const renderFlowChips = () => {
        if (!flowChipsWrapper) return;
        flowChipsWrapper.innerHTML = '';
        availableFlows.forEach(flow => {
            const btn = document.createElement('button');
            btn.className = `symptom-chip ${activeFlowId === flow.id ? 'selected' : ''}`;
            btn.innerText = flow.label;
            btn.addEventListener('click', () => {
                if (activeFlowId === flow.id) {
                    activeFlowId = null;
                } else {
                    activeFlowId = flow.id;
                }
                renderFlowChips();
                updateCycleBox();
            });
            flowChipsWrapper.appendChild(btn);
        });
    };

    const calculatePhase = () => {
        if (!periodStartDateInput.value || irregularToggle.checked) return;

        const start = new Date(periodStartDateInput.value);
        const today = new Date();
        const diffTime = Math.abs(today - start);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        const cycleDay = diffDays % 28 || 28;

        cycleDayReadout.innerText = `Cycle Day ${cycleDay}: Calculating phase automatically...`;

        let projectedPhase = 'follicular';
        if (cycleDay <= 5) projectedPhase = 'menstrual';
        else if (cycleDay <= 13) projectedPhase = 'follicular';
        else if (cycleDay <= 15) projectedPhase = 'ovulatory';
        else projectedPhase = 'luteal';

        // Update radios
        cycleRadios.forEach(radio => {
            if (radio.value === projectedPhase) {
                radio.checked = true;
            }
        });
    };
    
    const updateCycleBox = () => {
        const selectedPhase = document.querySelector('input[name="cycle"]:checked')?.value || "follicular";
        const symData = cycleData[selectedPhase];
        const isIrregular = irregularToggle.checked;
        
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

        // Handle Irregular Toggle UI
        if (isIrregular) {
            cyclePhasesWrapper.classList.add('opacity-50');
            cycleDayReadout.innerText = "Manual override: Irregular cycle logic active.";
            phaseMood.innerHTML = `<em>Since you have indicated irregular cycles or conditions, standard phase estimates may be inaccurate. We'll focus on your symptoms to guide you.</em>`;
        } else {
            cyclePhasesWrapper.classList.remove('opacity-50');
            if (periodStartDateInput.value) {
                const start = new Date(periodStartDateInput.value);
                const today = new Date();
                const diffTime = Math.abs(today - start);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
                const cycleDay = (diffDays % 28 === 0) ? 28 : (diffDays % 28);
                cycleDayReadout.innerText = `Cycle Day ${cycleDay}: Tracking automatically based on your start date.`;
            } else {
                cycleDayReadout.innerText = "Log a date to auto-calculate your phase, or select manually below.";
            }
            phaseMood.innerText = symData.mood;
        }

        // Give mood specific advice if clicked
        if (activeMoodId) {
            moodAdviceContainer.innerHTML = `<div class="advice-box" style="border-left-color: var(--primary); background: rgba(79, 70, 229, 0.1);"><p>${moodData[activeMoodId]}</p></div>`;
        } else {
            moodAdviceContainer.innerHTML = '';
        }

        let movementText = '';
        let nutritionText = '';

        if (!isIrregular) {
            movementText += `<p><strong>Phase Focus:</strong> ${symData.movement || symData.baseMovement}</p>`;
            nutritionText += `<p><strong>Phase Focus:</strong> ${symData.nutrition || symData.baseNutrition}</p>`;
        } else {
            movementText += `<p><strong>Irregular Cycle Base:</strong> Focus on gentle movement and mobility unless energy is high.</p>`;
            nutritionText += `<p><strong>Irregular Cycle Base:</strong> Keep blood sugar stable. Hydrate heavily.</p>`;
        }

        // Add Flow specific adjustments
        if (selectedPhase === 'menstrual' && activeFlowId) {
            const fData = flowData[activeFlowId];
            if (fData) {
                movementText += `<p class="mt-2 text-sm">💡 <em>For ${activeFlowId}:</em> ${fData.movement}</p>`;
                nutritionText += `<p class="mt-2 text-sm">💡 <em>For ${activeFlowId}:</em> ${fData.nutrition}</p>`;
            }
        }

        // Add Symptom specific adjustments
        if (activeSymptoms.size > 0) {
            activeSymptoms.forEach(id => {
                const sData = symptomData[id];
                if (sData) {
                    movementText += `<p class="mt-2 text-sm">💡 <em>For ${id}:</em> ${sData.movement}</p>`;
                    nutritionText += `<p class="mt-2 text-sm">💡 <em>For ${id}:</em> ${sData.nutrition}</p>`;
                }
            });
        }

        if (phaseMovement) phaseMovement.innerHTML = movementText;
        if (phaseNutrition) phaseNutrition.innerHTML = nutritionText;
    };

    if (cycleRadios) {
        cycleRadios.forEach(radio => radio.addEventListener('change', updateCycleBox));
    }
    
    if (irregularToggle) {
        irregularToggle.addEventListener('change', () => {
            appState.irregularCycles = irregularToggle.checked;
            saveState();
            calculatePhase();
            updateCycleBox();
        });
    }

    if (periodStartDateInput) {
        periodStartDateInput.addEventListener('change', () => {
            appState.lastPeriodStart = periodStartDateInput.value;
            saveState();
            calculatePhase();
            updateCycleBox();
        });
    }
    
    renderMoodChips(); 
    renderSymptomChips(); 
    renderFlowChips(); 
    calculatePhase();
    updateCycleBox();
});

