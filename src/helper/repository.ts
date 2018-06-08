import { Connection, ObjectType, Repository } from 'typeorm';
import { getConnection } from './connection';

/**
 * 获取存储库
 *
 * @param entityClass 实体
 * @returns 存储库
 */
async function getRepository<Entity>(entityClass: ObjectType<Entity>): Promise<Repository<Entity>> {
  const connection: Connection = await getConnection();

  return connection.getRepository(entityClass);
}

export { getRepository, getRepository as default };
