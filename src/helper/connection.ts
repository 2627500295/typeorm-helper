import { Connection, ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';

let connection: Connection | null = null;

/**
 * 创建连接
 *
 * @param options 数据库配置
 * @returns 连接
 */
async function getConnection(options?: ConnectionOptions): Promise<Connection> {
  const connectionOptions: ConnectionOptions = options || await getConnectionOptions();
  
  if (connection) {
    return Promise.resolve(connection);
  }

  connection = await createConnection(connectionOptions);

  return connection;
}

export { getConnection, getConnection as default };
