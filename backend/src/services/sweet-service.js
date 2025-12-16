const { SweetRepository } = require("../repositories");

const sweetRepository = new SweetRepository();



async function addSweet(data){
    try{
        const sweet = await sweetRepository.create(data);
        return sweet;
    }
    catch(error){
        throw error;
    }
}

async function listSweets(){
    try{
        const sweets = await sweetRepository.findAll();
        return sweets;
    }
    catch(error){
        throw error;
    }
}

async function searchSweets(filters){
    try{
        const sweets = await sweetRepository.search(filters);
        return sweets;
    }
    catch(error){
        throw error;
    }
}

async function updateSweet(id, data){
    try{
        const sweet = await sweetRepository.update(id, data);
        return sweet;
    }
    catch(error){
        throw error;
    }
}

async function deleteSweet(id){
    try{
        const sweet = await sweetRepository.delete(id);
        return sweet;
    }
    catch(error){
        throw error;
    }
}

async function restockSweet(id, quantity){
    try{
        const sweet = await sweetRepository.findById(id);
        if(!sweet){
            throw new Error("Sweet not found");
        }
        sweet.quantity += quantity;
        await sweetRepository.update(id, sweet);
        return sweet;
    }
    catch(error){
        throw error;
    }
}

async function purchaseSweet(id, quantity){
    const sweet = await sweetRepository.findById(id);
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
  addSweet,
  listSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  restockSweet
};

