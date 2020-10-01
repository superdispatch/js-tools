declare module 'netlify' {
  export interface SiteDeploy {
    id: string;
    deploy_url: string;
    deploy_ssl_url: string;
  }

  export interface NetlifyAPIOptions {
    userAgent?: string;
    scheme?: string;
    host?: string;
    pathPrefix?: stringt;
    accessToken?: string;
    agent?: string;
    globalParams?: Record<string, unknown>;
  }

  export interface DeployStatus {
    msg: string;
    type: 'hashing' | 'create-deploy' | 'wait-for-deploy';
    phase: 'start' | 'stop';
  }

  export interface DeployOptions {
    branch?: string;
    statusCb?: (status: DeployStatus) => void;
  }

  export interface DeployResult {
    deployId: number;
    deploy: SiteDeploy;
    uploadList: string[];
  }

  export default class NetlifyAPI {
    constructor(accessToken?: string, options?: NetlifyAPIOptions);

    get accessToken(): string;
    set accessToken(): string;

    get basePath(): string;

    deploy(
      siteId: string,
      buildDir: string,
      options?: DeployOptions,
    ): Promise<DeployResult>;
  }
}
