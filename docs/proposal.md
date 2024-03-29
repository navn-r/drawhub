# Proposal

## Table of Contents

- [Proposal](#proposal)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Challenge Factor Concepts](#challenge-factor-concepts)
  - [Features by Beta Version](#features-by-beta-version)
  - [Features by Final Version](#features-by-final-version)
    - [Tech Stack](#tech-stack)
    - [Method of Deployment](#method-of-deployment)

## Description

> Realtime collaborative digital canvas application

- Multiple users can draw (with custom pen widths and colors) onto a canvas with realtime updates

- Users can invite others, using email, to join the canvas session, through a unique shareable link

- Users can "stitch" (copy/fork) other public canvases to add on top of it

- Users can save the canvas as an image and upload it to their personal Google Drive

- Users can view other users' public canvases

- Users get notified when they have been invited to a canvas or their canvas has been stitched

- Users can create private canvases, hidden to other users
  - Invite other users to join the canvas session, but only if the owner specifies a list of allowed users (using their email)
  - Users can 'stitch' public canvases into their own private ones

## Challenge Factor Concepts

- **OAuth 2.0 client**

  - Google OAuth2 Provider with Auth0
  - Use basic scopes for User information (name, email, profile picture)
  - Use any necessary scopes required for the Drive API

- **Real-time interactions**

  - Allows simultaneous drawing on a canvas between multiple users with realtime updates
  - Canvas updates powered via WebSockets
    - Drawing on the canvas
    - Clearing the Canvas
    - Uploading images onto the Canvas

- **Workers**

  - Use Redis as the database to store jobs in the queue
  - Emails are sent out when:
    - A canvas has been stitched
    - A collaborator has been invited to a private canvas

- **Integration with cloud technologies**
  - AWS S3 to store canvas images in blob storage
  - Google Drive API for uploading the canvas image to the user's personal drive

## Features by Beta Version

- [x] Google OAuth2 Implementation

  - [x] Users should be able to signin via Google

- [x] Create and delete multi-user canvases, uploaded to S3 storage

  - [x] View other users' public canvases

- [x] Fully automated CI/CD pipeline (Formatting, Linting, and Deploying)
  - [x] Pre-commit linting and formatting with Husky, ESLint and Prettier
  - [x] Use Docker containers with GitHub actions
  - [x] Auto push to GitHub container registry

## Features by Final Version

- [x] Create private canvases with email-based access control

- [x] 'Stitch' Functionality

- [x] Webhook + Worker implementation

- [x] Google Drive API implementation for canvas uploads

- [x] K8s Deployment

### Tech Stack

- Nx Monorepo
- React + TypeScript (Frontend)
- NestJS (Backend)
- MongoDB (Primary Database)
- Redis (Job Database)
- AWS S3 (Blob Storage)

### Method of Deployment

- Kubernetes with Docker containers

  - Docker Images pushed to ghcr.io
  - Nginx Ingress Controller
  - ~~Automated TLS provisioning with cert-manager and Let's Encrypt~~

- DigitalOcean Kubernetes
  - Free $100 Credit
  - SSL Certificate with Let's Encrypt
  - Nginx Ingress Controller with LoadBalancer

Made with 💖
