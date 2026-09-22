# 🐍💕 LOVE SNAKE — Romantic Snake Game for Nidhi

## PROJECT OVERVIEW

Build a beautiful, cute, romantic **Snake Game using Native React**.

This game is being created as a personal romantic gift for my girlfriend **Nidhi**.

The concept is a classic Snake game, but redesigned around a **love/romantic theme**:

* The snake is pink and cute.
* Instead of apples, the snake eats glowing hearts ❤️.
* Every time the snake eats a heart, a random cute message appears from the bottom of the game area and smoothly floats upward.
* The messages should use my girlfriend's cute nicknames.
* The complete website should feel cute, romantic, soft, playful, and premium.
* The game must be responsive and work properly on desktop and mobile.
* The project should be easy to deploy publicly using **GitHub Pages**.

---

# 1. TECHNOLOGY REQUIREMENTS

Use:

* React
* JavaScript
* HTML
* CSS
* Vite
* Native React only

Do NOT use:

* Next.js
* Angular
* Vue
* Backend
* Database
* Firebase
* Authentication

The game should work completely on the frontend.

Use `localStorage` only where necessary, mainly for:

* High score
* Game preferences if needed

The project must be suitable for deployment through GitHub Pages.

---

# 2. GIRLFRIEND INFORMATION

Real name:

**Nidhi**

Cute nicknames that can be used randomly in messages:

* Vamps
* Vampyy
* Penguine
* Cupcake
* Muffine
* Abyy
* Nid
* Nini

IMPORTANT:

Keep the spelling exactly as provided because these are personal nicknames.

---

# 3. MAIN GAME CONCEPT

The game should look like a romantic version of Snake.

### Snake

The snake should be:

* Pink
* Cute
* Smooth
* Rounded
* Slightly glowing
* Visually attractive

The snake's head can have cute eyes.

Example concept:

```text
      👀
   💗💗💗💗
      💗
      💗
```

The snake should grow every time it eats a heart.

---

# 4. HEART FOOD ❤️

Replace the traditional apple with a beautiful heart.

Heart should:

* Glow softly
* Have a small floating/bobbing animation
* Have a subtle pulse animation
* Be pink/red
* Look visually different from the snake

When the snake eats the heart:

1. Heart disappears.
2. Score increases.
3. Snake grows.
4. Eating sound plays.
5. Small heart particle effect appears.
6. Random romantic message appears.
7. Message floats upward.
8. New heart appears at a random valid location.

---

# 5. RANDOM MESSAGE SYSTEM ❤️

THIS IS ONE OF THE MOST IMPORTANT FEATURES.

Every time the snake eats a heart, randomly select ONE message from a predefined message array.

The message should appear **inside the game display**, starting near the **bottom portion of the game area**, then smoothly float upward.

Animation:

```text
Bottom
   ↓
"Hurray Nidhi! ❤️"

      ↑
      ↑
      ↑

Middle

      ↑
      ↑

Top
```

The message should:

* Start from the bottom
* Float upward
* Fade out gradually
* Take approximately 2–3 seconds
* Not block gameplay
* Be visually attractive
* Have a small heart/sparkle effect
* Use a cute rounded font
* Have a soft pink glow/shadow

Do NOT display messages as browser alerts.

Do NOT pause the game when the message appears.

The snake should continue moving normally.

Multiple messages should be handled gracefully if the user collects hearts quickly.

---

# 6. MESSAGE LIST

Create at least **30 cute random messages**.

Use Nidhi's nicknames naturally.

Use these messages or improve them while keeping the same cute meaning:

