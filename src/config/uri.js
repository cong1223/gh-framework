let BASE_URL = "";
let HZZK_FT_API = "";
let HZZK_ARC_API = "";
let HZZK_OCR_API = "";

switch (process.env.NODE_ENV) {
  case "development":
    BASE_URL = "https://test.xxx.com/hzzk-portal";
    HZZK_FT_API = "https://test.xxx.com/hzzk-ft";
    HZZK_ARC_API = "https://test.xxx.com/hzzk-arc";
    HZZK_OCR_API = "https://test.xxx.com/hzzk-ocr";
    break;
  case "test":
    BASE_URL = "https://test.xxx.com/hzzk-portal";
    HZZK_FT_API = "https://test.xxx.com/hzzk-ft";
    HZZK_ARC_API = "https://test.xxx.com/hzzk-arc";
    HZZK_OCR_API = "https://test.xxx.com/hzzk-ocr";
    break;
  case "production":
    BASE_URL = "https://xxx.xxx.com/hzzk-portal";
    HZZK_FT_API = "https://xxx.xxx.com/hzzk-ft";
    HZZK_ARC_API = "https://xxx.xxx.com/hzzk-arc";
    HZZK_OCR_API = "https://xxx.xxx.com/hzzk-ocr";
    break;
  case "local":
    BASE_URL = "http://192.168.0.108:20001/hzzk-portal";
    HZZK_FT_API = "http://192.168.0.108:20001/hzzk-ft";
    HZZK_ARC_API = "http://192.168.0.108:20001/hzzk-arc";
    HZZK_OCR_API = "http://192.168.0.108:20001/hzzk-ocr";
    break;
}

export default {
  BASE_URL,
  HZZK_FT_API,
  HZZK_ARC_API,
  HZZK_OCR_API,
};
