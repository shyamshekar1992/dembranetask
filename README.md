# Coding Challenge Application

## Getting Started

### 1. Set Up Your Development Environment

Ensure you have the following installed:

- **Node.js** (v16 or above recommended)
- **Yarn** package manager

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/shyamshekar1992/dembranetask
cd dembranetask
```

---

### 2. Frontend Setup

1. Install frontend dependencies:

   ```bash
   yarn
   ```

2. Start the development server:

   ```bash
   yarn start
   ```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

---

### 3. Core Features

The application implements the following key features:

#### **Dynamic Form Handling**
- Uses **Formik** for building forms and **Yup** for schema-based validation.
- Ensures user inputs are correct before submission.

#### **Tailwind CSS Styling**
- Provides a responsive and modern UI.
- Custom classes ensure consistency and flexibility in design.

#### **Link Generation and Sharing**
- Dynamically generates and copies shareable links.

---

## Documentation

### **How to Run the Application**
1. Install dependencies with `yarn`.
2. Start the application with `yarn start`.
3. Access the application at [http://localhost:3000](http://localhost:3000).

---

## Design Decisions

### **Tailwind CSS**
- **Pros**:
  - Lightweight and fast.
  - Utility-first approach allows for rapid styling without leaving the markup.
- **Cons**:
  - Can result in cluttered markup with long class strings.
  - Learning curve for developers unfamiliar with utility-first styling.
- **Future Considerations**:
  - Implement custom themes or extend the Tailwind configuration for more consistent branding.

### **Formik and Yup**
- **Pros**:
  - Formik simplifies form management, while Yup provides powerful schema validation.
  - Reduces boilerplate code for managing form state and validation logic.
- **Cons**:
  - Can add slight overhead compared to minimal custom form logic.
- **Future Considerations**:
  - Extend validation logic to handle more complex use cases, like async validation.
### **localForage for Data Persistence
- **Pros**:

localForage provides a simple and robust way to store data in the browser using IndexedDB (fallback to localStorage if needed). This ensures data is available across sessions, even after page refreshes.
Using localForage ensures that form data, such as questions and responses, persists across accidental page refreshes or browser restarts, providing a seamless user experience.
Unlike localStorage, localForage can handle larger amounts of data efficiently and can be configured to use various storage options depending on browser capabilities.
- **Cons**:

Requires an additional library and setup to handle data persistence.
May not be available in very old browsers or certain environments with limited storage support.
Implementation Insight:

localForage is used to store and retrieve the list of questions in this project. This means that even if a user refreshes the page or navigates away and returns later, the questions will still be available in the browser's local storage.
This feature prevents the accidental loss of questions due to page refreshes, ensuring that users don’t need to re-enter their questions.
Future Considerations:

Consider adding data expiration or clearing logic for localForage to ensure outdated or unnecessary data doesn't accumulate.
Extend the use of localForage to store other forms of user data or preferences for a more personalized user experience

### **Yarn Package Manager**
- **Chosen for its speed and reliability compared to npm.**
- Ensures consistent dependency management across environments.

---

## Future Enhancements

### **Backend Integration**
- Link the frontend with the backend to enable dynamic data storage and retrieval.

### **State Management**
- Consider introducing Redux or React Query for more complex state management.

### **Accessibility**
- Ensure all components are fully accessible (e.g., keyboard navigation, ARIA labels).

### **Testing**
- Add unit and integration tests using tools like Jest and React Testing Library.

---

### 3. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   yarn
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```env
   PORT=5001
   MONGO_URI=<your-mongodb-connection-string>
   ```

4. Start the backend server:

   ```bash
   yarn dev
   ```

The backend server will now run on [http://localhost:5001](http://localhost:5001).

---

## API Endpoints

### **Participant Management**
- **POST /api/participants**: Add a new participant.
- **GET /api/participants**: Retrieve all participants.

### **Question Management**
- **POST /api/questions**: Add a new question.
- **GET /api/questions**: Retrieve all questions.

### **Generate Shareable Link**
- **GET /api/link**: Generate a unique link based on data.

---

## Features

### **Express.js Framework**
- Lightweight and fast framework for building RESTful APIs.

### **MongoDB**
- Stores participant data and questions persistently.

### **Environment Variables**
- Configured using `.env` for secure and dynamic settings.

---

## Design Decisions

### **Why Express.js?**
- **Pros**:
  - Simple and minimal framework for building APIs.
  - Flexible middleware support for handling requests.
- **Cons**:
  - Requires manual setup for common tasks like validation and authentication.

### **Why MongoDB?**
- **Pros**:
  - Schema-less structure is flexible for storing participant data and questions.
  - Integrates well with Node.js applications.
- **Cons**:
  - Requires additional configuration for managing relations and indexing.

---

## Future Enhancements

### **Authentication**
- Add user authentication and authorization using JWT or OAuth.

### **Data Validation**
- Integrate a validation library like Joi to validate incoming requests.

### **Error Handling**
- Implement centralized error handling for better API response consistency.

### **Testing**
- Write unit tests using Jest or Mocha for API endpoints.

### **Deployment**
- Prepare the server for deployment using Docker or cloud platforms like AWS or Heroku.

