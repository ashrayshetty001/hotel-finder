

🗺️ Vacation Planner: Hotel/Stay Finder
A Full-Stack Web Application for Discovering and Reviewing Unique Stays
This project is a feature-rich web application built with the MERN stack (MongoDB, Express.js, and Node.js) that allows users to browse a curated collection of vacation rentals, view their details on a map, and share their own experiences through authenticated reviews.

✨ Features
RESTful CRUD Operations: Complete functionality (Create, Read, Update, Delete) for managing vacation listings.

User Authentication: Secure user registration, login, and logout using Passport.js for session management.

Authorization Middleware: Ensures that only the listing owner can edit or delete a listing, and only logged-in users can leave reviews.

Review System: Users can add and delete reviews with star ratings (validated using Joi/Schema validation).

Cloud Image Storage: Utilizes Cloudinary for storing listing images, as referenced by cloudConfig.js.

Geo-Coding Integration: Integration with a mapping service (likely Mapbox, given the file names) to display listing locations on a map via public/js/map.js.

EJS Templating: Uses EJS with ejs-mate for clean, modular front-end templating (layouts, partials, and views).

Error Handling: Custom asynchronous error handling and middleware for improved user experience.
