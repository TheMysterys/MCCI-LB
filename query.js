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
  first1: statistic(key: "hole_in_the_wall_first_place") {
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
  first2: statistic(key: "hole_in_the_wall_first_place") {
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

  topThree1: statistic(key: "hole_in_the_wall_top_three") {
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
  topThree2: statistic(key: "hole_in_the_wall_top_three") {
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

  walls1: statistic(key: "hole_in_the_wall_walls_dodged") {
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
  walls2: statistic(key: "hole_in_the_wall_walls_dodged") {
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
  medals1: statistic(key: "pw_solo_medals_banked") {
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
  medals2: statistic(key: "pw_solo_medals_banked") {
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
  
  totalMedals1: statistic(key: "pw_solo_total_medals_banked") {
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
  totalMedals2: statistic(key: "pw_solo_total_medals_banked") {
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
  outlive1: statistic(key: "pw_survival_players_eliminated") {
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
  outlive2: statistic(key: "pw_survival_players_eliminated") {
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
  
  duel1: statistic(key: "pw_survival_final_duel_wins") {
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
  duel2: statistic(key: "pw_survival_final_duel_wins") {
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
  
  leapFour1: statistic(key: "pw_survival_leap_4_completion") {
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
  leapFour2: statistic(key: "pw_survival_leap_4_completion") {
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
  
  leapSeven1: statistic(key: "pw_survival_leap_7_completion") {
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
  leapSeven2: statistic(key: "pw_survival_leap_7_completion") {
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
  team1: statistic(key: "battle_box_quads_team_rounds_won") {
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
  team2: statistic(key: "battle_box_quads_team_rounds_won") {
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

  first1: statistic(key: "battle_box_quads_team_first_place") {
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
  first2: statistic(key: "battle_box_quads_team_first_place") {
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

  kills1: statistic(key: "battle_box_quads_players_killed") {
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
  kills2: statistic(key: "battle_box_quads_players_killed") {
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
  topThree1: statistic(key: "sky_battle_quads_survival_top_three") {
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
  topThree2: statistic(key: "sky_battle_quads_survival_top_three") {
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

  first1: statistic(key: "sky_battle_quads_survival_first_place") {
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
  first2: statistic(key: "sky_battle_quads_survival_first_place") {
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

  kills1: statistic(key: "sky_battle_quads_players_killed") {
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
  kills2: statistic(key: "sky_battle_quads_players_killed") {
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
  topThree1: statistic(key: "tgttos_top_three") {
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
  topThree2: statistic(key: "tgttos_top_three") {
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

  first1: statistic(key: "tgttos_first_place") {
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
  first2: statistic(key: "tgttos_first_place") {
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

  chickens1: statistic(key: "tgttos_chickens_punched") {
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
  chickens2: statistic(key: "tgttos_chickens_punched") {
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

  rounds1: statistic(key: "tgttos_round_first_place") {
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
  rounds2: statistic(key: "tgttos_round_first_place") {
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

  kills1: statistic(key: "dynaball_players_eliminated") {
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
  kills2: statistic(key: "dynaball_players_eliminated") {
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
};
