# Max drive Backend Service

## NodeJS|Express|Redis

## Getting Started

### Clone and Install

```sh
# Clone this repo to your local machine
# Get into the directory
# Copy .env.example and create your own .env file
# Edit .env file and add your

# Install dependencies
npm install
```

#### Run Services using Docker Compose

You may want to run the supporting service ( Redis) using compose rather than having them installed Locally.

To start the supporting service using Docker Compose

```sh
docker-compose up -d
```

#### Run Application

    ```sh
    npm run dev
    ```

#### Run Tests

        ```sh
        npm run test
        ```

#### Access docs

go to localhost:4000/api-docs
