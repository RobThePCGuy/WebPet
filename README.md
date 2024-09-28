**Credit to my original inspiration: [Creasium](https://codepen.io/Creasium/pen/NWGOGrr)**

---

## **Overview**

**WebPet v1.3** is a virtual pet web application that allows users to adopt, care for, and interact with a virtual pet through a web interface. The app provides a nostalgic experience reminiscent of classic virtual pet games, with modern features and customization options.

---

## **Main Features**

### **1. Starting the Game**

- **Main Menu:** When you open the app, you're greeted with the main menu screen displaying the game title and two main options: **Start** and **Settings**.
- **Creating a New Pet:**
  - Upon clicking **Start**, you're prompted to enter a name for your new WebPet.
  - **Rare Pet Unlocks:** If you enter a special key (e.g., `"LABRACHU_KEY"`) as the name, you unlock a rare pet with a unique appearance and animations.
  - **Randomized Appearance:** If a regular name is entered, your WebPet is created with a randomly generated appearance, including eyes, mouth, hands, and effects.

### **2. Pet Interaction**

- **Stats Management:**
  - Your WebPet has three main stats: **Sleep**, **Hunger**, and **Play**.
  - Each stat ranges from 0% to 100%, representing the pet's current needs.
- **Action Buttons:**
  - **Sleep:** Increases the Sleep stat but decreases Hunger and Play.
  - **Feed:** Increases the Hunger stat but decreases Sleep and Play.
  - **Play:** Increases the Play stat but decreases Sleep and Hunger.
- **Stat Decay:**
  - Over time, the pet's stats gradually decrease, simulating the ongoing care required.
  - If any stat reaches 0%, the pet will die, ending the game.

### **3. Customization and Appearance**

- **Dynamic Appearance:**
  - The pet's appearance changes based on its current stats.
    - **Eyes:** Change expression when the Sleep stat is low.
    - **Mouth:** Changes shape when the Hunger stat is low.
    - **Hands and Effects:** Altered when the Play stat is low.
- **Randomized Styles:**
  - The pet's visual elements (eyes, mouth, hands, effects) are assigned random styles, colors, and positions when created.
- **Rare Pets:**
  - Special pets with unique appearances can be unlocked by entering specific keys as the pet's name.
  - These pets may have special animations and styles not available in random generation.

### **4. Game Mechanics**

- **Score System:**
  - The game tracks how long you keep your pet alive, displayed as a score.
- **Notifications:**
  - The app provides notifications when a stat is critically low, prompting you to take action.
    - E.g., "Your WebPet is very hungry!"
- **Death and Restart:**
  - If the pet dies, an alert shows your final score, and you're returned to the main menu to start anew.
  
### **5. Settings and Customization**

- **Difficulty Levels:**
  - Accessible via the **Settings** menu.
  - Options: **Easy**, **Normal**, **Hard**.
    - **Easy:** Slower stat decay, making the game less challenging.
    - **Normal:** Balanced stat decay.
    - **Hard:** Faster stat decay for a more challenging experience.
- **Night Mode:**
  - Toggle between standard and night mode for visual comfort.
  - Changes the background and text colors for a darker theme.
- **Save and Load:**
  - **Save Game:** You can save your current game state at any time.
  - **Load Game:** Reload a previously saved game.
    - The app automatically saves the game state periodically and upon certain actions.

### **6. User Interface**

- **Responsive Design:**
  - The app adjusts its layout and elements based on the screen size, ensuring a good experience on both desktop and mobile devices.
- **Visual Elements:**
  - The pet is displayed using text characters and symbols, styled to create a charming ASCII-art-like creature.
- **Animations:**
  - Certain elements of the pet can animate (e.g., color changes, floating effect) to add liveliness.
- **Buttons and Controls:**
  - Clearly labeled buttons for all actions and settings.
  - Hover effects provide visual feedback on interactive elements.

### **7. Technical Details**

- **Stat Calculations:**
  - **Max Values:** Sleep, Hunger, and Play have maximum values (e.g., 300 units internally).
  - **Action Effects:** Each action increases one stat while decreasing the other two.
    - The amounts are balanced based on the difficulty level.
- **Game Loop:**
  - The app runs a game loop that updates the pet's stats at intervals determined by the difficulty setting.
- **Data Persistence:**
  - Uses `localStorage` to save and load game states.
  - Includes pet stats, appearance, score, and other relevant data.

---

## **Gameplay Flow**

1. **Launching the App:**
   - You start at the main menu with options to **Start** or go to **Settings**.

2. **Adjusting Settings (Optional):**
   - Choose your preferred difficulty level.
   - Toggle night mode if desired.
   - Return to the main menu.

3. **Starting a New Game:**
   - Click **Start**.
   - Enter a name for your WebPet.
     - If you enter a rare pet key as the name, you'll unlock a rare pet.
   - The game screen appears with your pet displayed.

4. **Interacting with Your Pet:**
   - Monitor your pet's stats: Sleep, Hunger, Play, and Score.
   - Use the action buttons to care for your pet.
     - Balance the stats by choosing appropriate actions.
   - Watch for notifications alerting you to critical needs.

5. **Saving and Loading:**
   - You can save your game progress at any time.
   - If you leave and return to the app, you'll be prompted to load your saved game.

6. **Game Over:**
   - If any stat reaches 0%, your pet dies.
   - An alert displays your final score.
   - You're returned to the main menu to start a new game.

---

## **Examples of Rare Pets**

- **LABRACHU_KEY:**
  - Appearance:
    - Eyes: ⚡⚡
    - Mouth: ω
    - Hands: ʕ and ʔ
    - Effects: 🔬 and ⚗️
  - Styles:
    - Vibrant colors and animations.
    - Unique font sizes and colors for different parts.
  - Unlocking:
    - Enter `"LABRACHU_KEY"` as the pet's name when starting a new game.

*Note:* Additional rare pets can be added with their unique keys and appearances.

---

## **Tips for Players**

- **Balance Is Key:**
  - Pay attention to how actions affect multiple stats.
  - Plan your actions to keep all stats above critical levels.

- **Respond to Notifications:**
  - Don't ignore notifications; they're warnings that a stat is dangerously low.

- **Save Regularly:**
  - Use the save feature to preserve your progress, especially if you need to step away.

- **Experiment with Names:**
  - Try different names to discover if they unlock any rare pets.

- **Adjust Difficulty:**
  - If the game feels too easy or hard, change the difficulty in the settings to suit your preference.

- **Enjoy the Visuals:**
  - The pet's appearance changes not only based on stats but also includes random styles and animations.

---

## **Known Limitations and Future Enhancements**

- **Limited Rare Pets:**
  - Currently, only specific rare pets are available. Future updates may include more.

- **No Import/Export Features:**
  - The app focuses on in-game interactions and has removed import/export functionalities for simplicity.

- **Stat Management Complexity:**
  - As stats affect each other, it can be challenging to keep all stats high, especially on harder difficulties.

- **Single Pet Management:**
  - The app supports managing one pet at a time.

---

## **Technical Summary**

- **Built with HTML, CSS, and JavaScript:**
  - Utilizes standard web technologies for broad compatibility.
- **Responsive Styling:**
  - CSS media queries adjust the layout for different screen sizes.
- **Local Storage Usage:**
  - Game states are saved locally in the browser.
- **Event-Driven Interactions:**
  - Button clicks and user inputs trigger game actions and updates.

---

## **Conclusion**

**WebPet v1.3** offers a charming and engaging virtual pet experience that combines care management with interactive gameplay. With its dynamic appearance system, customizable settings, and the thrill of discovering rare pets, it provides both casual enjoyment and challenges for players seeking to keep their pet alive and happy for as long as possible.

Whether you're looking to relive the nostalgia of virtual pet games or trying out a simple yet entertaining web app, **WebPet v1.3** delivers a delightful experience right in your browser.

---