1. "Hurray Nidhi! ❤️"
2. "Well done Nidhi! 💕"
3. "Good job Abyy! 🥰"
4. "Penguine, you are awesome! 🐧❤️"
5. "Amazing job Vamps! 💗"
6. "Go go Vampyy! 💕"
7. "That's my Nini! 🥹❤️"
8. "Awww, good one Cupcake! 🧁💕"
9. "Muffine did it! 😭❤️"
10. "Nid, you're doing amazing! 💖"
11. "Yayyy Nidhi! Another heart! ❤️"
12. "That's my girl! 🥰"
13. "You're too good at this, Vampyy! 💕"
14. "Penguine is on fire! 🔥❤️"
15. "Keep going, Cupcake! 🧁💗"
16. "Abyy, you're absolutely adorable! 🥹💕"
17. "Nini collected another love! ❤️"
18. "Vamps, that was perfect! 💖"
19. "Muffine, I'm proud of you! 🥰"
20. "Nid is unstoppable! 💕"
21. "One more heart for my favorite girl! ❤️"
22. "Awww Nidhi, you're so cute! 🥹"
23. "Penguine got another one! 🐧❤️"
24. "Cupcake, you're amazing! 🧁💗"
25. "Vampyy strikes again! 😌❤️"
26. "Nini, you're crushing it! 💕"
27. "Abyy + hearts = perfect combination! ❤️"
28. "Muffine, keep collecting my hearts! 🥰"
29. "Vamps, you're my champion! 🏆❤️"
30. "Nidhi, every heart looks good on you! 💗"

The system should randomly select messages so that the same message does not appear repeatedly whenever possible.

---

# 7. SCORE SYSTEM

Do not simply call it "Score".

Use romantic terminology.

For example:

```text
❤️ Love Collected: 15
```

or:

```text
💕 Our Love: 15
```

Also show:

```text
🏆 Best: 42
```

Store the best score using `localStorage`.

When a new high score is achieved, show a cute animation:

```text
✨ NEW LOVE RECORD! ✨
❤️ 50 Hearts!
```

---

# 8. LOVE MILESTONES

Create special messages at certain scores.

Example:

### 10 Hearts

```text
💕 10 Hearts!
You're doing amazing, Nidhi!
```

### 25 Hearts

```text
💗 25 Hearts!
Sending you 25 kisses! 💋
```

### 50 Hearts

Trigger a special celebration:

```text
💖 50 HEARTS! 💖

You found a special surprise...
```

Then show a romantic animation/message.

---

# 9. SECRET LOVE LETTER 💌

Add a button outside/below the game:

```text
💌 Open My Message
```

When clicked, open a beautiful animated modal/card.

Content:

```text
To my favorite person, ❤️

I made this little game just for you.

It may look like a simple Snake game,
but every heart you collect represents
a little piece of my love for you.

No matter how high your score gets,
you'll never be able to collect
as many hearts as I have for you. ❤️

Love,
Priyanshu 💕
```

Make the modal:

* Romantic
* Elegant
* Soft pink
* Glassmorphism
* Animated
* Easy to close

---

# 10. START SCREEN

Before the game starts, show a beautiful landing/start screen.

Example:

```text
        💕
   LOVE SNAKE
        💕

   Hey Nidhi ❤️

   A tiny game made
   especially for you.

   Collect the hearts
   and have fun! 🥰

   [ START GAME ]
```

Include:

```text
Made with ❤️ by Priyanshu
```

The start button should have a subtle hover/pulse animation.

---

# 11. ROMANTIC UI DESIGN

The UI should feel like a **cute romantic website**, not a generic Snake game.

Design direction:

* Soft pink
* Rose pink
* Light purple
* Romantic red
* White
* Subtle dark purple where needed

Use:

* Glassmorphism
* Soft shadows
* Rounded cards
* Gradient backgrounds
* Glowing hearts
* Small sparkles
* Smooth animations

Avoid:

* Extremely bright neon colors
* Clutter
* Excessive animations
* Cheap-looking gradients
* Too many UI elements

The design should look **premium, cute, modern, and romantic**.

---

# 12. BACKGROUND ANIMATION

Add subtle floating hearts in the background.

Small hearts should:

* Start from the bottom
* Slowly move upward
* Have different sizes
* Have different opacity
* Have slightly different speeds
* Randomly appear

Keep them subtle so gameplay remains clear.

Also add occasional tiny sparkle particles.

---

# 13. HEART COLLECTION EFFECT

When the snake eats a heart:

Create a small celebration effect:

```text
       ❤️
     ✨ ❤️ ✨
       💕
```

