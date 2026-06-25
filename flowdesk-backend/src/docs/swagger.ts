import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.4",

    info: {
      title: "FlowDesk API",
      version: "1.0.0",
      description: "FlowDesk backend REST API documentation"
    },

    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Local development server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: ["./src/**/*.ts", "./dist/**/*.js"]
});