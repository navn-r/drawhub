# DrawHub

## Table of Contents

- [DrawHub](#drawhub)
  - [Table of Contents](#table-of-contents)
  - [Team Members](#team-members)
  - [Development](#development)
  - [Deployment](#deployment)
  - [Contributions](#contributions)

## Team Members

- Samyak Mehta ([@Samyakk123](https://github.com/Samyakk123))
- Aryan Patel ([@AryPat](https://github.com/AryPat))
- Navinn Ravindaran ([@navn-r](https://github.com/navn-r))

**Deployed App**: https://drawhub.tech/

**Video Link**: https://play.library.utoronto.ca/watch/b8cc82064198491b2957bc9c6a85a892

**Proposal Doc**: [/proposal](./proposal.md)

## Development

**Frontend**

- React + TypeScript
  - Makes designing and componentizing code a lot easier
  - Utilizes a virtual DOM
  - TypeScript provides strongly typed interfaces + compile-time safety
- ChakraUI
  - Link: [ChakraUI](https://chakra-ui.com)
  - Component library for React
  - Simplifies designing clean robust UI with minimal code
- React query
  - Allows us to call our API using custom hooks, for both GraphQL and REST endpoints
  - Leveraged caching capabilities
  - Handles invalidating data after new mutations
  - Avoids interacting with `fetch + useEffect` for data querying

**Backend**

- Nest.js
  - a progressive Node.js framework for building efficient, reliable server side applications
  - Create standalone libraries using modules and services that are able to be exported easily throughout the application
  - Graphql server using `Apollo`, code-first approach, single source of truth (GraphQL type + TypeScript interface + Mongoose Schema)
  - Configure `JWTs` and `passport.js` to authorize endpoints provided in the backend
- Nx Monorepo
  - allows for an organized file structure by decoupling client and server libraries
  - Single shared `node_modules` for all apps in the monorepo
  - Nx Console VSCode Extension
    - Easily generate new libraries, components, hooks, services etc.
    - Strictly follows existing project structure/rules
    - Almost never need to manually create components/library files
- Redis
  - Create job queues to send emails using `SendGrid`
  - SendGrid provides an email server (don't have to maintain your own)
- MongoDB
  - Utilized mongoose to create canvas schema
  - Store canvas data
- Amazon S3
  - Object storing service offered by Amazon Web Services
  - Store and retrieve data (in our case images of type png)
  - Avoid the need of creating services to store images in our own database since Amazon S3 is reliable, secure, and easily scalable.

## Deployment

**Kubernetes Manifests**: [/k8s](./k8s/)

- Each file contains all related manifests for the given component
  - i.e. `/k8s/server.yml` contains the Deployment, Service and ConfigMap for the backend

**Cloud Provider**: DigitalOcean Kubernetes

Our provider of choice was Google Kubernetes Engine (GKE), however due to time constraints, DigitalOcean was chosen as the 'faster-to-learn' option.

First Iteration: Docker Compose

- Dockerize Client, Server + Databases and compose them
- Implemented during initial development, went fairly smooth
- Used a base image for the monorepo, then separate app images built on top of the base image
- Reverse proxy and Websocket Upgrades were done in the Nginx container for client (`nginx.conf`)

Second Iteration: Local K8s with MiniKube

- Used the same docker images from ghcr.io
- Minikube provides an Nginx Ingress Controller
- **Problem**: Stuck on trying to expose the Ingress outside the cluster
  - Fixed using `minikube tunnel`
- Reverse Proxying and Websocket Upgrades were done on the Ingress resource itself (`k8s/ingress.yml`)
- Host was `localhost`, didn't need to modify `/etc/hosts` to connect

Third Iteration: DigitalOcean K8s with cert-manager

- DOKS provides a marketplace to add Nginx Ingress and Cert Manager, these are installed using helm charts
- Ingress _without_ cert-manager worked smoothly
- **Problem 1**: Auth0 Requires a secure origin to run on an SPA ([source](https://github.com/auth0/auth0-spa-js/blob/master/FAQ.md#why-do-i-get-auth0-spa-js-must-run-on-a-secure-origin))

  - Solution: Need HTTPS (either manually add cert or cert-managers)

- **Problem 2**: Following [the official DO docs to setup cert-manager](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes), wouldn't allow my domain to connect to the load balancer, _and_ the certificate would hang at `PENDING`.
  - The Issuer, Order, Certificate Request, and Challenge were created
  - Challenge would be sent out to Let's Encrypt, but would be stuck at this point
  - Followed the workaround mentioned in Step 5, still didn't work
  - Gave up on Automated TLS Provisioning 😔

Final Iteration: DigitalOcean K8s + Manual TLS Cert with DO + Let's Encrypt

- Scraped cert-manager, too much of a headache, and not enough time to try again
- Two ways to add a certificate to the DigitalOcean Load Balancer: Use your own _or_ Create a new one
  - Creating a new one via DO required a domain that is managed by DigitalOcean, my initial subdomain couldn't be used
  - Found a free domain and added DigitalOcean name servers to it
  - Fairly straightforward to issue the cert from Let's Encrypt, had to wait overnight
- **Problem 1**: Updating the Load Balancer to allow HTTPS and redirect HTTP traffic
  - First attempt: `HTTPS 443 -> HTTP 80`, and `HTTP 80 -> HTTP 80`
    - Didn't work since the exposed port of the nodes weren't `80`
  - Solution: Use the ports of the load balancer (`HTTPS 443 -> HTTP 32400`)
    ```
    bash-4.4# kubectl get svc -n ingress-nginx
    NAME                      TYPE          EXTERNAL-IP      PORT(S)
    ingress-nginx-controller  LoadBalancer  174.138.114.200  80:32400/TCP,443:31021/TCP
    ```
- **Problem 2**: Environment Variables were not present in the client docker image
  - Docker (and the `build-push-action`) doesn't have a way to include a .env file as build args (i.e. no `--env-file=.env`)
  - Docker compose can include the .env file during build using `env_file`
  - **Solution**: Build image using docker-compose instead of the `build-push-action` in our existing workflow
    - Unable to change the workflow to incorporate this due to time constraints, so had to locally build and tag the client image as `ghcr.io/utscc09/drawhub/client:latest` and push manually

## Contributions

**Navinn Ravindaran**:

- Project Scaffolding
  - Setup + Manage Project structure (libs, components, hooks, etc.)
- Landing & Credit Pages UI
- Authentication and Authorization with Auth0 + Google Provider
- Connect Canvas to Websocket Room + Send Canvas Data
- GraphQL API setup and convert routes from REST
- Upload to Google Drive API
  - Converting Auth0 Access Token to Google Token
- CI/CD with GitHub Actions
- GitHub Project Board
- All of Deployment
  - Docker Images pushed to ghcr.io
  - Kubernetes Cluster
  - DigitalOcean with Domain and SSL

**Aryan Patel**:

- Set up websocket configuration
- Set up AWS S3 bucket configuration
  - upload image into s3
  - receive image from s3
  - stitch (duplicate) image directly in s3
- Private/public canvases
  - Authorization for canvases
  - core functionality
- Stitching canvases
  - core functionalities - { service responsible for sending email }
- Invite collaborators into existing canvas
- Dashboard page
  - Premium page
  - Display Canvasses

**Samyak Mehta**:

- Create drawable canvas
  - Drawing functionality on the canvas
  - Canvas Brush Setup (colors, width, eraser)
  - Upload Image to canvas
  - Clear Implementations
- Worker Setup (Inviting + Stitching)
  - Asynchronously sending emails to all contributors
  - Setting up/using Redis to store Jobs with a NestJS Queue
- Google drive API
  - Getting the auth token for google drive
  - Implementing UI changes and hook to upload to drive
