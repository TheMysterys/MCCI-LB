const query =  `query Leaderboard {
  overall1: statistic(key: "trophies") {
    leaderboard(amount: 50, offset: 0) {
      player {
        uuid
        username
        ranks
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
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
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
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
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
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
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
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
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
      }
      rank
      value
    }
  }
}` 

module.exports = {
    query
}