const mainQuery = `query Leaderboard {
  overall1: statistic(key: "trophies") {
    leaderboard(amount: 50, offset: 0) {
      player {
        uuid
        username
        ranks
        levels: crownLevel {
          crownLevel: levelData {
            evolution
          }
        }
      }
      rank
      value
    }
  }
  overall2: statistic(key: "trophies") {
    leaderboard(amount: 50, offset: 50) {
      player {
        uuid
        username
        ranks
        levels: crownLevel {
          crownLevel: levelData {
            evolution
          }
        }
      }
      rank
      value
    }
  }

  skill1: statistic(key: "trophies_skill") {
    leaderboard(amount: 50, offset: 0) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }
  skill2: statistic(key: "trophies_skill") {
    leaderboard(amount: 50, offset: 50) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }

  style1: statistic(key: "trophies_style") {
    leaderboard(amount: 50, offset: 0) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }
  style2: statistic(key: "trophies_style") {
    leaderboard(amount: 50, offset: 50) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }

  fishing1: statistic(key: "trophies_fishing") {
    leaderboard(amount: 50, offset: 0) {
      player {
        uuid
        username
        ranks
        levels: crownLevel {
          fishingLevel: fishingLevelData {
            evolution
          }
        }
      }
      rank
      value
    }
  }
  fishing2: statistic(key: "trophies_fishing") {
    leaderboard(amount: 50, offset: 50) {
      player {
        uuid
        username
        ranks
        levels: crownLevel {
          fishingLevel: fishingLevelData {
            evolution
          }
        }
      }
      rank
      value
    }
  }

  bonus1: statistic(key: "trophies_bonus") {
    leaderboard(amount: 50, offset: 0) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }
  bonus2: statistic(key: "trophies_bonus") {
    leaderboard(amount: 50, offset: 50) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }
  
  reputation1: statistic(key: "royal_reputation") {
    leaderboard(amount: 50, offset: 0) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }
  reputation2: statistic(key: "royal_reputation") {
    leaderboard(amount: 50, offset: 50) {
      player {
        uuid
        username
        ranks
      }
      rank
      value
    }
  }
}`;

module.exports = {
	mainQuery,
};
