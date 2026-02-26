export interface Course {
	id?: number;
	program: string;
	program_display: string;
	study_option?: string | null;
	study_option_display?: string ;
	specialization?: string | null;
	specialization_display?: string;
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

export interface MetaDataType {
	programs: choice[];
	study_options: choice[];
	specializations: choice[];
}

export type choice = {
	value: string;
	label: string;
};