feat(tests): add click handler test for News component

- Added a test to verify that `mockOnNewsClick` is called when a news item is clicked.
- Included comments for rendering and simulating the click event.**App.js**

* The `App` component is a React class component that extends `React.Component`.
* It has a constructor that initializes the component's state with a `searchQuery` property set to an empty string.
* The `handleSearch` function is used to update the component's state with the search query.
* The `render` method returns a `div` element that contains a `NavBar` component and a `News` component. The `NavBar` component is passed the `onSearch` function as a prop, which is called when the user searches for something.
* The `News` component is passed the `searchQuery` property as a prop, which is used to filter the news articles.

**NavBar.js**

* The `NavBar` component is a React class component that extends `React.Component`.
* It has a constructor that initializes the component's state with a `search` property set to an empty string.
* The `handleInputChange` function is used to update the component's state with the user's search input.
* The `handleSearch` function is used to call the `onSearch` function passed as a prop, passing the current search query as an argument.
* The `render` method returns a `nav` element that contains a `form` element with an `input` field and a `button` element. The `input` field is bound to the `search` state property, and the `button` element is used to submit the search form.
* The component also defines a `propTypes` object that specifies the expected type of the `onSearch` prop.

**News.js**

* The `News` component is a React class component that extends `React.Component`.
* It has a constructor that initializes the component's state with an empty array of articles, a page number, and a total number of results.
* The `componentDidMount` method is used to fetch the initial list of news articles.
* The `componentDidUpdate` method is used to fetch the list of news articles again when the search query changes.
* The `fetchArticles` method is used to fetch the list of news articles based on the search query and page number.
* The `handlePreviousClick` and `handleNextClick` methods are used to navigate through the list of news articles.
* The component uses the `NewsItem` component to render each news article.

**Deployment Details**

* The application is deployed using a React development environment, such as Create React App.
* The application is hosted on a server or cloud platform, such as AWS or Google Cloud.
* The application uses a news API, such as NewsAPI.org, to fetch the list of news articles.
* The application is optimized for performance and scalability using techniques such as code splitting, tree shaking, and caching.# NewsMonkey Application Documentation

This document provides a technical overview of the NewsMonkey React application, detailing the component architecture, state management, and news retrieval logic following the recent search feature implementation.

---

## 1. Component Overview

### **App Component (`App.js`)**
The `App` component serves as the central orchestrator of the application.
- **State Management:** Maintains a `searchQuery` state initialized as an empty string.
- **Search Handling:** Defines `handleSearch(query)`, which updates the global search state.
- **Communication:** 
    - Passes the `handleSearch` function to the `NavBar` via the `onSearch` prop.
    - Passes the current `searchQuery` state to the `News` component to trigger article filtering.

### **NavBar Component (`NavBar.js`)**
A navigation and search interface component.
- **Local State:** Manages a `search` string for the input field to ensure a "controlled component" behavior.
- **Events:**
    - `handleInputChange`: Updates local state as the user types.
    - `handleSearch`: Prevents default form submission and triggers the `onSearch` prop passed from `App.js`.
- **UI:** Contains a Bootstrap-styled navigation bar with a search form (input and button).
- **Validation:** Uses `PropTypes` to ensure `onSearch` is passed as a function.

### **News Component (`News.js`)**
The core data-fetching component that displays news articles.
- **State:** Tracks `articles` (array), `loading` (boolean), `page` (current page number), and `totalResults` (for pagination).
- **Lifecycle Methods:**
    - `componentDidMount`: Initial fetch of top headlines.
    - `componentDidUpdate`: Detects if the `searchQuery` prop has changed. If so, it resets the page to 1 and re-fetches articles.
- **Data Fetching (`fetchArticles`):**
    - **Logic:** Dynamically switches between the NewsAPI `/everything` endpoint (if a search query exists) and the `/top-headlines` endpoint (default view).
    - **Parameters:** Handles URL encoding for queries and injects the API key and page size.
