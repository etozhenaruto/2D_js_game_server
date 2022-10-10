class CharacterCard {
    name
    HP
    damage

    selectedByUserID = null
    constructor({ name, HP, damage }) {
        this.name = name
        this.HP = HP
        this.damage = damage
    }

    selectCardByUserID(userID) {
        this.selectedByUserID = userID
    }

}

module.exports = CharacterCard