Use CSS animations or lightweight React effects.

Effects should disappear automatically.

Do not create performance problems.

---

# 14. LOVE COMBO SYSTEM

Add a combo system.

If the player collects hearts quickly:

```text
❤️ LOVE COMBO x2!
```

Then:

```text
💕 LOVE COMBO x3!
```

And so on.

Make the combo text appear briefly near the score/game area.

Reset the combo after a short period without collecting a heart.

---

# 15. GAME DIFFICULTY

Start with a comfortable speed.

As the score increases:

* Snake becomes gradually faster.
* Difficulty should increase smoothly.
* Do not make it impossible.

Example:

```text
0–10 hearts  → Easy
10–25 hearts → Medium
25–50 hearts → Fast
50+ hearts   → Challenging
```

Avoid sudden speed jumps.

---

# 16. GAME OVER SCREEN

Do not show a boring:

```text
GAME OVER
```

Instead show:

```text
💔 Oops!

Our little snake got into trouble! 🥺

❤️ Love Collected: 23
🏆 Best: 42

[ PLAY AGAIN ]

[ 💌 Open My Message ]
```

Use cute wording.

Add a gentle animation.

---

# 17. CONTROLS

### Desktop

Support:

* Arrow keys
* WASD

Controls:

```text
↑ / W
↓ / S
← / A
→ / D
```

Prevent impossible instant reverse movement.

For example:

If snake is moving RIGHT, pressing LEFT immediately should be ignored.

---

# 18. MOBILE CONTROLS

Add an on-screen directional control.

Example:

```text
        ↑

    ←   ↓   →

```

Make buttons large enough for touch.

Support:

* Touch
* Tap

The game should be comfortable to play on mobile.

---

# 19. RESPONSIVE DESIGN

The website must work properly on:

* Desktop
* Laptop
* Tablet
* Mobile

On desktop:

Game should have a nice centered layout.

On mobile:

* Game should fit screen width.
* Controls should remain easily accessible.
* Score should remain readable.
* Messages should not overflow.
* Love letter modal should fit the screen.

Do not create horizontal scrolling.

---

# 20. MUSIC 🎵

Add an optional background music system.

Include:

```text
🎵 Music ON/OFF
```

Important:

Do NOT force autoplay if the browser blocks it.

Music should start after the user interacts with the page/game.

Allow the user to mute/unmute.

Store preference in `localStorage` if useful.

---

# 21. SOUND EFFECTS

Add subtle sound effects:

### Heart collected

Cute:

```text
pop / sparkle
```

### Combo

Small celebratory sound.

### Game over

Soft sound.

### New high score

Special cute sound.

Keep sounds subtle.

---

# 22. CUTE SNAKE DESIGN

The snake should not look like a boring rectangular Snake game.

Use:

* Rounded segments
* Pink shades
* Small highlights
* Cute eyes
* Slight glow

Optional:

A tiny heart above the snake's head.

Make sure the snake remains visually clear against the background.

---

# 23. GAME BOARD

Create a beautiful game board.

Instead of a plain black/green Snake board, use:

* Soft pink/purple background
* Rounded corners
* Glass effect
* Subtle grid
* Pink border/glow

The grid should be subtle.

Gameplay must remain easy to see.

---

# 24. HEADER

At the top:

```text
💕 LOVE SNAKE 💕
```

Below:

```text
Made with love for Nidhi ❤️
```

Score section:

```text
❤️ Love: 12
🏆 Best: 32
```

Music button can be placed in the top-right.

---

# 25. ANIMATION REQUIREMENTS

Use smooth animations for:

* Button hover
* Button click
* Floating hearts
* Heart pulse
* Heart collection
* Floating messages
* Score updates
* Game over
* Start screen
* Modal opening
* Modal closing
* New high score
* Combo

Use CSS animations wherever possible.

Avoid unnecessary heavy animation libraries.

---

# 26. MESSAGE FLOATING ANIMATION

Implement a reusable React component such as:

```text
FloatingLoveMessage
```

When heart is collected:

```javascript
showRandomMessage();
```

The component should:

