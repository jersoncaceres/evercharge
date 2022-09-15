# evercharge.com

## Deploying with the `eb cli`

Prerequisites
- AWS SSO credentials
- aws-vault and profile for prod-aio
- eb cli
- docker desktop or cli

The eb cli can be installed natively, or use the devtools `docker-compose` in the infra repo, in the tools folder.

    $ git checkout <branch>
    $ aws-vault exec <profile>
    $ cd src/infra/tools
    $ docker compose run devtools

    🟠 infra tools -> cd web
    🟠 infra tools -> eb list

    WebMain-38-env
    * Webmain-staging38-env

    🟠 infra tools -> eb deploy

## URLs

- prod: https://evercharge.com (Webmain-38-env)
- staging: https://web.staging.evercharge.com (Webmain-staging38-env)

## Load balancer listeners

**Listeners for port 443 are created manually** so that prod and staging can use distinct certs via ACM. This is done using the ElasticBeanstalk environment configuration in the Load Balancer section.

<img width="800" alt="image" src="https://user-images.githubusercontent.com/67282/189787043-89dce047-e9b1-4112-a843-f5ff38fe9f97.png">

The production-only .net to .com redirect is also done manually, using the Load Balancer Listener Rules page:

<img width="800" alt="image" src="https://user-images.githubusercontent.com/67282/189786347-f771ccf0-58cc-4dec-be6f-4a18ac54c87b.png">

HTTP to HTTPS redirection is still done for both envs in `.ebextensions/alb-http-to-https-redirection.config`.

NOTE: This is a temporary solution as a stop gap until we can redeploy this with Pulumi using EB in the account based envs. Both staging and prod are deployed to the prod-aio account as of 2022-09-12.

# Run locally

## Quick Start

1. Build the container: `docker build -t evercharge/web:latest .`
1. Start the container: `docker run -p 9000:9000 --name web evercharge/web`
1. Get a shell in the container: `docker exec -it web bash`
1. Download dart-sass for your target Linux architecture (use `dpkg --print-architecture` to determine) to web root.
    - arm: `wget https://github.com/sass/dart-sass/releases/download/1.54.7/dart-sass-1.54.7-linux-arm.tar.gz`
    - arm64: `wget https://github.com/sass/dart-sass/releases/download/1.54.7/dart-sass-1.54.7-linux-arm64.tar.gz`
    - x64: `wget https://github.com/sass/dart-sass/releases/download/1.54.7/dart-sass-1.54.7-linux-x64.tar.gz`
    - ia32: `wget https://github.com/sass/dart-sass/releases/download/1.54.7/dart-sass-1.54.7-linux-ia32.tar.gz`
1. Unpack binary: `tar -xf dart-sass-1.54.7-linux-YOURARCH.tar.gz`
1. Symlink sass binary into `$PATH`: `ln -s /opt/web/dart-sass/sass /usr/local/bin/sass`

The image is now ready to run the app: go to http://localhost:9000 in your browser.

TBD: hot reloading with docker compose

## Examples

### Initial Build

```
docker build -t evercharge/web:latest .

-> docker build -t webadmin-base:latest -f base.Dockerfile .                                                             [3ad0df706]
[+] Building 271.5s (6/6) FINISHED
 => [internal] load build definition from base.Dockerfile                                                                        0.0s
 => => transferring dockerfile: 757B                                                                                             0.0s
 => [internal] load .dockerignore                                                                                                0.0s
...
 => [2/2] RUN apt-get update &&     apt-get install -y git python3-dev python3-pip supervisor rabbitmq-server redis-server ch  265.1s
 => exporting to image                                                                                                           1.9s
 => => exporting layers                                                                                                          1.9s
 => => writing image sha256:255929f6da45b86c8b1b43f71e986f41af168e356ac437c688b9d9234476cfc2                                     0.0s
 => => naming to docker.io/library/webadmin-base:latest                                                                          0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

### First Container Start

Add the `-d` flag to run in the background.

```
docker run -p 9000:9000 --name web evercharge/web

-> docker run -p 9000:9000 evercharge/web                                                                                                                                                     [224b37c]
 * Serving Flask app "application" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://0.0.0.0:9000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 121-706-649
```

### Restarting a Stopped Container

The `-a` flag will run in the foreground, the default for `docker run`. Omit to run in the background.

```
docker start -a web

-> docker start -a web                                                                                                                                                                             [224b37c]
 * Serving Flask app "application" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://0.0.0.0:9000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 121-706-649
```

### Check if a container exists and what is running

```
docker ps -a

-> docker ps -a
CONTAINER ID   IMAGE                 COMMAND                  CREATED          STATUS                      PORTS                    NAMES
55a9a7fb70a9   evercharge/web        "python application.…"   32 minutes ago   Up 17 minutes               0.0.0.0:9000->9000/tcp   web
```
