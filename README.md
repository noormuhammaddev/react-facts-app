# React Facts App - (TypeScript, useReducer and useContext)

This is a simple React application that manages records with the following features:

1. A form to add and edit records.
2. A table to display records with view, edit, and delete actions.
3. A search bar to filter records.
4. Buttons to sort records by upvotes and date.

The application uses `useReducer` and `useContext` hooks for state management and TypeScript for type safety.

## Features

- **Form Component**
  - Inputs for title (string), upvotes (numeric), and date (calendar widget).
  - Submit button is disabled until all fields are correctly filled.
  - Edit functionality to modify existing records.

- **Table Component**
  - Displays records with actions to view, edit, and delete.
  - View action shows a pop-up with record details.
  - Edit action populates the form with the record data for editing.
  - Delete action shows a confirmation dialog before deletion.

- **Search Bar Component**
  - Filters records based on user input.
  - Starts filtering after 3 characters with a 1-second delay.

- **Sorting Buttons**
  - Sort records by most upvoted and most recent.

- **State Management**
  - Uses `useReducer` and `useContext` for centralized state management.
  - Stores records in IndexedDB.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

To get started, simply clone this repository and run `npm` to install dependencies. You may need to go over some basic configuration steps.

```
# Clone the repository
git clone https://github.com/noormuhammaddev/react-facts-app.git
cd react-facts-app

# Install dependencies
npm install

# start application
`npm start`
