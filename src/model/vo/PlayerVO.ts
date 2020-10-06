import { StringIndexedObject } from '../../utils/Utils';

export class PlayerVO implements StringIndexedObject<any> {
  displayName: string;
  dt_create: string;
  dt_update: string;
  email: string;
  first_name: string;
  grade: number;
  hobbies_referred_career_cluster: string;
  hobbies_referred_career_cluster2: string;
  last_name: string;
  lifestyle_charitable_giving: number;
  lifestyle_clothing: number;
  lifestyle_entertainment: number;
  lifestyle_food: number;
  lifestyle_health_care: number;
  lifestyle_housing: number;
  lifestyle_miscellaneous: number;
  lifestyle_personal: number;
  lifestyle_salary: number;
  lifestyle_savings: number;
  lifestyle_student_debt: number;
  lifestyle_transportation: number;
  lifestyle_utilities: number;
  owner: string;
  password: string;
  personality: string;
  personality_artistic: number;
  personality_artistic_text: string;
  personality_detail_minded: number;
  personality_detail_minded_text: string;
  personality_hands_on: number;
  personality_hands_on_text: string;
  personality_investigative: number;
  personality_investigative_text: string;
  personality_self_starter: number;
  personality_self_starter_text: string;
  personality_social: number;
  personality_social_text: string;
  saved_hobbies_referred_career_cluster: string;
  saved_hobbies_referred_career_cluster2: string;
  saved_lifestyle_charitable_giving: number;
  saved_lifestyle_clothing: number;
  saved_lifestyle_entertainment: number;
  saved_lifestyle_food: number;
  saved_lifestyle_health_care: number;
  saved_lifestyle_housing: number;
  saved_lifestyle_miscellaneous: number;
  saved_lifestyle_personal: number;
  saved_lifestyle_salary: number;
  saved_lifestyle_savings: number;
  saved_lifestyle_student_debt: number;
  saved_lifestyle_transportation: number;
  saved_lifestyle_utilities: number;
  saved_personality: string;
  saved_personality_artistic: number;
  saved_personality_detail_minded: number;
  saved_personality_hands_on: number;
  saved_personality_investigative: number;
  saved_personality_self_starter: number;
  saved_personality_social: number;
  saved_result_exist: string;
  saved_skill_active_listening: number;
  saved_skill_complex_problem_solving: number;
  saved_skill_coordination: number;
  saved_skill_critical_thinking: number;
  saved_skill_judgement_and_decision_making: number;
  saved_skill_monitoring: number;
  saved_skill_reading_comprehension: number;
  saved_skill_social_perceptiveness: number;
  saved_skill_speaking: number;
  saved_skill_top_skill: string;
  saved_skill_writing: number;
  school: string;
  skill_active_listening: number;
  skill_complex_problem_solving: number;
  skill_coordination: number;
  skill_critical_thinking: number;
  skill_judgement_and_decision_making: number;
  skill_monitoring: number;
  skill_reading_comprehension: number;
  skill_social_perceptiveness: number;
  skill_speaking: number;
  skill_top_skill: string;
  skill_writing: number;
  user_id: string;
  user_status: string;
}

export interface IPlayerRegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IGameAvailableState {
  lifeStyle: boolean;
  personality: boolean;
  hobbies: boolean;
  skills: boolean;
}
