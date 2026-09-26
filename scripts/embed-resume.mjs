import { readFileSync, writeFileSync } from "fs"
const b64 = readFileSync("public/resume/Muhammad_Salman_Resume.pdf").toString("base64")
writeFileSync("src/assets/resume-pdf-data.ts", `export const RESUME_PDF_BASE64 =\n  "${b64}";\n`)
console.log("ok", b64.length)
