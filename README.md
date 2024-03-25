# Copper

A mono repo for the Copper communication platform. Copper is a platform that allows users to create and join chat rooms to communicate with others. It is a combination of Discord and Instagram with some features from other platforms included.  

The core idea of Copper is to give commmunities a hub to communicate and share content.

## To start Copper locally

1. Clone the repo
2. Ensure node and npm are installed
    - if not, install node and npm by following the instructions [here](https://nodejs.org/en/download/)
3. Create two console/terminal instances in the root directory of the repo
    - one for the frontend (`cd frontend`)
    - one for the backend (`cd backend`)
4. Run `npm i` in both instances for the frontend and backend
5. Run `npm run dev` in both instances for the frontend and backend  

The frontend should now be running on `localhost:3000` 

### Debugging

- 

## Using Copper

Once navigated to `localhost:3000`, you will be greeted with the landing page. From here, you can either sign in or sign up. If you are a new user, you will need to sign up. If you are a returning user, you can sign in.

### Logging in

#### New User

When signing up for the first time you will be prompted to enter a username, email, and password. Once you have entered this information, you will be redirected to the home page.

#### Returning User

When signing in as a returning user, you will be prompted to enter your email and password. Once you have entered this information, you will be redirected to the home page.

### Home Page

The home page is the main hub for Copper. Here you can see all the communities you are a part of on the left, as well as your user settings and `Create Community` button. On the right, you can see recent posts and updates from the communities you are a part of.

### Community Page

When you click on a community, you will be taken to the community page. By default, you will first see the posts and updates from the specific community on the right. On the left, you will see all the chat rooms within the community. You can click on a chat room to view the messages within that chat room. The number of unread messages will be displayed next to the chat room name. The chat room features a real-time messaging system, so you can see messages as they are sent, as well as when other users are typing.

## Technologies Used

- Frontend
  - RemixJS
    - Used as a frontend project generator and a convenient way to accomplish multi-page routing  
  - React
    - A frontend DOM-based component rendering system for convenient, dynamic UI
  - ChakraUI
    - Lightweight UI library to take off some overhead for creating professional UI designs
  - Axios
    - A node package for making HTTP calls simple to implement. It is more versatile than the built-in Fetch API.
- Backend
  - Express.js
    - Backend framework for building high-performance RESTful APIs 
  - Prisma
    - A powerful ORM for ensuring a solid request and response schema for the database makes queries much easier to develop while also ensuring language continuity by writing queries in TypeScript rather than SQL.
  - SQLite
    - A lightweight SQL-based relational database that is stored within a single file
  - Bcrypt
    - Encryption library for password hashing. Uses SHA-256 for encryption
  - JSONWebToken
    - Library for generating session tokens to help store user sessions in the client
  - Routing-Controllers
    - A library adding convenient decorators that help with making object-oriented REST APIs with Express
  - SocketIO
    - WebSocket library for JavaScript. They are used in this project to make real-time messaging possible.
  - Socket-Controllers
    - Similar to Routing-Controller in providing convenient decorators for making object-oriented SocketIO services
