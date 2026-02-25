export type CourseProgram = "S2 Magister" | "S3 Doktoral";

export interface Course {
	id?: number;
	program: CourseProgram;
	study_option?: string | null;
	specialization?: string | null;
	course_code: string;
	course_name: string;
	sks: number;
	description: string;
	cpps?: string | null;
	cpmk?: string | null;
	weekly_plan?: string | null;
	ethics_note?: string | null;
	created_at?: string;
	updated_at?: string;
}

export interface LearningMethod {
	id?: number;
	course?: number;
	method: string;
	implementation: string;
	cpmk: string;
	cpl: string;
}

export interface Assessment {
	id?: number;
	course?: number;
	component: string;
	rubric: string;
	weight: number;
	cpl: string;
}
