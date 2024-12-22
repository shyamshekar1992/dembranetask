import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // For form validation

function ParticipantForm() {
  const { linkId } = useParams(); // Get the linkId from the URL
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const linkIdWithPrefix = `form/${linkId}`;
        const response = await fetch(
          `http://localhost:5001/api/questions?linkId=${linkIdWithPrefix}`
        );

        if (response.ok) {
          const data = await response.json();
          setQuestions(data.questions); // Set the questions in state
        } else {
          alert("Questions not found!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions.");
      }
    };

    fetchQuestions();
  }, [linkId, navigate]);

  // Dynamically build the validation schema for all fields
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    age: Yup.number().required("Age is required").positive("Age must be a positive number").integer("Age must be an integer"),
    // Dynamically generate validation for all questions
    ...questions.reduce((acc, question) => {
      const fieldName = question.toLowerCase().replace(/\s+/g, ""); // Create a valid field name from question
      acc[fieldName] = Yup.string().required(`${question} is required`);
      return acc;
    }, {}),
  });

  // Formik form setup with dynamic validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      // Dynamically add fields for questions
      ...questions.reduce((acc, question) => {
        const fieldName = question.toLowerCase().replace(/\s+/g, ""); // Create a valid field name from question
        acc[fieldName] = ""; // Initial empty string for each question
        return acc;
      }, {}),
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:5001/api/responses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ linkId, responses: values }),
        });

        if (response.ok) {
          alert("Your responses have been submitted!");
          navigate("/");
        } else {
          alert("Failed to submit responses.");
        }
      } catch (error) {
        console.error("Error submitting responses:", error);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Participant Form</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="text-red-500 text-sm">{formik.errors.age}</div>
          ) : null}
        </div>

        {/* Dynamic Questions */}
        {questions.map((question, index) => {
          const fieldName = question.toLowerCase().replace(/\s+/g, ""); // Create a unique field name
          return (
            <div key={index} className="mb-4">
              <label htmlFor={fieldName} className="block text-sm font-medium text-gray-700">
                {question}
              </label>
              <input
                type="text"
                id={fieldName}
                name={fieldName}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                value={formik.values[fieldName] || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[fieldName] && formik.errors[fieldName] ? (
                <div className="text-red-500 text-sm">{formik.errors[fieldName]}</div>
              ) : null}
            </div>
          );
        })}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ParticipantForm;
