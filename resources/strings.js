const strings = {
  footer: {
    back: "Back",
    start: "Get started",
    next: "Continue",
    restart: "Restart"
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
  },
  activitySource: {
    alert: "Mmmmm... It appears you are not yet connected to Strava",
    loggedIn: {
        text: "Hello",
        button: "Please log in"
    },
    notLoggedIn: {
        text: "Please log in",
        button: "Connect to Strava"
    }
  },
  completion: {
      succes: "Congrats!",
      fail: "Try again..."
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
      }
  },
  landing: {
    new: {
      text: "New to CommitPool?",
      button: "New user",
    },
    reconnect: {
      text: "Used CommitPool before?",
      button: "Reconnect",
    },
    getStarted: {
      text: "Get Started",
      button: "Get Started",
    }
  },
  login: {
      alert: "Mmmmm... It appears you are not yet connected to a wallet",
      select: {
          torus: "Login",
          metamask: "MetaMask"
      }

  },
  intro: {
    text: "Intropage",
  },
  staking: {
      alert: "Wut?! It appears you're not staking?",
      text: "How much do you want to stake?"
  },
  track: {
      alert: "Commitment not yet complete, keep it up!",
      tracking: {
          text: "You've committed to the following:",
          activity: "You intend to",
          distance: "for",
          startDate: "from",
          stake: "And staked"
      }
  }
};

export default strings;
