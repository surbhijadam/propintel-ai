import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"

function SupportCenter() {
  const [message, setMessage] = useState("")
  const [result, setResult] = useState(null)
  const [tickets, setTickets] = useState([])

  const submitIssue = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/support/triage",
        { message }
      )

      setResult(response.data)
      fetchTickets()
    } catch (error) {
      console.error(error)
      alert("Failed to process support request")
    }
  }

  const fetchTickets = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5000/api/support/tickets"
    )

    setTickets(response.data)
  } catch (error) {
    console.error(error)
  }
}

  useEffect(() => {
    fetchTickets()
  }, [])


  const updateTicketStatus = async (ticketId, status) => {
  try {
    await axios.put(
      `http://127.0.0.1:5000/api/support/tickets/${ticketId}/status`,
      {
        status
      }
    )

    fetchTickets()

  } catch (error) {
    console.error(error)
    alert("Failed to update ticket status")
  }
}

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-6">
          AI Support Center
        </h1>

        <textarea
          rows="6"
          placeholder="Example: My AC is not working in flat 302, please fix it urgently."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-4 rounded-xl"
        />

        <button
          onClick={submitIssue}
          className="bg-red-600 text-white px-6 py-3 rounded-lg mt-4"
        >
          Submit Issue
        </button>

        {result && (
          <div className="bg-white p-6 rounded-xl shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4">AI Triage Result</h2>

            <p><strong>Urgency:</strong> {result.urgency}</p>
            <p><strong>Intent:</strong> {result.intent}</p>
            <p><strong>Issue Type:</strong> {result.issue_type}</p>
            <p><strong>Extracted Flat:</strong> {result.flat_number}</p>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-xl shadow-sm">
  <strong className="text-lg text-blue-700">
    AI Reply
  </strong>

  <div className="mt-3 whitespace-pre-line leading-8 text-gray-700">
    {result.reply}
  </div>
</div>
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-md mt-8">

  <h2 className="text-2xl font-bold mb-4">
    Support Ticket Dashboard
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-left border">

      <thead className="bg-red-600 text-white">
        <tr>
          <th className="p-3">Ticket ID</th>
          <th className="p-3">Flat</th>
          <th className="p-3">Issue</th>
          <th className="p-3">Urgency</th>
          <th className="p-3">Intent</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className="border-b">
            <td className="p-3">T-{ticket.id}</td>
            <td className="p-3">{ticket.flat_number}</td>
            <td className="p-3">{ticket.issue_type}</td>
            <td className="p-3 font-semibold">
              {ticket.urgency}
            </td>
            <td className="p-3">{ticket.intent}</td>
            <td className="p-3">
  <select
    value={ticket.status}
    onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
    className="border p-2 rounded-lg"
  >
    <option>Open</option>
    <option>In Progress</option>
    <option>Resolved</option>
  </select>
</td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>

      </div>
    </div>
  )
}

export default SupportCenter