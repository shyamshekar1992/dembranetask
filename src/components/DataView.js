import React, { useState, useEffect } from "react";

function HostDataView({ linkId }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/responses?linkId=${linkId}`
        );
        const data = await response.json();
        // Transform the responses if necessary
        const formattedData = data.map((entry) => ({
          ...entry,
          responses: Object.values(entry.responses), // Convert object to array
        }));
        setResponses(formattedData); // Set formatted responses
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [linkId]);

  if (loading) {
    return <div>Loading responses...</div>;
  }

  return (
    <div>
      <h1>Survey Responses</h1>
      {responses.length === 0 ? (
        <p>No responses yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Participant ID</th>
              <th>Responses</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{response._id}</td>
                <td>{response.responses.join(", ")}</td> {/* Join responses into a readable format */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HostDataView;
