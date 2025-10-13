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
}`;

const hitwQuery = `query Leaderboard {
  first_place1: statistic(key: "hole_in_the_wall_first_place") {
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
  first_place2: statistic(key: "hole_in_the_wall_first_place") {
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

  top_three1: statistic(key: "hole_in_the_wall_top_three") {
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
  top_three2: statistic(key: "hole_in_the_wall_top_three") {
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

  walls_dodged1: statistic(key: "hole_in_the_wall_walls_dodged") {
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
  walls_dodged2: statistic(key: "hole_in_the_wall_walls_dodged") {
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
}`;

const pkSoloQuery = `query Leaderboard {
  medals_banked1: statistic(key: "pw_solo_medals_banked") {
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
  medals_banked2: statistic(key: "pw_solo_medals_banked") {
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
  
  total_medals_banked1: statistic(key: "pw_solo_total_medals_banked") {
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
  total_medals_banked2: statistic(key: "pw_solo_total_medals_banked") {
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
}`;

const pwSurvivorQuery = `query Leaderboard {
  players_eliminated1: statistic(key: "pw_survival_players_eliminated") {
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
  players_eliminated2: statistic(key: "pw_survival_players_eliminated") {
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
  
  final_duel_wins1: statistic(key: "pw_survival_final_duel_wins") {
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
  final_duel_wins2: statistic(key: "pw_survival_final_duel_wins") {
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
  
  leap_4_completion1: statistic(key: "pw_survival_leap_4_completion") {
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
  leap_4_completion2: statistic(key: "pw_survival_leap_4_completion") {
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
  
  leap_7_completion1: statistic(key: "pw_survival_leap_7_completion") {
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
  leap_7_completion2: statistic(key: "pw_survival_leap_7_completion") {
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
}`;

const bbQuery = `query Leaderboard {
  team_rounds_won1: statistic(key: "battle_box_quads_team_rounds_won") {
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
  team_rounds_won2: statistic(key: "battle_box_quads_team_rounds_won") {
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

  team_first_place1: statistic(key: "battle_box_quads_team_first_place") {
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
  team_first_place2: statistic(key: "battle_box_quads_team_first_place") {
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

  players_killed1: statistic(key: "battle_box_quads_players_killed") {
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
  players_killed2: statistic(key: "battle_box_quads_players_killed") {
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
}
`;

const sbQuery = `query Leaderboard {
  survival_top_three1: statistic(key: "sky_battle_quads_survival_top_three") {
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
  survival_top_three2: statistic(key: "sky_battle_quads_survival_top_three") {
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

  survival_first_place1: statistic(key: "sky_battle_quads_survival_first_place") {
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
  survival_first_place2: statistic(key: "sky_battle_quads_survival_first_place") {
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

  players_killed1: statistic(key: "sky_battle_quads_players_killed") {
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
  players_killed2: statistic(key: "sky_battle_quads_players_killed") {
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
}
`;

const tgttosQuery = `query Leaderboard {
  top_three1: statistic(key: "tgttos_top_three") {
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
  top_three2: statistic(key: "tgttos_top_three") {
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

  first_place1: statistic(key: "tgttos_first_place") {
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
  first_place2: statistic(key: "tgttos_first_place") {
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

  chickens_punched1: statistic(key: "tgttos_chickens_punched") {
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
  chickens_punched2: statistic(key: "tgttos_chickens_punched") {
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

  round_first_place1: statistic(key: "tgttos_round_first_place") {
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
  round_first_place2: statistic(key: "tgttos_round_first_place") {
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
}
`;

const dynaballQuery = `query Leaderboard {
  wins1: statistic(key: "dynaball_wins") {
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
  wins2: statistic(key: "dynaball_wins") {
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

  players_eliminated1: statistic(key: "dynaball_players_eliminated") {
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
  players_eliminated2: statistic(key: "dynaball_players_eliminated") {
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

  blocks1: statistic(key: "dynaball_blocks_destroyed") {
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
  blocks2: statistic(key: "dynaball_blocks_destroyed") {
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

  survive1: statistic(key: "dynaball_survive_2m") {
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
  survive2: statistic(key: "dynaball_survive_2m") {
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
}
`;

const rocketQuery = `query Leaderboard {
  kills1: statistic(key: "rocket_spleef_kills") {
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
  kills2: statistic(key: "rocket_spleef_kills") {
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

  first1: statistic(key: "rocket_spleef_first_place") {
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
  first2: statistic(key: "rocket_spleef_first_place") {
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

  topFive1: statistic(key: "rocket_spleef_top_five") {
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
  topFive2: statistic(key: "rocket_spleef_top_five") {
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

  survive1: statistic(key: "rocket_spleef_survive_60s") {
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
  survive2: statistic(key: "rocket_spleef_survive_60s") {
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

  hits1: statistic(key: "rocket_spleef_direct_hits") {
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
  hits2: statistic(key: "rocket_spleef_direct_hits") {
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
}
`;

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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
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
        ranks
      }
      rank
      value
    }
  }
}`

module.exports = {
	mainQuery,
	hitwQuery,
	pkSoloQuery,
	pwSurvivorQuery,
	bbQuery,
	sbQuery,
	tgttosQuery,
	dynaballQuery,
	rocketQuery,
  factionQuery
};
