// --- Game Engine Logic ---

// Encapsulate engine logic in an object
const engine = {

    // --- Core Variables ---
    canvas: null,
    ctx: null,
    config: { // Engine configuration constants
        pixelScale: 2,
        gameAreaHeight: 256,
        uiAreaYStart: 256,
        canvasWidth: 256,
        canvasHeight: 512,
    },
    gameState: { // Dynamic state managed by the engine
        playerName: "冒险者",
        currentScene: null, // Set during initialization
        flags: {},          // Loaded from content defaults
        dialogue: {
            lines: [], currentLineIndex: 0, speaker: null, choices: [], active: false
        },
        player: { x: 0, y: 0, sprite: null }, // Loaded from content defaults
        npcs: [], // Populated by setupScene
        currentCommands: [], // Populated by drawCommandButtons
    },
    content: null, // Reference to the loaded gameContent
    lastTime: 0,
    isRunning: false,

    // --- Initialization ---
    init(canvasId) {
        this.canvas = document.getElementById(canvasId)
        if (!this.canvas) {
            console.error(`Canvas element with id "${canvasId}" not found.`)
            return false
        }
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = this.config.canvasWidth
        this.canvas.height = this.config.canvasHeight

        // Load content (assuming it's globally available as window.gameContent)
        if (!window.gameContent) {
            console.error("Game content not found. Make sure content.js is loaded before engine.js.")
            return false
        }
        this.content = window.gameContent

        // Setup initial game state from content
        this.gameState.currentScene = this.content.initialScene
        this.gameState.flags = { ...this.content.initialFlags } // Copy initial flags
        this.gameState.player = { ...this.content.playerDefaults } // Copy player defaults

        // Add event listeners
        this.canvas.addEventListener('click', this.handleClick.bind(this)) // Bind 'this'

        console.log("Engine initialized.")
        return true
    },

    startGame(playerName) {
        if (!this.isRunning) {
            this.gameState.playerName = playerName || "路人甲"
            console.log(`Starting game for player: ${this.gameState.playerName}`)

            // --- FIX: Explicitly set the first playable scene ---
            if (this.content.firstPlayableScene) {
                this.gameState.currentScene = this.content.firstPlayableScene
            } else {
                console.warn("firstPlayableScene not defined in gameContent! Defaulting may cause issues.")
                // Potentially fallback or throw error, for now just warn.
                // If initialScene IS the first playable scene in some games, this logic needs adjustment.
                // Assuming initialScene is always Title for this structure.
                this.gameState.currentScene = 'INTRO_SCENE' // Fallback just in case
            }
            console.log(`Transitioning from TITLE to first scene: ${this.gameState.currentScene}`)
            // --- End FIX ---

            this.setupScene(this.gameState.currentScene) // Setup the initial scene

            // Trigger scene entry dialogue/action if defined
            const sceneData = this.content.scenes[this.gameState.currentScene]
            if (sceneData?.onEnterAction) {
                const handler = this.content.actionHandlers[sceneData.onEnterAction]
                if (handler) {
                    handler(this) // Execute the onEnter action (likely starts a dialogue)
                } else if (this.content.dialogues[sceneData.onEnterAction]) {
                    // If it's a dialogue ID, start it directly
                    this.startDialogue(sceneData.onEnterAction)
                }
            }

            this.isRunning = true
            this.lastTime = performance.now()
            requestAnimationFrame(this.gameLoop.bind(this)) // Start the loop
            console.log("Game loop started.")
        }
    },

    // --- Game Loop ---
    gameLoop(timestamp) {
        if (!this.isRunning) return

        // Check for ending state
        const currentSceneData = this.content.scenes[this.gameState.currentScene]
        if (currentSceneData?.isEnding) {
            this.render() // Draw final screen
            this.isRunning = false
            // Add click listener to reload the page ONLY ONCE
            const reloadHandler = () => window.location.reload()
            this.canvas.removeEventListener('click', this.handleClick.bind(this)) // Remove game click listener
            this.canvas.addEventListener('click', reloadHandler, { once: true }) // Add reload listener
            console.log("Game ended. Click canvas to restart.")
            return // Stop the loop
        }

        const deltaTime = timestamp - this.lastTime
        this.lastTime = timestamp

        this.update(deltaTime)
        this.render()

        requestAnimationFrame(this.gameLoop.bind(this))
    },

    update(deltaTime) {
        // Placeholder for future update logic (animations, etc.)
    },

    render() {
        this.clearCanvas()
        const sceneData = this.content.scenes[this.gameState.currentScene]

        if (sceneData?.isEnding) {
            this.drawEndingScreen(sceneData)
        } else if (this.gameState.currentScene === 'TITLE') {
            this.drawTitleScreen() // Specific drawing function for title
        } else {
            this.drawGameScene()
            this.drawUI()
        }
    },

    // --- Drawing Functions ---
    _getColor(colorKey) { // Helper to get actual color value
        return this.content.colors[colorKey] || this.content.colors.red // Default to red if key not found
    },

    drawPixel(x, y, color) {
        this.ctx.fillStyle = color
        this.ctx.fillRect(x * this.config.pixelScale, y * this.config.pixelScale, this.config.pixelScale, this.config.pixelScale)
    },

    drawSprite(spriteKey, screenX, screenY) {
        const spriteData = this.content.sprites[spriteKey]
        if (!spriteData) {
            this.ctx.fillStyle = this._getColor('red')
            this.ctx.fillRect(screenX, screenY, 16, 16) // Draw error placeholder
            console.warn(`Sprite not found: ${spriteKey}`); return
        }
        const startPixelX = Math.floor(screenX / this.config.pixelScale)
        const startPixelY = Math.floor(screenY / this.config.pixelScale)

        for (let y = 0; y < spriteData.height; y++) {
            for (let x = 0; x < spriteData.width; x++) {
                const colorIndex = spriteData.pixels[y][x]
                if (colorIndex > 0 && spriteData.colors[colorIndex - 1]) {
                    const colorKey = spriteData.colors[colorIndex - 1]
                    this.drawPixel(startPixelX + x, startPixelY + y, this._getColor(colorKey))
                }
            }
        }
    },

    drawText(text, x, y, colorKey = 'white', font = '16px sans-serif') {
        this.ctx.fillStyle = this._getColor(colorKey)
        this.ctx.font = font
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'top'
        this.ctx.fillText(text.replace('{playerName}', this.gameState.playerName), x, y) // Replace placeholder
    },

    drawCenteredText(text, y, colorKey = 'white', font = '16px sans-serif') {
        this.ctx.fillStyle = this._getColor(colorKey)
        this.ctx.font = font
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(text.replace('{playerName}', this.gameState.playerName), this.config.canvasWidth / 2, y)
    },

    clearCanvas() {
        this.ctx.fillStyle = this._getColor('black')
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight)
    },

    drawBackgroundPattern() {
        const patternSize = 8
        const color1 = this._getColor('bgPattern1')
        const color2 = this._getColor('bgPattern2')
        for (let y = 0; y < this.config.gameAreaHeight / this.config.pixelScale; y += patternSize) {
            for (let x = 0; x < this.config.canvasWidth / this.config.pixelScale; x += patternSize) {
                const color = ((Math.floor(x / patternSize) + Math.floor(y / patternSize)) % 2 === 0) ? color1 : color2
                this.ctx.fillStyle = color
                this.ctx.fillRect(x * this.config.pixelScale, y * this.config.pixelScale, patternSize * this.config.pixelScale, patternSize * this.config.pixelScale)
            }
        }
    },

    // --- Scene Drawing ---
    drawTitleScreen() {
        this.clearCanvas()
        this.drawCenteredText("最终幻想乱炖RPG", this.config.gameAreaHeight / 3, 'yellow', '24px sans-serif')
        this.drawCenteredText("(一个啥也不是的冒险)", this.config.gameAreaHeight / 3 + 30, 'white', '16px sans-serif')
        // Draw decorative sprites using hardcoded keys or add to scene definition if needed
        this.drawSprite('moogle', this.config.canvasWidth / 2 - 40, this.config.gameAreaHeight / 2 + 20)
        this.drawSprite('cactuar', this.config.canvasWidth / 2 + 20, this.config.gameAreaHeight / 2 + 15)
        this.drawCenteredText("点击任意处开始游戏", this.config.gameAreaHeight * 0.8, 'grey', '14px sans-serif')
        this.drawCenteredText("制作: 一个AI & 你", this.config.canvasHeight - 30, 'grey', '12px sans-serif')
    },

    drawGameScene() {
        this.drawBackgroundPattern()
        this.gameState.npcs.forEach(npc => this.drawSprite(npc.sprite, npc.x, npc.y))
        this.drawSprite(this.gameState.player.sprite, this.gameState.player.x, this.gameState.player.y)
        const sceneData = this.content.scenes[this.gameState.currentScene]
        if (sceneData) {
            this.drawText(`场景: ${sceneData.name}`, 5, 5, 'white', '12px sans-serif')
        }
        this.drawText(`玩家: ${this.gameState.playerName}`, this.config.canvasWidth - 100, 5, 'white', '12px sans-serif')
    },

    drawEndingScreen(sceneData) {
        this.ctx.fillStyle = this._getColor(sceneData.backgroundColor || 'black')
        this.ctx.fillRect(0, 0, this.config.canvasWidth, this.config.canvasHeight)
        const startY = this.config.canvasHeight / 3
        const lineHeight = 25
        sceneData.message.forEach((line, index) => {
            this.drawCenteredText(line, startY + index * lineHeight, 'white', '18px sans-serif')
        })
        this.drawCenteredText("点击刷新页面重新开始", this.config.canvasHeight - 50, 'grey', '14px sans-serif')
    },


    // --- UI Drawing ---
    drawUI() {
        const uiY = this.config.uiAreaYStart
        const uiH = this.config.canvasHeight - uiY
        this.ctx.fillStyle = this._getColor('uiBackground')
        this.ctx.fillRect(0, uiY, this.config.canvasWidth, uiH)
        this.ctx.strokeStyle = this._getColor('uiBorder')
        this.ctx.lineWidth = 1
        this.ctx.strokeRect(1, uiY + 1, this.config.canvasWidth - 2, uiH - 2)

        if (this.gameState.dialogue.active) {
            this.drawDialogueUI()
        } else {
            this.drawCommandButtons()
        }
    },

    drawDialogueUI() {
        const dialogue = this.gameState.dialogue
        if (!dialogue.lines || dialogue.lines.length === 0) return

        const currentLine = dialogue.lines[dialogue.currentLineIndex]
        const padding = 10
        const textY = this.config.uiAreaYStart + padding + 5
        const lineHeight = 18
        let lineStartY = textY

        // Speaker
        if (dialogue.speaker) {
            this.drawText(`【${dialogue.speaker}】`, padding, lineStartY, 'uiHighlight', 'bold 16px sans-serif')
            lineStartY += lineHeight + 4
        }

        // --- NEW Character-based Wrapping Logic ---
        const maxLineWidth = this.config.canvasWidth - padding * 2
        let currentLineText = ''
        let testLine = ''
        const fullText = currentLine.replace('{playerName}', this.gameState.playerName) // Replace placeholder once

        this.ctx.font = '16px sans-serif' // Ensure font is set for measurement

        for (let i = 0; i < fullText.length; i++) {
            testLine = currentLineText + fullText[i]
            // Measure the width of the line *with* the next character
            if (this.ctx.measureText(testLine).width > maxLineWidth && currentLineText.length > 0) {
                // Draw the line *without* the character that overflowed
                this.drawText(currentLineText, padding, lineStartY, 'uiText')
                lineStartY += lineHeight // Move to the next line
                currentLineText = fullText[i] // Start the new line with the overflowing character
            } else {
                // Character fits, add it to the current line
                currentLineText = testLine
            }
        }
        // Draw any remaining text (the last line)
        if (currentLineText.length > 0) {
            this.drawText(currentLineText, padding, lineStartY, 'uiText')
        }
        // --- End NEW Wrapping Logic ---

        // Prompts and Choices
        const promptY = this.config.canvasHeight - padding - 14
        if (dialogue.currentLineIndex >= dialogue.lines.length - 1 && dialogue.choices.length > 0) {
            const choiceYStart = lineStartY + lineHeight + 10
            dialogue.choices.forEach((choice, index) => {
                choice.rect = { // Store calculated rect for click detection
                    x: padding + 15, y: choiceYStart + index * lineHeight - 2,
                    width: this.config.canvasWidth - padding * 2 - 15, height: lineHeight
                }
                this.drawText(`${index + 1}. ${choice.text}`, choice.rect.x, choice.rect.y, 'uiText')
            })
            this.drawText("点击选项继续...", this.config.canvasWidth - 110, promptY, 'grey', '12px sans-serif')
        } else if (dialogue.currentLineIndex < dialogue.lines.length - 1) {
            this.drawText("点击继续...", this.config.canvasWidth - 90, promptY, 'grey', '12px sans-serif')
        } else if (dialogue.choices.length === 0) {
            this.drawText("点击结束", this.config.canvasWidth - 90, promptY, 'grey', '12px sans-serif')
        }
    },

    drawCommandButtons() {
        const sceneData = this.content.scenes[this.gameState.currentScene]
        const commands = sceneData?.commands || []
        this.gameState.currentCommands = [] // Clear previous commands

        const buttonWidth = 60, buttonHeight = 30, padding = 10, buttonsPerRow = 3
        const startX = padding, startY = this.config.uiAreaYStart + padding

        commands.forEach((cmd, index) => {
            const col = index % buttonsPerRow; const row = Math.floor(index / buttonsPerRow)
            const x = startX + col * (buttonWidth + padding)
            const y = startY + row * (buttonHeight + padding)
            const rect = { x, y, width: buttonWidth, height: buttonHeight }

            // Draw button background and border (code remains the same)
            this.ctx.fillStyle = this._getColor('blue'); this.ctx.fillRect(x, y, buttonWidth, buttonHeight)
            this.ctx.strokeStyle = this._getColor('white'); this.ctx.strokeRect(x, y, buttonWidth, buttonHeight)

            // --- Debug and Draw Text ---
            const textX = x + buttonWidth / 2
            const textY = y + buttonHeight / 2

            // Add console log to check coordinates for each button
            console.log(`Drawing button text "${cmd.text}" at calculated center: textX=${textX.toFixed(1)}, textY=${textY.toFixed(1)} (Button TopLeft: x=${x}, y=${y})`)

            // Explicitly set alignment properties just before drawing THIS text
            this.ctx.fillStyle = this._getColor('white')
            this.ctx.font = '14px sans-serif'
            this.ctx.textAlign = 'center'       // Re-affirm alignment
            this.ctx.textBaseline = 'middle'    // Re-affirm baseline
            this.ctx.fillText(cmd.text, textX, textY) // Draw text at calculated center
            // --- End Debug ---

            this.gameState.currentCommands.push({ ...cmd, rect }) // Store command with its rect
        });
    
    },

    // --- Input Handling ---
    handleClick(event) {
        if (!this.isRunning) return // Prevent clicks if game ended or not started

        const rect = this.canvas.getBoundingClientRect()
        const clickX = event.clientX - rect.left
        const clickY = event.clientY - rect.top
        console.log("Click" + this.gameState.currentScene)
        if (this.gameState.dialogue.active) {
            console.log("Click Dialogue")
            this.handleDialogueClick(clickX, clickY)
        } else if (this.gameState.currentScene === 'TITLE') {
            // Click anywhere on title screen should start the game via the HTML button,
            // but we can add a direct start here for testing if needed.
            // We need the player name first, so this click shouldn't bypass the name entry.
        } else if (clickY >= this.config.uiAreaYStart) {
            this.handleButtonClick(clickX, clickY)
        } else {
            // Click in game area - future use
        }
    },

    handleDialogueClick(clickX, clickY) {
        const dialogue = this.gameState.dialogue
        if (!dialogue.active) return

        // Check choices first
        if (dialogue.currentLineIndex >= dialogue.lines.length - 1 && dialogue.choices.length > 0) {
            for (let choice of dialogue.choices) {
                if (choice.rect && clickX >= choice.rect.x && clickX <= choice.rect.x + choice.rect.width &&
                    clickY >= choice.rect.y && clickY <= choice.rect.y + choice.rect.height) {
                    console.log(`Chose: ${choice.text}, Action: ${choice.action}`)
                    this.executeAction(choice.action) // Execute the action string
                    return // Choice handled
                }
            }
            // Clicked but not on a choice
            return
        }

        // Advance dialogue line or finish
        if (dialogue.currentLineIndex < dialogue.lines.length - 1) {
            dialogue.currentLineIndex++
        } else {
            this.closeDialogue() // Finished all lines, no choices left
        }
    },

    handleButtonClick(clickX, clickY) {
        for (const cmd of this.gameState.currentCommands) {
            if (cmd.rect && clickX >= cmd.rect.x && clickX <= cmd.rect.x + cmd.rect.width &&
                clickY >= cmd.rect.y && clickY <= cmd.rect.y + cmd.rect.height) {
                console.log(`Button: ${cmd.text}, Action: ${cmd.action}`)
                this.executeAction(cmd.action) // Execute the action string
                return // Button handled
            }
        }
    },

    // --- State Management & Actions ---
    setupScene(sceneId) {
        const sceneData = this.content.scenes[sceneId]
        if (!sceneData) { console.error(`Scene not found: ${sceneId}`); return }
        this.gameState.npcs = sceneData.npcs ? [...sceneData.npcs] : [] // Copy NPCs
        console.log(`Scene setup: ${sceneId}`)
    },

    changeScene(newSceneId, entryDialogueId = null) {
        if (!this.content.scenes[newSceneId]) { console.error(`Cannot change to unknown scene: ${newSceneId}`); return }
        console.log(`Changing scene from ${this.gameState.currentScene} to ${newSceneId}`)
        this.gameState.currentScene = newSceneId
        this.closeDialogue() // Close any active dialogue
        this.gameState.currentCommands = [] // Clear commands immediately
        this.setupScene(newSceneId)

        // Handle onEnterAction OR passed entryDialogueId
        const sceneData = this.content.scenes[newSceneId]
        const actionToTrigger = entryDialogueId ? null : sceneData?.onEnterAction // Prioritize passed dialogue ID if present for action override
        const dialogueToStart = entryDialogueId ? entryDialogueId : (actionToTrigger && this.content.dialogues[actionToTrigger] ? actionToTrigger : null)

        if (dialogueToStart) {
            this.startDialogue(dialogueToStart)
        } else if (actionToTrigger) {
            this.executeAction(actionToTrigger) // If onEnter is an action, execute it
        }
    },

    startDialogue(dialogueId) {
        const dialogueData = this.content.dialogues[dialogueId]
        if (!dialogueData) { console.warn(`Dialogue not found: ${dialogueId}`); return }

        const d = this.gameState.dialogue
        d.lines = dialogueData.lines
        d.speaker = dialogueData.speaker
        d.choices = dialogueData.choices ? [...dialogueData.choices] : [] // Copy choices
        d.currentLineIndex = 0
        d.active = true
        console.log(`Starting dialogue: ${dialogueId}`)
    },

    closeDialogue() {
        if (this.gameState.dialogue.active) {
            this.gameState.dialogue.active = false
            this.gameState.dialogue.choices = [] // Clear choices
            console.log("Dialogue closed.")
        }
    },

    executeAction(actionString) {
        if (!actionString) { this.closeDialogue(); return } // Allow empty action to just close dialogue

        const handler = this.content.actionHandlers[actionString]
        if (handler) {
            console.log(`Executing action handler: ${actionString}`)
            handler(this) // Pass the engine object to the handler
        } else {
            console.warn(`No action handler found for: ${actionString}`)
            this.startDialogue('dialogue_unknown_action') // Show default unknown action message
        }
    },

    setFlag(flagName, value) {
        console.log(`Setting flag: ${flagName} = ${value}`)
        this.gameState.flags[flagName] = value
    },

    getFlag(flagName) {
        return this.gameState.flags[flagName] || false // Default to false if undefined
    },

}

// --- Global Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('playerName')
    const startButton = document.getElementById('startGame')
    const nameEntryDiv = document.getElementById('name-entry')
    const gameContainerDiv = document.getElementById('game-container')

    if (engine.init('gameCanvas')) { // Initialize the engine
        console.log("Engine initialized successfully.")
        // Setup button listener
        startButton.addEventListener('click', () => {
            const name = nameInput.value.trim()
            nameEntryDiv.style.display = 'none'
            gameContainerDiv.style.display = 'block'
            console.log("Pre")
            engine.startGame(name) // Start the game using the engine method
            console.log("Post")
        })
        // Initially hide game, show name entry
        nameEntryDiv.style.display = 'block'
        gameContainerDiv.style.display = 'none'

    } else {
        console.error("Engine initialization failed.")
        // Display error message to the user maybe
        document.body.innerHTML = "<h2>游戏引擎初始化失败，请检查控制台错误信息。</h2>"
    }
})