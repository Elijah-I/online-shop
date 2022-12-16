import { Path } from "./path.js";
import { isProd } from "./env.js";

export const server = isProd
  ? false
  : {
      hot: false,
      port: 3000,
      open: true,
      compress: true,
      historyApiFallback: true,

      static: {
        directory: Path("../online-shop-release")
      },

      client: {
        logging: "none"
      }
    };

export const tool = isProd ? false : "source-map";
