export const pipelineStages = [
  {
    stage: 'A',
    title: 'Structural & Data Preparation',
    methods: 'LC-MS reconstruction, RDKit, Open Babel, UniProt, PDB, AlphaFold, SWISS-MODEL',
    whatWeDo: 'Build accurate 3D structures of compounds and target proteins.',
    whyItMatters:
      'We digitally recreate your molecules and targets so they can be tested on a computer before lab work.',
  },
  {
    stage: 'B',
    title: 'Structure-Based Drug Design',
    methods: 'Active site mapping, grid generation, binding pocket analysis',
    whatWeDo: 'Identify where and how molecules can bind to proteins.',
    whyItMatters:
      'We find the exact lock on the protein where your molecule can fit.',
  },
  {
    stage: 'C',
    title: 'Ligand-Based Drug Design',
    methods: 'QSAR modeling, similarity screening, descriptor engineering',
    whatWeDo: 'Analyze known active compounds to predict new ones.',
    whyItMatters:
      'We learn patterns from active compounds to predict which new ones will work best.',
  },
  {
    stage: 'D',
    title: 'Pharmacophore Modeling',
    methods: 'Ligand- and structure-based pharmacophores, validation with ROC and EF',
    whatWeDo: 'Identify essential chemical features required for activity.',
    whyItMatters:
      'We define the essential features a molecule must have to be effective.',
  },
  {
    stage: 'E',
    title: 'Molecular Docking & Scoring',
    methods: 'HTVS, SP, XP docking, interaction analysis',
    whatWeDo: 'Simulate binding between molecules and targets.',
    whyItMatters:
      'We test how strongly your compounds bind to targets like trial runs before experiments.',
  },
  {
    stage: 'F',
    title: 'Binding Free Energy Estimation',
    methods: 'MM-GBSA, energy decomposition',
    whatWeDo: 'Quantify binding strength more accurately.',
    whyItMatters:
      'We calculate how stable and effective each interaction is.',
  },
  {
    stage: 'G',
    title: 'Molecular Dynamics Simulations',
    methods: 'Desmond, RMSD, RMSF, Rg, H-bonds',
    whatWeDo: 'Simulate real-time movement of protein-ligand complexes.',
    whyItMatters:
      'We check if the molecule stays bound over time under realistic conditions.',
  },
  {
    stage: 'H',
    title: 'Fragment-Based Drug Design',
    methods: 'Fragment extraction, recombination',
    whatWeDo: 'Break molecules into pieces and rebuild improved versions.',
    whyItMatters:
      'We redesign molecules piece-by-piece to make them more effective.',
  },
  {
    stage: 'I',
    title: 'RECAP Analysis',
    methods: 'Fragmentation, combinatorial library generation',
    whatWeDo: 'Generate synthetically feasible molecules.',
    whyItMatters:
      'We ensure designed molecules can actually be made in the lab.',
  },
  {
    stage: 'J',
    title: 'Bioisosteric Replacement',
    methods: 'Functional group substitution strategies',
    whatWeDo: 'Replace parts of molecules to improve performance.',
    whyItMatters:
      'We swap parts of molecules to make them safer, stronger, or more stable.',
  },
  {
    stage: 'K',
    title: 'ADMET & Drug-Likeness',
    methods: 'SwissADME, pkCSM, ProTox-II, Lipinski rules',
    whatWeDo: 'Predict absorption, toxicity, and metabolism.',
    whyItMatters:
      'We check if compounds are safe and usable in real-world conditions.',
  },
  {
    stage: 'L',
    title: 'Machine Learning & AI',
    methods: 'Python, RDKit, Scikit-learn, XGBoost, deep learning',
    whatWeDo: 'Build predictive models for classification and regression.',
    whyItMatters:
      'We train computers to predict which molecules will work best faster than trial-and-error.',
  },
  {
    stage: 'M',
    title: 'Model Validation & Benchmarking',
    methods: 'ROC-AUC, RMSE, cross-validation',
    whatWeDo: 'Evaluate model accuracy and reliability.',
    whyItMatters:
      'We ensure predictions are trustworthy and scientifically valid.',
  },
  {
    stage: 'N',
    title: 'Hybrid ML–Docking Pipeline',
    methods: 'ML plus docking integration',
    whatWeDo: 'Combine physics-based and data-driven predictions.',
    whyItMatters:
      'We use both simulation and AI to make smarter decisions.',
  },
  {
    stage: 'O',
    title: 'AI-Driven Lead Optimization',
    methods: 'Generative AI, molecular mutation, optimization loops',
    whatWeDo: 'Automatically design improved molecules.',
    whyItMatters:
      'We use AI to create better versions of your compounds efficiently.',
  },
  {
    stage: 'P',
    title: 'Virtual Screening & Lead Prioritization',
    methods: 'Library screening, ranking algorithms',
    whatWeDo: 'Screen large compound libraries and rank best candidates.',
    whyItMatters:
      'We quickly identify the most promising compounds from thousands of options.',
  },
];

