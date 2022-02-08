const houses = require('./db.json')
let upcomingHouseID = 4 
console.log(houses)

module.exports = {
    getHouses: (req, res)=>{
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        let {id} = req.params
        let index = houses.findIndex(elem => elem.id === +id)
        houses.splice(index, 1)

        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body
        let newHouse = {
            id: upcomingHouseID,
            address,
            price , 
            imageURL   
        }
        houses.push(newHouse)
        res.status(200).send(houses)
    
    },
    updateHouse:(req, res) => {
        let {id} = req.params
        let index = houses.findIndex(elem => elem.id === +id)
        let {type} = req.body
        let updatedHouse = houses[index]
        
        if(updatedHouse.price <= 10000 && type === 'minus'){
            updatedHouse.price = 0
            res.status(200).send(houses)
        }
        else if(type === 'plus'){
            updatedHouse.price += 10000
            res.status(200).send(houses)
        }
        else if(type === 'minus'){
            updatedHouse.price -=10000
            res.status(200).send(houses)
        }else{
            res.status(400).send('you did st wrong')
        }

    }
}