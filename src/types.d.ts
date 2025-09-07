// Type declarations for the JavaScript project
declare module "*.jsx" {
  import React from "react";
  const Component: React.ComponentType<any>;
  export default Component;
}

declare module "*.js" {
  const value: any;
  export default value;
}

// Global type definitions
declare global {
  interface Window {
    // Add any global window properties if needed
  }
}

export {};