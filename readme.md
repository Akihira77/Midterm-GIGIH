# Folder Structure

```md
📂node_modules
📦src
┣ 📂controllers
┃ ┣ 📜product.controller.ts
┃ ┣ 📜user.controller.ts
┃ ┗ 📜video.controller.ts
┣ 📂middleware
┃ ┗ 📜validatorObjectId.middleware.ts
┣ 📂models
┃ ┣ 📜product.model.ts
┃ ┣ 📜user.model.ts
┃ ┣ 📜userComment.model.ts
┃ ┣ 📜video.model.ts
┃ ┗ 📜videoThumbnail.model.ts
┣ 📂routers
┃ ┣ 📜product.routes.ts
┃ ┣ 📜user.routes.ts
┃ ┗ 📜video.routes.ts
┣ 📂services
┃ ┣ 📂mapping
┃ ┃ ┣ 📜comment.mapping.ts
┃ ┃ ┣ 📜product.mapping.ts
┃ ┃ ┣ 📜user.mapping.ts
┃ ┃ ┗ 📜video.mapping.ts
┃ ┗ 📂repositories
┃ ┃ ┣ 📜base.service.ts
┃ ┃ ┣ 📜product.service.ts
┃ ┃ ┣ 📜user.service.ts
┃ ┃ ┣ 📜userComment.service.ts
┃ ┃ ┣ 📜video.service.ts
┃ ┃ ┗ 📜videoThumbnail.service.ts
┣ 📜index.ts
┗ 📜seed.ts
📜.env
📜.gitignore
📜Midterm - GIGIH.postman_collection.json
📜package-lock.json
📜package.json
📜readme.md
📜tsconfig.json
```

# The Flow

`Request -> Routes -> Controller -> Service -> Model/Data Access`

# How To Run

Import `Midterm - GIGIH.postman_collection.json` to your postman, insomnia, etc...  
After that do the seeding data first and use `{{api_url}}` + /endpoint for every request in postman

you also need to open the MongooDB Compass or MongoDB extension in VSCode to use the `_id` for some object to work with the endpoint like `{ :id, :videoId }`

in `.env` file there is a server port and mongo uri

int the command prompt run

```cli
npm run start
```

# Seeding Data

**POST /seed-data**

---

Seeding data for User, Product, Video, User Comment, Video Thumbnail.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 201  
    **Content:** `{ message: "Seeding data is success" }`

# Users

- User Object

```TS
{
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  CreatesdAt: Date;
  updatedAt: Date;
}
```

- User DTO (Data Transfer Object)

```TS
{
  username: string;
}
```

- User Comment Object

```TS
  username: string;
  productId: mongoose.Schema.Types.ObjectId;
  comment: string;
  CreatesdAt: Date;
  updatedAt: Date;
```

- User Comment DTO

```TS
{
    username: string;
    CreatesdAt: Date;
    updatedAt: Date;
    comment: string;
}
```

**GET /users**

---

Returns all users in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    users: [
          { <user_dto> },
          { <user_dto> },
          { <user_dto> }
    ]
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

**GET /users/:id**

---

Returns the specified user.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:** `{ user: <user_dto> }`
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "User does not exist" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

**POST /users**

---

Createss a new User and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```TS
{
  username: string,
  password: string
}
```

- **Success Response:**

  - **Code:** 201  
    **Content:** `{ user: <user_object> }`

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "User is already exists" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

**DELETE /users/:id**

---

Delete the specified user.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:** `{ <user_object> }`
- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "User does not exist" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

**PUT /users/:id**

---

Update the specified user.

- **URL Params**  
  _Required:_ `id=[string]`
- **Data Params**

```TS
{
  password: string;
}
```

- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  user: {
    username: string,
    password: string
  }
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "User does not exist" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

**GET /users/comments/get-all**

---

Returns all users comment in the system.

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    userComments: [
      { <user_comment_dto> },
      { <user_comment_dto> },
      { <user_comment_dto> }
    ]
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

**GET /users/comments/get-comment-from-video/:videoId**

---

returns users comment from the specified video.

