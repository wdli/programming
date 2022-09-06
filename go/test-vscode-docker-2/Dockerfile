# set base image (host OS)
FROM golang:1.18

# set the working directory in the container
WORKDIR /app

RUN apt update
RUN apt install vim -y
RUN apt install curl -y


# copy the content of the local src directory to the working directory
#COPY src/ .

# command to run on container start
CMD [ "/bin/bash" ]
