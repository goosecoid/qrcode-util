import { WizardData } from '../types';

export interface WizardStep {
  render(data: WizardData): HTMLElement;
  validate(data: WizardData): { valid: boolean; errors: string[] };
  collectData(container: HTMLElement): Partial<WizardData>;
  getTitle(): string;
}
