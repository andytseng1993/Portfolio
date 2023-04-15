# Setup Server

1. `npm i --save-dev express nodemon prisma dotenv typescript ts-node @types/node @types/express concurrently @prisma/client`
2. Set the DATABASE_URL in the .env file, and set the provider to `mongodb`
3. `npx prisma db push`
4. `npx prisma generate`
5. `npm i --save-dev bcryptjs jsonwebtoken` use in auth

## Create routes/api

- user

  - api/auth/login -- POST --> Login
  - api/auth/user -- GET
    - Use jsonwebtoken to verify header's token, then use prisma to findUnique by id to get user info.

- projects

  - api/projects -- GET,
  - api/projects -- POST --> title,content,createdAt,tech,githubSrc,websiteSrc,image,order,pinned.
  - api/notes/:projectId -- DELETE

# Client

1.  [react-scroll]https://www.npmjs.com/package/react-scroll

# Typescript

1. If your image property contains ...
   Image used as <img> element

- `image?: HTMLImageElement`
  URL to image.
- `image?: String`
  Image as file from <input> element
- `image?: File`

2. useRef is generic if you use it with TypeScript, so you can define the referenced element type like const ref = useRef<Type>()

- `const accountRef = useRef<HTMLInputElement>()`
