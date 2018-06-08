# typeorm-helper
TypeORM Helper


## 基本操作

### Entity
```typescript
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column()
    public title: string;

    @Column()
    public content: string;
}
```

### Repository
```typescript
import { Repository } from "typeorm"

// 封装过的TypeORM
import { getConnection } from "./../db/connection"

// Entity
import { Posts } from "./../model/posts"

export async function getPostsRepository(): Promise<Repository<Posts>> {
  return getConnection().then((connection) => connection.getRepository(Posts))
}
```

### Service
```typescript
import { getPostsRepository } from "./../repository/posts"
import { Posts } from "./../model/posts";

/**
 * 增加一篇文章
 * 
 * @param {object} post 文章
 * @return {object}
 */
export async function savePost(post: Posts) {
  return await getPostsRepository().then((postsRepository) => {
    return postsRepository.save(post)
  })
}

/**
 * 删除一篇文章
 * 
 * @param {number} id 文章ID
 * @return {object}
 */
export async function removePost(id: number) {
  return await getPostsRepository().then(async (postsRepository) => {
    return postsRepository.remove(await findById(id))
  })
}

/**
 * 修改一篇文章
 * 
 * @param {object} post 文章
 * @return {objcet}
 */
export async function updatePost(post: Posts) {
  return await getPostsRepository().then((postsRepository) => {
    // Object.assign({}, await findById(id), post)
    return postsRepository.save(post);
  })
}

/**
 * 查找所有文章
 * 
 * @return {string[]}
 */
export async function findAll() {
  return await getPostsRepository().then((postsRepository) => {
    return postsRepository.find();
  })
}

/**
 * 根据文章ID查找文章
 * 
 * @param {number} id 文章ID
 * @return {object}
 */
export async function findById(id: number) {
  return await getPostsRepository().then((postsRepository) => {
    return postsRepository.findOne({ id: id })
  })
}

/**
 * 获取文章总数
 * 
 * @return {number}
 */
export async function getCount() {
  return await getPostsRepository().then(async (postsRepository) => {
    let [posts, count] = await postsRepository.findAndCount();
    return count;
  })
}
```

## 调用

### 增
```typescript
import "reflect-metadata";

import { savePost, removePost, updatePost, getCount } from "./service/posts";
import { Posts } from "./model/posts";

let post: Posts = {
  title: "Hello post",
  content: "I am virtual post!"
};

savePost(post).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error.stack ? error.stack : error)
});
```

### 删
```typescript
import "reflect-metadata";

import { savePost, removePost, updatePost, getCount } from "./service/posts";
import { Posts } from "./model/posts";

let postID = 1;

removePost(postID).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error.stack ? error.stack : error)
});
```

### 改
```typescript
import "reflect-metadata";

import { savePost, removePost, updatePost, getCount } from "./service/posts";
import { Posts } from "./model/posts";

let post: Posts = {
  id: 1,
  title: "update post",
  content: "update post"
};

updatePost(post).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error.stack ? error.stack : error)
});
```


### 查

#### 根据ID查找
```typescript
import "reflect-metadata";

import { savePost, removePost, updatePost, getCount } from "./service/posts";
import { Posts } from "./model/posts";

let postID = 1;

findById(postID).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error.stack ? error.stack : error)
});
```


#### 查找全部
```typescript
import "reflect-metadata";

import { savePost, removePost, updatePost, getCount } from "./service/posts";
import { Posts } from "./model/posts";

findAll().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error.stack ? error.stack : error)
});
```

#### 获取总数
```typescript
import "reflect-metadata";

import { savePost, removePost, updatePost, getCount } from "./service/posts";
import { Posts } from "./model/posts";

getPostsCount().then(result => {
  console.log(result);
}).catch(error => {
  console.log(error.stack ? error.stack : error)
});
```