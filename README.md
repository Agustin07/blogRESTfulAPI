# BLOG RESTful API

### RESTful API that handle posts and comments for a Blog!

This RESTful API is able to handle:
- Creating a blog post.
- Updating a blog post
- Deleting a blog post
- Retrieving a single blog post based on an identifier
- Retrieve a list of blog posts ordered from most recent to older.
- Handle comments on the post.
- Handle tags on the post.



### Requirements:

|  | VERSION  |  
|----------------|---------------|
|Node|   12.16.3        |     
|TSC        |    4.0.0       | 
|Mongoose        | ^5.7.21 |
|Joi|  14.3.1 |  

- *Additional:* Mongo database must be running on localhost:27017 

## How to write a request:

- *Important:* POST AND PATCH METHODS REQUIRE JSON INPUT!

### Post:

  

| Action |Method | Route | Description |
|----------------|---------------|----------------|-----------|
|Create| POST | `/posts` |insert post |
|Update | PATCH | `/posts/:id` | update post |
|Delete | DELETE| `/posts/:id` | delete post|
|Retrieve one | GET | `/posts/:id` | retrieve one post by id |
| Retrieve all| GET | `/posts` | retrieve a list of post |

  

### Comment:

  

| Action |Method | Route | Description |
|----------------|---------------|----------------|-----------|
|Create| POST | `/posts/:id/comments` |insert comment |
|Update | PATCH | `/posts/:id/comments/:idc` | update comment |
|Delete | DELETE| `/posts/:id/comments/:idc` | delete comment |
|Retrieve one | GET | `/posts/:id/comments/:idc` | retrieve one comment by post and comment ids |
| Retrieve all| GET | `/posts/:id/comments` | retrieve a list of comments of a post |

  
  

### Tag:

  

| Action |Method | Route | Description |
|----------------|---------------|----------------|-----------|
|Create| POST | `/posts/:id/tags` |insert tag |
|Delete | DELETE| `/posts/:id/tags/:name` | delete tag |
| Retrieve all| GET | `/posts/:id/tags` | retrieve the list of tags of a post |


### Some examples:

GET REQUEST:
```
http://127.0.0.1:3000/Posts
```

POST REQUEST:
```
http://127.0.0.1:3000/posts
```
- *Remember:* POST REQUIRE JSON INPUT!

DELETE REQUEST:
```
http://127.0.0.1:3000/posts/5ed036ac011fe63b981e4760
```



### Input Parameters


## Blog Post JSON Parameters
| NAME | TYPE  |  
|----------------|---------------|
|title         |    string       | 
|content        | string|
|author |  string |  

## Comment  JSON Parameters
| NAME | TYPE  |  
|----------------|---------------|
|content        | string|
|user |  string | 

## Tag JSON  Parameters
| NAME | TYPE  |  
|----------------|---------------|
|tag        | string|

