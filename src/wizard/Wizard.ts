import { WizardStep } from './StepInterface';
import { WizardData } from '../types';
import { Step1Required } from './steps/CollectForm';
import { Step5Result } from './steps/Result';

export class Wizard {
  private currentStep: number = 0;
  private data: WizardData = {
    environment: 'test',
  };
  private credentials: { username: string; password: string } = {
    username: '',
    password: '',
  };
  private steps: WizardStep[] = [];
  private container: HTMLElement;
  private currentStepContainer: HTMLElement | null = null;

  constructor(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }
    this.container = container;

    // Initialize steps
    this.steps = [
      new Step1Required(),
      new Step5Result(() => this.restart()),
    ];

    this.render();
  }

  private render(): void {
    // Clear container
    this.container.innerHTML = '';

    // Create wizard structure
    const wizardEl = document.createElement('div');
    wizardEl.className = 'wizard';

    // Add progress indicator
    const progress = this.createProgressIndicator();
    wizardEl.appendChild(progress);

    // Add step content container
    const stepContent = document.createElement('div');
    stepContent.className = 'wizard-content';
    stepContent.id = 'step-content';
    wizardEl.appendChild(stepContent);

    // Add navigation buttons
    const navigation = this.createNavigation();
    wizardEl.appendChild(navigation);

    this.container.appendChild(wizardEl);

    // Render current step
    this.renderStep();
  }

  private createProgressIndicator(): HTMLElement {
    const progress = document.createElement('div');
    progress.className = 'wizard-progress';

    this.steps.forEach((step, index) => {
      const stepEl = document.createElement('div');
      stepEl.className = 'progress-step';
      if (index === this.currentStep) {
        stepEl.classList.add('active');
      } else if (index < this.currentStep) {
        stepEl.classList.add('completed');
      }

      stepEl.innerHTML = `
        <div class="step-number">${index + 1}</div>
        <div class="step-title">${step.getTitle()}</div>
      `;

      progress.appendChild(stepEl);
    });

    return progress;
  }

  private createNavigation(): HTMLElement {
    const nav = document.createElement('div');
    nav.className = 'wizard-navigation';

    const prevBtn = document.createElement('button');
    prevBtn.id = 'prev-btn';
    prevBtn.className = 'btn btn-secondary';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = this.currentStep === 0;
    prevBtn.addEventListener('click', () => this.previous());

    const nextBtn = document.createElement('button');
    nextBtn.id = 'next-btn';
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = this.currentStep === this.steps.length - 1 ? 'Finish' : 'Next';
    nextBtn.addEventListener('click', () => this.next());

    // Hide next button on the last step
    if (this.currentStep === this.steps.length - 1) {
      nextBtn.style.display = 'none';
    }

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    return nav;
  }

  private renderStep(): void {
    const stepContent = document.getElementById('step-content');
    if (!stepContent) return;

    // Clear previous content
    stepContent.innerHTML = '';

    // Render current step with credentials included in data
    const step = this.steps[this.currentStep];
    const dataWithCredentials = { ...this.data, credentials: this.credentials };
    this.currentStepContainer = step.render(dataWithCredentials);
    stepContent.appendChild(this.currentStepContainer);
  }

  private next(): void {
    // Collect data from current step
    if (this.currentStepContainer) {
      const step = this.steps[this.currentStep];
      const stepData = step.collectData(this.currentStepContainer);
      this.data = { ...this.data, ...stepData };

      // Validate current step (include credentials in validation)
      const dataWithCredentials = { ...this.data, credentials: this.credentials };
      const validation = step.validate(dataWithCredentials);
      if (!validation.valid) {
        this.showErrors(validation.errors);
        return;
      }
    }

    // Move to next step
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.render();
    }
  }

  private previous(): void {
    // Collect data from current step (without validation)
    if (this.currentStepContainer) {
      const step = this.steps[this.currentStep];
      const stepData = step.collectData(this.currentStepContainer);
      this.data = { ...this.data, ...stepData };
    }

    // Move to previous step
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  private showErrors(errors: string[]): void {
    // Remove existing error box
    const existingError = document.querySelector('.validation-errors');
    if (existingError) {
      existingError.remove();
    }

    // Create error box
    const errorBox = document.createElement('div');
    errorBox.className = 'validation-errors';
    errorBox.innerHTML = `
      <h4>Please fix the following errors:</h4>
      <ul>
        ${errors.map((error) => `<li>${error}</li>`).join('')}
      </ul>
    `;

    // Insert at the top of step content
    const stepContent = document.getElementById('step-content');
    if (stepContent && stepContent.firstChild) {
      stepContent.insertBefore(errorBox, stepContent.firstChild);
    }

    // Scroll to top
    stepContent?.scrollIntoView({ behavior: 'smooth' });
  }

  private restart(): void {
    this.currentStep = 0;
    this.data = {
      environment: 'test',
    };
    this.render();
  }

  public getData(): WizardData {
    return this.data;
  }

  public setEnvironment(environment: 'test' | 'production'): void {
    this.data.environment = environment;
  }

  public getEnvironment(): 'test' | 'production' {
    return this.data.environment || 'test';
  }

  public setCredentials(username: string, password: string): void {
    this.credentials = { username, password };
  }

  public getCredentials(): { username: string; password: string } {
    return this.credentials;
  }
}
