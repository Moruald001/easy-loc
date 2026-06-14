import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "easyLocApi",
      version: "1.0.0",
      description: "API de gestion de propriétés locatives",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./src/routes/*.ts"], // ← lit les commentaires dans tes routes
};

export const swaggerSpec = swaggerJsdoc(options);
