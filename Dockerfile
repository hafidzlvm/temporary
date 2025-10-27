FROM node:20.14.0

# Set working directory
WORKDIR /home/node/app

# Allow to install package`
RUN apt update -y

# Install node package
RUN npm install -g serve

# Copy application source codes
COPY app/dist /home/node/dist

CMD [ "serve", "-s", "/home/node/dist"]

EXPOSE 3000
