import _ from "lodash";

const personArray = [
    {
        id: '1',
        firstName: 'Bill',
        lastName: 'Gates'
    },
    {
        id: '2',
        firstName: 'Steve',
        lastName: 'Jobs'
    },
    {
        id: '3',
        firstName: 'Linux',
        lastName: 'Torvalds'
    }
]

const cars = [
    {
        id: '1',
        year: '2019',
        make: 'Toyota',
        model: 'Corolla',
        price: '40000',
        personId: '1'
    },
    {
        id: '2',
        year: '2018',
        make: 'Lexus',
        model: 'LX 600',
        price: '13000',
        personId: '1'
    },
    {
        id: '3',
        year: '2017',
        make: 'Honda',
        model: 'Civic',
        price: '20000',
        personId: '1'
    },
    {
        id: '4',
        year: '2019',
        make: 'Acura ',
        model: 'MDX',
        price: '60000',
        personId: '2'
    },
    {
        id: '5',
        year: '2018',
        make: 'Ford',
        model: 'Focus',
        price: '35000',
        personId: '2'
    },
    {
        id: '6',
        year: '2017',
        make: 'Honda',
        model: 'Pilot',
        price: '45000',
        personId: '2'
    },
    {
        id: '7',
        year: '2019',
        make: 'Volkswagen',
        model: 'Golf',
        price: '40000',
        personId: '3'
    },
    {
        id: '8',
        year: '2018',
        make: 'Kia',
        model: 'Sorento',
        price: '45000',
        personId: '3'
    },
    {
        id: '9',
        year: '2017',
        make: 'Volvo',
        model: 'XC40',
        price: '55000',
        personId: '3'
    }
]

const typeDefs = `
    type Person {
        id: String!
        firstName: String!
        lastName: String!
    }

    type Car {
        id: ID!
        year: String!
        make: String!
        model: String!
        price: String!
        personId: String!
    }

    type Query {
        person(id: String!): Person
        persons: [Person]
        car(id: String!): Car
        cars: [Car]
    }

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): Person
        updatePerson(id: String!, firstName: String, lastName: String): Person
        removePerson(id: String!): Person
    }
`

const resolvers = {
    Query: {
        person(root, args) {
            return _.find(personArray, { id: args.id })
        },
        persons:() => personArray,
        
        car: (root, args) => {
            const foundCar = _.find(carArray, { id: args.id });
            
            if (!foundCar) throw new Error(`No car with id ${args.id}`);
            
            return foundCar;
        },

        cars: () => cars
    },

    Mutation: {
        addPerson: (root, args) =>{
            const newContact = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }

            personArray.push(newContact);

            return newContact
        },
        updatePerson: (root, args) => {
            
            let contact = _.find(personArray, { id: args.id });
            
            if (!contact) {
                throw new Error(`Couldn't find person with id ${args.id}`);
            }

            if (args.firstName) {
                contact.firstName = args.firstName;
            }

            if (args.lastName) {
                contact.lastName = args.lastName;
            }

            return contact;
        },
        removePerson: (root, args) => {
            console.log(args.id)
            const contact = _.remove(personArray, { id: args.id});
            console.log(contact)
            if(!contact){
                throw new Error(`No such user exists to delete.`);
            }
            return contact[0];
        }
    }
}

export {
    typeDefs, resolvers
}