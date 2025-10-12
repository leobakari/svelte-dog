# Svelte-Dog 

A SvelteKit demo full-stack observability with Datadog integration
Featuring both server-side and client-side logging.

PS: Readme down below & boiler plate implementation AI generated.

## Overview 

- **Full-Stack Logging**: Server-side logging with Winston and client-side logging with Datadog Browser Logs
- **Datadog Agent Integration**: Datadog agent running on Arch Linux (yay Install)
- **Cat Facts API**: Example API endpoint that fetches cat facts from an external API (CatFact API)
- **Request/Response Tracking**: Comprehensive logging of all HTTP requests with unique request IDs
- **Error Handling**: Proper error logging on both client and server
- **Modern Stack**: Built with SvelteKit 5 (using runes) and shadcn-svelte UI components

## Stack

- **Framework**: SvelteKit 5
- **Language**: JavaScript
- **UI Components**: shadcn-svelte
- **Logging (Server)**: Winston + datadog-winston
- **Logging (Client)**: @datadog/browser-logs
- **Monitoring**: Datadog
- **Package Manager**: pnpm

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- Datadog account
- Datadog Agent installed (for local development)

### Installing Datadog Agent on Arch Linux

```bash
# Install from AUR
yay -S datadog-agent
# or
paru -S datadog-agent
```
NOTE: Official script with curl doesnt work on Arch

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/svelte-dog.git
cd svelte-dog
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Datadog Server-Side Configuration
DATADOG_API_KEY=your_api_key_here
DATADOG_SITE=datadoghq.eu
DD_ENV=dev
DD_SERVICE=svelte-dog

# Datadog Client-Side Configuration (get from Datadog UI)
PUBLIC_DATADOG_CLIENT_TOKEN=your_client_token_here
PUBLIC_DATADOG_SITE=datadoghq.eu
PUBLIC_DD_ENV=dev
PUBLIC_DD_SERVICE=svelte-dog
```

**Getting Your Keys:**
- **API Key**: Datadog UI → Organization Settings → API Keys
- **Client Token**: Datadog UI → Organization Settings → Client Tokens

### 4. Configure Datadog Agent

Edit the Datadog agent configuration:

```bash
sudo nano /etc/datadog-agent/datadog.yaml
```

Add:

```yaml
api_key: your_api_key_here
site: datadoghq.eu
env: dev
logs_enabled: true

apm_config:
  enabled: true
  instrumentation:
    enabled: host

data_streams:
  enabled: true

profiling:
  enabled: auto
```

Start the Datadog agent:

```bash
sudo systemctl start datadog-agent
sudo systemctl enable datadog-agent
sudo systemctl status datadog-agent
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
svelte-dog/
├── src/
│   ├── hooks.server.js              # Global request/response logging
│   ├── routes/
│   │   ├── +layout.svelte           # Initializes client logger
│   │   ├── +page.svelte             # Cat facts UI component
│   │   └── api/
│   │       └── cat-fact/
│   │           └── +server.js       # Cat facts API endpoint
│   └── lib/
│       ├── monitoring/
│       │   ├── server/
│       │   │   └── logger.js        # Server-side Winston logger
│       │   └── client/
│       │       └── logger.js        # Client-side Datadog logger
│       └── components/
│           └── ui/                  # shadcn-svelte components
├── .env                             # Environment variables (not in git)
├── .env.example                     # Example environment variables
└── package.json
```

## How It Works 

### Server-Side Logging

1. **Global Request Logging** (`src/hooks.server.js`):
   - Logs every incoming HTTP request
   - Tracks request duration and status codes
   - Assigns unique request IDs for tracing

2. **API Endpoint Logging** (`src/routes/api/cat-fact/+server.js`):
   - Logs API calls to external services
   - Captures response times and error states
   - Includes context like fact length and success status

### Client-Side Logging

1. **User Interaction Logging** (`src/routes/+page.svelte`):
   - Logs button clicks and user actions
   - Tracks successful data fetches
   - Captures client-side errors with stack traces

### Log Flow Example

When a user clicks "Fetch Cat Fact":

1. **Client**: Logs "User clicked get cat fact button"
2. **Server Hook**: Logs "Request received" for `/api/cat-fact`
3. **API Handler**: Logs "Cat fact requested"
4. **External API**: Fetches data from catfact.ninja
5. **API Handler**: Logs "Cat fact fetched successfully"
6. **Server Hook**: Logs "Request completed" with duration
7. **Client**: Logs "Cat fact received successfully"

All logs appear in Datadog with full context and correlation!

## Viewing Logs in Datadog

1. Go to [https://app.datadoghq.eu/logs](https://app.datadoghq.eu/logs)
2. Filter by `service:svelte-dog` or `env:dev`
3. Search for specific events like "Cat fact requested"
4. Use request IDs to trace entire request lifecycles

## 📚 Resources

- [Datadog Documentation](https://docs.datadoghq.com/)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Winston Logger](https://github.com/winstonjs/winston)
- [Datadog Browser Logs](https://docs.datadoghq.com/logs/log_collection/javascript/)
