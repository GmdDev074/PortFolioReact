import type { ProjectDetail } from "@/types/project"
import { crowdwaveDetail } from "./crowdwave"
import { courialDetail } from "./courial"
import { fussballDetail } from "./fussball"
import { versusDetail } from "./versus"
import { ticketDrawsDetail } from "./ticketdraws"
import { whisperrDetail } from "./whisperr"

const projectDetails: Record<string, ProjectDetail> = {
  crowdwave: crowdwaveDetail,
  courial: courialDetail,
  fussball: fussballDetail,
  versus: versusDetail,
  ticketdraws: ticketDrawsDetail,
  whisperr: whisperrDetail,
}

export function getProjectDetail(id: string): ProjectDetail | undefined {
  return projectDetails[id]
}
