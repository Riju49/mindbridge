import { useEffect, useState } from "react"
import "./App.css"

const feelings = [
  ["I'm feeling stressed", "stress"],
  ["I'm overthinking", "overthinking"],
  ["I feel lonely", "lonely"],
  ["I need help right now", "help"]
]

const categories = [
  ["Family", "Home, expectations & conflicts", "⌂"],
  ["Education", "Studies, exams & pressure", "▣"],
  ["Money", "Expenses & financial stress", "₹"],
  ["Relationships", "Love, friendship & breakups", "♡"],
  ["Career / Work", "Future, job & workload", "↗"],
  ["Social Life", "Loneliness & social pressure", "◉"],
  ["Personal", "Confidence & overthinking", "✦"],
  ["Lifestyle", "Sleep, routine & rest", "☼"]
]

const questions = {
  Family: [
    ["How often do family problems stay on your mind?", ["Rarely", "Sometimes", "Often", "Almost always"]],
    ["How much pressure do you feel from family expectations?", ["Very little", "A little", "Quite a lot", "Too much"]],
    ["Do you feel comfortable talking to your family?", ["Yes", "Mostly", "Not really", "Never"]]
  ],
  Education: [
    ["How stressed do your studies or exams make you feel?", ["Low", "Moderate", "High", "Very high"]],
    ["How often do you worry about your academic future?", ["Rarely", "Sometimes", "Often", "Almost always"]],
    ["Do you feel overwhelmed by your workload?", ["Not at all", "A little", "Often", "Very much"]]
  ],
  Money: [
    ["How often do financial problems worry you?", ["Rarely", "Sometimes", "Often", "Daily"]],
    ["Do money problems affect your peace of mind?", ["Never", "Sometimes", "Often", "A lot"]],
    ["How much pressure do your expenses create?", ["Low", "Manageable", "High", "Very high"]]
  ],
  Relationships: [
    ["How much are relationship problems affecting you?", ["Not much", "A little", "Quite a lot", "A lot"]],
    ["How often do you think about a breakup or conflict?", ["Rarely", "Sometimes", "Often", "Constantly"]],
    ["Do you feel emotionally supported by people close to you?", ["Yes", "Mostly", "Sometimes", "No"]]
  ],
  "Career / Work": [
    ["How worried are you about your career or future?", ["Not worried", "A little", "Quite worried", "Very worried"]],
    ["How stressful is your current workload?", ["Low", "Manageable", "High", "Too high"]],
    ["How often do you feel uncertain about your future?", ["Rarely", "Sometimes", "Often", "Almost always"]]
  ],
  "Social Life": [
    ["How often do you feel lonely around other people?", ["Rarely", "Sometimes", "Often", "Very often"]],
    ["How much does social pressure affect you?", ["Not much", "A little", "Quite a lot", "A lot"]],
    ["Do you feel connected to the people around you?", ["Yes", "Mostly", "Sometimes", "No"]]
  ],
  Personal: [
    ["How often do you doubt yourself?", ["Rarely", "Sometimes", "Often", "Almost always"]],
    ["How difficult is it to stop overthinking?", ["Easy", "Sometimes difficult", "Difficult", "Very difficult"]],
    ["How confident do you currently feel?", ["Very confident", "Mostly confident", "Not very confident", "Not confident"]]
  ],
  Lifestyle: [
    ["How would you describe your sleep recently?", ["Good", "Okay", "Poor", "Very poor"]],
    ["How often do you feel mentally tired?", ["Rarely", "Sometimes", "Often", "Almost always"]],
    ["How balanced does your daily routine feel?", ["Very balanced", "Mostly balanced", "Not very balanced", "Not balanced"]]
  ]
}

