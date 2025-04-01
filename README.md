
# Crypto Payment Router Dashboard

## Project Overview

This project is a front-end dashboard application for a crypto payment routing system. It helps merchants optimize their cryptocurrency payment processing by intelligently selecting the best blockchain network for each transaction based on various factors like gas fees, confirmation times, and network congestion.

The dashboard provides an intuitive interface for merchants to:
- Configure their routing preferences
- View transaction history and analytics
- Make manual routing decisions
- Monitor the performance of the automatic routing system

## Tech Stack

- **Frontend**: React with TypeScript, Vite as build tool
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API for global state (auth, theme)
- **Routing**: React Router v6 for navigation
- **API Integration**: Axios for API calls
- **Data Visualization**: Recharts for analytics graphs

## Core Features

### Authentication System
- Email/password login using JWT tokens
- Protected routes for authenticated users
- Demo mode for easy testing (email: demo@example.com, password: demo123)

### Dashboard
- Overview of key metrics and recent transactions
- Quick access to routing decision panel
- Performance charts and statistics

### Routing Decision Panel
- Form to input merchant preferences
- Real-time network selection based on merchant criteria
- Display of network statistics (gas price, confirmation time, congestion)
- AI-assisted recommendations for optimal routing

### Configuration Page
- Merchant settings management
- API key configuration
- Notification preferences
- Default routing settings

### Transaction Log
- Comprehensive history of all processed transactions
- Filtering and sorting capabilities
- Network performance metrics for each transaction

## API Integration

The dashboard integrates with the following backend API endpoints:

### Authentication API

```
POST /api/auth/login
```

**Purpose**: Authenticates merchants and provides access tokens
**Request Body**:
```json
{
  "email": "merchant@example.com",
  "password": "password123"
}
```
**Response**:
```json
{
  "token": "jwt-token-here",
  "user": {
    "id": "user-123",
    "email": "merchant@example.com",
    "name": "Merchant Name"
  }
}
```

### Routing Decision API

```
POST /api/routing/decide
```

**Purpose**: Processes merchant preferences and returns the optimal routing decision
**Request Body**:
```json
{
  "maxFeePercentage": 5,
  "preferredNetworks": ["Ethereum", "Polygon", "Optimism"],
  "minConfirmationTime": 30,
  "useAiFallback": true
}
```
**Response**:
```json
{
  "selectedNetwork": "Optimism",
  "decisionMethod": "hybrid",
  "aiRecommendation": "Optimism",
  "stats": {
    "gasPrice": "0.0012 ETH",
    "confirmationTime": "3 seconds",
    "congestion": "Low"
  }
}
```

### Configuration API

```
GET /api/config
```

**Purpose**: Retrieves merchant configuration settings
**Response**:
```json
{
  "merchantId": "merchant123",
  "defaultSettings": {
    "maxFeePercentage": 5,
    "preferredNetworks": ["Ethereum", "Polygon", "Optimism", "Arbitrum"],
    "minConfirmationTime": 30,
    "useAiFallback": true
  },
  "apiKeys": {
    "isConfigured": true,
    "lastUpdated": "2023-10-15T14:30:00Z"
  },
  "notificationSettings": {
    "email": true,
    "slack": false,
    "webhook": ""
  }
}
```

```
POST /api/config
```

**Purpose**: Updates merchant configuration settings
**Request Body**: Same structure as the GET response
**Response**: Confirmation of update success

### Transaction API

```
GET /api/transactions
```

**Purpose**: Retrieves transaction history
**Response**: Array of transaction objects
```json
[
  {
    "id": "tx123",
    "merchantId": "merchant123",
    "network": "Ethereum Mainnet",
    "fee": "0.0045 ETH",
    "confirmationTime": "15 seconds",
    "decisionMethod": "heuristic",
    "timestamp": "2023-11-10T12:30:45Z",
    "amount": "1.25 ETH",
    "status": "completed"
  },
  // More transactions...
]
```

## Backend Structure (For Integration)

The backend is expected to provide:

1. **Authentication Service**
   - User management (registration, login, token validation)
   - Role-based access control
   - Session management

2. **Routing Engine**
   - Network status monitoring
   - Fee calculation algorithms
   - Confirmation time estimation
   - AI-powered decision making (optional)

3. **Configuration Service**
   - Merchant settings storage and retrieval
   - API key management
   - Integration preferences

4. **Transaction Service**
   - Transaction logging
   - Historical data storage
   - Performance metrics calculation

5. **Analytics Service**
   - Data aggregation
   - Trend analysis
   - Performance reporting

## Implementation Details

### Demo Mode

The application includes a demo mode for easy testing without a backend connection:
- Login with email: `demo@example.com` and password: `demo123`
- API calls are simulated with realistic mock data
- Simulated network latency for realistic experience

### Protected Routes

All dashboard routes are protected using the `ProtectedRoute` component which:
- Verifies user authentication status
- Redirects unauthenticated users to the login page
- Preserves the originally requested URL for post-login redirection

### Responsive Design

The dashboard is fully responsive with:
- Mobile-first approach
- Collapsible sidebar for small screens
- Adaptive layouts for different device sizes
- Touch-friendly UI elements

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`
4. Access the application at `http://localhost:5173`
5. Login with demo credentials (email: demo@example.com, password: demo123)

## Production Deployment

For production deployment:
1. Build the project with `npm run build`
2. Deploy the contents of the `dist` folder to your hosting provider
3. Ensure the backend API endpoints are correctly configured for the production environment

## Future Enhancements

- Real-time transaction monitoring
- Enhanced AI-powered routing suggestions
- Webhook integrations for alerts and notifications
- Multi-currency support
- Advanced analytics and reporting features
- Custom network configuration options

## License

This project is licensed under the MIT License - see the LICENSE file for details.
