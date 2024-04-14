import("../src/db/mongoose.js");
import user from "../src/models/user.js";

const myUser = user.User;

// myUser.findByIdAndUpdate("661b6fe2fa0c9d1f60642a76", { age : 1 })
// .then((user) =>
// {
//     console.log(user);
//     return myUser.countDocuments( { age : 1 });
// })
// .then((result) =>
// {
//     console.log(result);
// })
// .catch((error) =>
// {
//     console.log(error);
// });

const updateAgeAndCount = async (id, age) =>
{
    const updatedUser = await myUser.findByIdAndUpdate(id, {age : age });
    const count = await myUser.countDocuments({age : age });
    return { user : updatedUser, count : count };
}

updateAgeAndCount("661b6fe2fa0c9d1f60642a76", 1)
.then((result) =>
{
    console.log(result);
})
.catch((error) =>
{
    console.log(error);
});