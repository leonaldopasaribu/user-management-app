A modern, full-stack user management application built with React Router 7 that provides comprehensive user management capabilities with a beautiful and intuitive interface.

## 📸 Screenshots
<img width="1710" height="875" alt="image" src="https://github.com/user-attachments/assets/d4f0df8f-06ee-4633-9356-2ae0bb8664ff" />

## ✨ Features

- 👤 **Complete User CRUD** - Create, Read, Update, and Delete users with ease
- 🔍 **Smart Search** - Quickly find users with real-time search functionality
- 📊 **User Details Modal** - View comprehensive user information in an elegant modal
- 📝 **Form Validation** - Robust form handling with React Hook Form
- 🎨 **Material Design** - Beautiful UI components with Material-UI
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile devices
- ⚡ **State Management** - Efficient state handling with Redux Toolkit
- 🔄 **Async Data Fetching** - Optimized API calls with loading and error states
- 🧪 **Well Tested** - Comprehensive test coverage with Jest
- 🚀 **Fast Performance** - Optimized with React Router 7 and Vite
- 🌐 **SSR Ready** - Server-side rendering for better performance and SEO
- 🎯 **TypeScript** - Full type safety across the entire codebase

## 🛠️ Tech Stack

- **Framework:** [React Router 7](https://reactrouter.com/) - Modern full-stack React framework
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) - Efficient Redux development
- **UI Library:** [Material-UI (MUI)](https://mui.com/) - React component library
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) - Performant form validation
- **Icons:** [Material Icons](https://mui.com/material-ui/material-icons/) & [Lucide React](https://lucide.dev/)
- **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/react)
- **Build Tool:** [Vite](https://vite.dev/) - Next generation frontend tooling
- **Code Quality:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)
- **Package Manager:** [pnpm](https://pnpm.io/) - Fast, disk space efficient

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/leonaldopasaribu/user-management-app.git
   cd user-management-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
   VITE_AVATAR_BASE_URL=https://i.pravatar.cc
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173) to see the application.

## 🧪 Testing

Run the test suite:

```bash
pnpm test
# or
npm test
```

Run tests in watch mode:

```bash
pnpm test:watch
# or
npm run test:watch
```

Generate test coverage report:

```bash
pnpm test:coverage
# or
npm run test:coverage
```

## 🔧 Development Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm typecheck

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Run tests
pnpm test
```

## 📝 Development Features

The application uses:
- **React Router 7** - Modern full-stack React framework with SSR
- **Redux Toolkit** - Simplified Redux with best practices
- **TypeScript** - Full type safety across the codebase
- **React Hook Form** - Performant form validation
- **Material-UI** - Production-ready React components
- **Tailwind CSS** - Utility-first styling
- **Jest & Testing Library** - Comprehensive testing
- **ESLint & Prettier** - Code quality and consistency
- **Vite** - Lightning-fast build tool

## 🐳 Docker Deployment

Build and run using Docker:

```bash
# Build the Docker image
docker build -t user-management-app .

# Run the container
docker run -p 3000:3000 user-management-app
```

The containerized application can be deployed to any platform that supports Docker:
- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

## 🌐 Deployment

### DIY Deployment

Build the application:

```bash
pnpm build
```

Deploy the following files:
```
├── package.json
├── pnpm-lock.yaml
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

Start the production server:

```bash
pnpm start
```

## 📚 Learn More

To learn more about the technologies used in this project:

- [React Router Documentation](https://reactrouter.com/start/library) - Learn about React Router features
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/) - Modern Redux development
- [Material-UI Documentation](https://mui.com/material-ui/) - React component library
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility-first CSS
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript documentation
- [React Hook Form](https://react-hook-form.com/get-started) - Form validation

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Leonaldo Pasaribu**

- GitHub: [@leonaldopasaribu](https://github.com/leonaldopasaribu)
- LinkedIn: [Leonaldo Pasaribu](https://linkedin.com/in/leonaldo-pasaribu)

---

<div align="center">
  Made with ❤️ using React Router 7
</div>
