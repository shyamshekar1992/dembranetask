import React, { useState } from "react";

function SearchPage() {
  const [responses, setResponses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For storing the search term
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [linkId, setLinkId] = useState("");  // For storing dynamic linkId entered by the user
  const [loading, setLoading] = useState(false);



  // Fetch responses based on entered linkId and search term
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!linkId) {
      alert("Please enter a valid linkId");
      return;
    }

    setLoading(true);  // Start loading

    try {
      // Fetch responses based on the entered linkId
      const responsesResponse = await fetch(
        `http://localhost:5001/api/responses?linkId=${linkId}`
      );
      const responsesData = await responsesResponse.json();

      if (responsesData.length === 0) {
        alert("No responses found for this linkId.");
        setFilteredResponses([]);
        setResponses([]);
      } else {
        setResponses(responsesData);
        // Filter responses based on search term
        const filtered = responsesData.filter((response) => {
          const responseString = Object.values(response.responses)
            .join(" ")
            .toLowerCase();
          return responseString.includes(searchTerm.toLowerCase());
        });
        setFilteredResponses(filtered); // Set filtered responses
      }
    } catch (error) {
      console.error("Error fetching responses:", error);
      alert("Failed to fetch data.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // If still loading data
  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading data...</div>;
  }

  // Insights
  const totalResponses = filteredResponses.length;  // Total number of filtered responses
  const totalQuestions = responses.length > 0 ? Object.keys(responses[0].responses).length : 0; // Get the number of questions per response
  const averageResponsesPerParticipant =
    totalResponses > 0
      ? Math.round(
          filteredResponses.reduce(
            (acc, response) => acc + Object.values(response.responses).length,
            0
          ) / totalResponses
        )
      : 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Search Survey Responses</h1>

      {/* Input field for dynamic linkId */}
      <div className="mb-4 flex justify-center items-center space-x-2">
        <input
          type="text"
          placeholder="Enter linkId:gstk159e"
          value={linkId}
          onChange={(e) => setLinkId(e.target.value)} // Update linkId dynamically
          className="border border-gray-300 rounded-md p-2 w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Insights */}
      <div className="mb-4">
        {filteredResponses.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Insights:</h3>
            <ul className="list-disc pl-5">
              <li>Total Responses: {totalResponses}</li>
              <li>Total Questions: {totalQuestions}</li>
              <li>Average Responses per Participant: {averageResponsesPerParticipant}</li>
            </ul>
          </div>
        )}
      </div>

      {/* Table of responses */}
      <div>
        {filteredResponses.length === 0 ? (
          <p className="text-center text-lg">No matching responses found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold">Participant ID</th>
                  <th className="p-3 text-left text-sm font-semibold">Responses</th>
                </tr>
              </thead>
              <tbody>
                {filteredResponses.map((response, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 text-sm">{response._id}</td>
                    <td className="p-3 text-sm">
                      {/* Map through the responses and style each one */}
                      <ul className="space-y-2">
                        {Object.values(response.responses).map((answer, idx) => (
                          <li key={idx} className="text-gray-700">
                            <span className="font-medium">Answer {idx + 1}:</span> {answer}
                          </li>
                        ))}
                      </ul>
                    </td> {/* List responses in a readable format */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
