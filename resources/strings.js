const strings = {
  footer: {
    back: "Back",
    help: "?",
    next: "Continue",
    restart: "Restart",
    start: "Get started",
  },
  activityGoal: {
    alert:
      "Ooops! There is something wrong with your commitment :( please check values",
    setUp: {
      text: "Set up your commitment",
      activitySelector: "Activity",
      distanceSelector: "Distance",
      startDate: "Start date",
      endDate: "End date",
    },
    help: "Define the activity and measurement of success you are committing to. Don't worry, you can always change some values before comfirming.",
  },
  activitySource: {
    alert: "Mmmmm... It appears you are not yet connected to Strava",
    loggedIn: {
      text: "Hello",
      button: "Log out",
    },
    notLoggedIn: {
      text: "Please log in",
      button: "Connect to Strava",
    },
  },
  completion: {
    success: "Congrats!",
    fail: "Try again...",
  },
  confirmation: {
    alert: "Something is wrong with your commitment, please check values",
    commitment: {
      text: "You set up the following commitment",
      activity: "You're going to",
      distance: "for",
      startDate: "starting",
      endDate: "and completing before",
      stake: "And you're staking the following amount",
    },
  },
  faq: {
    strava: "We use Strava to get...",
    dai: "DAI is a decentralized stablecoin that we use to..",
    staking: "When you commit DAI to an activity measured via Strava.."
  },
  landing: {
    intro: "Hello.. lorem. ipsum. lala.",
    new: {
      button: "Get started",
    },
    reconnect: {
      button: "Connect wallet",
    },
  },
  login: {
    alert: "Mmmmm... It appears you are not yet connected to a wallet",
    select: {
      torus: "Login using Torus",
      metamask: "Connect MetaMask",
    },
  },
  intro: {
    text: "Intropage",
  },
  staking: {
    alert: "Wut?! It appears you're not staking anything?",
    text: "How much do you want to stake?",
    textHigh: (amount) => {`You're staking ${amount} DAI. That's a big commitment!`}
  },
  track: {
    alert: "Commitment not yet complete, keep it up!",
    tracking: {
      text: "You've committed to the following:",
      activity: "You intend to",
      distance: "for",
      startDate: "from",
      stake: "And staked",
    },
  },
};

export default strings;
