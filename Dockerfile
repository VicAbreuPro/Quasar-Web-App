# docker build -t quasar_dev .
# docker run -it --rm -p 8080:8080 --mount type=bind,source="$(pwd)",destination=/app quasar_dev

FROM node:16.14-slim
WORKDIR /app
RUN yarn global add @quasar/cli
USER 1000:1000
EXPOSE 8080
CMD /bin/bash
