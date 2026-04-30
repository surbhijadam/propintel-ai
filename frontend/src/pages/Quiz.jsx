import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function Quiz() {

  const [quiz, setQuiz] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [result, setResult] = useState(null)
  const [loadingQuiz, setLoadingQuiz] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [topic, setTopic] = useState("Property Valuation")
  const [difficulty, setDifficulty] = useState("Beginner")
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const progress =
  totalQuestions === 0
    ? 0
    : Math.round((correctAnswers / totalQuestions) * 100)
  
  const [recommendation, setRecommendation] = useState(null)

let badge = "Beginner Learner 🌱"

if (correctAnswers >= 3) {
  badge = "Property Explorer 🏠"
}

if (correctAnswers >= 6) {
  badge = "Real Estate Pro ⭐"
}

if (correctAnswers >= 10) {
  badge = "Market Master 👑"
}

const fetchLearningData = async () => {
  try {

    const recommendationResponse = await axios.get(
      "http://127.0.0.1:5000/api/quiz/recommendation"
    )

    setRecommendation(recommendationResponse.data)
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  fetchLearningData()
}, [])

const generateQuiz = async () => {
  try {
    setLoadingQuiz(true)

    const response = await axios.post(
      "http://127.0.0.1:5000/api/quiz/generate",
      {
        topic,
        difficulty
      }
    )

    setQuiz(response.data)
    setResult(null)
    setSelectedAnswer("")
  } catch (error) {
    console.error(error)
  } finally {
    setLoadingQuiz(false)
  }
}

const submitAnswer = async () => {
  try {
    setSubmitting(true)

    const response = await axios.post(
      "http://127.0.0.1:5000/api/quiz/evaluate",
      {
        answer: selectedAnswer,
        question: quiz.question,
        correct_answer: quiz.correct_answer,
        topic,
        difficulty
      }
    )

    setResult(response.data)
    fetchLearningData()

    setTotalQuestions(totalQuestions + 1)

    if (response.data.correct) {
      setCorrectAnswers(correctAnswers + 1)

      const newStreak = streak + 1
      setStreak(newStreak)

      if (newStreak > bestStreak) {
        setBestStreak(newStreak)
      }
    } else {
      setStreak(0)
    }

  } catch (error) {
    console.error(error)
  } finally {
    setSubmitting(false)
  }
}

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-gray-100">

    <Navbar />

    <div className="max-w-7xl mx-auto px-8 py-10">

      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-3">
          AI Learning Hub
        </h1>
        <p className="text-gray-600 text-lg">
          Practice real estate concepts with AI-generated quizzes and smart feedback.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-5">
              Start Your Quiz
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border p-3 rounded-xl w-full"
              >
                <option>Property Valuation</option>
                <option>Legal Disclosures</option>
                <option>Closing Costs</option>
                <option>Cap Rates</option>
                <option>MLS Terminology</option>
              </select>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border p-3 rounded-xl w-full"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <button
              onClick={generateQuiz}
              disabled={loadingQuiz}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md disabled:bg-gray-400"
            >
              {loadingQuiz ? "Generating..." : "Generate Quiz"}
            </button>
          </div>

          {quiz && (
            <div className="bg-white p-7 rounded-2xl shadow-md">

              <h2 className="text-2xl font-bold mb-5">
                {quiz.question}
              </h2>

              <div className="space-y-3">
                {quiz.options.map((option, index) => (
                  <label
                    key={index}
                    className={`block border p-4 rounded-xl cursor-pointer transition ${
                      selectedAnswer === option.charAt(0)
                        ? "border-blue-600 bg-blue-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option.charAt(0)}
                      checked={selectedAnswer === option.charAt(0)}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>

              <p className="mt-5 text-gray-600">
                <strong>Hint:</strong> {quiz.hint}
              </p>

              <button
                onClick={submitAnswer}
                disabled={!selectedAnswer || submitting}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl mt-6 disabled:bg-gray-400"
              >
                {submitting ? "Checking..." : "Submit Answer"}
              </button>
            </div>
          )}

          {result && (
            <div className="bg-white p-7 rounded-2xl shadow-md border-l-4 border-blue-600">

              <h2 className="text-2xl font-bold mb-3">
                {result.correct ? "Correct ✅" : "Incorrect ❌"}
              </h2>

              <p className="mb-3">{result.message}</p>

              <p className="text-gray-700 mb-3">
                {result.explanation}
              </p>

              {result.real_world_example && (
                <p className="text-gray-700 mb-3">
                  <strong>Real-world Example:</strong> {result.real_world_example}
                </p>
              )}

              <p className="text-blue-600 font-semibold">
                Memory Tip: {result.memory_tip}
              </p>

              <button
                onClick={generateQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl mt-6"
              >
                Next Question
              </button>
            </div>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <h2 className="text-xl font-bold mb-4">Session Score</h2>
            <p className="text-4xl font-extrabold text-blue-600">
              {correctAnswers} / {totalQuestions}
            </p>
            <p className="text-gray-500 mt-2">
              Accuracy: {totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100)}%
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Learning Progress</span>
              <span>{progress}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-semibold text-lg">
                Current Streak: {streak} 🔥
              </p>
              <p className="text-gray-600">
                Best Streak: {bestStreak}
              </p>
              <p className="text-blue-600 font-bold text-xl mt-3">
                {badge}
              </p>
            </div>
          </div>

          {recommendation && (
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-xl font-bold text-purple-600 mb-4">
                AI Recommendation
              </h2>

              <p className="mb-2">
                <strong>Improve:</strong> {recommendation.needs_improvement || "Not enough data"}
              </p>

              <p className="mb-2">
                <strong>Strong:</strong> {recommendation.strong_topic || "Not enough data"}
              </p>

              <p className="text-green-600 font-semibold mt-3">
                {recommendation.message}
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  </div>
)

}

export default Quiz