import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"
import { TagEntity } from "@app/tag/tag.entity"
import { UserEntity } from "@app/user/user.entity"
import {CreateUsers1771949121862 as CreateUsers} from "@app/migrations/1771949121862-CreateUsers"
import {AddUsernameToUsers1771958555670 as AddUsernameToUsers} from "@app/migrations/1771958555670-AddUsernameToUsers"

const config: PostgresConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "user",
    password: "password",
    database: "db",
    entities: [TagEntity, UserEntity],
    synchronize: false,
    migrations: [CreateUsers, AddUsernameToUsers]
}

export default config