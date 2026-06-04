# IBM Cloud Deployment Guide

This guide provides step-by-step instructions for deploying the Travel Planner Agent to IBM Cloud.

## Prerequisites

1. **IBM Cloud Account**
   - [Create a free Lite account](https://cloud.ibm.com/registration)
   - Verify your email

2. **IBM Cloud CLI**
   ```bash
   # Download from https://cloud.ibm.com/docs/cli
   # or use package manager
   
   # macOS
   brew install ibm-cloud-cli
   
   # Linux/Windows
   # Follow official installation guide
   ```

3. **Node.js Runtime**
   - Node.js 16 or later
   - npm or yarn

## Step 1: Prepare Your Application

### 1.1 Create manifest.yml
```yaml
---
applications:
  - name: travel-planner-agent
    runtime: nodejs_20.x
    memory: 512M
    instances: 1
    command: npm start
    env:
      IBM_CLOUD_API_KEY: {{IBM_CLOUD_API_KEY}}
      WATSONX_PROJECT_ID: {{WATSONX_PROJECT_ID}}
      WATSONX_AUTH_URL: https://iam.cloud.ibm.com/identity/token
      WATSONX_API_URL: https://us-south.ml.cloud.ibm.com
      OPENWEATHER_API_KEY: {{OPENWEATHER_API_KEY}}
```

### 1.2 Test Locally
```bash
npm install
npm start
# Test on http://localhost:3000
```

## Step 2: IBM Cloud Setup

### 2.1 Login to IBM Cloud
```bash
ibmcloud login
# Select your account and organization
```

### 2.2 Get API Key
```bash
# Create a new API key
ibmcloud iam api-key-create travel-planner-key

# Export the key (save it securely)
export IBM_CLOUD_API_KEY="your-api-key-here"
```

### 2.3 Create Watsonx Project
1. Go to [IBM Cloud Console](https://cloud.ibm.com)
2. Create "Watsonx" service
3. Create a new project
4. Note the **Project ID**
5. Export: `export WATSONX_PROJECT_ID="your-project-id"`

### 2.4 Create OpenWeather API Key (Optional)
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your API key
3. Export: `export OPENWEATHER_API_KEY="your-key"`

## Step 3: Deploy to IBM Cloud

### Option A: Cloud Foundry Push

```bash
# Set target
ibmcloud target -o "your-org" -s "your-space"

# Push application
ibmcloud cf push

# Monitor deployment
ibmcloud cf apps
ibmcloud cf logs travel-planner-agent --recent
```

### Option B: IBM Cloud Container Registry

```bash
# Create namespace
ibmcloud cr namespace-add travel-planner

# Build image
docker build -t travel-planner-agent .
docker tag travel-planner-agent icr.io/travel-planner/agent:latest

# Push to registry
docker push icr.io/travel-planner/agent:latest

# Deploy to Kubernetes (if using IKS)
kubectl create deployment travel-planner --image=icr.io/travel-planner/agent:latest
kubectl expose deployment travel-planner --port=3000
```

### Option C: IBM Code Engine

```bash
# Create project
ibmcloud ce project create --name travel-planner

# Create app
ibmcloud ce app create \
  --name travel-planner-agent \
  --image icr.io/travel-planner/agent:latest \
  --port 3000 \
  --memory 512M

# Set environment variables
ibmcloud ce app update travel-planner-agent \
  --env IBM_CLOUD_API_KEY=$IBM_CLOUD_API_KEY \
  --env WATSONX_PROJECT_ID=$WATSONX_PROJECT_ID
```

## Step 4: Verify Deployment

### Check Application Status
```bash
# Cloud Foundry
ibmcloud cf app travel-planner-agent

# Container Registry/Kubernetes
kubectl get pods
kubectl logs pod-name

# Code Engine
ibmcloud ce app get --name travel-planner-agent
```

### Test Endpoints
```bash
# Get app URL
ibmcloud cf app travel-planner-agent

# Test health
curl https://<your-app-url>/health

# Test API
curl -X POST https://<your-app-url>/api/travel/session \
  -H "Content-Type: application/json" \
  -d '{"userId":"test","preferences":{}}'
```

## Step 5: Monitoring & Logging

### View Logs
```bash
# Recent logs
ibmcloud cf logs travel-planner-agent --recent

# Stream logs
ibmcloud cf logs travel-planner-agent -f
```

### Monitor Performance
1. Go to IBM Cloud Dashboard
2. Select your application
3. Check **Monitoring** tab
4. View:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### Set Up Alerts
1. In Monitoring section
2. Create alert for:
   - High memory usage (> 450M)
   - High CPU (> 80%)
   - Failed requests

## Step 6: Scaling

### Scale Application
```bash
# Increase instances
ibmcloud cf scale travel-planner-agent -i 3

# Increase memory
ibmcloud cf scale travel-planner-agent -m 1G

# Check status
ibmcloud cf app travel-planner-agent
```

## Step 7: Update Application

### Deploy New Version
```bash
# Update code
git commit -am "New features"

# Push to IBM Cloud
ibmcloud cf push

# Verify update
ibmcloud cf app travel-planner-agent
```

## Troubleshooting

### Application Won't Start
```bash
# Check logs
ibmcloud cf logs travel-planner-agent --recent

# Common issues:
# - Missing environment variables
# - Port binding failed
# - Out of memory
```

### API Returns 502 Bad Gateway
```bash
# Check application health
ibmcloud cf health travel-planner-agent

# Restart application
ibmcloud cf restart travel-planner-agent

# Check logs for errors
ibmcloud cf logs travel-planner-agent -f
```

### Granite Connection Failed
```bash
# Verify API key
echo $IBM_CLOUD_API_KEY

# Check Watsonx service
ibmcloud resource service-instances | grep watsonx

# Update environment variables
ibmcloud cf set-env travel-planner-agent IBM_CLOUD_API_KEY "new-key"
ibmcloud cf restart travel-planner-agent
```

## Cost Management

### Monitor Usage
1. Go to IBM Cloud Billing
2. Check:
   - Compute costs (Cloud Foundry/Code Engine)
   - API calls to Granite
   - Storage usage

### Optimize Costs
- Use **Lite tier** services (free tier)
- **Scale down** during off-peak hours
- **Cache** API responses
- **Limit** concurrent requests

### Lite Tier Benefits
- 256 MB Cloud Foundry runtime
- 100,000 free API calls/month
- No credit card required

## Production Checklist

- [ ] API keys stored securely
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Logging and monitoring active
- [ ] Database backups scheduled
- [ ] SSL certificate valid
- [ ] Error handling tested
- [ ] Security scan passed
- [ ] Load testing completed

## Additional Resources

- [IBM Cloud Documentation](https://cloud.ibm.com/docs)
- [Watsonx AI Documentation](https://www.ibm.com/watsonx)
- [Cloud Foundry Deployment](https://cloud.ibm.com/docs/cloud-foundry)
- [Code Engine Guide](https://cloud.ibm.com/docs/codeengine)
- [IBM Cloud CLI Reference](https://cloud.ibm.com/docs/cli)

## Support

For deployment issues:
1. Check [IBM Cloud Status Page](https://cloud.ibm.com/status)
2. Review [Support Documentation](https://cloud.ibm.com/docs)
3. Open [Support Ticket](https://cloud.ibm.com/unifiedsupport)
4. Check GitHub Issues

---

**Last Updated**: June 2024
**Deployment Type**: Cloud Foundry, Container Registry, Code Engine
**Support**: IBM Cloud Support Team
