const { SweetRepository } = require("../repositories");

const sweetRepository = new SweetRepository();

async function purchaseSweet(id, quantity){
    const sweet = await sweetRepository.findById(id);
    console.log(sweet);
    if(!sweet){
        throw new Error("Sweet not found");
    }
    if(sweet.quantity < quantity){
        throw new Error("Insufficient stock");
    }
    sweet.quantity -= quantity;
    await sweetRepository.update(id, sweet);
}

module.exports = {
  purchaseSweet,
};

