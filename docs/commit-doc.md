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
