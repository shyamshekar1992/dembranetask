import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For form validation
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

// Validation Schema with Yup
const validationSchema = Yup.object({
  currentQuestion: Yup.string().required("Question is required"), // Require question
});

function HostPortal() {
  const [questions, setQuestions] = useState([]);
  const [generatedLink, setGeneratedLink] = useState("");
  const navigate = useNavigate(); 

  // Add Question to the list
  const handleAddQuestion = (values, resetForm) => {
    if (values.currentQuestion.trim()) {
      // Ensure the question ends with a question mark
      const formattedQuestion = values.currentQuestion.trim().endsWith("?")
        ? values.currentQuestion.trim()
        : `${values.currentQuestion.trim()}?`;

      setQuestions([...questions, formattedQuestion]);
      resetForm();
    }
  };

  // Handle deleting a question
  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Submit Questions to backend
  const handleSubmit = async () => {
    const link = `form/${Math.random().toString(36).slice(2, 10)}`;
    setGeneratedLink(link);

    try {
      const response = await fetch("http://localhost:5001/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkId: link, questions }),
      });

      if (response.ok) {
        alert("Questions saved successfully!");
      } else {
        alert("Failed to save questions.");
      }
    } catch (error) {
      console.error("Error saving questions:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Redirect to SearchPage when button is clicked
  const handleRedirectToSearch = () => {
    navigate("/search"); // Redirect to /search page
  };

  // Handle Copy to Clipboard
  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(window.location.origin + "/" + generatedLink)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying text: ", error);
          alert("Failed to copy the link.");
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Questions</h1>

      {/* Form to add a question */}
      <Formik
        initialValues={{ currentQuestion: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => handleAddQuestion(values, resetForm)}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="currentQuestion"
                placeholder="Enter question"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="currentQuestion">
                {(msg) => <div className="text-red-500 text-sm">{msg}</div>}
              </ErrorMessage>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                {isSubmitting ? "Adding..." : "Add Question"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* Display list of questions */}
      <div className="mt-6">
        <ul className="space-y-2">
          {questions.map((q, index) => (
            <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
              <span>{q}</span>
              <button
                onClick={() => handleDeleteQuestion(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Generate Link button - only enable if there are questions */}
      <div className="mt-6">
        <button
          onClick={handleSubmit}
          className={`w-full p-3 text-white rounded-md focus:outline-none ${questions.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          disabled={questions.length === 0}
        >
          Generate Link
        </button>
      </div>

      {/* Show the generated link */}
      {generatedLink && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Share this link with participants:</h2>
          <div className="flex items-center">
            <p className="text-gray-700 mr-4">{window.location.origin}/{generatedLink}</p>
            <button
              onClick={handleCopyLink}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        </div>
      )}

      {/* Redirect to SearchPage Button */}
      <div className="mt-6">
        <button
          onClick={handleRedirectToSearch}
          className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
        >
          Go to Search Page
        </button>
      </div>
    </div>
  );
}

export default HostPortal;
