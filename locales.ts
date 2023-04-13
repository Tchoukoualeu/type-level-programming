const locales = {
  en_us: {
    hello: "Hi {user}",
    greetings: {
      morning: "Good morning {user}",
      evenings: "Good evening {user}",
      casual: {
        morning: "Yo, happy morning",
        afternoon: "Yolo",
      },
    },
  },
}

type LocalMap = typeof locales

type LocaleName = keyof LocalMap

type Locale = LocalMap[LocaleName]

type PathInto<T extends Record<string, any>> = keyof {
  [K in keyof T as T[K] extends string
    ? K
    : T[K] extends Record<string, any>
    ? `${K & string}.${PathInto<T[K]> & string}`
    : never]: any
}

type foo = PathInto<Locale>

function get(
  object: Record<string, unknown>,
  path: Array<string>,
  index = 0
): string {
  const key = path[index]

  if (key === undefined) {
    return ""
  }

  const result = object[key]

  if (result === undefined) {
    return ""
  }

  if (typeof result === "string") {
    return result
  }

  return get(Object(result), path, index + 1)
}

const currentLocales: LocaleName = "en_us"

export function t(key: PathInto<Locale>): string {
  return get(locales[currentLocales], key.split("."))
}