function App() {
  const [screen, setScreen] = useState("home")
  const [category, setCategory] = useState("")
  const [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [phone, setPhone] = useState("")

  const [running, setRunning] = useState(false)
  const [phase, setPhase] = useState("Ready")
  const [time, setTime] = useState(4)

  const currentQuestions = questions[category] || []

  useEffect(() => {
    if (!running) return

    let currentPhase = "Inhale"
    let currentTime = 4

    setPhase(currentPhase)
    setTime(currentTime)

    const timer = setInterval(() => {
      currentTime -= 1

      if (currentTime === 0) {
        if (currentPhase === "Inhale") {
          currentPhase = "Hold"
          currentTime = 4
        } else if (currentPhase === "Hold") {
          currentPhase = "Exhale"
          currentTime = 6
        } else {
          currentPhase = "Inhale"
          currentTime = 4
        }

        setPhase(currentPhase)
      }

      setTime(currentTime)
    }, 1000)

    return () => clearInterval(timer)
  }, [running])

  const breathing = () => {
    setRunning(false)
    setPhase("Ready")
    setTime(4)
    setScreen("breathing")
  }

  const home = () => {
    setRunning(false)
    setScreen("home")
  }

  const startCategory = (name) => {
    setCategory(name)
    setQuestion(0)
    setScore(0)
    setScreen("questions")
  }

  const answer = (index) => {
    const newScore = score + index + 1

    if (question < currentQuestions.length - 1) {
      setScore(newScore)
      setQuestion(question + 1)
    } else {
      setScore(newScore)
      setScreen("result")
    }
  }

  const whatsapp = () => {
    const number = phone.replace(/\D/g, "")

    if (!number) return

    const message = encodeURIComponent(
      "Hey, I'm having a difficult time right now. Can you talk to me for a while?"
    )

    window.open(
      `https://wa.me/${number}?text=${message}`,
      "_blank"
    )
  }

  const resultText =
    score >= 10
      ? "You may be carrying a lot right now. It could help to slow down and talk to someone you trust or a professional."
      : score >= 6
        ? "You seem to be under some pressure. Taking a small pause and talking about what you feel may help."
        : "You seem to be doing relatively okay. Keep checking in with yourself and make time for rest."

  if (screen === "home") {
    return (
      <div className="app">
        <nav className="nav">
          <div className="brand" onClick={home}>
            <span className="brand-mark">M</span>
            MindBridge
          </div>

          <button className="nav-calm" onClick={breathing}>
            Calm Now
          </button>
        </nav>

        <main className="home">
          <div className="eyebrow">A QUIET SPACE FOR YOU</div>

          <h1>
            It’s okay
            <br />
            <em>to not be okay.</em>
          </h1>

          <p className="hero-text">
            You don't have to figure everything out at once.
            Start with what you're feeling right now.
          </p>

          <div className="section-label">
            HOW ARE YOU FEELING?
          </div>

          <div className="feelings">
            {feelings.map(([text, type]) => (
              <button
                key={type}
                className={`feeling ${type === "help" ? "urgent" : ""}`}
                onClick={() =>
                  type === "help"
                    ? breathing()
                    : setScreen("categories")
                }
              >
                <span>{text}</span>
                <b>→</b>
              </button>
            ))}
          </div>

          <button
            className="start-card"
            onClick={() => setScreen("categories")}
          >
            <div>
              <small>LET'S START</small>
              <strong>Understand what's bothering you</strong>
            </div>
            <span>↗</span>
          </button>

          <button className="breathing-card" onClick={breathing}>
            <div className="breathing-icon">◌</div>

            <div>
              <small>CALM YOUR MIND</small>
              <strong>Breathing Exercise</strong>
              <p>Take a moment and breathe slowly.</p>
            </div>

            <b>→</b>
          </button>

          <div className="footer">
            MindBridge is not a diagnosis. You deserve support.
          </div>
        </main>
      </div>
    )
  }

  if (screen === "categories") {
    return (
      <div className="app">
        <main className="page">
          <button className="back" onClick={home}>
            ← Back
          </button>

          <div className="eyebrow">STEP 01</div>

          <h2>What feels heaviest right now?</h2>

          <p className="page-text">
            Choose the area that feels closest to what you're experiencing.
          </p>

          <div className="categories">
            {categories.map(([name, text, icon]) => (
              <button
                className="category"
                key={name}
                onClick={() => startCategory(name)}
              >
                <span className="category-icon">{icon}</span>

                <div>
                  <strong>{name}</strong>
                  <p>{text}</p>
                </div>

                <b>→</b>
              </button>
            ))}
          </div>

          <button className="secondary" onClick={breathing}>
            ◌ Breathing Exercise
          </button>
        </main>
      </div>
    )
  }

  if (screen === "questions") {
    const current = currentQuestions[question]

    return (
      <div className="app">
        <main className="page">
          <button
            className="back"
            onClick={() => setScreen("categories")}
          >
            ← Categories
          </button>

          <div className="progress-text">
            {question + 1} / {currentQuestions.length}
          </div>

          <div className="progress">
            <span
              style={{
                width: `${((question + 1) / currentQuestions.length) * 100}%`
              }}
            />
          </div>

          <div className="eyebrow">{category}</div>

          <h2>{current[0]}</h2>

          <div className="answers">
            {current[1].map((item, index) => (
              <button key={item} onClick={() => answer(index)}>
                <span>{item}</span>
                <b>{index + 1}</b>
              </button>
            ))}
          </div>

          <button className="secondary" onClick={breathing}>
            ◌ Need a moment? Breathe
          </button>
        </main>
      </div>
    )
  }

  if (screen === "result") {
    return (
      <div className="app">
        <main className="page">
          <div className="result">
            <div className="result-icon">✦</div>

            <div className="eyebrow">YOUR CHECK-IN</div>

            <h2>Here’s what we noticed.</h2>

            <p>{resultText}</p>

            <button className="main-button" onClick={breathing}>
              ◌ Breathing Exercise
            </button>

            <button
              className="outline-button"
              onClick={() => setScreen("support")}
            >
              Explore Support
            </button>

            <button className="text-button" onClick={home}>
              Start again
            </button>
          </div>

          <div className="disclaimer">
            This check-in is for self-reflection only. It does not diagnose
            anxiety, depression, or any other mental-health condition.
          </div>
        </main>
      </div>
    )
  }

  if (screen === "breathing") {
    return (
      <div className="app">
        <main className="page breathing-page">
          <button className="back" onClick={home}>
            ← Back
          </button>

          <div className="eyebrow">CALM NOW</div>

          <h2>Let's slow things down.</h2>

          <p className="page-text">
            Follow the circle and breathe slowly.
            You don't need to solve anything right now.
          </p>

          <div className={`breath-circle ${running ? phase.toLowerCase() : "ready"}`}>
            <div>
              <span>{running ? phase : "Ready"}</span>
              <strong>{running ? time : "4"}</strong>
              <small>seconds</small>
            </div>
          </div>

          <div className="breath-guide">
            <span>Inhale · 4s</span>
            <span>Hold · 4s</span>
            <span>Exhale · 6s</span>
          </div>

          <button
            className="main-button"
            onClick={() => setRunning(!running)}
          >
            {running ? "Pause" : "Start Breathing"}
          </button>

          <button
            className="outline-button"
            onClick={() => setScreen("support")}
          >
            I need support
          </button>
        </main>
      </div>
    )
  }

  if (screen === "support") {
    return (
      <div className="app">
        <main className="page">
          <button className="back" onClick={home}>
            ← Home
          </button>

          <div className="eyebrow">SUPPORT</div>

          <h2>You don't have to do this alone.</h2>

          <p className="page-text">
            Choose what feels most helpful right now.
          </p>

          <div className="support-list">
            <button
              className="support-card"
              onClick={() => setScreen("friend")}
            >
              <span>♡</span>
              <div>
                <strong>Talk to someone you trust</strong>
                <p>Send a message to a friend or someone close to you.</p>
              </div>
              <b>→</b>
            </button>

            <button
              className="support-card"
              onClick={() => setScreen("doctor")}
            >
              <span>+</span>
              <div>
                <strong>Talk to a Doctor / Professional</strong>
                <p>Find professional and helpline support.</p>
              </div>
              <b>→</b>
            </button>

            <button className="support-card" onClick={breathing}>
              <span>◌</span>
              <div>
                <strong>Breathing Exercise</strong>
                <p>Take a calm minute before your next step.</p>
              </div>
              <b>→</b>
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (screen === "friend") {
    return (
      <div className="app">
        <main className="page">
          <button
            className="back"
            onClick={() => setScreen("support")}
          >
            ← Support
          </button>

          <div className="eyebrow">REACH OUT</div>

          <h2>Talk to someone you trust.</h2>

          <p className="page-text">
            Enter their WhatsApp number with country code.
            MindBridge does not store the number.
          </p>

          <div className="form">
            <label>WhatsApp number</label>

            <input
              type="tel"
              placeholder="e.g. 919876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button
              className="main-button"
              onClick={whatsapp}
              disabled={!phone.trim()}
            >
              Open WhatsApp →
            </button>

            <p>
              “Hey, I'm having a difficult time right now.
              Can you talk to me for a while?”
            </p>
          </div>

          <button className="secondary" onClick={breathing}>
            ◌ Breathe first
          </button>
        </main>
      </div>
    )
  }

  if (screen === "doctor") {
    return (
      <div className="app">
        <main className="page">
          <button
            className="back"
            onClick={() => setScreen("support")}
          >
            ← Support
          </button>

          <div className="eyebrow">PROFESSIONAL SUPPORT</div>

          <h2>You deserve proper support.</h2>

          <p className="page-text">
            Connect with professional or emergency support when needed.
          </p>

          <button
            className="nearby"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/search/mental+health+doctor+near+me",
                "_blank"
              )
            }
          >
            <span>⌖</span>
            <div>
              <strong>Find Nearby Help</strong>
              <p>Search for mental-health professionals nearby</p>
            </div>
            <b>↗</b>
          </button>

          <Service
            title="Tele-MANAS"
            number="14416"
            text="Government mental-health support helpline"
          />

          <Service
            title="Tele-MANAS"
            number="18008914416"
            text="Alternative Tele-MANAS number"
          />

          <Service
            title="Assam Sarathi"
            number="104"
            text="Health information, advice and counselling"
          />

          <Service
            title="Emergency / Ambulance"
            number="108"
            text="For genuine medical emergencies"
          />

          <button className="secondary" onClick={breathing}>
            ◌ Breathing Exercise
          </button>

          <div className="disclaimer">
            <strong>Important</strong>
            <p>
              MindBridge is not a replacement for a doctor or emergency
              service. If you are in immediate danger, seek emergency help.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return null
}

function Service({ title, number, text }) {
  return (
    <div className="service">
      <div>
        <small>{title}</small>
        <strong>{number}</strong>
        <p>{text}</p>
      </div>

      <a href={`tel:${number}`}>Call</a>
    </div>
  )
}

export default App