- **URL Params**  
  _Required:_ `videoId=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    userComments: [
      { <user_comment_dto> },
      { <user_comment_dto> },
      { <user_comment_dto> }
    ]
  }
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "Video does not exist" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

**POST /users/comments/submit-comment/:videoId**

---

Creates new user comment from a video and returns the new object.

- **URL Params**  
  _Required:_ `videoId=[string]`
- **Headers**  
  Content-Type: application/json
- **Data Params**

```TS
{
  username: string,
  comment: string
}
```

- **Success Response:**

  - **Code:** 201  
    **Content:** `{ userComments: <user_comment_> }`

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "User is already exists" }`  
    OR
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

# Product

- Product Object

```TS
{
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  price: number;
  url: string;
  CreatesdAt: Date;
  updatedAt: Date;
}
```

- Product DTO

```TS
{
    title: string;
    price: number;
    url: string;
}
```

- Video Product DTO

```TS
{
    _id: product._id;
    title: string;
    price: number;
    url: string;
}
```

## **GET /products**

Returns all products in the system

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**  
  None
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    products: [
      { <product_dto> }
      { <product_dto> }
      { <product_dto> }
    ]
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

## **GET /products/get-product-list-by-videoId/:videoId**

Returns all products for the specified video

- **URL Params**  
  _Required:_ `videoId=[string]`
- **Headers**  
  Content-Type: application/json
- **Data Params**  
  None
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    products : [
      { <video_product_dto> }
      { <video_product_dto> }
      { <video_product_dto> }
    ]
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`  
    OR
  - **Code:** 404  
    **Content:** `{message: "Video does not exists" }`

## **POST /products**

Creates a new product and returns then new object

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```TS
{
    url: string;
    title: string;
    price: number;
}
```

- **Success Response:**

  - **Code:** 201
    **Content:**

```TS
{
  data: {
    product: {
      url: string;
      title: string;
      price: number;
    }
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error: error }`

# Video

- Video Object

```TS
{
  productId: mongoose.Schema.Types.ObjectId;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
```

- Video DTO

```TS
{
    url: string;
    productId: Schema.Types.ObjectId;
}
```

- Video Thumbnail Object

```TS
{
  videoId: Schema.Types.ObjectId;
  urlImage: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

- Video Thumbnail DTO

```TS
{
    videoId: Schema.Types.ObjectId;
    urlImage: string[];
}
```

## **GET /videos**

Returns all videos in the system

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    videos: [
      { <video_dto> },
      { <video_dto> },
      { <video_dto> }
    ]
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error : error }`

## **GET /videos/thumbnails**

Returns all thumbnail images from videos in the system

- **URL Params**  
  None
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    thumbnails: [
      { <video_thumbnail_dto> },
      { <video_thumbnail_dto> },
      { <video_thumbnail_dto> }
    ]
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error : error }`

## **GET /videos/thumbnails/:videoId**

Returns all thumbnail images from the specified video in the system

- **URL Params**  
  _Required:_ `videoId=[string]`
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```TS
{
  data: {
    thumbnails: {
          <video_thumbnail_dto>
        }
  }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message: "Something has happened", error : error }`  
    OR
  - **Code:** 404  
    **Content:** `{ message: "Video does not exists" }`

## **POST /videos**

Creates a new Video and returns the new object.

- **URL Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Data Params**

```TS
{
    productId: string;
    url: string;
}
```

- **Success Response:**
- **Code:** 200  
  **Content:**

```TS
{
  data: {
    video: [
      { <video_dto> },
    ]
  }
}
```

## **POST /videos/thumbnails/:videoId**

Creates a new thumbnail image for the specified Video
if the Video Thumbnail object for the specified Video already exists then add the thumbnail images in _urlImage_ array

- **URL Params**  
  _Required:_ `videoId=[string]`
- **Headers**  
  Content-Type: application/json
- **Data Params**

```TS
{
    urlImage: string;
}
```

- **Success Response:**

  - **Code:** 201  
     **Content:** `{
  data: {
    thumbnail: [
      { <video_thumbnail_dto> }
    ]
  }
}`

  OR

  - **Code:** 200  
     **Content:** `{
  data: {
    thumbnails: [
      { <video_thumbnail_dto> }
    ]
  }
}`
