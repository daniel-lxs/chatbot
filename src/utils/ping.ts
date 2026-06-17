import { execSync } from "node:child_process";

export function pingHost(host: string): string {
  if (!/^[a-zA-Z0-9._:-]+$/.test(host)) {
    throw new Error("Invalid host");
  }

  return execSync(`ping -c 1 ${host}`).toString();
}
