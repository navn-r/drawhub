# DrawHub

### Team Members

- Samyak Mehta ([@Samyakk123](https://github.com/Samyakk123))
- Aryan Patel ([@AryPat](https://github.com/AryPat))
- Navinn Ravindaran ([@navn-r](https://github.com/navn-r))

## Proposal

### Description

> Realtime collaborative digital canvas application

- Multiple users can draw (with custom pen widths and colors) and type onto a canvas with realtime updates

- Users can invite others, either anonymously or with an account, to join the canvas session, through a unique shareable link

- Users can "stitch" (copy/fork) other public canvases to add on top of it

- Users can save the canvas as an image and upload it to their personal Google Drive

- Users can view other users' public canvases
- Users can create private canvases, hidden to other users
  - Invite other users to join the canvas session, but only if the owner specifies a list of allowed users (using their email)
  - Anonymous users cannot collaborate on a private canvas
  - Users can 'stitch' public canvases into their own private ones

### Challenge Factor Concepts

- **OAuth 2.0 client**

  - Google OAuth2 Provider
  - Use basic scopes for User information (name, email, profile picture)
  - Use any necessary scopes required for the Drive API

- **Real-time interactions**

  - Allows simultaneous drawing on a canvas between multiple users with realtime updates
  - Canvas updates powered via WebSockets

- **Webhooks**

  - Consumers of the endpoint can subscribe to a webhook that is pushed when a canvas is 'stitched' (copied) to another canvas

- **Workers**

  - Canvas collaborators will be emailed when their canvas has been 'stitched'

- **Integration with cloud technologies**
  - AWS S3 to store canvas images in blob storage
  - Google Drive API for uploading the canvas image to the user's personal drive

### Features by Beta Version

- [ ] Google OAuth2 Implementation

  - [ ] Users should be able to signin via Google

- [ ] Create and delete multi-user canvases, uploaded to S3 storage

  - [ ] View other users' public canvases

- [ ] Fully automated CI/CD pipeline (Formatting, Linting, and Deploying)
  - [ ] Pre-commit linting and formatting with Husky, ESLint and Prettier
  - [ ] Use Docker containers with K8s and GitHub actions
  - [ ] Auto push to GitHub container registry, and deploy to cloud provider (see [Method of Deployment](#method-of-deployment))

### Features by Final Version

- [ ] Create private canvases with email-based access control

- [ ] 'Stitch' Functionality

- [ ] Webhook + Worker implementation

- [ ] Google Drive API implementation for canvas uploads

### Tech Stack

- React + TypeScript (Frontend)
- NestJS (Backend)
- MongoDB (Primary Database)
- AWS S3 (Blob Storage)
- Nginx (Reverse Proxy + Static Assets)
- Docker + Kubernetes (Development and Deployment Ops)

### Method of Deployment

- Kubernetes with Docker containers

  - Emergency case: Fallback to Docker Compose if K8s is not feasible within the allocated time frame

- Google Kubernetes Engine (Cloud Provider)
  - GKE provides $300 in free credits
  - Emergency case: Fallback to DigitalOcean Kubernetes if pricing and/or configuration becomes an issue within the allocated time frame

Made with 💖
