module.exports = {
  apps: [
    {
      name: "Pulsar",
      script: "./index.js",
      watch: true,
      env_development: {
        PORT: 5000,
        NODE_ENV: "development",
      },
      env_production: {
        PORT: 6033,
        NODE_ENV: "production",
      },
    },
  ],
};
