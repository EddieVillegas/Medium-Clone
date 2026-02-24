import { DataSource } from "typeorm";
import ormconfig from "@app/config/ormconfig";
export default new DataSource(ormconfig)