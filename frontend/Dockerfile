FROM tarampampam/node:16-alpine

LABEL name="feedback-frontend"
LABEL version="1.0"

ENV NODE_ENV "development"

WORKDIR /home/node/app
RUN [ "yarn" ]

ENTRYPOINT [ "yarn", "start" ]
CMD [ "" ]