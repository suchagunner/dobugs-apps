const getUserLocale = require("get-user-locale").default;
const productionConfig = require("./conf.d/config.production.json");
const stagingConfig = require("./conf.d/config.staging.json");
const developmentConfig = require("./conf.d/config.development.json");
const debugConfig = require("./conf.d/config.debug.json");

enum ConfigMode {
  DEBUG = "debug",
  DEVELOPMENT = "dev",
  STAGING = "staging",
  PRODUCTION = "production",
}

type Mode = string | keyof typeof ConfigMode;

export class Config {
  private static instance: Config;

  public readonly mode: Mode = process.env.VUE_APP_MODE || process.env.NODE_ENV;

  private readonly productionConfig = productionConfig;

  private readonly stagingConfig = stagingConfig;

  private readonly developmentConfig = developmentConfig;

  private readonly debugConfig = debugConfig;

  private config: any;

  public readonly userLocale = getUserLocale();

  public static getInstance() {
    return Config.instance ?? new Config();
  }

  get version() {
    return process.env.VUE_APP_VERSION;
  }

  get apiServer() {
    return this.config.api;
  }

  get apiBaseURL() {
    return `${this.config.api}/${this.config.apiVersion}`;
  }

  get webServer() {
    return this.config.web;
  }

  get appServer() {
    return this.config.app;
  }

  get isIos() {
    return (
      [
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
      ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  }

  get isAndroid() {
    return /(android)/i.test(navigator.userAgent);
  }

  parseConfig(mode: Mode) {
    try {
      let content = this.developmentConfig;

      if (mode === ConfigMode.DEBUG) {
        content = this.debugConfig;
      } else if (mode === ConfigMode.DEVELOPMENT) {
        content = this.developmentConfig;
      } else if (mode === ConfigMode.STAGING) {
        content = this.stagingConfig;
      } else if (mode === ConfigMode.PRODUCTION) {
        content = this.productionConfig;
      }

      this.config = content;

      if (process.env.VUE_APP_REMOTE_HOST) {
        const localIP = process.env.VUE_APP_REMOTE_HOST;

        this.config.api = this.config.api.replace("localhost", localIP);
        this.config.web = this.config.web.replace("localhost", localIP);
        this.config.realtime = this.config.realtime.replace(
          "127.0.0.1",
          localIP,
        );
      }
    } catch (e) {
      this.config = this.productionConfig;
    }
  }

  private constructor() {
    this.parseConfig(this.mode);
  }

  get(name: string) {
    return this.config[name];
  }

  printVersion() {
    const c1 =
      "font-family: Roboto; font-size: 32px; color: #008fff; font-weight: bold;";
    const c2 =
      "font-family: Roboto; font-size: 10px; color: #000000; font-weight: 500;";
    const text = `%c Lugstay %cv${this.version}`;

    window.console.log(text, c1, c2);
  }
}

const config = Config.getInstance();

export default config;
