'use strict'

// Logging helpers
export const DEBUG_LOG = true

export const LOG_LEVEL = {
  INFO: 0,
  WARN: 1,
  ERROR: 2
}

export const log = (msg, lvl = LOG_LEVEL.INFO) => {

    switch (lvl) {
      case LOG_LEVEL.INFO:
        if(DEBUG_LOG) 
          console.log(`ReaperWRB ${msg}`)
        break;
      case LOG_LEVEL.WARN:
        if(DEBUG_LOG)
          console.warn(`ReaperWRB: ${msg}`)
        break;
      case LOG_LEVEL.ERROR:
        console.error(`ReaperWRB ERROR: ${msg}`)
        break;
    }
  }