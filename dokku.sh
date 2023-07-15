#!/usr/bin/env bash
set -e

APP="discord-music-bot-js"
IMAGE=dokku/"$APP":latest
SSH_INSTANCE=contabo

docker buildx build --platform linux/amd64 -t "$IMAGE" .
docker save "$IMAGE" | gzip | pv | ssh -o StrictHostKeyChecking=no "$SSH_INSTANCE" "dokku git:load-image $APP $IMAGE || dokku ps:rebuild $APP"
ssh -o StrictHostKeyChecking=no "$SSH_INSTANCE" "dokku cleanup"
