import crypto from "node:crypto";

export const generateId = (): string => {
  const characters = "0123456789abcdef";
  const bin = new Uint8Array(16); // 128 bit pattern
  crypto.getRandomValues(bin);
  return Array.from(bin)
    .map((n: number): string =>
      [
        characters.at(Math.floor(n / characters.length)), //
        characters.at(n % characters.length),
      ].join("")
    )
    .join("");
};

export const getNowText = (): string => new Date().toISOString();
