# set base image (host OS)
FROM python:3.7.5-slim

# set the working directory in the container
WORKDIR /app

# copy the dependencies file to the working directory
COPY requirements.txt .

# install dependencies
RUN pip install -r requirements.txt

RUN apt update
RUN apt install vim -y
RUN apt install emacs -y
RUN apt install curl -y


# copy the content of the local src directory to the working directory
#COPY src/ .

# command to run on container start
CMD [ "/bin/bash" ]