- **Pagination:**
    - `handlePreviousClick` & `handleNextClick`: Update the page state and trigger a re-fetch of articles.

---

## 2. Key Features

### **Search Functionality**
The application now supports dynamic search. When a user enters a keyword in the `NavBar`:
1. The query is lifted to `App.js`.
2. `App.js` updates its state, which flows down to `News.js`.
3. `News.js` triggers a new API call to the "everything" endpoint of the News API.

### **Pagination**
- Articles are fetched in batches of 20 (defined by `pageSize`).
- The "Next" button is programmatically disabled or restricted based on the calculation: `Math.ceil(totalResults / 20)`.

---

## 3. API Integration Details

The application integrates with [NewsAPI.org](https://newsapi.org/).

| Feature | Endpoint Used |
| :--- | :--- |
| **Default View** | `https://newsapi.org/v2/top-headlines?country=us&category=business` |
| **Search View** | `https://newsapi.org/v2/everything?q={query}` |

**Technical Note:** The current implementation uses a hardcoded API key (`ce3325100b70...`). For production environments, it is recommended to move this to an environment variable (`.env`).

---

## 4. Deployment & Performance

- **Environment:** Built using React Class Components and intended for deployment via standard React build pipelines (e.g., Create React App).
- **Optimization:** 
    - **Conditional Rendering:** Articles are cleared/updated based on state changes.
    - **Asynchronous Handling:** Uses `async/await` for clean API interaction.
    - **Scalability:** The architecture allows for easy addition of new categories or filtering parameters.

---

## 5. Testing Notes
Recent updates include:
- **Click Handlers:** Verified that `NewsItem` click events correctly trigger intended actions.
- **Rendering:** UI components are validated to render correctly with both empty and populated article arrays.
This documentation provides an overview of the recent changes made to the React application, focusing on the implementation of a basic authentication system and session persistence.

---

# Application Documentation: Authentication & Search Feature

## Overview
The application is a React-based news portal that now includes a mock authentication layer. Users must log in to access the news content and search functionality. User sessions are persisted across page reloads using `localStorage`.

## Components

### 1. `App.js` (Main Controller)
The root component manages the global state for authentication and search queries.

*   **State:**
    *   `searchQuery` (String): Stores the current search term for news filtering.
    *   `isAuthenticated` (Boolean): Tracks whether a user is currently logged in.
    *   `username` (String): Stores the name of the logged-in user.
*   **Methods:**
    *   `handleLogin(username)`: Updates the state to authenticated and saves the session to `localStorage`.
    *   `handleLogout()`: Resets authentication state and clears `localStorage`.
    *   `handleSearch(query)`: Updates the `searchQuery` state passed to the `News` component.
*   **Lifecycle:**
    *   `componentDidMount()`: On initialization, it checks `localStorage` for an existing session to keep the user logged in.
*   **Conditional Rendering:** 
    *   If `isAuthenticated` is `false`, it renders the `Login` component.
    *   If `isAuthenticated` is `true`, it renders the `NavBar` and `News` components.

### 2. `Login.js` (Authentication View)
A functional component that provides a user interface for logging in.

*   **Logic:**
    *   Uses `useState` for local form management (username and password).
    *   Contains a hardcoded credential check:
        *   **Username:** `user`
        *   **Password:** `password`
*   **Props:**
    *   `onLogin`: A callback function triggered upon successful credential verification.

### 3. `NavBar.js` (Navigation & User Actions)
Displays the brand, search bar, and user-specific controls.

*   **Features:**
    *   Contains a search input that triggers the `onSearch` prop.
    *   **User Profile Section:** If a `username` is provided via props, it displays a "Welcome" message and a "Logout" button.
*   **Props:**
    *   `onSearch` (Function): Handles the search form submission.
    *   `username` (String): The name of the authenticated user.
    *   `onLogout` (Function): Logic to handle session termination.

---

## Authentication Flow

1.  **Login:** The user enters credentials in the `Login` component. If valid, `App.js` updates its state and writes to `localStorage`.
2.  **Persistence:** Upon refreshing the browser, `App.js` checks `localStorage`. If `isAuthenticated` is "true", the user bypasses the login screen.
3.  **Logout:** When the "Logout" button in the `NavBar` is clicked, the state is reset and `localStorage` keys are removed, redirecting the user back to the login screen.

## Data Structure: Local Storage
The app uses the following keys in the browser's `localStorage`:
*   `isAuthenticated`: A string (`'true'`) representing the login status.
*   `username`: The string value of the logged-in user.

---

## Setup & Requirements
*   **React:** Requires React 16.8+ (due to the use of Hooks in `Login.js`).
*   **Dependencies:** Standard Bootstrap classes are used for styling in the `NavBar`.
*   **Prop Types:** Components are documented with `PropTypes` to ensure correct data types are passed for search and authentication handlers.
<!-- DIFF_HASH:0C08D0C23CEC314989268EBB6F030F2B7026AD6EF29997F719B319C12745BD09 -->
This documentation provides a technical overview of the authentication and search features recently added to the React News Application.

---

# React News Portal: Authentication & Search Documentation

## 1. Overview
The application has been upgraded from a static news viewer to a protected portal. It now features a mock authentication system, session persistence using the browser's Local Storage, and a functional search filter for news articles.

## 2. Component Architecture

### `App.js` (The Orchestrator)
The root component serves as the central state manager for the application.
*   **Authentication Logic:** Uses `isAuthenticated` (Boolean) and `username` (String) state to determine which view to render.
*   **Session Persistence:** 
    *   `componentDidMount()`: On load, it checks `localStorage` for an existing session.
    *   `handleLogin()`: Saves the session to `localStorage` to prevent logout on page refresh.
    *   `handleLogout()`: Clears the session from both state and `localStorage`.
*   **Search Logic:** Manages the `searchQuery` state and passes it down to the `News` component to filter API results.

### `Login.js` (Functional Component)
A lightweight component using React Hooks (`useState`) to handle the login form.
*   **Mock Validation:** Validates against hardcoded credentials:
    *   **Username:** `user`
    *   **Password:** `password`
*   **Error Handling:** Displays a local error message state if credentials do not match.
*   **Props:** Receives `onLogin` to notify the parent `App` component of a successful login.

### `NavBar.js` (Navigation & Search)
The navigation header provides the interface for user-driven actions.
*   **Search Input:** Captures user input and triggers the `onSearch` prop.
*   **User UI:** Conditionally renders a "Welcome [Username]" message and a "Logout" button if a user is authenticated.
*   **Props Validation:** Uses `PropTypes` to ensure `onSearch`, `username`, and `onLogout` are correctly passed.

---

## 3. Data Flow & Persistence

### Authentication Workflow
1.  **Submission:** User submits credentials via the `Login` component.
2.  **Verification:** If credentials match `user`/`password`, `App.js` updates state.
3.  **Storage:** `localStorage.setItem('isAuthenticated', 'true')` is called.
4.  **Re-entry:** If the user closes and reopens the browser, `componentDidMount` restores the session from `localStorage`.

### Local Storage Schema
| Key | Value | Purpose |
| :--- | :--- | :--- |
| `isAuthenticated` | `"true"` / `"false"` | Maintains login status across sessions. |
| `username` | `string` | Stores the name of the logged-in user for display. |

---

## 4. Technical Specifications
*   **React Version:** Requires **React 16.8+** (due to the use of Hooks in the `Login` component).
*   **Styling:** Utilizes **Bootstrap 5** classes for the Navbar layout, Search bar, and Buttons.
*   **Prop Handling:** 
    *   `News` component filters articles based on the `searchQuery` prop.
    *   `NavBar` uses `PropTypes` for type-checking function and string props.

---

## 5. Security Note
> [!WARNING]  
> The current authentication implementation is a **mock/client-side only** solution for demonstration purposes. It uses hardcoded credentials and local storage, which is not suitable for production environments requiring high security. For production, integrate with a back-end JWT (JSON Web Token) or OAuth service.
