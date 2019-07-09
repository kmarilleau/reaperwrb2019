'use strict'

// Logging helpers
export const DEBUG = true

export const LOG_LEVEL = {
  INFO: 0,
  WARN: 1,
  ERROR: 2
}

export const LOG = (msg, lvl = LOG_LEVEL.INFO) => {

    switch (lvl) {
      case LOG_LEVEL.INFO:
        if(DEBUG) 
          console.log(`ReaperWRB ${msg}`)
        break;
      case LOG_LEVEL.WARN:
        if(DEBUG)
          console.warn(`ReaperWRB: ${msg}`)
        break;
      case LOG_LEVEL.ERROR:
        console.error(`ReaperWRB ERROR: ${msg}`)
        break;
    }
  }