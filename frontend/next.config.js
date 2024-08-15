const { env } = require("process");

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        //destination: "http://34.126.132.15:8081/api/v1/:path*",
        destination: "http://localhost:8000/api/v1/:path*",
      },
    ];
  },
};