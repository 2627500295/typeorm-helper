import { ObjectType, Repository } from 'typeorm';
declare function getRepository<Entity>(entityClass: ObjectType<Entity>): Promise<Repository<Entity>>;
export { getRepository, getRepository as default };
