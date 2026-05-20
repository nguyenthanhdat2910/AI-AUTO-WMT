export const viewQuestListData = {
  paths: {
    home: process.env.WMT_HOME_PATH || '/en/dashboard/instant/mt5',
    tournamentDetail:
      process.env.WMT_TOURNAMENT_DETAIL_PATH ||
      process.env.VIEW_QUEST_LIST_TOURNAMENT_PATH ||
      '',
    emptyTournamentDetail: process.env.WMT_EMPTY_TOURNAMENT_DETAIL_PATH,
  },
  titles: {
    firstQuest: process.env.WMT_QUEST_FIRST_TITLE || 'TNM00033 Quest',
    secondQuest: process.env.WMT_QUEST_SECOND_TITLE || 'TNM00036',
    sampleQuest: process.env.WMT_QUEST_SAMPLE_TITLE || 'TNM00033 Quest',
  },
  descriptions: {
    sampleQuest:
      process.env.WMT_QUEST_SAMPLE_DESCRIPTION ||
      'Check this quest di',
  },
  evidence: {
    proofLink: process.env.WMT_QUEST_PROOF_LINK || 'example.com/proof',
    maxLengthOverflow: 'example.com/' + 'a'.repeat(989),
  },
  messages: {
    requiredImage: 'Please upload your evidence.',
    invalidFormat: 'Invalid file format',
    imageQuantityExceeded: 'Exceeded the maximum quantities of images',
    maxFileSize: '5MB',
    requiredLink: 'Please enter the URL for your proof or evidence.',
    linkMaxLength: 'You cannot enter link more than 1000 characters.',
    linkTooltip: 'This link will strengthen your evidence, making it more credible',
    submitSuccess: 'Your request has been submitted. It may take up 24 hours to verify.',
    submitFailed: 'Submit failed, please try again',
    approvedQuest:
      'This quest has been approved. Please continue completing the remaining tasks before the tournament begins.',
  },
};
