"use strict";
class Player {
  constructor(name, id, index) {
    this.name = name;
    this.id = id;
    this.index = index;
  }
  isName(name) {
    return this.name == name;
  }
  isId(id) {
    return this.id == id;
  }
}
module.exports = Player;
