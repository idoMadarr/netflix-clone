"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.u7odt.mongodb.net/${process.env.DB_NAME}`;
const PORT = process.env.PORT || 5000;
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use('/auth', authRoutes_1.default);
app.use((err, req, res, next) => {
    throw new Error(`Error ${500}: ${err.message || 'An unknown error occurred'}`);
});
mongoose_1.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
})
    .catch(err => console.log(err));
