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

const factionQuery = `query Factions {
  factionLeaderboard {
    name
    rank
    value
  }
  RED_RABBITS1: statistic(key: "faction_red") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  RED_RABBITS2: statistic(key: "faction_red") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  ORANGE_OCELOTS1: statistic(key: "faction_orange") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  ORANGE_OCELOTS2: statistic(key: "faction_orange") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  YELLOW_YAKS1: statistic(key: "faction_yellow") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  YELLOW_YAKS2: statistic(key: "faction_yellow") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  GREEN_GECKOS1: statistic(key: "faction_green") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  GREEN_GECKOS2: statistic(key: "faction_green") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  LIME_LLAMAS1: statistic(key: "faction_lime") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  LIME_LLAMAS2: statistic(key: "faction_lime") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  CYAN_COYOTES1: statistic(key: "faction_cyan") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  CYAN_COYOTES2: statistic(key: "faction_cyan") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  BLUE_BATS1: statistic(key: "faction_blue") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  BLUE_BATS2: statistic(key: "faction_blue") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  AQUA_AXOLOTLS1: statistic(key: "faction_aqua") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  AQUA_AXOLOTLS2: statistic(key: "faction_aqua") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  PINK_PARROTS1: statistic(key: "faction_pink") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  PINK_PARROTS2: statistic(key: "faction_pink") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  PURPLE_PANDAS1: statistic(key: "faction_purple") {
    leaderboard(amount: 50, offset: 0) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
  PURPLE_PANDAS2: statistic(key: "faction_purple") {
    leaderboard(amount: 50, offset: 50) {
      player {
        username
        uuid
      }
      rank
      value
    }
  }
}`

const exchangeQuery = `query IslandExchange {
  soldIslandExchangeListings {
    asset{
      name
      rarity
      __typename
    }
    amount
    cost
    endTime
    identifier
  }
}`

module.exports = {
	mainQuery,
  factionQuery,
  exchangeQuery
};
