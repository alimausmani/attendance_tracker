import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

// Enable CORS
const URL = process.env.NODE_ENV === 'production' ? process.env.PRODURL : process.env.DEVURL;
app.use(
    cors({
        origin: URL,
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
);

// Trust proxy (useful when using a reverse proxy like Nginx)
app.set('trust proxy', 1);

// Session middleware setup
app.use(
    session({
        secret: process.env.SESSION_SECRET, // from .env file
        resave: false,
        saveUninitialized: true,
        cookie: { secure: process.env.NODE_ENV === 'production' }, // Cookie security
    })
);

// Route
app.get('/', (req, res) => {
    res.send("Server is running");
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to Database');
        // Start server after successful DB connection
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });
