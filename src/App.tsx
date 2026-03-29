import { useState } from 'react'
import { levels } from './levels'
import { levelKeys } from './keys'
import './App.css'

// A separate component for each level to handle its own input/hint state
function LevelCard({ level, isUnlocked, onUnlock }: { level: any, isUnlocked: boolean, onUnlock: (id: number) => void }) {
  const [guess, setGuess] = useState('')
  const [error, setError] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (guess.toLowerCase() === levelKeys[level.id].toLowerCase()) {
      onUnlock(level.id)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (!isUnlocked) {
    return (
      <div className="level-card locked">
        <div className="locked-overlay">
          <h2>🔒 {level.name}</h2>
          <form onSubmit={handleUnlock} className="unlock-form">
            <input 
              type="text" 
              placeholder="Enter key to unlock..." 
              value={guess}
              onChange={(e) => { setGuess(e.target.value); setError(false); }}
              className={error ? 'error-shake' : ''}
            />
            <button type="submit">Unlock</button>
          </form>
          {error && <span className="error-text">Incorrect Key</span>}
        </div>
      </div>
    )
  }

  return (
    <div className="level-card unlocked">
      <h2>{level.name}</h2>
      <p className="description">{level.description}</p>
      
      <div className="hint-section">
        <button className="hint-btn" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hint' : 'Reveal Hint'}
        </button>
        {showHint && <p className="hint-text">{level.hint}</p>}
      </div>
    </div>
  )
}

function App() {
  // Level 1 is unlocked by default
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([1])

  const handleUnlockLevel = (id: number) => {
    if (!unlockedLevels.includes(id)) {
      setUnlockedLevels([...unlockedLevels, id])
    }
  }

  return (
    <div className="app-container">
      {/* Hero Section (Movie Style) */}
      <header className="hero">
        <div className="hero-content">
          <h1>UJOP Kolej Challenge</h1>
          <p>
            This challenge is only for people from UJOP Dormitory, precisely this one. 
            
          </p>
        </div>
        <div className="hero-image-wrapper">
          <img src="/dormitory-entrance.png" alt="UJOP Dormitory" className="hero-image" />
          <div className="image-fade"></div>
        </div>

        <p>
          <br /> <br /> <br />
          Solve the clues, find the keys, and unlock the episodes.</p>
      </header>

      {/* Grid of Levels */}
      <main className="levels-grid">
        {levels.map((level) => (
          <LevelCard 
            key={level.id} 
            level={level} 
            isUnlocked={unlockedLevels.includes(level.id)}
            onUnlock={handleUnlockLevel}
          />
        ))}
      </main>
    </div>
  )
}

export default App