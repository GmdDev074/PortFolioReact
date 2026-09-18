import type { ProjectDetail } from "@/types/project"
import { courialDetail } from "./courial"
import { fussballDetail } from "./fussball"
import { versusDetail } from "./versus"
import { ticketDrawsDetail } from "./ticketdraws"
import { whisperrDetail } from "./whisperr"

export const projectDetails: Record<string, ProjectDetail> = {
  courial: courialDetail,
  fussball: fussballDetail,
  versus: versusDetail,
  ticketdraws: ticketDrawsDetail,
  whisperr: whisperrDetail,
}

export function getProjectDetail(id: string): ProjectDetail | undefined {
  return projectDetails[id]
}
