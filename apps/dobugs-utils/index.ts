import _, { flatten } from "lodash";

const stringToHex = (str: string) => {
  const arr: any[] = [];
  for (let i = 0; i < str.length; i += 1) {
    arr[i] = `00${str.charCodeAt(i).toString(16)}`.slice(-4);
  }
  return `\\u${arr.join("\\u")}`;
};

export const isTouchDevice = (): boolean => {
  let hasTouchScreen = false;
  if ("maxTouchPoints" in window.navigator) {
    hasTouchScreen = window.navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = window.navigator.maxTouchPoints > 0;
  } else {
    const mQ =
      typeof window.matchMedia === "function" && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      const UA = window.navigator.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }

  return hasTouchScreen;
};


export const isEmpty = (value: any) => {
  if (value === null) {
    return true;
  }
  if (typeof value === "undefined") {
    return true;
  }
  if (typeof value === "string" && value === "") {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (
    typeof value === "object" &&
    value.constructor.name === "Object" &&
    Object.keys(value).length < 1 &&
    Object.getOwnPropertyNames(value).length < 1
  ) {
    if (
      typeof value === "object" &&
      value.constructor.name === "String" &&
      Object.keys(value).length < 1
    ) {
      return true;
    }
  }

  return false;
};

export const removeEmpty = (obj: any) =>
  Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

export const getLoadedScript = (url: string): boolean => {
  const scripts = window.document.getElementsByTagName("script");
  let value: any = null;

  for (let i = 0; i < scripts.length; i += 1) {
    if ((scripts[i].src ?? "").includes(url)) {
      value = scripts[i];
      break;
    }
  }

  return value;
};

export const isDescendant = (el: HTMLElement, parentId: string) => {
  let isChild = false;
  if (el.id === parentId) {
    isChild = true;
  }

  while (el === el.parentNode) {
    if (el.id === parentId) {
      isChild = true;
    }
  }

  return isChild;
};

export function generateQueryString(options: any) {
  let queryString = "?";

  Object.keys(options).forEach((o) => {
    if (options[o] || options[o] === 0) {
      queryString += `${o}=${options[o]}&`;
    }
  });

  return queryString;
}

export function debounce(cb, duration) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, duration);
  };
}

export function parseJSON(jsonString, defaultValue = {}) {
  if (
    jsonString === "null" ||
    jsonString === null ||
    typeof jsonString === "undefined"
  ) {
    return defaultValue;
  }

  let result = jsonString && _.isObject(jsonString) ? jsonString : defaultValue;

  if (_.isString(jsonString)) {
    try {
      result = JSON.parse(jsonString || "{}");
    } catch (e) {
      // console.error("parseJSON Error: ", e, jsonString);
      result = defaultValue;
    }
  }
  return result;
}


export const once = (fn: Function) => {
  let done = false;
  return (...args: any) => {
    if (!done) {
      done = true;
      fn(...args);
    }
  };
};

export const isValidHttpURL = (value) => {
  let url;

  try {
    url = new URL(value);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

export function setDomain(domain) {
  if (!document.domain) {
    return;
  }

  try {
    document.domain = domain;
  } catch (e) {
    document.domain = window.location?.hostname;
  }
}

export function setCookie(name, value, options: any = {}) {
  options = {
    path: "/",
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUtcString();
  }
  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}`;

  Object.keys(options).forEach((optionKey) => {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  });

  document.cookie = updatedCookie;
}

export function getCookie(name) {
  let cookieValue: any = null;
  if (document.cookie) {
    const array = document.cookie.split(`${escape(name)}=`);
    if (array.length >= 2) {
      const arraySub = array[1].split(";");
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
