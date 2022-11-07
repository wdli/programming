#
# Commands to bulid and test Go images and use Vscode
#
# (Copied after my python container)
#
# Dockerfile uses official golang:1.18 image
#

# Clean all dangling images and containers
#
docker system prune -a 

# Build
docker build -t david-go-1.18


# Run and test
docker run -v $(pwd):/app --rm  -it david-go-1.18

#docker run -v /home/wdli/workspace/github/programming/python:/app --rm -it  david-python python -m pdb /app/template-test.py
#docker run -v $(pwd):/app --rm -it  david-python python  /app/template-test.py "http://api.open-notify.org/astros.json"


# In vscode, F1 ==> remote-containers: attach to a running container ==> open /app once inside the container

# DTR
docker login 
docker tag david-go-1.18 wdlidocker/david-go:1.18 
docker push wdlidocker/david-go:1.18

# Github test2
