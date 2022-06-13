class AppError extends Error {
  constructor(
    message = 'Something went wrong',
    statusCode = 500,
    details = {},
    request = null,
  ) {
    super();
    this.stack = message;
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;

    if (request) {
      try {
        const { headers, url, method, _parsedUrl } = request;
        this.request = {
          headers,
          url,
          method,
          _parsedUrl,
        };
      } catch {
        try {
          const {
            app,
            baseUrl,
            body,
            cookies,
            hostname,
            ip,
            ips,
            originalUrl,
            params,
            route,
          } = request;
          this.request = {
            app,
            baseUrl,
            body,
            cookies,
            hostname,
            ip,
            ips,
            originalUrl,
            params,
            route,
          };
        } catch (error) {
          this.request = null;
        }
      }
    }
  }
}

export default AppError;
