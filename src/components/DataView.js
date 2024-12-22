import React, { useState, useEffect } from "react";

function HostDataView({ linkId }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // To track errors

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/responses?linkId=${linkId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch responses.");
        }
        const data = await response.json();
        // Transform the responses if necessary
        const formattedData = data.map((entry) => ({
          ...entry,
          responses: Object.values(entry.responses), // Convert object to array
        }));
        setResponses(formattedData); // Set formatted responses
      } catch (error) {
        setError(error.message); // Set error message
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    };

    fetchResponses();
  }, [linkId]);

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading responses...</div>;
  }

  if (error) {
    return <div className="text-center text-lg font-semibold text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4 text-center">Survey Responses</h1>
      {responses.length === 0 ? (
        <p className="text-center text-lg">No responses yet.</p>
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
              {responses.map(({ _id, responses }, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 text-sm">{_id}</td>
                  <td className="p-3 text-sm">{responses.join(", ")}</td> {/* Join responses into a readable format */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HostDataView;
