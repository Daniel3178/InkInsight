# InkInsight

# SETUP:
### 1. install node.js
### 2. npm install
### 3. npm start
### 4. create a config folder and add apiConfig.js and firebaseConfig.js

# InkInsight: Book Lover's App

## Short Description
InkInsight is designed to facilitate the reading journey for book enthusiasts by providing a user-friendly interface. The app enables users to explore a diverse library, discover comprehensive book metadata, and customize reading lists while expressing their opinions through a user-friendly rating system.

## Key Features
### User Authentication
- Create personalized accounts
- Effortless login and logout functionalities

### Book Discovery
- Explore a vast library by searching for books of interest
- Access comprehensive book metadata through API integration:
  - Title
  - Picture
  - Summary
  - Author
  - Community Ratings and reviews
  - Genre
  - isbn
  - page-count

### Customizable Lists
- Tailor reading experiences with customizable category lists
- Create lists such as Favorites, Wish List, Genres, etc., to organize reading journeys effectively
- make lists, rename lists, add book to lists, delete lists, and delete books from lists.

### Rating System
- Express thoughts on books using a 1-5 star rating system, and add review.

### Intuitive User Interface
- Navigate effortlessly between features for a seamless user experience


## Project File Structure
- **cloud_database folder**: Contains firebase.jsx handling user-specific persistence and authentication.
- **presenter folder**: Includes different presenters for various pages.
- **view folder**: Holds the views for each presenter and styling sheets.
- **store folder**: Houses models and mini-models (slices) using Redux.
- **app.jsx**: Manages routing.
- **index.js**: Creates the root of the application.

## Pages
- Homepage / Search Page
- Book Details Page
- Login/Logout/Sign Up Page
- Lists Pages:
  - List overview (remove lists)
  - Create a new list
  - Add books to a list (sidebar dropdown menu)
  - View books on a specific list

