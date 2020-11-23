import formatDate from "date-fns/format";

export function toListText(
   words: readonly string[],
   conjunction?: string
): string {
   // returns a string of words combined in a natural-language style
   if (conjunction) {
      return words
         .map((word, i, arr) => {
            if (i === arr.length - 2 && arr.length > 2) {
               return word + `, ${conjunction} `;
            }
            if (i === arr.length - 2 && arr.length < 3) {
               return word + ` ${conjunction} `;
            }
            if (i < arr.length - 2) {
               return word + ", ";
            } else return word;
         })
         .join("");
   } else {
      return words
         .map((word, i, arr) => {
            if (i < arr.length - 1) {
               return word + ", ";
            } else return word;
         })
         .join("");
   }
}

export function toDateNum(kebabDate: string): number {
   return Number(kebabDate.replace(/-/g, ""));
}

export function toJsDate(eightDigitNum: number): Date {
   const str = String(eightDigitNum);
   const year = Number(str.slice(0, 4));
   const month = Number(str.slice(4, 6)) - 1;
   const day = Number(str.slice(6));
   return new Date(year, month, day);
}

export function toShowDate(yyyy_mm_dd: string): string {
   return formatDate(toJsDate(toDateNum(yyyy_mm_dd)), "LLL. d, yyyy");
}

export function stripTags(str: string): string {
   return str.replace(/<\/?[^>]+(>|$)/g, "");
}

export function truncate(str: string, len: number): string {
   if (str.length > len) {
      return str.slice(0, len) + `...`;
   } else {
      return str;
   }
}
