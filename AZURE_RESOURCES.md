# Azure Resources Used

This project leverages the following Azure services:

## Frontend Hosting
- **Azure Static Web Apps**: Hosts the React application

## Backend Services
- **Azure Logic Apps**: RESTful API endpoints for CRUD operations
- **Azure Blob Storage**: Storage for media files
- **Azure Cosmos DB**: NoSQL database for storing media metadata

## DevOps
- **Azure DevOps / GitHub Actions**: CI/CD pipeline

## Monitoring
- **Azure Application Insights**: Tracks application performance and usage
- **Azure Monitor**: Monitoring and alerting for the application

## Configuration
1. **Blob Storage**:
   - Container name: `media-files`
   - Access level: Blob (anonymous read access for blobs only)

2. **Cosmos DB**:
   - Database name: `MediaManagerDB`
   - Collection name: `MediaItems`
   - Partition key: `/category`

3. **Logic Apps Workflows**:
   - Create Media: Handles file uploads to Blob Storage and metadata to Cosmos DB
   - Get Media: Retrieves media items from Cosmos DB
   - Update Media: Updates media metadata in Cosmos DB
   - Delete Media: Removes media files from Blob Storage and metadata from Cosmos DB

4. **Application Insights**:
   - Custom events tracking for API calls
   - User behavior tracking
   - Performance monitoring