1. Receive random message.
2. Spawn near bottom of game board.
3. Move upward.
4. Fade out.
5. Remove itself after animation.

Conceptually:

```text
Heart collected
       ↓
Random message selected
       ↓
Create floating message
       ↓
Bottom of board
       ↓
Move upward
       ↓
Fade out
       ↓
Remove
```

Multiple floating messages should be supported if multiple hearts are collected quickly.

---

# 27. MESSAGE RANDOMIZATION

Create a dedicated message array:

```javascript
const loveMessages = [
   ...
];
```

Create a random selection function.

Avoid immediately repeating the previous message if possible.

For example:

```text
Message 1
Message 2
Message 1
```

is okay.

But preferably avoid:

```text
Message 1
Message 1
```

Use simple logic to prevent immediate duplicates.

---

# 28. ACCESSIBILITY

Add:

* Proper button labels
* Keyboard controls
* Good contrast
* `aria-label` for icon buttons
* Visible focus states
* Reduced-motion support where possible

If a user enables reduced motion, reduce decorative animations.

---

# 29. PERFORMANCE

Keep the game lightweight.

Do not use unnecessary libraries.

Avoid:

* Excessive DOM elements
* Infinite React re-renders
* Heavy particle systems
* Huge images
* Unnecessary dependencies

The game should run smoothly on mobile browsers.

---

# 30. PROJECT STRUCTURE

Use a clean React structure.

Suggested:

```text
love-snake/
│
├── public/
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── SnakeGame.jsx
│   │   ├── StartScreen.jsx
│   │   ├── GameOver.jsx
│   │   ├── FloatingLoveMessage.jsx
│   │   ├── FloatingHearts.jsx
│   │   ├── LoveLetter.jsx
│   │   ├── MobileControls.jsx
│   │   ├── ScoreBoard.jsx
│   │   └── MusicToggle.jsx
│   │
│   ├── data/
│   │   └── loveMessages.js
│   │
│   ├── hooks/
│   │   └── useSnakeGame.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

You may modify this structure if a better React architecture is appropriate.

---

# 31. CODE QUALITY

Write clean, understandable React code.

Requirements:

* Functional components
* React hooks
* Reusable components
* No unnecessary duplication
* Clear variable names
* Comments only where useful
* No dead code
* No console errors
* No warnings
* No broken imports

---

# 32. IMPORTANT GAME LOGIC

Implement properly:

* Snake movement
* Snake growth
* Heart spawning
* Collision detection
* Wall collision
* Self collision
* Score
* High score
* Increasing speed
* Restart
* Keyboard controls
* Mobile controls
* Game state
* Game over
* Combo
* Random messages

Heart must NEVER spawn directly inside the snake.

---

# 33. SPECIAL ROMANTIC EXPERIENCE

The game should feel like a personal gift.

Use Nidhi's name and nicknames naturally.

Do not overuse her name in every UI element.

The experience should feel:

**Cute + Romantic + Playful + Personal + Premium**

rather than:

**Generic Snake Game + Pink CSS**

---

# 34. GITHUB DEPLOYMENT

Prepare the project for deployment through GitHub Pages.

Configure Vite correctly for GitHub Pages.

Add the necessary package/configuration.

Provide scripts such as:

```bash
npm install
npm run dev
npm run build
npm run preview
```

And a deployment workflow suitable for GitHub Pages.

The final project should be deployable through a GitHub repository.

---

# 35. README

Create a clean README containing:

* Project name
* Project description
* Features
* Technologies
* Installation
* Running locally
* Build
* GitHub Pages deployment
* Controls
* Credits

Example title:

```text
🐍💕 Love Snake — A Romantic Snake Game
```

---

# 36. FINAL UI FLOW

The complete user experience should be:

```text
                START
                  ↓
        💕 LOVE SNAKE 💕
                  ↓
             Hey Nidhi ❤️
                  ↓
       "Made especially for you"
                  ↓
            START GAME
                  ↓
          Snake Game Begins
                  ↓
           Snake eats ❤️
                  ↓
       Score increases
                  ↓
      Random cute message
                  ↓
   Message floats from bottom
          toward the top
                  ↓
       ❤️✨ PARTICLE EFFECT
                  ↓
        Snake grows
                  ↓
      Difficulty increases
                  ↓
       More hearts collected
                  ↓
       Milestone celebrations
                  ↓
          Game Over
                  ↓
      Cute Game Over screen
                  ↓
       PLAY AGAIN / 💌
                  ↓
          Love Letter
