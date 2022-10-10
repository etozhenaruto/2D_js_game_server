const Character = require("/.Character")

class CharacterList {

    characters = [
        new Character(Odin,20,3),
        new Character(Swain,25,2),
        new Character(Bogdan,2,15),
        new Character(SpiderMan,14,2)
    ]

    getCharacters(){
        return this.characters
    }
}
module.exports = CharacterList