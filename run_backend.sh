#!/bin/bash

IMAGE_NAME=book-buddy-backend
CONTAINER_NAME=book-buddy-api

# Check for existing container
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "An existing container named '$CONTAINER_NAME' was found."

  read -p "Do you want to stop and remove it? (y/n): " confirm
  if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
    echo "Stopping and removing old container..."
    docker stop $CONTAINER_NAME > /dev/null
    docker rm $CONTAINER_NAME > /dev/null
  else
    echo "Aborting."
    exit 0
  fi
fi

echo "Building image: $IMAGE_NAME"
docker build -t $IMAGE_NAME ./backend

echo "Running container: $CONTAINER_NAME"
docker run -d -p 8000:8000 --name $CONTAINER_NAME $IMAGE_NAME
