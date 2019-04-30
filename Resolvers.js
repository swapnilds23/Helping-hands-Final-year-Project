const bcrypt = require('bcrypt');
const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET);
require("dotenv").config({path: "variables.env" });

exports.resolvers={
  Query: {

    getAllShelter:async (root, args, { Shelter }) => {
     let allShelter = await Shelter.find();
     return allShelter.filter((shelter) =>{
       if(shelter.availability){
         return shelter;
       }
     });
   },

   getAllFoodCenter: async (root, args, { ServiceCenter }) => {
    const allFoodCenter = await ServiceCenter.find();
    console.log(allFoodCenter);
    return allFoodCenter;
  },

  getAllClothCenter: async (root, args, { ServiceCenter }) => {
   const allServiceCenter = await ServiceCenter.find();
   console.log(allServiceCenter);
   return allServiceCenter;
 },

  getDonar: async(root, args, { Donar, req  }) => {
    // if(!req.session.userId){
    //   return null
    // }
    const donar = await Donar.find();
    console.log(donar);
    return donar;
  }

 },

  Mutation : {

    addShelter: async(root, args, {Shelter} ,info) =>{

      const { name, availability, coordinates } = args.data;
      const newShelter = await new Shelter({

          name,
          availability,
          coordinates
      }).save();

      return newShelter;
    },

    addServiceCenter: async(root, args, {ServiceCenter} ,info) =>{

      const { name, availability, coordinates, foodService, clotheService } = args.data;
      const newCenter = await new ServiceCenter({

          name,
          availability,
          coordinates,
          foodService,
          clotheService

      }).save();

      return newCenter;
    },

    register: async(parent, args, { Donar }, info)=>{

      const { username, password, email } = args.data;

      const user = await Donar.findOne({ username });

      if(user){
          throw new Error('User already exist');
      }
      const hashedPswd = await bcrypt.hash(password, 10);
      const newUser = await new Donar ({
        username,
        email,
        password:hashedPswd
      }).save();
      return true;
    },

    login: async(parent, args, { Donar, req }, info)=> {
      const { username, password } = args.data;
      const donar = await Donar.findOne({ username });
      //To check if donar is registered.
      if(!donar){
          throw new Error('User does not exist');
      }
      //Decrypt the user password and compare it with the one in the database
      const isValidPassword = await bcrypt.compare(password, donar.password);
      if(!isValidPassword){
        throw new Error('Invalid Password');
      }
      //if everything is correct return user.
      // req.session.userId = donar.id;
      // console.log(req.session.userId)
      return donar;
    },

    homelessLogin: async(parent, args, { Homeless, res }, info)=> {
      const { name, ssn } = args.data;
      const homeless = await Homeless.findOne({ name });
      //To check if donar is registered.
      if(!homeless){
          throw new Error('User does not exist');
      }
      if(ssn !== homeless.ssn){
        throw new Error('Invalid ssn');
      }
      //if everything is correct return user.
      //res.cookie("id",homeless.id);
      return homeless;
    },

    createSubscription: async(parent, args, { Donar, req }, info)=>{
      const { source, email, userId, amount } = args.data;

      if(!userId){
        throw new Error("User not authenticated");
      }
      const donar = await Donar.findOne({email});
      if(donar === null){
          throw new Error('User does not exist');
      }
      let stripeId = donar.stripeId;
      //check if customer already exist

      if(!stripeId){

          if(amount === 500){
            const customer = await stripe.customers.create({
              email: donar.email,
              source,
              plan: process.env.PLANONE
            })
            stripeId = customer.id;

          }else if(amount === 1000){
            const customer = await stripe.customers.create({
              email: donar.email,
              source,
              plan: process.env.PLANTWO
            })
            stripeId = customer.id;

          } else if(amount === 1500){
            const customer = await stripe.customers.create({
              email: donar.email,
              source,
              plan: process.env.PLANTHREE
            })
            stripeId = customer.id;
          }

      }else{
          //update customer creditcard details
          await stripe.customers.update(stripeId, {
            source
          });
          //update customer plan details
          if(amount === 500){
            await stripe.customers.create({
              customer: stripeId,
              items:[
                {
                  plan: process.env.PLANONE
                }
              ]
            })

          } else if(amount === 1000){

            await stripe.customers.create({
              customer: stripeId,
              items:[
                {
                  plan: process.env.PLANTWO
                }
              ]
            })

          }else if(amount === 1500){

            await stripe.customers.create({
              customer: stripeId,
              items:[
                {
                  plan: process.env.PLANTHREE
                }
              ]
            })

          }
      }


      donar.stripeId = stripeId ;
      donar.type = "Monthly";
      await donar.save();

      return donar;
    },

    changeCreaditCard: async(parent, args, { Donar }, info)=>{
      const { source, email } = args.data;
      if(!email){
        throw new Error("User not authenticated");
      }

      const donar = await Donar.findOne({ email });

      //Validate user
      if(donar === null ){
          throw new Error('User does not exist');
      }else if(!donar.stripeId){
          throw new Error('You have not subscribe to payment service')
      }else if(donar.type !== "Monthly"){
          throw new Error('You have opted for a free-trial. Please update your plan to Monthly to use this service')
      }

      //update user payment details.
      await stripe.customers.update(donar.stripeId, { source });

      return donar;
    },


    cancelSubscription: async(parent, args, { Donar }, info)=>{
      const { source, email } = args.data;
      if(!email){
        throw new Error("User not authenticated");
      }

      const donar = await Donar.findOne({ email });

      //retrieve the stripe customer using customer id.
      const stripCustomer = await stripe.customers.retrieve(donar.stripeId);
      // get list of all sbscription the customer is subscribed to.
      const [subscription] = stripeCustomer.subscriptions.data;
      //Delete the subscription
      await stripe.subscriptions.del(subscription.id);
      //To delete the customer creditcard details. The default_source for stripe customer
      //is a credit card.
      await stripe.customers.deleteCard(donar.stripeId, stripeCustomer.default_source );
      // update user details after canceling the subscription.
      donar.type ="free-trial";
      donar.stripeId = "";
      await donar.save();
      return donar;
    },

    registerHomeless:async(parent, args, { Homeless }, info)=>{

      const { name, ssn } = args.data;

      const homeless = await Homeless.findOne({ name });

      if(homeless){
          throw new Error('User already exist');
      }

      const newUser = await new Homeless ({
        name,
        ssn,
      }).save();
      return true;
    },

    createCharges: async(parent, args, { Donar, req }, info)=>{
      const { source, email, userId, amount } = args.data;

      if(!userId){
        throw new Error("User not authenticated");
      }
      const donar = await Donar.findOne({email});
      if(donar === null){
          throw new Error('User does not exist');
      }
      const charge = await stripe.charges.create({
          amount: amount,
          currency: 'usd',
          description: 'Example charge',
          source: source,
        });

        console.log(charge)
        return donar;
    }
    
  }


};
