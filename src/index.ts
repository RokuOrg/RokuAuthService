import express from "express";
import cors from "cors";
import helmet from "helmet";
import {userRouter} from "./routers/UserRouter";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {requireJwtMiddleware} from "./routers/requireJwtMiddleware";
import {APIKeyMiddelware} from "./routers/APIKeyMiddelware";


createConnection({
    type: "mysql",
    port: 3306,
    host: process.env.ROKU_AUTH_IP,
    username: process.env.ROKU_AUTH_USERNAME,
    password: process.env.ROKU_AUTH_PASSWORD,
    database: "roku",
    entities: [User],
    synchronize: true,
    logging: false,
}).then(async connection => {

    const PORT: number = 7000;

    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use("/:apikey", APIKeyMiddelware)
    app.use("/:apikey/user/verify", requireJwtMiddleware)
    app.use("/:apikey/user", userRouter)
    app.disable('x-powered-by')

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}).catch(error => console.log(error));