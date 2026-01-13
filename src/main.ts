import { Wizard } from './wizard/Wizard';
import '../styles/main.css';
import '../styles/wizard.css';

const ENV_URLS = {
  test: 'https://test.digiteal.eu',
  production: 'https://app.digiteal.eu',
};

// Initialize the wizard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const wizard = new Wizard('wizard-container');

  // Setup collapsible sections
  const setupCollapsible = (toggleId: string, contentId: string) => {
    const toggle = document.getElementById(toggleId);
    const content = document.getElementById(contentId);

    if (toggle && content) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('collapsed');
        content.classList.toggle('collapsed');
      });
    }
  };

  setupCollapsible('creds-toggle', 'creds-content');
  setupCollapsible('env-toggle', 'env-content');

  // Setup environment toggle
  const envSelect = document.getElementById('env-select') as HTMLSelectElement;
  const envUrl = document.getElementById('env-url') as HTMLDivElement;

  if (envSelect && envUrl) {
    // Initialize with current environment
    const currentEnv = wizard.getEnvironment();
    envSelect.value = currentEnv;
    envUrl.textContent = ENV_URLS[currentEnv];

    // Update when selection changes
    envSelect.addEventListener('change', () => {
      const selectedEnv = envSelect.value as 'test' | 'production';
      wizard.setEnvironment(selectedEnv);
      envUrl.textContent = ENV_URLS[selectedEnv];
    });
  }

  // Setup credentials inputs
  const usernameInput = document.getElementById('username') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  if (usernameInput && passwordInput) {
    // Update wizard credentials when inputs change
    usernameInput.addEventListener('input', () => {
      wizard.setCredentials(usernameInput.value, passwordInput.value);
    });

    passwordInput.addEventListener('input', () => {
      wizard.setCredentials(usernameInput.value, passwordInput.value);
    });
  }
});
