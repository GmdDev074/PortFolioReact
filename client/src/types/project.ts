export interface ProjectLinks {
  playStore?: string
  appStore?: string
  website?: string
}

export interface ProjectService {
  title: string
  description: string
}

export interface TechStackGroup {
  category: string
  items: string[]
}

export interface ArchitectureLayer {
  title: string
  description: string
}

export interface UserFlowStep {
  step: string
  title: string
  description: string
}

export interface DevelopmentHighlight {
  title: string
  description: string
}

export interface ProblemSolutionBlock {
  title: string
  points: string[]
}

export interface ProjectDetail {
  id: string
  name: string
  tagline: string
  summary: string
  category: "mobile" | "web"
  links: ProjectLinks
  images: string[]
  services: ProjectService[]
  servicesSectionTitle: string
  architectureSectionTitle: string
  architectureSectionIntro: string
  flowsSectionTitle: string
  devSectionTitle: string
  featuresSectionTitle: string
  features: string[]
  techStack: TechStackGroup[]
  architecture: ArchitectureLayer[]
  flows: UserFlowStep[]
  developmentApproach: DevelopmentHighlight[]
  problem: ProblemSolutionBlock
  solution: ProblemSolutionBlock
}

export interface ProjectListItem {
  id: string
  name: string
  tagline: string
  category: "mobile" | "web"
  featured?: boolean
  playStore?: string
  appStore?: string
  url?: string
  detailPath?: string
}