export const servicePackages = [
  {
    title: 'Premium Elite Discovery Suite',
    audience: 'Publication-grade, grant-level, industrial research',
    description:
      'Full AI-driven discovery pipeline with publication-ready outputs, deep mechanistic interpretation, and extended support.',
    highlights: [
      'Homology modelling plus target preparation, library generation, and stereoisomer investigation',
      'HTVS -> SP -> XP docking with refined iterative workflows',
      'Advanced MM-GBSA estimation, decomposition analysis, and 200 ns MD simulations',
      'Advanced validated pharmacophore, full QSAR, ML classification and regression, hybrid ML-docking, and AI lead optimization',
    ],
    publicationReadiness: 'High',
    deliverablesQuality: 'Full technical dossier plus publication figures',
    revisionSupport: 'Extended until submission-ready',
    timeline: '10 to 14 weeks',
    engagementFee: 'Request a tailored quote',
  },
  {
    title: 'Intermediate Advanced Analytics',
    audience: 'MSc/PhD-level research, structured analysis',
    description:
      'Deeper modeling with mechanistic insights, structured analysis, and moderate publication readiness.',
    highlights: [
      'Full ligand and target preparation with stereoisomer investigation',
      'HTVS plus SP plus XP docking with standard MM-GBSA estimation and 100 ns MD simulations',
      'Preliminary pharmacophore, concise QSAR, standard ADMET screening, and introductory ML',
      'Structured scientific report with standard revision support',
    ],
    publicationReadiness: 'Moderate',
    deliverablesQuality: 'Structured scientific report',
    revisionSupport: 'Standard',
    timeline: '5 to 7 weeks',
    engagementFee: 'Request a tailored quote',
  },
  {
    title: 'Preliminary Screening & Interaction',
    audience: 'Preliminary evaluation, feasibility studies',
    description:
      'Fast, cost-effective computational evaluation focused on early interaction insight and feasibility screening.',
    highlights: [
      'Ligand and target preparation for rapid exploratory work',
      'HTVS plus SP plus XP docking with standard MM-GBSA estimation',
      'Preliminary ADMET screening and concise technical reporting',
      'A clean starting point for teams that may later expand into deeper ICAD workflows',
    ],
    publicationReadiness: 'Limited',
    deliverablesQuality: 'Concise technical report',
    revisionSupport: 'Limited',
    timeline: '2 to 3 weeks',
    engagementFee: 'Request a tailored quote',
  },
];

export const packageComparisonRows = [
  {
    label: 'Structural Preparation',
    values: [
      'Homology modelling, target preparation, library generation, stereoisomer investigation',
      'Full ligand and target preparation with stereoisomer investigation',
      'Ligand and target preparation',
    ],
  },
  {
    label: 'Molecular Docking',
    values: ['HTVS -> SP -> XP plus refined iterative workflows', 'HTVS + SP + XP', 'HTVS + SP + XP'],
  },
  {
    label: 'Binding Free Energy',
    values: ['Advanced MM-GBSA with decomposition analysis', 'Standard MM-GBSA estimation', 'Standard MM-GBSA estimation'],
  },
  {
    label: 'Molecular Dynamics',
    values: ['200 ns simulations with deep analysis', '100 ns simulations', 'Not included'],
  },
  {
    label: 'Pharmacophore Modeling',
    values: ['Advanced validated models with EF, ROC, BEDROC', 'Preliminary', 'Not included'],
  },
  {
    label: 'Ligand-Based Design',
    values: ['Full QSAR and descriptor engineering', 'Concise', 'Not included'],
  },
  {
    label: 'ADMET Prediction',
    values: ['Advanced profiling and interpretation', 'Standard screening', 'Preliminary screening'],
  },
  {
    label: 'Machine Learning',
    values: ['Full ML pipeline for classification and regression', 'Introductory single-model approach', 'Not included'],
  },
  {
    label: 'Hybrid ML-Docking',
    values: ['Included', 'Not included', 'Not included'],
  },
  {
    label: 'AI-Driven Lead Optimization',
    values: ['Included', 'Not included', 'Not included'],
  },
  {
    label: 'Revision Support',
    values: ['Extended until submission-ready', 'Standard', 'Limited'],
  },
  {
    label: 'Timeline',
    values: ['10 to 14 weeks', '5 to 7 weeks', '2 to 3 weeks'],
  },
];

export const coreServices = [
  'QSAR & Machine Learning Models',
  'Generative Modelling',
  'Structure-based Drug Design',
  'Ligand-based Drug Design',
  'Fragment-based Drug Design',
  'Pharmacophore Modeling',
  'Molecular Docking & Virtual Screening',
  'Molecular Dynamics Simulations',
  'Binding Free Energy Calculations (MM-GBSA)',
  'Pharmacokinetic, Absorption, Distribution, Metabolism, Excretion and Toxicity Analysis',
  'AI-Driven Lead Optimization',
  'Retrosynthetic Combinatorial Analysis Procedure',
  'Molecular visualization and binding interaction analysis',
];

export const industriesServed = [
  'Pharmaceutical & Biotech',
  'Agrochemical & Bioinsecticide Development',
  'Academic Research Institutions',
  'Chemical & Material Science Industries',
];
