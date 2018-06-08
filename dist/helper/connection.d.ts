import { Connection, ConnectionOptions } from 'typeorm';
declare function getConnection(options?: ConnectionOptions): Promise<Connection>;
export { getConnection, getConnection as default };
