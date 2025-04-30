# Product Hunt Client

This project was built with React, TypeScript, Vite, and Tailwind CSS. This application fetches data from the Product Hunt GraphQL API to display posts with infinite scrolling, filtering, and search capabilities.

![Product Hunt Clone Banner](/public/readme-image.png)

## Features

- Display Product Hunt posts with infinite scrolling
- Filter posts by newest or ranking
- Search posts by name, tagline, description, or topics (Just on client side)
- Responsive design
- Modern UI with TailwindCSS

## Tech Stack

- **Frontend Framework**: React v19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS v4
- **State Management**: React Query (TanStack Query v5)
- **API Integration**: GraphQL with graphql-request
- **Icons**: FontAwesome
- **Additional Libraries**:
  - react-infinite-scroll-component
  - classnames

## Testing

This project uses Vitest and React Testing Library for testing. The test suite includes:

- Unit tests for utility functions
- Component tests for UI components
- Integration tests for API hooks
- Mocked API responses using MSW (Mock Service Worker)

To run the tests:

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/product-hunt.git
   cd product-hunt
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   VITE_API_URL='https://api.producthunt.com/v2/api/graphql'
   VITE_API_ACCESS_TOKEN='your_product_hunt_api_token'
   ```

   Note: You need to obtain an API token from Product Hunt.

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
product-hunt/
├── public/            # Static assets
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   │   └── services/  # API service hooks
│   ├── pages/         # Application pages/routes
│   │   └── posts/     # Posts page components
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── .env               # Environment variables
├── package.json       # Project dependencies and scripts
└── vite.config.ts     # Vite configuration
```

## API Integration

This project uses the Product Hunt GraphQL API to fetch posts. The API interactions are handled through custom hooks in the `src/hooks/services/posts` directory.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## License

[MIT](LICENSE)

## Acknowledgements

- [Product Hunt API](https://api.producthunt.com/v2/docs) for providing the data
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [TanStack Query](https://tanstack.com/query/latest)
