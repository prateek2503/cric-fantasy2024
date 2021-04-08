import _ from "lodash";

const Calculation = function () {
    this.calculate = function (team, players) {
        let winnerList = players.filter(player =>
         player.team == team
        );
        let looserList = players.filter(player =>
            player.team != team
        );
        let lostPoint = 0;
        let winnerPoint = 0;
        lostPoint = looserList.reduce(looser => lostPoint+= looser.point);
        winnerPoint = winnerList.reduce(winner => winnerPoint+= winner.point);

        winnerList.forEach(function (winner) {
            winner.point = (winner.point*lostPoint)/winnerPoint
        })
    }
};
