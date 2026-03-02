import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: '🚀 Introdução',
    },
    {
      type: 'category',
      label: '📚 Primeiros Passos',
      items: [
        'installation',
        'usage',
      ],
    },
    {
      type: 'category',
      label: '🔧 Funcionalidades Avançadas',
      items: [
        'headers',
        'cookies',
        'status-code-e-rotas-literais',
      ],
    },
    {
      type: 'doc',
      id: 'examples',
      label: '💡 Exemplos Práticos',
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
