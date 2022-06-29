# Project

### Team Members

- Samyak Mehta ([@Samyakk123](https://github.com/Samyakk123))
- Aryan Patel ([@AryPat](https://github.com/AryPat))
- Navinn Ravindaran ([@navn-r](https://github.com/navn-r))

## Proposal

### Description
> Realtime collaborative digital canvas application

- Multiple users can draw, sketch, and type onto a canvas with realtime updates, and can invite others through a unique shareable link
  
- Users can "stitch" (copy/fork) other public canvases to build onto existing content

- Users can save the canvas as an image and upload it to their google drive


### Challenge Factor Concepts

- **OAuth 2.0 client**
  - Google OAuth2 Provider
  - Basic scopes for User information (name, email, profile picture), and any necessary scopes required for the Drive API

- **Real-time interactions**
  - Allows drawing on a canvas between multiple users with realtime updates
  - Users update to the canvas via WebSockets  

- **Webhooks** 
  - Consumers of the endpoint can subscribe to a webhook that is pushed when a canvas is 'stitched' (copied) to another canvas  

- **Workers**  
  - Canvas collaborators will be emailed when their canvas has been 'stitched'  

- **Integration with cloud technologies**  
  - AWS S3 to store canvas images in blob storage  
  - Google Drive API for uploading the canvas image to the user's personal drive  

### Features by Beta Version

  - Google OAuth2 Implementation
  - Fully automated CI/CD pipeline (Formatting, Linting, and Deploying)
  - Create and delete multi-user canvases, uploaded to S3 storage
### Features by Final Version

  - 'Stitch' Functionality
  - Webhook + Worker implementation
  - Google Drive API implementation for canvas uploads

### Tech Stack

  - React + TypeScript (Frontend)
  - NestJS (Backend)
  - MongoDB (Primary Database)
  - AWS S3 (Blob Storage)
  - Nginx (Reverse Proxy + Static Assets)

### Method of Deployment

  - Kubernetes with Docker containers  
    - Worst case: Fallback to Docker Compose if K8s is not feasible

  - Google Kubernetes Engine (Cloud Provider)  
    - Fallback to DigitalOcean Kubernetes if pricing becomes an issue 
    - GKE provides $300 in free credits   