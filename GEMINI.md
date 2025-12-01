# Project Overview

This is a Next.js project for an Internet Service Provider (ISP). It appears to be a customer-facing application for browsing and purchasing internet packages.

## Technologies Used

- **Framework:** Next.js
- **UI Library:** Ant Design
- **Styling:** Tailwind CSS
- **State Management:** MobX (based on `package.json`, though the provided files use React Context)
- **Data Fetching:** SWR
- **Linting:** ESLint
- **Formatting:** Prettier

## Building and Running

To get the development environment running, use the following commands:

```bash
# Install dependencies
yarn

# Run the development server
yarn dev
```

The application will be available at `http://localhost:3000`.

### Other Commands

- `yarn build`: Builds the application for production.
- `yarn start`: Starts a production server.
- `yarn lint`: Lints the codebase for errors.
- `yarn format`: Formats the code using Prettier.

## Development Conventions

- **Styling:** The project uses Tailwind CSS for styling, with some components styled directly with CSS-in-JS in the component files.
- **State Management:** The application uses React Context for state management, with `UserContext` for user-related state and `UIStateContext` for UI-related state.
- **Authentication:** Authentication is handled via a token stored in local storage. The `UserContext` is responsible for validating the token and redirecting unauthenticated users.
- **API Requests:** The application uses `superagent` and `swr` for making API requests. The API endpoints are defined in the `repository` directory.
