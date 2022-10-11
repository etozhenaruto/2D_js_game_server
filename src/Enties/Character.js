class Character{
    name
    hp
    damage

    life = true
    constructor({name,hp,damage}){
        this.name = name
        this.hp = hp
        this.damage= damage
    }

    constructor(name,hp){
        this.name = name 
        this.hp = hp
    }
}
module.exports = Character