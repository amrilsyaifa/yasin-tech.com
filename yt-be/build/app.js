"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("dotenv/config");
const Database_1 = __importDefault(require("./configs/Database"));
// Routers
const AuthRoutes_1 = __importDefault(require("./routers/AuthRoutes"));
const ArticlesRoutes_1 = __importDefault(require("./routers/ArticlesRoutes"));
const UserRoutes_1 = __importDefault(require("./routers/UserRoutes"));
const SeedRoutes_1 = __importDefault(require("./routers/SeedRoutes"));
const HomeRoutes_1 = __importDefault(require("./routers/HomeRoutes"));
const ProfileRoutes_1 = __importDefault(require("./routers/ProfileRoutes"));
const PostRoutes_1 = __importDefault(require("./routers/PostRoutes"));
const UploadsRoute_1 = __importDefault(require("./routers/UploadsRoute"));
const RoleRoutes_1 = __importDefault(require("./routers/RoleRoutes"));
const TagRoutes_1 = __importDefault(require("./routers/TagRoutes"));
const TestimonyRoutes_1 = __importDefault(require("./routers/TestimonyRoutes"));
const getEnvToVar_1 = __importDefault(require("./helpers/getEnvToVar"));
(0, Database_1.default)();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)({
            crossOriginResourcePolicy: (0, getEnvToVar_1.default)("NODE_ENV") !== "development",
        }));
        this.app.use((0, cors_1.default)({ credentials: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.static("./public"));
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.status(200).json({ message: "Hi there 👋" });
        });
        this.app.use("/api/articles", ArticlesRoutes_1.default);
        this.app.use("/api/auth", AuthRoutes_1.default);
        this.app.use("/api/home", HomeRoutes_1.default);
        this.app.use("/api/profile", ProfileRoutes_1.default);
        this.app.use("/api/post", PostRoutes_1.default);
        this.app.use("/api/users", UserRoutes_1.default);
        this.app.use("/api/upload", UploadsRoute_1.default);
        this.app.use("/api/role", RoleRoutes_1.default);
        this.app.use("/api/tag", TagRoutes_1.default);
        this.app.use("/api/testimony", TestimonyRoutes_1.default);
        // Seeds
        this.app.use("/api/seeds", SeedRoutes_1.default);
    }
}
const port = Number(process.env.PORT) || 8000;
const app = new App().app;
app.listen(port, () => {
    console.log("this app running in " + port);
});
