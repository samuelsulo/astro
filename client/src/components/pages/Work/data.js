export const headers = [
    {
        avatar: "/img/react_logo.png",
        title: "Front-end",
        text: "This front-end JavaScript library was used to build the user interface.",
    },
    {
        avatar: "/img/node_logo.png",
        title: "Back-end",
        text: "This back-end JavaScript runtime environment was used to build the server-side of the project",
    },
    {
        avatar: "/img/mongoDB_logo.png",
        title: "Database",
        text: "It's a document-oriented database which stores data in JSON-like documents with dynamic schema.",
    },
];

export const details = [
    {
        title: "Front-end",
        subtitle: "React, Redux, Axios, Material-UI.",
        text: "React was used to build the entire UI. " + 
            "The global state such as the posts and the users is managed using Redux, which allows every component to access the state from anywhere. " + 
            "The HTTP requests sent to the server are managed with Axios which is a promise based HTTP client for the browser and Node js. " + 
            "Last but not least Material-UI which is a library that allows you to import and use different components to create a better UI.",
        img: ["/img/react_logo.png", "/img/redux_logo.png", "/img/axios_logo.png", "/img/materialui_logo.png"],
    },
    {
        title: "Back-end",
        subtitle: "Node, Express, mongoose, JWT.",
        text: "Node was used to create the server side of the project. " + 
            "Express provides methods to specify what function is called for a particular HTTP verb ( GET , POST , SET , ...) and URL pattern ('Route'). " + 
            "Mongoose is a library for MongoDB and Node js, mongoose makes it easier to interact with the database. " + 
            "JWTs are a good way of securely transmitting information between parties because they can be signed, which means you can be sure that the senders are who they say they are.",
        img: ["/img/node_logo.png", "/img/express_logo.png", "/img/mongoose_logo.png", "/img/jwt_logo.png"],
    },
    {
        title: "Database",
        subtitle: "MongoDB, mongoose.",
        text: "MongoDB is a document-oriented database which stores data in JSON-like documents with dynamic schema." + 
        " It means you can store your records without worrying about the data structure such as the number of fields or types of fields to store values." + 
        " MongoDB documents are similar to JSON objects." + 
        " Mongoose manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.",
        img: ["/img/mongoDB_logo.png", "/img/mongoose_logo.png"],
    },
];