```

---

# 37. FINAL QUALITY CHECK

Before considering the project complete, test:

### Game

* [ ] Snake moves correctly
* [ ] Arrow keys work
* [ ] WASD works
* [ ] Mobile controls work
* [ ] Snake grows
* [ ] Hearts spawn correctly
* [ ] Heart never spawns inside snake
* [ ] Collision detection works
* [ ] Game over works
* [ ] Restart works
* [ ] Difficulty increases

### Romantic Features

* [ ] Random message appears after every heart
* [ ] Message starts near bottom
* [ ] Message floats upward
* [ ] Message fades out
* [ ] Messages use Nidhi's nicknames
* [ ] No immediate duplicate messages
* [ ] Floating hearts work
* [ ] Particle effect works
* [ ] Combo works
* [ ] Milestones work
* [ ] Love letter works

### UI

* [ ] Cute romantic design
* [ ] Responsive
* [ ] Mobile friendly
* [ ] No horizontal scrolling
* [ ] Animations smooth
* [ ] Buttons work
* [ ] Music toggle works
* [ ] No console errors

### Deployment

* [ ] `npm run build` works
* [ ] GitHub Pages configuration works
* [ ] Production build loads correctly
* [ ] Assets work after deployment
* [ ] Refreshing GitHub Pages does not break the app

---

# FINAL INSTRUCTION

Build the complete project, not just a mockup.

First inspect the existing project structure if files already exist.

If this is a new project, initialize the React + Vite project.

Implement all core game mechanics and romantic features.

Do not leave placeholder components.

Do not leave TODO comments instead of functionality.

The final result should feel like a **real polished romantic game made specifically for Nidhi**, with the floating random love messages being one of the main visual highlights.

Most importantly:

When Nidhi eats a heart ❤️, she should immediately see a cute random message floating upward, such as:

**"Hurray Nidhi! ❤️"**

**"Good job Abyy! 🥰"**

**"Penguine, you are awesome! 🐧❤️"**

**"That's my Cupcake! 🧁💕"**

This interaction should feel satisfying, cute, and personal.


# VISUAL REFERENCE — IMPORTANT

A visual reference image of the **Love Snake design** will be placed inside the React project's `public` folder.

Use this image **only as a visual/design reference** for the snake's appearance and overall visual direction.

Reference image path:

```text
/public/love-snake-reference.png
```

### IMPORTANT

* Do NOT display this reference image anywhere in the final website.
* Do NOT use the image itself as a game asset.
* Do NOT simply place the image inside the UI.
* Recreate the snake design using **React + CSS/HTML/SVG/canvas as appropriate**.
* The actual game snake must be a real interactive game object, not an image.
* Use the reference to understand:

  * Snake head shape
  * Cute facial expression
  * Pink color palette
  * Rounded body segments
  * Body segment style
  * Small heart above the snake's head
  * Cute/glossy appearance
  * Overall romantic aesthetic

The final implementation should be **inspired by the reference**, but the snake must be properly rendered and animated as part of the actual Snake game.

### Snake Appearance

The final snake should have:

* Cute rounded pink head
* Large cute eyes
* Small smiling mouth
* Subtle blush
* Rounded glossy body segments
* Pink-to-light-pink variations
* Soft glow
* Small heart above/near the head
* Smooth visual movement
* Consistent appearance when the snake grows

### IMPORTANT DESIGN RULE

Do not make the game look like a direct copy of the reference image.

The reference is only a **design guide**.

Create the actual website/game UI independently while maintaining the same:

**Cute + Pink + Romantic + Soft + Playful + Premium**

visual feeling.

If the reference image conflicts with the functional requirements of the game, prioritize the **functional game requirements** while preserving the reference's visual style.


