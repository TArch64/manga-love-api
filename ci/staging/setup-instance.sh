#!/usr/bin/env bash

install_codedeploy() {
    echo "install codedeploy" && \
    sudo yum install -y ruby wget && \
    wget https://aws-codedeploy-us-east-2.s3.us-east-2.amazonaws.com/latest/install && \
    chmod +x ./install && \
    sudo ./install auto && \
    echo "start codedeploy" && \
    sudo service codedeploy-agent start && \
    sudo service codedeploy-agent status
}

install_docker() {
    DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}

    echo "install docker" && \
    sudo yum install -y docker && \
    echo "start docker" && \
    sudo usermod -a -G docker ec2-user && \
    newgrp docker && \
    sudo systemctl start docker.service && \
    sudo systemctl enable docker.service && \
    docker -v && \
    echo "install docker compose" && \
    mkdir -p $DOCKER_CONFIG/cli-plugins && \
    curl -SL https://github.com/docker/compose/releases/download/v2.7.0/docker-compose-linux-aarch64 -o $DOCKER_CONFIG/cli-plugins/docker-compose && \
    chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose && \
    docker compose version
}

echo "yum update" && \
sudo yum update -y && \
install_codedeploy && \
install_docker
