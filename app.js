new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    onlinePlayerHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.onlinePlayerHealth = 100;
      this.turns = [];
      this.selfAccuracy = 0.85;
      this.anotherAccuracy = 0.95;
    },
    attack: function() {
      var personRand = Math.random();

      if (personRand <= this.selfAccuracy) {
        var damage = this.calculateDamage(4, 9);
        this.onlinePlayerHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: "You deal " + damage + " damage to Online Player"
        });
        if (this.checkWin()) {
          return;
        }
      } else {
        this.turns.unshift({
          isPlayer: true,
          text: "You missed"
        });
      }

      this.monsterAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(8, 15);
      this.onlinePlayerHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "You deal special " + damage + " damage to Online Player"
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      if (this.playerHealth <= 93) {
        this.playerHealth += 7;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "You heals for 7"
      });
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      var anotherRand = Math.random();

      if (anotherRand <= this.selfAccuracy) {
        var damage = this.calculateDamage(5, 11);
        this.playerHealth -= damage;
        this.checkWin();
        this.turns.unshift({
          isPlayer: false,
          text: "Online Player deals " + damage + " damage to You"
        });
      } else {
        this.turns.unshift({
          isPlayer: false,
          text: "Another missed"
        });
      }
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.onlinePlayerHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
