function validateLineup(lineup) {
  const validSalarys = calcTotalSalary(lineup)
  const validTeams = getTeamCount(lineup)
  const validGames = getGameCount(lineup)
  const validPosition = getPositionCount(lineup)

  return validSalarys && validTeams && validGames && validPosition
}

function getTeamCount(lineup) {
  const playersPerTeam = lineup.reduce((teams, player) => {
    teams[player.teamId] = teams[player.teamId] ? teams[player.teamId] + 1 : 1

    return teams
  })

  return !Object.values(playersPerTeam).some((teamLimit) => { return teamLimit > 2 })
}

function getGameCount(lineup) {
  const playersPerGame = lineup.reduce((games, player) => {
    games[player.gameId] = games[player.gameId] ? 1 : games[player.gameId] + 1

    return games
  })

  return !Object.values(playersPerGame).some((gameLimit) => { return gameLimit > 3 })
}

function getPositionCount(lineup) {
  const singlePositions = ['P', 'C', '1B', '2B', '3B', 'SS']
  const allPositions = lineup.reduce((position, player) => {
    position[player.position] = position[player.position] ? 1 : position[player.position] + 1

    return position
  })

  for (let position in allPositions) {
    if (position === 'OF' && allPositions[position] !== 3) {
      return false
    } else if (singlePositions.includes(position) && allPositions[position] !== 1) { return false }
  }

  return true
}

function calcTotalSalary(lineup) {
  const totalSalary = lineup.reduce((salary, player) => {
    return salary + player.salary
  }, 0)

  return totalSalary <= 45000
}

module.exports = validateLineup
