# AWS Cloud Resume Challenge

This repository contains a static resume website built for the AWS Cloud Resume Challenge. The site is hosted on Amazon S3 using static website hosting. The focus of this implementation is a fast, secure, and cost‑effective static frontend; optional serverless components (visitor counter API using Lambda + API Gateway + DynamoDB) can be added without any server‑side code running on the site itself.

## Overview

- Purpose: Publish a professional resume as a cloud‑hosted website.
- Hosting: Amazon S3 static website hosting (no server‑side scripts on the site).
- Security & Quality: GitLab CI integrates SAST and Secret Detection.
- Source Control: GitLab as primary; optionally mirrored to GitHub to stay in sync.

## Architecture (current)

- **Frontend:** HTML/CSS/JS served directly from S3.
- **Optional Backend (if enabled):** Serverless API for a visitor counter using AWS Lambda, API Gateway, and DynamoDB (deployed separately). The static site calls the API over HTTPS.
- **CDN (optional):** Amazon CloudFront for global caching and TLS. Not required for S3 website hosting but recommended for production.

## Tech Stack

- **AWS:** S3 (static hosting), optional CloudFront, optional Lambda/API Gateway/DynamoDB.
- **CI/CD:** GitLab CI with Security/SAST and Secret Detection templates.
- **Languages:** HTML, CSS, JavaScript (static site).

## Repository Structure

- `website/` — Static site assets (e.g., `index.html`, CSS, JS, images).
- `.gitlab-ci.yml` — CI pipeline including security scans and optional mirror job.
- `gitlab_readme.md` — Additional notes for GitLab.

## Local Development

You can preview the site locally using any simple web server.

```bash
# From the repository root
cd website
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

## Deployment (S3 Static Website Hosting)

Prerequisites: AWS CLI configured with credentials and a target AWS account.

```bash
# Variables
AWS_REGION="us-east-1"               # adjust as needed
BUCKET_NAME="<your-unique-bucket-name>"

# 1) Create the bucket
aws s3api create-bucket \
--bucket "$BUCKET_NAME" \
--region "$AWS_REGION" \
--create-bucket-configuration LocationConstraint="$AWS_REGION"

# 2) Enable static website hosting
aws s3 website s3://"$BUCKET_NAME" --index-document index.html --error-document 404.html

# 3) Upload site files
aws s3 sync ./website s3://"$BUCKET_NAME" --delete

# 4) (Optional) Make objects public via a bucket policy if using S3 website endpoint
# Prefer CloudFront for TLS and controlled public access in production.
```

If using CloudFront, create a distribution with the S3 bucket as origin and point your domain/DNS (Route 53) to the distribution for HTTPS.

## CI/CD and Security

- GitLab CI runs SAST and Secret Detection per `.gitlab-ci.yml`.
- Optional: A mirror job can push all refs to GitHub so the GitHub repo stays updated.
  - Required CI variables: `GITHUB_USER`, `GITHUB_TOKEN` (PAT with `repo` scope), `GITHUB_REPO` (e.g., `username/aws-cloud-resume-challenge`).

## How the Visitor Counter Works (optional)

If enabled, the static site calls a serverless REST endpoint:

- **API Gateway** routes requests to **Lambda**.
- **Lambda** reads/writes a count in **DynamoDB** and returns JSON.
- The frontend fetches the count via JavaScript and renders it on the page.

## References

- Challenge details: <https://cloudresumechallenge.dev/>
- AWS S3 Static Websites: <https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html>
- CloudFront: <https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html>

## License

This project summary covers the challenge implementation for educational and portfolio purposes. Use responsibly and secure your AWS resources.
