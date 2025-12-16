const { SweetRepository } = require("../repositories");
const redis = require("../config/redis-config");

const sweetRepository = new SweetRepository();



async function addSweet(data){
    try{
        const sweet = await sweetRepository.create(data);
        await redis.del('sweets:all'); // Invalidate cache
        return sweet;
    }
    catch(error){
        throw error;
    }
}

async function listSweets(){
    try{
        // Check cache first
        const cachedSweets = await redis.get('sweets:all');
        if (cachedSweets) {
            console.log('Cache Hit');
            return cachedSweets;
        }

        const sweets = await sweetRepository.findAll();
        // Cache for 1 hour
        await redis.set('sweets:all', JSON.stringify(sweets), { ex: 3600 });
        console.log('Cache Miss');
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
        await redis.del('sweets:all'); // Invalidate cache
        return sweet;
    }
    catch(error){
        throw error;
    }
}

async function deleteSweet(id){
    try{
        const sweet = await sweetRepository.delete(id);
        await redis.del('sweets:all'); // Invalidate cache
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
        await redis.del('sweets:all'); // Invalidate cache
        return sweet;
    }
    catch(error){
        throw error;
    }
}
async function purchaseSweet(id, quantity) {
  const sweetRepository = new SweetRepository();

  const sweet = await sweetRepository.findById(id);
  if (!sweet) {
    throw new Error("Sweet not found");
  }

  if (sweet.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  const updatedSweet = {
    ...sweet,
    quantity: sweet.quantity - quantity,
  };

  await sweetRepository.update(id, updatedSweet);
  await redis.del('sweets:all'); // Invalidate cache
  return updatedSweet;
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

