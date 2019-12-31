import {
  handleCors,
  handleBodyParsing,
  handleCompression,
  logRequest
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [handleCors, handleBodyParsing, handleCompression, handleAPIDocs, logRequest];